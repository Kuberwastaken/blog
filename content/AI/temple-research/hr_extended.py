import csv,os,sys,json,statistics as st
import numpy as np
root=sys.argv[1]
DEVS=['temple','apple_watch_s12','fitbit_air','whoop_mg','garmin_forerunner_970','oura_ring_5','polar_h10_untaped']
NAME={'temple':'Temple','apple_watch_s12':'Apple Watch S12','fitbit_air':'Fitbit Air','whoop_mg':'WHOOP MG','garmin_forerunner_970':'Garmin FR970','oura_ring_5':'Oura Ring 5','polar_h10_untaped':'Polar H10 (untaped)'}
def raw(p):
    d={}
    if not os.path.exists(p): return d
    for r in csv.DictReader(open(p)):
        try:t=float(r['t_s']);v=float(r['hr_bpm'])
        except: continue
        if 36<=v<=240: d.setdefault(int(t),[]).append(v)
    return {k:sum(v)/len(v) for k,v in d.items()}
parts=sorted(os.listdir(f'{root}/raw'))
D={}  # D[dev][p]=(t array, dev, ref)
for p in parts:
    ref=raw(f'{root}/raw/{p}/polar_h10_taped.csv')
    for d in DEVS:
        a=raw(f'{root}/raw/{p}/{d}.csv')
        ts=sorted(t for t in a if t in ref)
        if ts: D.setdefault(d,{})[p]=(np.array(ts),np.array([a[t] for t in ts]),np.array([ref[t] for t in ts]))
out={}
# per-person stats
def pp(d,f): return {p:f(*v) for p,v in D[d].items()}
bins=[(0,100),(100,120),(120,140),(140,160),(160,180),(180,250)]
for d in DEVS:
    o={}
    o['n_seconds']=int(sum(len(v[0]) for v in D[d].values()))
    allerr=np.concatenate([np.abs(v[1]-v[2]) for v in D[d].values()])
    o['share_over5']=round(float((allerr>5).mean()*100),1); o['share_over10']=round(float((allerr>10).mean()*100),1); o['share_over20']=round(float((allerr>20).mean()*100),1)
    pm=[np.mean(np.abs(v[1]-v[2])) for v in D[d].values()]
    o['pp_mae_percentiles']={k:round(float(np.percentile(pm,k)),2) for k in (10,25,50,75,90,100)}
    o['pp_signed_bias_mean']=round(float(np.mean([np.mean(v[1]-v[2]) for v in D[d].values()])),2)
    # by ref HR bin (per-person MAE inside bin, then mean over people with >=30 s in bin)
    bo={}
    for lo,hi in bins:
        vals=[]
        for t,a,r in D[d].values():
            m=(r>=lo)&(r<hi)
            if m.sum()>=30: vals.append(np.mean(np.abs(a[m]-r[m])))
        bo[f'{lo}-{hi}']={'mae':round(float(np.mean(vals)),2) if vals else None,'n_people':len(vals)}
    o['by_ref_hr_bin']=bo
    out[d]=o
# wrist position, sex
parts_csv=list(csv.DictReader(open(f'{root}/participants.csv')))
sex={r['participant']:r['sex'] for r in parts_csv}
pos={d:{r['participant']:r[d] for r in parts_csv} for d in ['apple_watch_s12','whoop_mg','garmin_forerunner_970','fitbit_air']}
out['wrist_position']={}
for d in pos:
    g={}
    for p,v in D[d].items():
        k=pos[d].get(p,'').split(' ')[-1] or 'unrecorded'
        g.setdefault(k,[]).append(float(np.mean(np.abs(v[1]-v[2]))))
    out['wrist_position'][d]={k:{'mean_pp_mae':round(float(np.mean(x)),2),'n':len(x)} for k,x in g.items()}
out['sex']={}
for d in DEVS:
    g={}
    for p,v in D[d].items(): g.setdefault(sex.get(p,'?'),[]).append(float(np.mean(np.abs(v[1]-v[2]))))
    out['sex'][d]={k:{'mean_pp_mae':round(float(np.mean(x)),2),'n':len(x)} for k,x in g.items()}
# lag: shift device by k s, recompute pooled-per-person MAE (k from -3..8)
ref_all={p:raw(f'{root}/raw/{p}/polar_h10_taped.csv') for p in parts}
lagres={}
for d in ['temple','apple_watch_s12','whoop_mg','garmin_forerunner_970','fitbit_air']:
    L={}
    for k in range(-4,9):
        ms=[]
        for p in parts:
            a=raw(f'{root}/raw/{p}/{d}.csv')
            e=[abs(a[t]-ref_all[p][t+k]) for t in a if (t+k) in ref_all[p]]
            if e: ms.append(np.mean(e))
        L[k]=round(float(np.mean(ms)),2)
    lagres[d]=L
out['lag_shift_mae']=lagres
json.dump(out,open('hr_extended.json','w'),indent=1)
print(json.dumps({d:{k:out[d][k] for k in ('share_over5','share_over10','share_over20','pp_mae_percentiles','pp_signed_bias_mean')} for d in DEVS},indent=0)[:3000])
print(out['wrist_position']); print(out['sex']['temple'],out['sex']['apple_watch_s12']); print(out['lag_shift_mae'])
print({d:{k:v['mae'] for k,v in out[d]['by_ref_hr_bin'].items()} for d in DEVS})
