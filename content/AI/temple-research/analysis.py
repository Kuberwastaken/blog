"""Rerun of Temple's published heart-rate validation data (aggregate outputs only).
Data: https://cdn.temple.com/research/hr_validation_study/data.zip (CC BY-NC 4.0, (c) Temple Private Limited).
Usage: python3 analysis.py <path to unzipped temple_heart_rate_validation_data> > results.json
Participant-level data is not republished here.

Definitions
- Per-second value: mean of valid readings (36-240 bpm) in that second; nothing interpolated.
- Data point: a second where the device and the taped Polar H10 (reference) both have a value.
- Error = |device - reference|. Participant score = mean error over that participant's data points.
- "Failures removed" uses Temple's clean/ files (failure episodes dropped by Temple's rule: >20 bpm off, consecutive, >=10 s).
- "All readings kept" uses raw/ files with only the valid-range rule, no failure removal.
- Device score = mean of participant scores (equal weight per person). Participants without a device file are skipped (Fitbit: 42).
- Paired comparison A: per-participant score difference (other - Temple); count of people Temple is better for;
  95% interval = percentile bootstrap over participants (5000 resamples, seed 1).
- Paired comparison B ("matched seconds", the ChatGPT-style metric): only seconds where Temple, the other device and the
  reference all have a value; per participant, mean(|other-ref| - |Temple-ref|).
"""
import csv, os, sys, json, random, statistics as st
root = sys.argv[1]
DEVS = ['temple','apple_watch_s12','fitbit_air','whoop_mg','garmin_forerunner_970','oura_ring_5','polar_h10_untaped']
def raw(p):
    d = {}
    if not os.path.exists(p): return d
    for r in csv.DictReader(open(p)):
        try: t = float(r['t_s']); v = float(r['hr_bpm'])
        except ValueError: continue
        if 36 <= v <= 240: d.setdefault(int(t), []).append(v)
    return {k: sum(v)/len(v) for k, v in d.items()}
def clean(p):
    return {int(float(r['t_s'])): float(r['hr_bpm']) for r in csv.DictReader(open(p)) if r['hr_bpm'].strip() != ''}
def score(a, ref):
    e = [abs(a[t]-ref[t]) for t in a if t in ref]
    return sum(e)/len(e) if e else None
parts = sorted(os.listdir(f'{root}/raw'))
S = {d: {'clean': {}, 'raw': {}} for d in DEVS}
for p in parts:
    rr = raw(f'{root}/raw/{p}/polar_h10_taped.csv'); rc = clean(f'{root}/clean/{p}/polar_h10_taped.csv')
    for d in DEVS:
        if not os.path.exists(f'{root}/raw/{p}/{d}.csv'): continue
        S[d]['raw'][p] = score(raw(f'{root}/raw/{p}/{d}.csv'), rr)
        S[d]['clean'][p] = score(clean(f'{root}/clean/{p}/{d}.csv'), rc)
def boot(diff):
    random.seed(1)
    b = sorted(sum(random.choice(diff) for _ in diff)/len(diff) for _ in range(5000))
    return round(b[125], 2), round(b[4875], 2)
out = {'devices': {}, 'paired_participant_score': {}, 'paired_matched_seconds': {}}
for d in DEVS:
    out['devices'][d] = {m: {'mean_of_participant_scores': round(sum(S[d][m].values())/len(S[d][m]), 2),
                             'median_of_participant_scores': round(st.median(S[d][m].values()), 2),
                             'worst_participant': round(max(S[d][m].values()), 2), 'n': len(S[d][m])} for m in ('clean', 'raw')}
for o in ('apple_watch_s12', 'polar_h10_untaped'):
    for m in ('clean', 'raw'):
        ps = [p for p in S['temple'][m] if p in S[o][m]]
        diff = [S[o][m][p] - S['temple'][m][p] for p in ps]
        out['paired_participant_score'][f'{o}|{m}'] = {'n': len(ps), 'temple_better_for': sum(x > 0 for x in diff),
            'mean_diff_other_minus_temple': round(sum(diff)/len(diff), 2), 'bootstrap95': boot(diff)}
    diff = []
    for p in parts:
        ref = raw(f'{root}/raw/{p}/polar_h10_taped.csv'); t = raw(f'{root}/raw/{p}/temple.csv'); a = raw(f'{root}/raw/{p}/{o}.csv')
        ts = [x for x in t if x in a and x in ref]
        if ts: diff.append(sum(abs(a[x]-ref[x]) - abs(t[x]-ref[x]) for x in ts)/len(ts))
    out['paired_matched_seconds'][o] = {'n': len(diff), 'temple_better_for': sum(x > 0 for x in diff),
        'mean_diff_other_minus_temple': round(sum(diff)/len(diff), 2), 'bootstrap95': boot(diff)}
print(json.dumps(out, indent=1))
