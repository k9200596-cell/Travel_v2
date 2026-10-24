/* K-TRAVEL PICKS v43 — user-first regression fixes, trip readiness, 4 verified attraction photos. */
const V43_PHOTOS = [
  {city:'시드니',spot:'하버브리지',label:'시드니 하버브리지 · 2025년',file:'Sydney Harbour Bridge 2025.jpg',author:'Bonnie Jin',taken:'2025-04-12',scene:'2025년 4월 촬영한 시드니 하버브리지의 전경.'},
  {city:'시드니',spot:'본다이 비치',label:'본다이 비치 · 2025년',file:'Sydney Bondi Beach 2025.jpg',author:'LittleMi&Ada',taken:'2025-03-14',scene:'2025년 3월 촬영한 시드니 본다이 해변.'},
  {city:'뉴욕',spot:'자유의 여신상',label:'자유의 여신상 · 2024년',file:'Statue of Liberty 2024.jpg',author:'Mojnsen',taken:'2024-02-19',scene:'2024년 2월 촬영한 뉴욕 자유의 여신상.'},
  {city:'상하이',spot:'동방명주',label:'동방명주 · 상하이',file:'Oriental Pearl Tower in Shanghai.jpg',author:'Dmitry A. Mottl',taken:'2014-12-22',scene:'2014년 촬영한 상하이 동방명주. 현재의 도시 경관과 다를 수 있습니다.'}
].map(p=>({...p,cover:false,license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',checked:'2026-10-24',source:'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(p.file),url:'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(p.file)+'?width=960',photoTitle:p.file,metadataVerifiedThisRun:true,metadataVerification:'2026-10-24 Wikimedia Commons 원본 설명에서 장소·촬영일·저작자·라이선스 개별 확인',lastVerifiedVersion:'v43',imageTransport:'Wikimedia Commons 외부 이미지 · 실제 이미지 바이트/모바일 로딩 미검증',siteModification:'원본 파일 수정·재배포 없음. 화면 CSS object-fit에 따른 크롭 가능',reuseTerms:'CC BY-SA 4.0: 저작자·원본·라이선스 링크 및 수정 여부 표시, 수정본 배포 시 동일조건 공유',verificationScope:'개별 Commons 파일 설명 확인; 사이트에서 실제 이미지 로딩 미검증',verificationStatus:'verified_file_description_v43',sourcePageCheckedVia:'Wikimedia Commons 원본 파일 설명 · 2026-10-24',imageBytesChecked:false}));
for(const p of V43_PHOTOS){
  if(!PHOTO_CATALOG.some(q=>q.city===p.city&&q.spot===p.spot&&q.file===p.file))PHOTO_CATALOG.push(p);
  if(!spotPhoto(p.city,p.spot))SPOT_PHOTO_MAP.set(p.city+'|'+p.spot,p);
}

/* An explicit provisional-arrival warning prevents applying a guessed date as a confirmed entry-card window. */
const v43OldEntryGuide=renderEntryGuide;
renderEntryGuide=function(){
  v43OldEntryGuide();
  const arrival=v42ArrivalCalc(),hasDetails=Boolean($('v42DepartureTime').value&&Number($('v42FlightHours').value)>0),manual=v42ManualArrival;
  $('v43ArrivalCaution').textContent=!hasDetails&&!manual
    ?'⚠️ 현지 도착일 미확정: 신고 가능 날짜는 임시 계산입니다. 항공권의 현지 도착일·시각을 확인하거나 위 날짜를 직접 수정하세요.'
    :manual?'✍️ 직접 입력한 도착일을 기준으로 신고 가능 날짜를 표시합니다. 항공권과 대조하세요.'
    :'🕒 입력한 이동시간·현지 시차 기준 예상일입니다. 실제 항공권 도착일을 확인하세요.';
  v43RenderReadiness();
};

/* Checklist filtering preserves all checked states; a filtered list never deletes tasks. */
let v43PackFilter='all';
const v43OldPacking=v42RenderPacking;
v42RenderPacking=function(){
  v43OldPacking();
  const city=$('city').value,month=v42Month(),prefix=city+'|'+month+'|';
  $('v42PackingList').querySelectorAll('[data-v42-pack]').forEach(input=>{
    const done=Boolean(v42PackChecks[prefix+input.dataset.v42Pack]);
    input.closest('.v42-pack-item').hidden=v43PackFilter==='pending'&&done||v43PackFilter==='done'&&!done;
  });
  const visible=$('v42PackingList').querySelectorAll('.v42-pack-item:not([hidden])').length;
  $('v43PackEmpty').hidden=visible>0;
  document.querySelectorAll('[data-v43-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v43Filter===v43PackFilter)));
  v43RenderReadiness();
};
function v43RenderReadiness(){
  const city=$('city')?.value;if(!city||!DATA[city])return;
  const month=v42Month(),country=DATA[city].country,prefix=city+'|'+month+'|';
  const items=v42PackItems(),done=items.filter(x=>v42PackChecks[prefix+x[0]]).length;
  const entryDone=ENTRY_CHECK_ITEMS.filter(([id])=>entryChecks[country+'|'+id]).length;
  const remaining=items.filter(x=>!v42PackChecks[prefix+x[0]]).slice(0,3).map(x=>x[1].replace(/^\S+\s*/,''));
  const summary=$('v43Readiness');if(!summary)return;
  summary.innerHTML=`<div class="v43-readiness-head"><strong>🧭 ${safe(city)} 출발 준비 한눈에</strong><span>${entryDone+done}/${ENTRY_CHECK_ITEMS.length+items.length}개 완료</span></div>
    <div class="v43-readiness-bars"><span>입국 준비 <b>${entryDone}/${ENTRY_CHECK_ITEMS.length}</b><progress max="${ENTRY_CHECK_ITEMS.length}" value="${entryDone}"></progress></span>
    <span>맞춤 준비물 <b>${done}/${items.length}</b><progress max="${items.length}" value="${done}"></progress></span></div>
    <p>${remaining.length?'남은 준비물 예시: '+safe(remaining.join(' · ')):'맞춤 준비물은 모두 체크했습니다. 입국 조건도 최종 확인하세요.'}</p>
    <div class="v43-readiness-links"><a href="#entryChecks">🛂 입국 준비 확인</a><a href="#tripChecklist">🧳 준비물 체크</a><a href="#tripBudget">💳 여행 경비</a></div>`;
}

/* A 12-month visual strip exposes seasonal differences without pretending estimates are official normals. */
const v43OldClimate=v42RenderClimate;
v42RenderClimate=function(){
  v43OldClimate();
  const city=$('city').value,selected=v42Month();
  $('v43ClimateMonths').innerHTML=Array.from({length:12},(_,i)=>{
    const c=v42Climate(city,i+1);
    return `<span class="v43-month ${c.wet?'v43-wet':''} ${i+1===selected?'v43-current':''}" ${i+1===selected?'aria-current="date"':''} title="${i+1}월: ${c.wet?'비가 잦은 경향':'비교적 적은 경향'}"><b>${i+1}월</b><small>${Number.isFinite(c.mean)?c.mean+'℃':'—'}</small>${c.wet?'<em>비↑</em>':''}</span>`;
  }).join('');
};

/* Avoid misleading fixed audit counts when more photos are added. */
v42PhotoAudit=function(){
  const missing=Object.entries(DATA).flatMap(([city,d])=>d.spots.filter(s=>!spotPhoto(city,s[0])).map(s=>city+' · '+s[0]));
  const total=Object.values(DATA).reduce((n,d)=>n+d.spots.length,0);
  $('v42PhotoAudit').innerHTML=`<strong>📷 관광명소 사진 출처 현황: ${total-missing.length}/${total}곳</strong> · 미확인 ${missing.length}곳.
  <details><summary>사진 출처 미확인 명소 ${missing.length}곳 보기</summary><p>${missing.map(safe).join(' · ')}</p></details>
  <small>v43 신규 원본 확인 ${V43_PHOTOS.length}곳 · 확인일 2026-10-24. 실제 외부 이미지 로딩은 별도 검증이 필요합니다.</small>`;
};

/* Distinguish saved vs unsaved changes; do not persist sensitive data automatically. */
let v43SavedSignature=null;
function v43Signature(){const x=snap();delete x.id;delete x.savedAt;return JSON.stringify(x)}
function v43SaveStatus(){
  const box=$('v43SaveStatus');if(!box)return;
  if(!loaded){box.className='v43-save-state v43-unsaved';box.textContent='● 새 여행계획 · 아직 브라우저에 저장하지 않았습니다.';return}
  const dirty=v43SavedSignature!==v43Signature();
  box.className='v43-save-state '+(dirty?'v43-unsaved':'v43-saved');
  box.textContent=dirty?'● 저장되지 않은 변경사항이 있습니다. 「현재 여행 브라우저에 저장」을 누르세요.':'✓ 현재 여행계획이 이 브라우저에 저장되어 있습니다.';
}
const v43OldSave=save;
save=function(){v43OldSave();if(loaded&&read().some(p=>p.id===loaded))v43SavedSignature=v43Signature();v43SaveStatus()};
const v43OldLoad=load;
load=function(x){v43OldLoad(x);v43SavedSignature=v43Signature();v43SaveStatus()};
function v43CopyPending(){
  const city=$('city').value,month=v42Month(),prefix=city+'|'+month+'|';
  const pending=v42PackItems().filter(x=>!v42PackChecks[prefix+x[0]]);
  const textLines=[`[${city} · ${month}월 여행 준비물]`,...pending.map(x=>'□ '+x[1]+' — '+x[2])];
  const textToCopy=textLines.join('\n');
  if(!pending.length){toast('맞춤 준비물을 모두 완료했습니다.');return}
  if(navigator.clipboard?.writeText)navigator.clipboard.writeText(textToCopy).then(()=>toast('미완료 준비물 '+pending.length+'개를 복사했습니다.')).catch(()=>window.prompt('아래 목록을 복사하세요.',textToCopy));
  else window.prompt('아래 목록을 복사하세요.',textToCopy);
}
function v43ConfirmSaved(){
  const stored=read().find(p=>p.id===loaded);
  if(stored){const copy={...stored};delete copy.id;delete copy.savedAt;
    if(JSON.stringify(copy)===v43Signature())v43SavedSignature=v43Signature();}
  v43SaveStatus();
}
function v43Init(){
  /* v42 registered direct onclick handlers before v43 was loaded; observe successful saves. */
  for(const id of ['saveTop','saveBottom'])$(id).addEventListener('click',()=>setTimeout(v43ConfirmSaved,0));
  $('v43CopyPending').addEventListener('click',v43CopyPending);
  document.querySelectorAll('[data-v43-filter]').forEach(b=>b.addEventListener('click',()=>{v43PackFilter=b.dataset.v43Filter;v42RenderPacking()}));
  /* v42 quickGo used to wipe packing checks even when creating the same plan. Keep existing state. */
  v42PhotoAudit();renderEntryGuide();v42RenderClimate();v42RenderPacking();
  v43SavedSignature=loaded?v43Signature():null;v43SaveStatus();
  document.addEventListener('input',()=>setTimeout(v43SaveStatus,0),true);
  document.addEventListener('change',()=>setTimeout(v43SaveStatus,0),true);
  document.addEventListener('click',()=>setTimeout(v43SaveStatus,0),true);
}
setTimeout(v43Init,10);
