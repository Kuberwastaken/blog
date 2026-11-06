import csv,sys,os,json,statistics as st
sys.argv=['analysis.py',sys.argv[1]]
exec(open(os.path.join(os.path.dirname(__file__),'analysis.py')).read())
coverage={}; matched={}; lag={}
for d in DEVS:
    rows=[]
    for p in parts:
        a=raw(f'{root}/raw/{p}/{d}.csv');r=raw(f'{root}/raw/{p}/polar_h10_taped.csv');ss=set(a)&set(r)
        if a: rows.append(100*len(ss)/len(r))
    coverage[d]={'n':len(rows),'median_percent_reference_seconds':round(st.median(rows),2),'min_percent':round(min(rows),2),'max_percent':round(max(rows),2)}
    if d=='temple':continue
    vals=[]
    for p in parts:
        a=raw(f'{root}/raw/{p}/{d}.csv');t=raw(f'{root}/raw/{p}/temple.csv');r=raw(f'{root}/raw/{p}/polar_h10_taped.csv');ss=set(a)&set(t)&set(r)
        if ss: vals.append((st.mean(abs(a[x]-r[x]) for x in ss),st.mean(abs(t[x]-r[x]) for x in ss)))
    dif=[a-t for a,t in vals]
    matched[d]={'n':len(vals),'device_mae':round(st.mean(a for a,t in vals),3),'temple_mae_same_seconds':round(st.mean(t for a,t in vals),3),'difference':round(st.mean(dif),3),'temple_better_for':sum(d>0 for d in dif),'bootstrap95':boot(dif)}
for d in DEVS:
    lag[d]={}
    for k in range(-4,9):
        vals=[]
        for p in parts:
            a=raw(f'{root}/raw/{p}/{d}.csv');r=raw(f'{root}/raw/{p}/polar_h10_taped.csv')
            es=[abs(a[t]-r[t+k]) for t in a if t+k in r]
            if es:vals.append(st.mean(es))
        lag[d][k]=round(st.mean(vals),3)
json.dump({'coverage':coverage,'matched_seconds':matched,'lag_shift_mae':lag},open('coverage.json','w'),indent=2)
print(json.dumps(matched,indent=1));print(lag['apple_watch_s12'])
