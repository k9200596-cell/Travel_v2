/* K-TRAVEL PICKS v44 — 2026-10-25: safer dates, unsaved-change guard, mobile overview, verified photos. */
const V44_PHOTOS=[
 {city:'삿포로',spot:'오도리공원',file:'Odori park at Sapporo TV tower.jpg',author:'LR0725',taken:'2023-07-09',scene:'삿포로 TV 타워에서 내려다본 오도리 공원. 2023년 여름 촬영.'},
 {city:'뉴욕',spot:'센트럴파크',file:'2024-11-19-Central Park-0669.jpg',author:'Superbass',taken:'2024-11-19',scene:'늦가을 센트럴파크 호수와 산레모 건물의 풍경.'},
 {city:'뉴욕',spot:'브루클린 브리지',file:'Brooklyn Bridge 2024.jpg',author:'Mojnsen',taken:'2024-02-18',scene:'2024년 2월 촬영한 뉴욕 브루클린 브리지.'},
 {city:'시드니',spot:'로열 보타닉 가든',file:'Sydney Royal Botanic Gardens The Calyx seen from the northwest.jpg',author:'Ymblanter',taken:'2024-04-01',scene:'2024년 4월 시드니 로열 보타닉 가든의 칼릭스 건물.'}
].map(p=>({...p,label:p.spot+' · '+p.taken.slice(0,4)+'년',cover:false,license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',checked:'2026-10-25',source:'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(p.file),url:'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(p.file)+'?width=960',photoTitle:p.file,metadataVerifiedThisRun:true,metadataVerification:'2026-10-25 Wikimedia Commons 개별 파일 설명에서 장소·촬영일·저작자·라이선스 확인',lastVerifiedVersion:'v44',imageTransport:'Wikimedia Commons 외부 이미지: 모바일 실제 로딩은 미검증',siteModification:'원본 이미지 파일 수정·재배포 없음. CSS object-fit으로 화면 일부 크롭 가능',reuseTerms:'CC BY-SA 4.0: 저작자·원본·라이선스 링크·변경 여부 표시, 수정본은 동일조건 공유',verificationScope:'Commons 원본 설명 확인, 실제 파일 바이트·현장 현황은 미검증',verificationStatus:'verified_file_description_v44',sourcePageCheckedVia:'Wikimedia Commons 원본 파일 설명 · 2026-10-25',imageBytesChecked:false}));
for(const p of V44_PHOTOS){
 if(!PHOTO_CATALOG.some(x=>x.city===p.city&&x.spot===p.spot&&x.file===p.file))PHOTO_CATALOG.push(p);
 if(!spotPhoto(p.city,p.spot))SPOT_PHOTO_MAP.set(p.city+'|'+p.spot,p);
}

/* Date arithmetic in UTC avoids daylight-saving and device timezone drift. */
function v44UtcDay(iso){if(!/^\d{4}-\d{2}-\d{2}$/.test(iso||''))return NaN;const d=new Date(iso+'T12:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===iso?Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())/86400000:NaN}
function v44DayAdd(iso,days){const d=v44UtcDay(iso);return Number.isFinite(d)?new Date((d+days)*86400000).toISOString().slice(0,10):''}
function v44Duration(start,end){const a=v44UtcDay(start),b=v44UtcDay(end);return Number.isFinite(a)&&Number.isFinite(b)?b-a+1:NaN}
let v44PreserveDuration=true,v44PlanInitialized=false,v44SkipQuickGuard=false;
const v44Dates={quick:{start:$('quickStart').value,end:$('quickEnd').value},plan:{start:$('start').value,end:$('end').value}};

function v44DateUI(){
 $('quickGo').closest('.quick').insertAdjacentHTML('afterend',`<div class="v44-date-line"><label><input id="v44QuickLock" type="checkbox" checked> 출발일 변경 시 여행기간 유지</label><span id="v44QuickDateHelp" role="status" aria-live="polite"></span></div>`);
 $('start').closest('.grid2').insertAdjacentHTML('afterend',`<div class="v44-date-line v44-plan-date-line"><label><input id="v44PlanLock" type="checkbox" checked> 출발일 변경 시 귀국일도 함께 변경</label><span id="v44PlanDateHelp" role="status" aria-live="polite"></span></div>`);
 $('v43SaveStatus').insertAdjacentHTML('afterend','<div id="v44Overview" class="v44-overview" aria-live="polite"></div>');
 const expand=document.createElement('details');expand.className='v44-extra-photos';expand.innerHTML='<summary>📸 사진 갤러리 더 둘러보기 <small>지난 버전의 사진 특집·포토저널</small></summary><div class="v44-extra-inner"></div>';
 const inspire=document.querySelector('#discover .inspire-section'),story=$('photoStory');
 if(inspire&&story){inspire.parentNode.insertBefore(expand,inspire);expand.querySelector('.v44-extra-inner').append(inspire,story)}
 $('v44QuickLock').onchange=e=>{v44PreserveDuration=e.target.checked;$('v44PlanLock').checked=v44PreserveDuration};
 $('v44PlanLock').onchange=e=>{v44PreserveDuration=e.target.checked;$('v44QuickLock').checked=v44PreserveDuration};
 v44SyncDateStates();
}
function v44SyncDateStates(){
 for(const [name,a,b,label] of [['quick','quickStart','quickEnd','v44QuickDateHelp'],['plan','start','end','v44PlanDateHelp']]){
  const start=$(a).value,end=$(b).value,n=v44Duration(start,end);v44Dates[name]={start,end};
  $(b).min=start||'';
  if(!$(label))continue;
  $(label).classList.toggle('v44-invalid',!(n>=1&&n<=60));
  $(label).textContent=n>=1&&n<=60?`✓ ${n}일 ${Math.max(0,n-1)}박 · ${start} ~ ${end}`:'⚠️ 출발일·귀국일을 확인하세요 (1~60일).';
 }
}
function v44ShiftEnd(kind,newStart){
 const old=v44Dates[kind],n=v44Duration(old.start,old.end),target=kind==='quick'?'quickEnd':'end';
 if(v44PreserveDuration&&Number.isFinite(n)&&n>=1&&n<=60&&newStart&&newStart!==old.start){const shifted=v44DayAdd(newStart,n-1);if(shifted)$(target).value=shifted}
}
/* Capture before v43's existing change handlers, so they see the corrected end date. */
document.addEventListener('change',e=>{
 if(e.target.id==='quickStart')v44ShiftEnd('quick',$('quickStart').value);
 if(e.target.id==='start')v44ShiftEnd('plan',$('start').value);
 if(['quickStart','quickEnd','start','end'].includes(e.target.id))v44SyncDateStates();
},true);
function v44HasUnsaved(){return v44PlanInitialized&&(!loaded||v43SavedSignature!==v43Signature())}
function v44Block(e,message){e.preventDefault();e.stopImmediatePropagation();toast(message)}
/* Guard the destructive quick-start action BEFORE it clears the active plan. */
$('quickGo').addEventListener('click',e=>{
 const n=v44Duration($('quickStart').value,$('quickEnd').value);
 if(!(n>=1&&n<=60)){v44SyncDateStates();v44Block(e,'여행 날짜가 올바르지 않습니다. 1~60일로 선택하세요.');return}
 if(v44HasUnsaved()&&!v44SkipQuickGuard&&!confirm('현재 여행계획에 저장하지 않은 변경사항이 있습니다. 새 계획을 만들면 사라집니다. 계속할까요?')){v44Block(e,'현재 여행계획을 유지했습니다.');return}
},true);
$('quickGo').addEventListener('click',()=>{v44PlanInitialized=true;v44SkipQuickGuard=false;v44SyncDateStates();setTimeout(v44Overview,0)});
/* Auto-itinerary already prompts if schedule exists; avoid a second confirmation. */
$('v39QuickAuto').addEventListener('click',e=>{
 if(v44HasUnsaved()&&!days.some(d=>d.length)&&!confirm('현재 여행계획의 미저장 내용이 사라질 수 있습니다. 계속할까요?')){v44Block(e,'현재 여행계획을 유지했습니다.');return}
 v44SkipQuickGuard=true;setTimeout(()=>{v44SkipQuickGuard=false},50);
},true);
$('planner').addEventListener('input',()=>{v44PlanInitialized=true},true);
$('planner').addEventListener('change',()=>{v44PlanInitialized=true},true);
const v44OldLoad=load;load=function(x){v44OldLoad(x);v44PlanInitialized=true;v44SyncDateStates();setTimeout(v44Overview,0)};

function v44Overview(){
 const box=$('v44Overview');if(!box||!DATA[$('city').value])return;
 const start=$('start').value,end=$('end').value,n=v44Duration(start,end),today=new Date();
 const localToday=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
 const delta=v44UtcDay(start)-v44UtcDay(localToday),dday=!Number.isFinite(delta)?'날짜 확인':delta>0?'D-'+delta:delta===0?'D-DAY':v44UtcDay(end)>=v44UtcDay(localToday)?'여행 중':'여행 종료';
 const planned=days.filter(d=>d.length>0).length,totalDays=Number.isFinite(n)&&n>0&&n<=60?n:0;
 const month=v42Month(),city=$('city').value,prefix=city+'|'+month+'|',packing=v42PackItems(),done=packing.filter(x=>v42PackChecks[prefix+x[0]]).length;
 const flight=Number(costs[0])||0,arrivalKnown=!!$('v42DepartureTime').value&&Number($('v42FlightHours').value)>0||v42ManualArrival;
 const needs=[];if(!totalDays)needs.push(['여행 날짜 확인','#planTitle']);if(totalDays&&planned<totalDays)needs.push(['일정 완성','#tripSchedule']);if(!arrivalKnown)needs.push(['현지 도착일 확인','#entryGuide']);if(done<packing.length)needs.push(['준비물 확인','#tripChecklist']);if(!flight)needs.push(['실제 항공료 입력','#tripBudget']);
 box.innerHTML=`<div class="v44-overview-title"><strong>🧭 여행 준비 한눈에</strong><b>${safe(dday)}</b></div><div class="v44-metrics"><span>🗓 일정 <b>${planned}/${totalDays}일</b></span><span>🧳 준비물 <b>${done}/${packing.length}개</b></span><span>✈️ 항공료 <b>${flight?'입력됨':'미입력'}</b></span></div><div class="v44-next">${needs.length?'다음 할 일: <a href="'+needs[0][1]+'">'+safe(needs[0][0])+' →</a>':'✓ 핵심 준비 항목을 모두 확인했습니다. 출발 전 공식 입국정보를 다시 확인하세요.'}</div>`;
}
const v44OldRefresh=refresh;refresh=function(...args){const r=v44OldRefresh(...args);v44Overview();return r};
document.addEventListener('input',e=>{if(['v42DepartureTime','v42FlightHours','entryArrivalDate'].includes(e.target.id))setTimeout(v44Overview,0)},true);
document.addEventListener('change',e=>{if(['city','start','end','entryArrivalDate','v42PackingList','costInputs'].includes(e.target.id)||e.target.matches('[data-v42-pack], [data-entry-check]'))setTimeout(v44Overview,0)},true);

/* Export metadata now matches the release; keep older JSON imports compatible. */
backupCurrent=function(){
 const plan=snap(),stamp=new Date().toLocaleString('sv-SE').replace(' ','_').replaceAll(':','');
 const name=(plan.name||'여행계획').replace(/[\\/:*?"<>|]/g,'_').replace(/\s+/g,'_').slice(0,55);
 downloadJSON({format:'K-TRAVEL',version:44,plans:[plan]},`K-TRAVEL-${name}-${stamp}.json`);
 toast('현재 계획을 JSON 파일로 저장했습니다.');
};
exportData=function(){
 const stamp=new Date().toLocaleString('sv-SE').replace(' ','_').replaceAll(':','');
 downloadJSON({format:'K-TRAVEL',version:44,plans:read()},`K-TRAVEL-여행계획-${stamp}.json`);
};
$('backupCurrent').onclick=backupCurrent;
$('export').onclick=exportData;
$('downloadPhotoSources').onclick=()=>{
 const city=$('city').value;
 downloadJSON({format:'K-TRAVEL-PHOTO-SOURCES',version:44,city,exportedAt:new Date().toISOString(),photos:PHOTO_CATALOG.filter(p=>p.city===city)},'K-TRAVEL-사진출처-'+city+'-v44.json');
};

/* Recompute the full attraction-photo audit from the live catalog, not hardcoded counts. */
v42PhotoAudit=function(){
 const missing=Object.entries(DATA).flatMap(([city,d])=>d.spots.filter(s=>!spotPhoto(city,s[0])).map(s=>city+' · '+s[0]));
 const total=Object.values(DATA).reduce((n,d)=>n+d.spots.length,0);
 $('v42PhotoAudit').innerHTML=`<strong>📷 사진 출처 확보 ${total-missing.length}/${total}곳</strong> · 미확인 ${missing.length}곳. <details><summary>미확인 명소 ${missing.length}곳 보기</summary><p>${missing.map(safe).join(' · ')}</p></details><small>v44 원본 설명 개별 확인 ${V44_PHOTOS.length}곳 · 확인일 2026-10-25. 외부 이미지 로딩은 별도 검증이 필요합니다.</small>`;
};
function v44Init(){v44DateUI();v42PhotoAudit();v44Overview();}
setTimeout(v44Init,40);
