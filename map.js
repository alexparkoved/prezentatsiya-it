'use strict';
(()=>{
 const data=window.PARK_MAP,ns='http://www.w3.org/2000/svg';
 const categories=new Map(data.legend.map(x=>[x.n,x.label]));
 const labels=Object.fromEntries(data.places.map(x=>[x.id,categories.get(x.n)]));
 function spritePosition(el,index){el.style.backgroundPosition=(index%3)*50+'% '+Math.floor(index/3)*50+'%';}
 window.applySprites=()=>document.querySelectorAll('[data-sprite]').forEach(el=>spritePosition(el,+el.dataset.sprite));
 function pin(host,p,options={}){
  const element=document.createElement('div');element.className='map-pin'+(options.small?' small':'')+(p.sprite===undefined&&!p.wheel?' no-model':'')+(options.step?' reveal':'');
  element.style.left=p.x+'%';element.style.top=p.y+'%';element.style.setProperty('--size',(p.size||30)+'px');
  if(options.step)element.dataset.step=options.step;
  element.dataset.id=p.id||'';element.setAttribute('aria-label',options.label||categories.get(p.n)||'Park location');
  if(p.sprite!==undefined){const model=document.createElement('div');model.className='sprite';spritePosition(model,p.sprite);element.appendChild(model);}
  if(p.wheel){const image=document.createElement('img');image.src='assets/wheel.png';image.alt='Ferris wheel in the attraction complex';image.className='wheel-model';element.appendChild(image);}
  const number=document.createElement('span');number.className='map-number';number.textContent=options.number??p.n;element.appendChild(number);host.appendChild(element);return element;
 }
 const legend=document.getElementById('map-legend');
 data.legend.forEach(p=>{const li=document.createElement('li');if(p.note)li.className='has-note';li.innerHTML='<span class="legend-number">'+p.n+'</span><div>'+p.label+(p.note?'<small>'+p.note+'</small>':'')+'</div>';legend.appendChild(li);});
 const main=document.querySelector('#main-map .map-pins');
 data.places.forEach(p=>pin(main,p));
 data.trucks.forEach(([x,y],i)=>pin(main,{id:'truck-'+(i+1),x,y,n:9,size:30,sprite:2},{small:true,label:'Food truck '+(i+1)}));
 data.topups.forEach(([x,y],i)=>pin(main,{id:'topup-'+(i+1),x,y,n:10,size:27,sprite:0},{small:true,label:'Top-up service point '+(i+1)}));
 const service=document.querySelector('#service-map .map-pins');
 data.places.filter(p=>['main','second'].includes(p.id)).forEach((p,i)=>pin(service,{...p,size:53},{step:i+1,number:i===0?10:3,label:(i===0?'Main entrance: 10':'Second entrance: 3')+' universal cash desks'}));
 data.topups.forEach(([x,y],i)=>pin(service,{id:'service-'+(i+1),x,y,size:31,sprite:0},{small:true,step:3,number:'+',label:'Internal top-up point '+(i+1)}));
 const wheel=data.places.find(p=>p.wheel);const w=pin(service,{...wheel,size:48},{number:'11'});w.querySelector('.map-number').remove();
 window.applySprites();
 const layer=document.getElementById('route-layer'),title=document.getElementById('route-title'),caption=document.getElementById('route-caption'),status=document.getElementById('route-status');
 function make(tag,attrs,parent){const el=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));(parent||layer).appendChild(el);return el;}
 function path(points){return points.map(([x,y],i)=>(i?'L':'M')+(x*10).toFixed(2)+' '+(y*5.625).toFixed(2)).join(' ');}
 const groups=data.routes.map((r,i)=>{const group=make('g',{class:'guest-route','data-route':i+1});group.style.setProperty('--route-color',r.color);
  const paths=r.legs.map(points=>{const d=path(points);return {halo:make('path',{d,class:'route-halo',pathLength:1},group),ink:make('path',{d,class:'route-ink',pathLength:1},group)};});
  const head=make('g',{class:'route-traveller'},group);make('circle',{r:8,class:'route-head'},head);return {group,paths,head};});
 let current=-1,token=0,animations=[],raf=0,timer=0,completed=[false,false];
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 const legDuration=2100,pause=250;
 function cancel(){token++;cancelAnimationFrame(raf);clearTimeout(timer);animations.forEach(a=>a.cancel());animations=[];completed=[false,false];groups.forEach(g=>{g.group.classList.remove('playing','complete');g.paths.forEach(p=>{p.ink.style.strokeDashoffset='1';p.halo.style.strokeDashoffset='1';});});}
 function complete(index){const g=groups[index];g.paths.forEach(p=>{p.ink.style.strokeDashoffset='0';p.halo.style.strokeDashoffset='0';});g.group.classList.remove('playing');g.group.classList.add('complete');completed[index]=true;}
 async function runLeg(index,leg,t){if(t!==token)return;const g=groups[index],r=data.routes[index];
  if(leg>=g.paths.length){complete(index);status.textContent=index===0?'ROUTE 1 COMPLETE · CLICK FOR ROUTE 2':'BOTH ROUTES COMPLETE';if(index===1){title.textContent='TWO COMPLETE GUEST JOURNEYS';caption.textContent='Orange: main entrance · Light blue: quiet second entrance';}return;}
  status.textContent='NEXT: '+labels[r.ids[leg+1]].toUpperCase();const p=g.paths[leg],duration=reduced()?1:legDuration;
  const a=p.ink.animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration,easing:'linear',fill:'forwards'}),h=p.halo.animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration,easing:'linear',fill:'forwards'});animations.push(a,h);
  const length=p.ink.getTotalLength(),start=performance.now();function move(now){if(t!==token)return;const k=Math.min(1,(now-start)/duration),pt=p.ink.getPointAtLength(length*k);g.head.setAttribute('transform','translate('+pt.x+' '+pt.y+')');if(k<1)raf=requestAnimationFrame(move);}raf=requestAnimationFrame(move);
  try{await a.finished;}catch{return;}if(t!==token)return;timer=setTimeout(()=>runLeg(index,leg+1,t),reduced()?0:pause);
 }
 function setPhase(value,force=false){value=Math.max(0,Math.min(2,value));if(value===current&&!force)return;cancel();current=value;groups.forEach((g,i)=>g.group.classList.toggle('shown',value===2||value===i+1));
  if(value===0){title.textContent='TWO GUEST JOURNEYS';caption.textContent='Click: guest 1 · Click again: guest 2';status.textContent='READY TO EXPLORE';return;}
  if(value===2)complete(0);const r=data.routes[value-1],g=groups[value-1];title.textContent=r.name+' · '+r.entrance;caption.textContent=r.ids.map(id=>labels[id]).join(' → ');g.group.classList.add('playing');runLeg(value-1,0,token);
 }
 window.parkRoutes={setPhase,reset:()=>setPhase(0),replay:(phase=current)=>setPhase(phase,true),durationFor:phase=>phase?6*(legDuration+pause):0,getState:()=>({phase:current,completed:[...completed],routes:data.routes.map(r=>({name:r.name,color:r.color,ids:r.ids})),ready:true})};
 window.parkMap={getPositions:()=>structuredClone(data.places),getServicePoints:()=>structuredClone(data.topups)};
 setPhase(0);
})();
