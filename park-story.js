'use strict';
/* Compose the final eight slides after maps and historical templates initialize. */
(()=>{
 const content=window.PARK_CONTENT,stage=document.getElementById('stage'),cover=document.querySelector('.cover');
 const main=document.querySelector('.map-slide:not(.theme-map)'),food=document.querySelector('.theme-food'),leisure=document.querySelector('.theme-leisure'),support=document.querySelector('.theme-support'),service=document.querySelector('.service-slide'),management=document.querySelector('.theme-payment-slide');
 const header='<header><span class="eyebrow"></span><img class="brand" src="assets/brand.png" alt="Benghazi Park"></header>';
 const footer='<footer><span></span><span class="page-no"></span></footer><p class="translation-note"></p>';
 cover.className='slide cover park-intro';cover.dataset.max='0';
 cover.innerHTML=header+'<div class="story-halo" aria-hidden="true"></div><img class="park-intro-art" src="assets/park-girl-intro.png" alt=""><h1></h1><p class="story-lead"></p><p class="story-vision"></p><svg class="story-links" viewBox="0 0 1600 900" aria-hidden="true"><path d="M450 500Q510 500 565 465M1150 360Q1095 365 1065 400M450 655H555M1150 655Q1090 645 1060 600M450 790Q515 795 590 750"/></svg><div class="story-directions"></div>'+footer;
 const ending=document.createElement('section');ending.className='slide closing park-finale';ending.dataset.max='0';
 ending.innerHTML=header+'<div class="finale-rings" aria-hidden="true"></div><img class="park-family-art" src="assets/park-family-five-children.png" alt=""><h1></h1><p class="finale-lead"></p><p class="finale-promise"></p>'+footer;
 const order=[cover,main,food,leisure,support,service,management,ending];
 [...stage.querySelectorAll('.slide')].filter(el=>!order.includes(el)).forEach(el=>el.remove());order.forEach(el=>stage.append(el));
 function localize(){
  const language=window.parkI18n.getLanguage(),copy=content.editions[language],rtl=language==='ar';
  document.body.classList.add('park-story','audience-edition');document.documentElement.lang=language;document.documentElement.dir=rtl?'rtl':'ltr';document.title=copy.title;
  order.forEach((el,i)=>{el.lang=language;el.dir=rtl?'rtl':'ltr';el.dataset.name=copy.names[i];el.setAttribute('translate','no');el.querySelectorAll('.translation-note').forEach(note=>note.textContent=copy.note);el.querySelector('.eyebrow').textContent=rtl?'حديقة بنغازي / '+copy.topics[i]:'BENGHAZI PARK / '+copy.topics[i];el.querySelector('footer>span:first-child').textContent=i===0||i===7?copy.footer:rtl?'حديقة بنغازي · '+copy.topics[i]:'BENGHAZI PARK · '+copy.topics[i];});
  cover.querySelector('h1').innerHTML=copy.intro.title;cover.querySelector('.story-lead').textContent=copy.intro.lead;cover.querySelector('.story-vision').textContent=copy.intro.vision;cover.querySelector('.park-intro-art').alt=copy.girlAlt;
  const directions=cover.querySelector('.story-directions');directions.replaceChildren();copy.intro.directions.forEach((p,i)=>{const el=document.createElement('article');el.className='story-direction direction-'+(i+1);const num=document.createElement('span');num.className='story-number';num.textContent='0'+(i+1);const h=document.createElement('h3');h.textContent=p.title;const text=document.createElement('p');text.textContent=p.text;el.append(num,h,text);directions.append(el);});
  ending.querySelector('h1').innerHTML=copy.ending.title;ending.querySelector('.finale-lead').textContent=copy.ending.lead;ending.querySelector('.finale-promise').textContent=copy.ending.promise;ending.querySelector('.park-family-art').alt=copy.familyAlt;
  management.querySelector('h2').textContent=copy.management;
  document.getElementById('future-toggle').hidden=true;
 }
 document.addEventListener('parklanguagechange',localize);localize();
 window.parkStory={russianReview:false,slideCount:8,refresh:localize,getOrder:()=>order.map(el=>el.dataset.name)};
})();
