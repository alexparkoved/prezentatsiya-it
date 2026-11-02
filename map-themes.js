'use strict';
/* Theme views clone the approved master artwork; they never own coordinates. */
(()=>{
 const editor=window.parkMapEditor,master=document.querySelector('.map-slide'),system=document.querySelector('.system-slide');
 const copy={
  series:['НАПРАВЛЕНИЯ ПАРКА','PARK DIRECTIONS','مجالات الحديقة'],
  foodTitle:['Вкус парка','A taste of the park','مذاق الحديقة'],
  foodSub:['Питание в парке · ресторан, фуд-парк и 14 фудтраков','Park dining · a restaurant, food park and 14 food trucks','الطعام في الحديقة · مطعم ومنطقة مطاعم و14 عربة طعام'],
  leisureTitle:['Энергия приключений','The energy of adventure','طاقة المغامرة'],
  leisureSub:['Развлечения','Entertainment','الترفيه'],
  supportTitle:['Команда за кадром','Behind the scenes','فريق خلف الكواليس'],
  supportSub:['Службы обеспечения · охрана, HR, инженерная служба и уборка','Park support · security, HR, engineering and cleaning','خدمات الدعم · الحراسة والموارد البشرية والهندسة والنظافة'],
  paymentTitle:['Платёжная система','One payment system','نظام دفع موحد'],
  foodPark:['Фуд-парк','Food park','منطقة المطاعم'],
  foodRestaurant:['Главный ресторан','Main restaurant','المطعم الرئيسي'],
  security:['Посты охраны','Security posts','نقاط الحراسة'],
  numbering:['Нумерация этого слайда','Numbers on this slide','ترقيم هذه الشريحة'],
  foodFooter:['ПИТАНИЕ В ПАРКЕ','PARK DINING','الطعام في الحديقة'],
  leisureFooter:['РАЗВЛЕЧЕНИЯ В ПАРКЕ','PARK ENTERTAINMENT','الترفيه في الحديقة'],
  supportFooter:['СЛУЖБЫ ОБЕСПЕЧЕНИЯ','PARK SUPPORT SERVICES','خدمات دعم الحديقة'],
  paymentFooter:['ПЛАТЁЖНАЯ СИСТЕМА','PAYMENT SYSTEM','نظام الدفع'],
  note:['* Возможны неточности в переводе.','* Translation may contain inaccuracies.','* قد توجد أخطاء في الترجمة.']
 };
 const language=()=>editor.getLanguage(),index=()=>({ru:0,en:1,ar:2}[language()]??1),t=key=>copy[key][index()];
 const defs=[
  {key:'food',part:1,title:'foodTitle',sub:'foodSub',footer:'foodFooter',ids:['restaurant','food',...Array.from({length:14},(_,i)=>'truck-'+(i+1))]},
  {key:'leisure',part:2,title:'leisureTitle',sub:'leisureSub',footer:'leisureFooter',ids:['rides','arcade','boats','karting','zoo','sports','amphitheatre','playground','w2']},
  {key:'support',part:4,title:'supportTitle',sub:'supportSub',footer:'supportFooter',ids:['hr','engineering','cleaning',...Array.from({length:13},(_,i)=>'guard-'+(i+1))]}
 ];
 function createMap(def){
  const section=master.cloneNode(true);section.classList.remove('active','editing-map');section.classList.add('theme-map','theme-'+def.key);section.dataset.theme=def.key;section.dataset.max='0';
  section.querySelectorAll('.map-editor-toolbar,.map-editor-status,.route-panel,#route-layer').forEach(el=>el.remove());
  section.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
  section.querySelector('.map-board').id='theme-map-'+def.key;
  section.querySelectorAll('[data-editor-id]').forEach(el=>{if(!def.ids.includes(el.dataset.editorId))el.remove();else{el.removeAttribute('hidden');el.classList.remove('selected');el.setAttribute('tabindex','-1');}});
  const subtitle=document.createElement('p');subtitle.className='theme-subtitle';section.querySelector('h2').after(subtitle);
  const legend=section.querySelector('.map-legend');legend.replaceChildren();
  const eyebrow=document.createElement('p');eyebrow.className='theme-legend-heading';legend.append(eyebrow);
  const list=document.createElement('ol');list.className='theme-legend-list';legend.append(list);
  ['click','pointerdown','pointerup','keydown','wheel'].forEach(type=>legend.addEventListener(type,e=>e.stopPropagation()));
  return {def,section,list};
 }
 const views=defs.map(createMap);
 const payment=system.cloneNode(true);payment.classList.remove('active');payment.classList.add('theme-payment-slide');payment.dataset.theme='payment';
 master.after(views[0].section,views[1].section,payment,views[2].section);
 const paymentTargets=['.node-cash','.node-entry','.node-attractions','.node-pos','.node-internal','.node-sports','.controller-node'];
 function text(section,selector,content,html=false){const el=section.querySelector(selector);if(el){if(html)el.innerHTML=content;else el.textContent=content;}}
 function paymentCopy(){
  const pageNumber=payment.querySelector('.page-no')?.textContent||'';
  payment.replaceChildren(...[...system.children].map(el=>el.cloneNode(true)));payment.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
  payment.querySelectorAll('.reveal').forEach(el=>el.classList.remove('seen'));
  const ru=language()==='ru';payment.classList.toggle('review-ru',ru);payment.dataset.name=t('paymentTitle');
  text(payment,'.eyebrow',t('series')+' / 03');
  text(payment,'h2',t('paymentTitle'));
  if(ru){
   const rows=[['.system-hub>p','ОДНА ОБЩАЯ СИСТЕМА'],['.system-hub h3','Система<br>управления<br>парком'],['.system-hub>span','Баланс · платежи · доступ'],
    ['.node-cash .micro','ВЫДАЧА · ПОПОЛНЕНИЕ · БИЛЕТЫ'],['.node-cash h3','<em>13</em> универсальных<br>касс'],['.node-cash p','Главный вход 10 + второй 3'],
    ['.node-entry .micro','ВХОД В ПАРК'],['.node-entry h3','Входные<br>турникеты'],['.node-entry p','Контроль входного билета'],
    ['.node-attractions .micro','ДОСТУП К АТТРАКЦИОНАМ'],['.node-attractions h3','Аттракционные<br>турникеты'],['.node-attractions p','Оплата и разрешение на проход'],
    ['.node-pos .micro','ОПЛАТА С БАЛАНСА'],['.node-pos h3','Оплата питания<br>и покупок'],['.node-pos p','Единый баланс на всех точках'],
    ['.node-internal .micro','ПОПОЛНЕНИЕ БАЛАНСА'],['.node-internal h3','<span class="purple-text">9</span> внутренних<br>точек пополнения'],['.node-internal p','Пополнение с помощью кассира'],
    ['.node-sports .proposed','ПРЕДЛАГАЕМАЯ ИНТЕГРАЦИЯ'],['.node-sports h3','Спортивный<br>комплекс'],['.node-sports p','Модель оплаты предстоит уточнить'],
    ['.controller-node h3','Контроллер'],['.system-carriers-caption','ЕДИНЫЙ БАЛАНС · КАРТА ИЛИ NFC-БРАСЛЕТ']];
   rows.forEach(([selector,content])=>text(payment,selector,content,true));
  }
  text(payment,'footer>span:first-child',t('paymentFooter')+' · 03 / 04');text(payment,'.translation-note',t('note'));
  text(payment,'.page-no',pageNumber);
  paymentTargets.forEach((selector,i)=>{const el=payment.querySelector(selector),number=document.createElement('span');number.className='payment-local-number';number.textContent=i+1;el.append(number);});
  const carrierNumber=document.createElement('span');carrierNumber.className='payment-local-number carrier-local-number';carrierNumber.textContent='8';payment.append(carrierNumber);
 }
 function label(point){return point.id==='restaurant'?t('foodRestaurant'):point.id==='food'?t('foodPark'):point.group==='trucks'?['food truck — ','Food truck — ','عربة طعام — '][index()]+point.label.replace(/^Фудтрак: |^Food truck: |^عربة طعام: /,''):point.label;}
 function localize(){
  const catalog=new Map(editor.getCatalog().map(p=>[p.id,p]));
  views.forEach(({def,section,list})=>{
   section.dataset.name=t(def.title);section.setAttribute('dir',language()==='ar'?'rtl':'ltr');section.setAttribute('lang',language());section.setAttribute('translate','no');
   text(section,'.eyebrow',t('series')+' / 0'+def.part);text(section,'h2',t(def.title));text(section,'.theme-subtitle',t(def.sub));text(section,'.theme-legend-heading',t('numbering'));
   text(section,'footer>span:first-child',t(def.footer)+' · 0'+def.part+' / 04');text(section,'.translation-note',t('note'));
   list.replaceChildren();
   def.ids.forEach((id,i)=>{const p=catalog.get(id);if(def.key==='support'&&p.group==='security'){if(id!=='guard-1')return;const row=document.createElement('li');row.className='theme-group-row';const num=document.createElement('span');num.className='catalog-number range-number';num.textContent='4–16';const name=document.createElement('span');name.textContent=t('security');row.append(num,name);list.append(row);return;}
    const row=document.createElement('li'),num=document.createElement('span'),name=document.createElement('span');row.dataset.themeLegendId=id;num.className='catalog-number';num.textContent=i+1;name.textContent=label(p);row.append(num,name);list.append(row);});
  });
  paymentCopy();serviceCopy();syncPositions();
 }
 function serviceCopy(){
  const service=document.querySelector('.service-slide');service.classList.add('with-routes');service.setAttribute('lang',language());service.setAttribute('translate','no');
  if(language()==='ru'){
   service.dataset.name='Одна карта. Кассы и маршруты';
   const rows=[['.eyebrow','КАРТА ГОСТЯ / СЕРВИС В ПАРКЕ'],['h2','Одна карта. <em>Весь парк.</em>'],
    ['.service-key>span:first-child','① КАССЫ ГЛАВНОГО И ВТОРОГО ВХОДОВ'],['.service-key>span:last-child','⊕ ПОПОЛНЕНИЕ В ПАРКЕ'],
    ['.service-stats article:nth-child(1) h3','Главный<br>вход'],['.service-stats article:nth-child(2) h3','Второй<br>вход'],['.service-stats article:nth-child(3) h3','Внутри<br>парка'],
    ['.service-stats article:nth-child(1) p','УНИВЕРСАЛЬНЫЕ КАССЫ'],['.service-stats article:nth-child(2) p','УНИВЕРСАЛЬНЫЕ КАССЫ'],['.service-stats article:nth-child(3) p','ТОЧКИ ПОПОЛНЕНИЯ'],
    ['.cashier-scene h3','Пополните карту. Продолжайте.'],['.cashier-scene p','Карта или NFC-браслет.<br>Помощь кассира на месте.'],
    ['.bottom-note','<strong>Пополнение баланса и входной билет — отдельные операции.</strong><br><span>Проверка баланса · Потеря карты · Возврат остатка — правила уточняются.</span>'],
    ['footer>span:first-child','КАССЫ И ПОПОЛНЕНИЕ НА ПРОТЯЖЕНИИ ВСЕГО ВИЗИТА'],
    ['.route-key>span:first-child','<i></i>ГЛАВНЫЙ ВХОД'],['.route-key>span:last-child','<i></i>ВТОРОЙ ВХОД']];
   rows.forEach(([selector,content])=>text(service,selector,content,true));
   service.querySelector('#route-layer').setAttribute('aria-label','Два маршрута гостя по парку');
  }else{
   text(service,'h2',language()==='ar'?'بطاقة واحدة. <em>الحديقة كلها.</em>':'One card. <em>Across the park.</em>',true);
  }
  window.parkRoutes.refreshCopy();
 }
 function syncPositions(){
  const catalog=new Map(editor.getCatalog().map(p=>[p.id,p]));
  views.forEach(({def,section})=>def.ids.forEach((id,i)=>{const p=catalog.get(id),el=section.querySelector('[data-editor-id="'+id+'"]');el.style.left=p.x+'%';el.style.top=p.y+'%';el.hidden=false;el.dataset.themeNumber=i+1;el.removeAttribute('data-map-number');el.title=(i+1)+'. '+label(p);el.setAttribute('aria-label',el.title);el.querySelector('.map-number,.revision-badge').textContent=i+1;}));
  const service=document.getElementById('service-map');
  service.querySelectorAll('.map-pin').forEach(el=>{const id=el.dataset.id.startsWith('service-')?el.dataset.id.replace('service-','topup-'):el.dataset.id,p=catalog.get(id);if(p){el.style.left=p.x+'%';el.style.top=p.y+'%';}});
  window.parkRoutes.updatePositions([...catalog.values()]);
 }
 document.addEventListener('parkmapchange',syncPositions);document.addEventListener('parklanguagechange',localize);
 localize();
 window.parkThemes={getViews:()=>views.map(({def})=>({key:def.key,part:def.part,ids:[...def.ids]})),sync:syncPositions};
})();
