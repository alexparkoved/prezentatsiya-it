'use strict';
/* Draft map overlay. Original source pixels and editable render coordinates stay separate. */
(()=>{
 const slide=document.querySelector('.map-slide'),board=document.getElementById('main-map'),host=board.querySelector('.map-pins');
 const review=new URLSearchParams(location.search).get('map-review')==='ru',key='benghazi-map-revision-v1';
 const points=structuredClone(window.MAP_REVISION.points),base=window.PARK_MAP.places;
 let editing=false,selected=null,storageError=false;
 const words={
 title:['Карта парка: объекты и службы','Park map: places and services','خريطة الحديقة: المرافق والخدمات'],
 draft:['Черновик • позиции на проверку','Draft • positions for review','مسودة • المواقع قيد المراجعة'],
 edit:['Двигать метки','Move markers','تحريك العلامات'],done:['Завершить','Done','تم'],
 save:['Сохранить в браузере','Save in browser','حفظ في المتصفح'],copy:['Копировать JSON','Copy JSON','نسخ JSON'],export:['Экспорт JSON','Export JSON','تصدير JSON'],
 import:['Загрузить JSON','Import JSON','استيراد JSON'],saved:['Сохранено в этом браузере','Saved in this browser','تم الحفظ في هذا المتصفح'],
 failed:['Не удалось сохранить. Экспортируйте JSON.','Could not save. Export JSON.','تعذّر الحفظ. صدّر JSON.'],
 copied:['JSON скопирован','JSON copied','تم نسخ JSON'],imported:['Координаты загружены','Coordinates imported','تم استيراد الإحداثيات'],
 bad:['Неверный файл координат','Invalid coordinates file','ملف إحداثيات غير صالح'],
 objects:['Объекты','Places','المرافق'],trucks:['Фудтраки — 14','Food trucks — 14','عربات الطعام — 14'],topups:['Пополнение — 9','Top-up — 9','نقاط الشحن — 9'],security:['Охрана — 12','Security — 12','الحراسة — 12'],vip:['VIP — 1','VIP — 1','VIP — 1'],services:['Службы и площадки','Services and areas','الخدمات والساحات'],
 hint:['Перетащите метку. Стрелки: точный сдвиг выбранной метки. JSON хранит исходные пиксели и новые проценты отдельно.','Drag a marker. Arrow keys fine-tune the selected marker. JSON keeps source pixels separate from render percentages.','اسحب العلامة. استخدم الأسهم لضبط العلامة المحددة. يحفظ JSON بكسلات المصدر منفصلة عن نسب العرض.'],
 rides:['Аттракционы (19 аттракционов: 7 больших и 12 маленьких)','Attractions (19 rides: 7 large and 12 small)','الملاهي (19 لعبة: 7 كبيرة و12 صغيرة)']};
 const lang=()=>review?0:window.parkI18n.getLanguage()==='ar'?2:1,t=k=>words[k][lang()];
 const names=[['Главный вход','Second'],['Второй вход'],['Игровой центр'],['Фудкорт'],['Картинг'],['Лодки'],['Стадион'],['Ресторан'],[],[],[],['Зоопарк'],['Детская площадка']];
 const originals=[...host.children].filter(el=>!el.classList.contains('small'));
 [...host.querySelectorAll('.small')].forEach(el=>el.remove());
 originals.forEach(el=>{el.dataset.group='objects';const p=base.find(p=>p.id===el.dataset.id);el.dataset.editorId=p.id;});
 const all=[...base.map(p=>({id:p.id,group:'objects',x:p.x,y:p.y,labels:[names[p.n-1]?.[0]||'',window.parkI18n.t('legend.'+p.n),''],status:'existing-approved-render'})),...points];
 const nodes=new Map(originals.map(el=>[el.dataset.id,el]));
 points.forEach(p=>{const el=document.createElement('button');el.type='button';el.className='revision-pin';el.dataset.group=p.group;el.dataset.editorId=p.id;
  const model=document.createElement('span');model.className='revision-model';model.setAttribute('aria-hidden','true');
  if(p.group==='trucks'||p.group==='topups'){model.classList.add('sprite');model.style.backgroundPosition=p.group==='trucks'?'100% 0%':'0% 0%';}
  else{model.innerHTML='<svg viewBox="0 0 60 60"><ellipse cx="31" cy="53" rx="24" ry="5" fill="#263d3425"/><path d="M12 24 36 15 49 23 26 33Z" fill="#e8d6b8"/><path d="M12 24 26 33 26 53 12 44Z" fill="#a9bca5"/><path d="M26 33 49 23 49 43 26 53Z" fill="#e2e4ca"/><path d="M9 23 34 11 53 22 27 35Z" fill="#315f53"/><path d="M9 23 27 35 27 39 9 27Z" fill="#23473e"/><path d="M27 35 53 22 53 27 27 39Z" fill="#427867"/><path d="M32 37 43 32 43 42 32 47Z" fill="#72a9a3"/><path d="M16 32 22 36 22 44 16 40Z" fill="#608985"/></svg>';}
  const badge=document.createElement('span');badge.className='revision-badge';badge.textContent=p.group==='security'?'◆'+p.number:p.group==='topups'?'+'+p.number:p.number;el.append(model,badge);host.append(el);nodes.set(p.id,el);});
 const bar=document.createElement('div');bar.className='map-editor-toolbar';bar.dataset.mapEditor='true';slide.append(bar);
 const title=slide.querySelector('h2'),legend=slide.querySelector('.map-legend'),status=document.createElement('p');status.className='map-editor-status';slide.append(status);
 const buttons={};['edit','save','copy','export','import'].forEach(action=>{const b=document.createElement('button');b.type='button';bar.append(b);buttons[action]=b;});
 const input=document.createElement('input');input.type='file';input.accept='application/json,.json';input.hidden=true;bar.append(input);
 const filters=document.createElement('div');filters.className='map-group-filters';bar.append(filters);
 const enabled=new Set(['objects','trucks','topups','services','security','vip']);
 const filterLabels=[];
 enabled.forEach(group=>{const label=document.createElement('label'),check=document.createElement('input'),text=document.createElement('span');check.type='checkbox';check.checked=true;label.append(check,text);filters.append(label);filterLabels.push([text,group]);check.onchange=()=>{check.checked?enabled.add(group):enabled.delete(group);draw();};});
 const notice=msg=>status.textContent=msg;
 function serialize(){return {schema:'benghazi-map-layout',version:1,sourceFrame:window.MAP_REVISION.sourceFrame,coordinateFrame:'percent-of-main-map-board',placementStatus:'draft-owner-review',points:all.map(({id,group,x,y,status,source})=>({id,group,x,y,status,source}))};}
 function apply(data){
  if(data?.schema!=='benghazi-map-layout'||data.version!==1||data.points?.length!==all.length)throw Error('Invalid layout');
  const ids=new Set();data.points.forEach(p=>{if(!nodes.has(p.id)||ids.has(p.id)||!Number.isFinite(p.x)||!Number.isFinite(p.y)||p.x<0||p.x>100||p.y<0||p.y>100)throw Error('Invalid point');ids.add(p.id);});
  data.points.forEach(p=>{const target=all.find(q=>q.id===p.id);target.x=p.x;target.y=p.y;});
 }
 try{const saved=localStorage.getItem(key);if(saved)apply(JSON.parse(saved));}catch{storageError=true;}
 function draw(){
  all.forEach(p=>{const el=nodes.get(p.id);el.style.left=p.x+'%';el.style.top=p.y+'%';el.hidden=!enabled.has(p.group);el.classList.toggle('selected',p.id===selected);el.setAttribute('tabindex',editing?'0':'-1');
   let label=p.labels[lang()];if(p.group==='objects')label=p.id==='rides'?t('rides'):review?p.labels[0]:window.parkI18n.t('legend.'+base.find(q=>q.id===p.id).n);
   el.title=label;el.setAttribute('aria-label',label);if(p.group==='services')el.querySelector('.revision-badge').textContent=label;
  });
  slide.classList.toggle('editing-map',editing);buttons.edit.textContent=t(editing?'done':'edit');buttons.edit.setAttribute('aria-pressed',String(editing));
 }
 function copy(){return JSON.stringify(serialize(),null,2);}
 buttons.edit.onclick=()=>{window.presentation?.stop();editing=!editing;notice(editing?t('hint'):t('draft'));draw();};
 buttons.save.onclick=()=>{try{localStorage.setItem(key,copy());notice(t('saved'));}catch{notice(t('failed'));}};
 buttons.copy.onclick=async()=>{try{await navigator.clipboard.writeText(copy());notice(t('copied'));}catch{notice(t('failed'));}};
 buttons.export.onclick=()=>{const url=URL.createObjectURL(new Blob([copy()],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='benghazi-map-layout.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);};
 buttons.import.onclick=()=>input.click();input.onchange=async()=>{try{apply(JSON.parse(await input.files[0].text()));draw();notice(t('imported'));}catch{notice(t('bad'));}input.value='';};
 ['click','pointerdown','pointerup','pointercancel','keydown'].forEach(type=>bar.addEventListener(type,e=>e.stopPropagation()));
 let drag=null;
 host.addEventListener('pointerdown',e=>{if(!editing)return;const el=e.target.closest('[data-editor-id]');if(!el)return;e.preventDefault();e.stopPropagation();selected=el.dataset.editorId;el.focus();const p=all.find(p=>p.id===selected);drag={p,el,pointerId:e.pointerId,startX:e.clientX,startY:e.clientY,x:p.x,y:p.y};el.setPointerCapture(e.pointerId);draw();});
 host.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.pointerId)return;e.preventDefault();e.stopPropagation();const rect=board.getBoundingClientRect();drag.p.x=Math.max(0,Math.min(100,drag.x+(e.clientX-drag.startX)*100/rect.width));drag.p.y=Math.max(0,Math.min(100,drag.y+(e.clientY-drag.startY)*100/rect.height));draw();});
 function end(e){if(!editing)return;e.stopPropagation();if(drag){if(e.type==='pointercancel'){drag.p.x=drag.x;drag.p.y=drag.y;}drag=null;draw();}}
 host.addEventListener('pointerup',end);host.addEventListener('pointercancel',end);
 host.addEventListener('click',e=>{if(editing){e.preventDefault();e.stopPropagation();}});
 host.addEventListener('keydown',e=>{if(!editing)return;e.stopPropagation();const p=all.find(p=>p.id===selected);if(!p)return;const delta=e.shiftKey?1:.1;const v={ArrowLeft:[-delta,0],ArrowRight:[delta,0],ArrowUp:[0,-delta],ArrowDown:[0,delta]}[e.key];if(v){e.preventDefault();p.x=Math.max(0,Math.min(100,p.x+v[0]));p.y=Math.max(0,Math.min(100,p.y+v[1]));draw();}});
 function localize(){
  if(review){slide.setAttribute('dir','ltr');slide.querySelector('.eyebrow').textContent='БЕНГАЗИ / КАРТА ПАРКА';}
  title.textContent=t('title');Object.keys(buttons).forEach(k=>buttons[k].textContent=t(k));filterLabels.forEach(([el,k])=>el.textContent=t(k));
  legend.replaceChildren();const list=document.createElement('ol');legend.append(list);
  window.PARK_MAP.legend.filter(p=>![9,10].includes(p.n)).forEach(p=>{const li=document.createElement('li');li.textContent=p.n+' · '+(p.n===11?t('rides'):review?names[p.n-1]?.[0]:window.parkI18n.t('legend.'+p.n));list.append(li);});
  ['trucks','topups','security','vip'].forEach(k=>{const li=document.createElement('li');li.className='group-key '+k;li.textContent=t(k);list.append(li);});
  notice(storageError?t('failed'):t('draft'));draw();
 }
 document.addEventListener('parklanguagechange',localize);localize();
 window.parkMapEditor={serialize,setEditing:value=>{editing=!!value;draw();},getState:()=>({editing,selected,counts:Object.fromEntries([...enabled].map(g=>[g,all.filter(p=>p.group===g).length]))})};
})();
