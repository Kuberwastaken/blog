import json,csv,os,sys,numpy as np,matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
plt.rcParams.update({'svg.fonttype':'none','font.family':'sans-serif','font.size':12,'axes.edgecolor':'#888','axes.labelcolor':'#888','xtick.color':'#888','ytick.color':'#888','text.color':'#888','axes.spines.top':False,'axes.spines.right':False,'figure.facecolor':'none','axes.facecolor':'none','savefig.transparent':True,'axes.grid':True,'grid.color':'#888','grid.alpha':.2})
X=json.load(open('hr_extended.json'));R=json.load(open('results.json'))['devices'];C=json.load(open('coverage.json'));root=sys.argv[1]
def raw(p):
 d={}
 if not os.path.exists(p):return d
 for row in csv.DictReader(open(p)):
  try:t=int(float(row['t_s']));v=float(row['hr_bpm'])
  except ValueError:continue
  if 36<=v<=240:d.setdefault(t,[]).append(v)
 return {t:float(np.mean(v)) for t,v in d.items()}
PP={}
for part in sorted(os.listdir(root+'/raw')):
 r=raw(root+'/raw/'+part+'/polar_h10_taped.csv')
 for f in os.listdir(root+'/raw/'+part):
  dv=f[:-4]
  if dv=='polar_h10_taped':continue
  a=raw(root+'/raw/'+part+'/'+f);e=[abs(a[t]-r[t])for t in a if t in r]
  if e:PP.setdefault(dv,{})[part]=(float(np.mean(e)),float(np.median(e)))
D=['temple','apple_watch_s12','fitbit_air','whoop_mg','garmin_forerunner_970','oura_ring_5','polar_h10_untaped'];N=['Temple','Apple S12','Fitbit Air','WHOOP MG','Garmin 970','Oura Ring 5','Polar untaped'];names=dict(zip(D,N));colors=['#4169ff','#858585','#b77932','#8172c8','#42a5a1','#cb658c','#df7b36'];color=dict(zip(D,colors));B=colors[0];O=colors[-1]
def save(fig,n):fig.tight_layout();fig.savefig('img/'+n+'.svg');plt.close(fig)
fig,ax=plt.subplots(figsize=(4.8,5)); rng=np.random.default_rng(1)
for i,d in enumerate(D):
 v=[z[0] for z in PP[d].values()];ax.scatter(v,i+rng.uniform(-.23,.23,len(v)),s=13,color=color[d],alpha=.8);ax.plot([np.median(v)]*2,[i-.32,i+.32],color=color[d],lw=3)
ax.set_xscale('log');ax.set_xticks([.2,1,5,20]);ax.set_xticklabels(['0.2','1','5','20']);ax.set_yticks(range(7),N);ax.invert_yaxis();ax.set_xlabel('MAE per person (bpm, log scale)');ax.grid(axis='y',alpha=0);save(fig,'hr-per-person')
fig,ax=plt.subplots(figsize=(4.8,5))
for i,d in enumerate(D):
 c=R[d]['clean']['mean_of_participant_scores'];r=R[d]['raw']['mean_of_participant_scores'];ax.plot([c,r],[i,i],color=color[d],lw=2);ax.scatter([c],[i],color=color[d],s=45);ax.scatter([r],[i],facecolor='none',edgecolor=color[d],s=80,lw=2);ax.text(10.5,i,f'{c:.2f} / {r:.2f}',va='center',ha='right',fontsize=10)
ax.set_yticks(range(7),N);ax.invert_yaxis();ax.set_xlim(0,11);ax.set_xlabel('MAE (bpm): clean / all valid');ax.grid(axis='y',alpha=0);save(fig,'hr-clean-vs-raw')
fig,axs=plt.subplots(2,1,figsize=(4.8,6.5))
for ax,d in zip(axs,['apple_watch_s12','polar_h10_untaped']):
 v=sorted(PP[d][p][0]-PP['temple'][p][0] for p in PP[d]);ax.bar(range(len(v)),v,color=[B if z>0 else O for z in v]);ax.axhline(0,color='#888');ax.set_title(names[d]+': Temple wins '+str(sum(z>0 for z in v))+'/43',fontsize=12);ax.set_xticks([]);ax.set_ylabel('Other MAE − Temple MAE');ax.set_xlabel('People, sorted by difference')
save(fig,'hr-paired')
fig,ax=plt.subplots(figsize=(4.8,5));bins=list(X[D[0]]['by_ref_hr_bin'])
for d in D:ax.plot(range(6),[X[d]['by_ref_hr_bin'][b]['mae'] for b in bins],color=color[d],marker='o',ms=4,label=names[d])
ax.set_xticks(range(6),['<100','100-\n120','120-\n140','140-\n160','160-\n180','180+'],fontsize=10);ax.set_ylabel('MAE (bpm)');ax.set_xlabel('Reference heart rate (bpm)');ax.legend(frameon=False,fontsize=10,ncol=2);save(fig,'hr-by-intensity')
fig,ax=plt.subplots(figsize=(4.8,5.3));y=np.arange(7);w=.25
for j,k in enumerate(['share_over5','share_over10','share_over20']):ax.barh(y+(j-1)*w,[X[d][k] for d in D],w,color=[color[d] for d in D],alpha=[1,.6,.3][j])
ax.set_yticks(y,N);ax.invert_yaxis();ax.set_xlabel('% of available paired seconds');ax.set_title('Error >5 / >10 / >20 bpm\nDark → light',fontsize=12);ax.grid(axis='y',alpha=0);save(fig,'hr-tails')
fig,ax=plt.subplots(figsize=(4.8,4.8))
for d in D[:5]:
 ks=sorted(map(int,C['lag_shift_mae'][d]));v=[C['lag_shift_mae'][d][str(k)] for k in ks];ax.plot(ks,v,color=color[d],label=names[d]);i=np.argmin(v);ax.scatter(ks[i],v[i],color=color[d],s=30)
