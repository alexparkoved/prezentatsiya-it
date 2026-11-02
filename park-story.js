'use strict';
/* Assemble the owner's park narrative after the source templates are initialized. */
(()=>{
 const content=window.PARK_CONTENT,stage=document.getElementById('stage'),cover=document.querySelector('.cover');
 const main=document.querySelector('.map-slide:not(.theme-map)'),food=document.querySelector('.theme-food'),leisure=document.querySelector('.theme-leisure'),support=document.querySelector('.theme-support'),service=document.querySelector('.service-slide'),management=document.querySelector('.theme-payment-slide');
 const header='<header><span class="eyebrow">BENGHAZI PARK / ПАРК ДЛЯ ЛЮДЕЙ</span><img class="brand" src="assets/brand.png" alt="Benghazi Park"></header>';
 const footer='<footer><span>BENGHAZI PARK · НОВОЕ ДЫХАНИЕ ГОРОДА</span><span class="page-no"></span></footer><p class="translation-note"></p>';
 cover.className='slide cover park-intro';cover.dataset.max='0';cover.dataset.name='Новое дыхание Бенгази';
 cover.innerHTML=header+'<div class="story-halo" aria-hidden="true"></div><img class="park-intro-art" src="assets/park-girl-intro.png" alt="Знакомая девочка Бенгази парка с оранжевой заколкой">'+
  '<h1>'+content.intro.title+'</h1><p class="story-lead"></p><p class="story-vision"></p><svg class="story-links" viewBox="0 0 1600 900" aria-hidden="true"><path d="M505 352Q557 350 600 385M1100 366Q1060 370 1015 400M505 535H565M1100 600Q1060 590 1030 570M505 710Q570 715 640 685"/></svg><div class="story-directions"></div><p class="story-audience"></p><p class="story-park"></p>'+footer;
 const directions=cover.querySelector('.story-directions');content.intro.directions.forEach((p,i)=>{const el=document.createElement('article');el.className='story-direction direction-'+(i+1);const num=document.createElement('span');num.className='story-number';num.textContent='0'+(i+1);const h=document.createElement('h3');h.textContent=p.title;const text=document.createElement('p');text.textContent=p.text;el.append(num,h,text);directions.append(el);});
 for(const [selector,key] of [['.story-lead','lead'],['.story-vision','vision'],['.story-audience','audience'],['.story-park','park']])cover.querySelector(selector).textContent=content.intro[key];
 const ending=document.createElement('section');ending.className='slide closing park-finale';ending.dataset.name='Счастье в глазах';ending.dataset.max='0';
 ending.innerHTML=header+'<div class="finale-rings" aria-hidden="true"></div><img class="park-family-art" src="assets/park-family-five-children.png" alt="Два родителя и пять разных детей, включая девочку с оранжевой заколкой"><h1>'+content.ending.title+'</h1><p class="finale-lead"></p><p class="finale-promise"></p>'+footer;
 ending.querySelector('.finale-lead').textContent=content.ending.lead;ending.querySelector('.finale-promise').textContent=content.ending.promise;
 const order=[cover,main,food,leisure,support,service,management,ending];
 const removed=[...stage.querySelectorAll('.slide')].filter(el=>!order.includes(el));removed.forEach(el=>el.remove());order.forEach(el=>stage.append(el));
 function polish(){
  document.body.classList.add('park-story');
  document.documentElement.lang='ru';document.documentElement.dir='ltr';document.title=content.title;
  order.forEach(el=>{el.lang='ru';el.dir='ltr';el.setAttribute('translate','no');el.querySelectorAll('.translation-note').forEach(note=>note.textContent=content.note);});
  for(const [section,topic] of [[main,'КАРТА ПАРКА'],[food,'ПИТАНИЕ'],[leisure,'РАЗВЛЕЧЕНИЯ'],[support,'СЛУЖБЫ ОБЕСПЕЧЕНИЯ'],[service,'IT-ИНФРАСТРУКТУРА'],[management,'СИСТЕМА УПРАВЛЕНИЯ']]){
   section.querySelector('.eyebrow').textContent='BENGHAZI PARK / '+topic;section.querySelector('footer>span:first-child').textContent='BENGHAZI PARK · '+topic;
  }
  management.dataset.name='Система управления парком';management.querySelector('h2').textContent='Система управления парком';
  main.dataset.name='Карта всего парка';
  document.getElementById('help').textContent=content.ui['ui.help'];document.getElementById('next').textContent=content.ui['ui.next'];document.getElementById('play').textContent=content.ui['ui.play'];
  document.getElementById('future-toggle').hidden=true;document.getElementById('language-toggle').hidden=true;
 }
 const originalT=window.parkI18n.t;window.parkI18n.t=(key,values)=>content.ui[key]??originalT(key,values);
 document.addEventListener('parklanguagechange',polish);polish();
 window.parkStory={russianReview:true,slideCount:8,refresh:polish,getOrder:()=>order.map(el=>el.dataset.name)};
})();
