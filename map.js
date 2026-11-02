'use strict';
(()=>{
 const data=window.PARK_MAP,ns='http://www.w3.org/2000/svg',i18n=window.parkI18n,t=i18n.t;
 const categories=new Map(data.legend.map(x=>[x.n,x.label]));
 function spritePosition(el,index){el.style.backgroundPosition=(index%3)*50+'% '+Math.floor(index/3)*50+'%';}
 window.applySprites=()=>document.querySelectorAll('[data-sprite]').forEach(el=>spritePosition(el,+el.dataset.sprite));
 function pin(host,p,options={}){
  const element=document.createElement('div');element.className='map-pin'+(options.small?' small':'')+(p.sprite===undefined&&!p.wheel?' no-model':'')+(options.step?' reveal':'');
  element.style.left=p.x+'%';element.style.top=p.y+'%';element.style.setProperty('--size',(p.size||30)+'px');
  if(options.step)element.dataset.step=options.step;
  element.dataset.id=p.id||'';i18n.bind(element,options.labelKey||(categories.has(p.n)?'legend.'+p.n:'a11y.location'),'aria-label',options.values);
  if(p.sprite!==undefined){const model=document.createElement('div');model.className='sprite';spritePosition(model,p.sprite);element.appendChild(model);}
  if(p.wheel){const image=document.createElement('img');image.src='assets/wheel.png';i18n.bind(image,'legend.11','alt');image.className='wheel-model';element.appendChild(image);}
  const number=document.createElement('span');number.className='map-number';number.textContent=options.number??p.n;element.appendChild(number);host.appendChild(element);return element;
 }
 const legend=document.getElementById('map-legend');
 data.legend.forEach(p=>{const li=document.createElement('li');if(p.note)li.className='has-note';const number=document.createElement('span');number.className='legend-number';number.textContent=p.n;li.appendChild(number);const text=document.createElement('div'),label=document.createElement('span');i18n.bind(label,'legend.'+p.n);text.appendChild(label);if(p.note){const note=document.createElement('small');i18n.bind(note,'legend.note.'+p.n);text.appendChild(note);}li.appendChild(text);legend.appendChild(li);});
 const main=document.querySelector('#main-map .map-pins');
 data.places.forEach(p=>pin(main,p));
 data.trucks.forEach(([x,y],i)=>pin(main,{id:'truck-'+(i+1),x,y,n:9,size:30,sprite:2},{small:true,labelKey:'a11y.truck',values:{n:i+1}}));
 data.topups.forEach(([x,y],i)=>pin(main,{id:'topup-'+(i+1),x,y,n:10,size:27,sprite:0},{small:true,labelKey:'a11y.topup',values:{n:i+1}}));
 const service=document.querySelector('#service-map .map-pins');
 data.places.filter(p=>['main','second'].includes(p.id)).forEach((p,i)=>pin(service,{...p,size:53},{step:i+1,number:i===0?10:3,labelKey:i===0?'a11y.mainDesks':'a11y.secondDesks'}));
 data.topups.forEach(([x,y],i)=>pin(service,{id:'service-'+(i+1),x,y,size:31,sprite:0},{small:true,step:3,number:'+',labelKey:'a11y.internal',values:{n:i+1}}));
 const wheel=data.places.find(p=>p.wheel);const w=pin(service,{...wheel,size:48},{number:'11'});w.querySelector('.map-number').remove();
 window.applySprites();
 const layer=document.getElementById('route-layer'),title=document.getElementById('route-title'),caption=document.getElementById('route-caption'),status=document.getElementById('route-status');
 function make(tag,attrs,parent){const el=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));(parent||layer).appendChild(el);return el;}
 function path(points){return points.map(([x,y],i)=>(i?'L':'M')+(x*10).toFixed(2)+' '+(y*5.625).toFixed(2)).join(' ');}
 const groups=data.routes.map((r,i)=>{const group=make('g',{class:'guest-route','data-route':i+1});group.style.setProperty('--route-color',r.color);
  const paths=r.legs.map(points=>{const d=path(points);return {halo:make('path',{d,class:'route-halo',pathLength:1},group),ink:make('path',{d,class:'route-ink',pathLength:1},group)};});
  const head=make('g',{class:'route-traveller'},group);make('circle',{r:8,class:'route-head'},head);return {group,paths,head};});
 let current=-1,currentLeg=0,token=0,animations=[],raf=0,timer=0,completed=[false,false];
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 const legDuration=2100,pause=250;
 function cancel(){token++;cancelAnimationFrame(raf);clearTimeout(timer);animations.forEach(a=>a.cancel());animations=[];completed=[false,false];groups.forEach(g=>{g.group.classList.remove('playing','complete');g.paths.forEach(p=>{p.ink.style.strokeDashoffset='1';p.halo.style.strokeDashoffset='1';});});}
 function complete(index){const g=groups[index];g.paths.forEach(p=>{p.ink.style.strokeDashoffset='0';p.halo.style.strokeDashoffset='0';});g.group.classList.remove('playing');g.group.classList.add('complete');completed[index]=true;}
 function routeCopy(){
  if(window.parkMapEditor?.getLanguage()==='ru'){
   const names={main:'Главный вход',second:'Второй вход',arcade:'Аркадный центр',rides:'Аттракционы',food:'Фуд-парк',playground:'Детская площадка',restaurant:'Ресторан',boats:'Лодки',zoo:'Зоопарк'};
   if(current<=0){title.textContent='ДВА МАРШРУТА ГОСТЯ';caption.textContent='После касс и пополнения — два примера прогулки по парку.';status.textContent='ОРАНЖЕВЫЙ · ГОЛУБОЙ';return;}
   const i=current-1,r=data.routes[i],done=completed[i];title.textContent=done&&i===1?'ОБА МАРШРУТА ГОСТЯ':(i===0?'МАРШРУТ 1 · ГЛАВНЫЙ ВХОД':'МАРШРУТ 2 · ВТОРОЙ ВХОД');
   caption.textContent=r.ids.map(id=>names[id]).join(' → ');status.textContent=done?(i===0?'ПЕРВЫЙ МАРШРУТ ПОКАЗАН':'ОБА МАРШРУТА ПОКАЗАНЫ'):'ДАЛЕЕ: '+names[r.ids[currentLeg+1]].toUpperCase();return;
  }
  if(current<=0){title.textContent=t('route.readyTitle');caption.textContent=t('route.readyCaption');status.textContent=t('route.ready');return;}
  const index=current-1,r=data.routes[index],done=completed[index];
  title.textContent=done&&index===1?t('route.completeTitle'):t(index===0?'route.one':'route.two')+' · '+t(index===0?'route.main':'route.second');
  caption.textContent=done&&index===1?t('route.completeCaption'):r.ids.map(id=>t('legend.'+data.places.find(p=>p.id===id).n)).join(i18n.getLanguage()==='ar'?' ← ':' → ');
  status.textContent=done?t(index===0?'route.oneComplete':'route.bothComplete'):t('route.next',{place:t('legend.'+data.places.find(p=>p.id===r.ids[currentLeg+1]).n).toUpperCase()});
 }
 async function runLeg(index,leg,t){if(t!==token)return;const g=groups[index],r=data.routes[index];
  if(leg>=g.paths.length){complete(index);routeCopy();return;}
  currentLeg=leg;routeCopy();const p=g.paths[leg],duration=reduced()?1:legDuration;
  const a=p.ink.animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration,easing:'linear',fill:'forwards'}),h=p.halo.animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration,easing:'linear',fill:'forwards'});animations.push(a,h);
  const length=p.ink.getTotalLength(),start=performance.now();function move(now){if(t!==token)return;const k=Math.min(1,(now-start)/duration),pt=p.ink.getPointAtLength(length*k);g.head.setAttribute('transform','translate('+pt.x+' '+pt.y+')');if(k<1)raf=requestAnimationFrame(move);}raf=requestAnimationFrame(move);
  try{await a.finished;}catch{return;}if(t!==token)return;timer=setTimeout(()=>runLeg(index,leg+1,t),reduced()?0:pause);
 }
 function setPhase(value,force=false){value=Math.max(0,Math.min(2,value));if(value===current&&!force)return;cancel();current=value;groups.forEach((g,i)=>g.group.classList.toggle('shown',value===2||value===i+1));
  if(value===0){routeCopy();return;}
  if(value===2)complete(0);const g=groups[value-1];g.group.classList.add('playing');runLeg(value-1,0,token);
 }
 let positionStamp='';
 function updatePositions(positions){
  const lookup=new Map(positions.map(p=>[p.id,p]));const stamp=data.places.map(p=>{const q=lookup.get(p.id)||p;return p.id+':'+q.x+','+q.y;}).join('|');if(stamp===positionStamp)return;positionStamp=stamp;
  data.routes.forEach((r,i)=>r.legs.forEach((original,j)=>{const from=lookup.get(r.ids[j])||data.places.find(p=>p.id===r.ids[j]),to=lookup.get(r.ids[j+1])||data.places.find(p=>p.id===r.ids[j+1]),start=original[0],end=original.at(-1);
   const lengths=[0];original.slice(1).forEach((p,k)=>lengths.push(lengths.at(-1)+Math.hypot(p[0]-original[k][0],p[1]-original[k][1])));const total=lengths.at(-1)||1;
   const points=original.map(([x,y],k)=>{const t=lengths[k]/total;return [x+(from.x-start[0])*(1-t)+(to.x-end[0])*t,y+(from.y-start[1])*(1-t)+(to.y-end[1])*t];});const d=path(points);groups[i].paths[j].ink.setAttribute('d',d);groups[i].paths[j].halo.setAttribute('d',d);
  }));setPhase(current,true);
 }
 window.parkRoutes={setPhase,reset:()=>setPhase(0),replay:(phase=current)=>setPhase(phase,true),refreshCopy:routeCopy,updatePositions,durationFor:phase=>phase?6*(legDuration+pause):0,getState:()=>({phase:current,completed:[...completed],routes:data.routes.map(r=>({name:r.name,color:r.color,ids:r.ids})),ready:true})};
 window.parkMap={getPositions:()=>structuredClone(data.places),getServicePoints:()=>structuredClone(data.topups)};
 document.addEventListener('parklanguagechange',routeCopy);
 setPhase(0);
})();