ax.set_ylabel('MAE (bpm)');ax.set_xlabel('Reference-time offset (seconds)');ax.legend(frameon=False,fontsize=10);save(fig,'hr-lag')
fig,ax=plt.subplots(figsize=(4.8,4.5));ds=[D[1],D[2],D[3],D[4]];xx=np.arange(4)
for off,key,alpha in [(-.2,'upper',1),(.2,'bottom',.45)]:ax.bar(xx+off,[X['wrist_position'][d][key]['mean_pp_mae'] for d in ds],.38,color='#888',alpha=alpha,label=key+' wrist')
ax.set_xticks(xx,['Apple\nS12','Fitbit\nAir','WHOOP\nMG','Garmin\n970'],fontsize=10);ax.axhline(1.18,color=B,label='Temple overall');ax.set_ylabel('MAE (bpm), all valid');ax.legend(frameon=False,fontsize=10);save(fig,'hr-wrist')
fig,axs=plt.subplots(3,1,figsize=(4.8,8.5));vals=[[.912,.494,.826,.832,.649],[.843,.700,.701,.850,.570],[.839,.767,.796,.654,.438]]
for ax,v,title,p in zip(axs,vals,['Head-down tilt','Stand to squat','Stand to supine'],['p < 0.001','p < 0.001','p = 0.082']):
 ax.barh(range(5),v,color=[B,'#888','#a0b4ff','#7589d0',O]);ax.set_yticks(range(5),['Brain, lagged','Scalp, lagged','Brain, zero lag','Brain, HR adj.','Brain, scalp adj.'],fontsize=10);ax.invert_yaxis();ax.set_xlim(0,1.05)
 for i,z in enumerate(v):ax.text(z+.015,i,f'{z:.3f}',va='center',fontsize=10)
 ax.set_title(title+' | '+p,fontsize=11);ax.set_xticks([0,.5,1]);ax.grid(axis='y',alpha=0)
axs[-1].set_xlabel('Median correlation (20 sessions per challenge)');save(fig,'nirs-sensitivity')
fig,axs=plt.subplots(2,1,figsize=(4.8,5.7));ax=axs[0];ax.bar([0,1],[14,3],color=[B,'#888']);ax.set_xticks([0,1],['Temple','Wrist']);ax.set_ylim(0,17);ax.set_ylabel('Age-linked features /89')
for i,z in enumerate([14,3]):ax.text(i,z+.3,str(z),ha='center')
ax=axs[1];ax.barh([0,1,2],[70,39.5,10.1],color=[B,B,'#888']);ax.set_yticks([0,1,2],['Temple\n(Ad-Ab)/Aa','Temple\nAGImod','Wrist\nAd/Aa'],fontsize=10);ax.invert_yaxis();ax.set_xlim(0,100);ax.set_xlabel('Selected after FDR correction\n(% of 1,000 resamples)')
for i,z in enumerate([70,39.5,10.1]):ax.text(z+2,i,f'{z}%',va='center',fontsize=11)
save(fig,'age-features')
fig,ax=plt.subplots(figsize=(4.8,4.5));v=[C['coverage'][d]['median_percent_reference_seconds'] for d in D];ax.barh(range(7),v,color=colors);ax.set_yticks(range(7),N);ax.invert_yaxis();ax.set_xlim(0,115);ax.set_xlabel('Median available paired seconds\n(% of reference seconds)')
for i,z in enumerate(v):ax.text(z+1,i,f'{z:.1f}',va='center',fontsize=10)
save(fig,'hr-coverage')
# Historical endpoint comparison: not a ranking of current devices
fig,ax=plt.subplots(figsize=(4.8,5));labs=['Oura Gen1: sleep sensitivity','Oura Gen1: wake specificity','WHOOP: sleep sensitivity','WHOOP: wake specificity','WHOOP: 4-stage agreement'];vs=[95.5,48.1,95,51,64]
ax.barh(range(5),vs,color=['#888','#888','#4169ff','#4169ff','#4169ff']);ax.invert_yaxis();ax.set_yticks(range(5),['Oura: sleep\nsensitivity','Oura: wake\nspecificity','WHOOP: sleep\nsensitivity','WHOOP: wake\nspecificity','WHOOP: four-\nstage agreement'],fontsize=11);ax.set_xlim(0,112);ax.set_xlabel('Percent (%)');ax.set_title('Historical sleep validation\nDifferent cohorts and protocols',fontsize=12)
for i,z in enumerate(vs):ax.text(z+1,i,str(z),va='center',fontsize=11)
save(fig,'historical-sleep')
