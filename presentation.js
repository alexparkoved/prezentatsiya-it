'use strict';
(()=>{
 const all=[...document.querySelectorAll('.slide')],params=new URLSearchParams(location.search),ui={counter:document.getElementById('counter'),play:document.getElementById('play'),previous:document.getElementById('previous'),next:document.getElementById('next'),future:document.getElementById('future-toggle')};
 let includeFuture=!params.has('no-crm')&&!params.has('no-future'),slides=[],index=0,step=0,playing=false,timer=0;
 document.querySelectorAll('.trace').forEach(el=>el.setAttribute('pathLength',1));
 function fit(){const v=document.getElementById('viewport');document.getElementById('stage').style.transform='scale('+Math.min(v.clientWidth/1600,v.clientHeight/900)+')';}
 function draw(){all.forEach(s=>{const active=s===slides[index];s.classList.toggle('active',active);s.querySelectorAll('[data-step]').forEach(el=>el.classList.toggle('seen',active&&+el.dataset.step<=step));});window.parkRoutes.setPhase(slides[index].classList.contains('map-slide')?step:0);ui.counter.textContent=(index+1)+' / '+slides.length+' · '+step+' / '+slides[index].dataset.max;ui.previous.disabled=index===0&&step===0;ui.next.disabled=index===slides.length-1&&step===+slides[index].dataset.max;document.title=(index+1)+'. '+slides[index].dataset.name+' · Benghazi Park';}
 function rebuild(){const current=slides[index];slides=all.filter(s=>includeFuture||!s.dataset.optional);index=current&&slides.includes(current)?slides.indexOf(current):Math.min(index,slides.length-1);all.forEach(s=>s.style.display=slides.includes(s)?'':'none');slides.forEach((s,i)=>s.querySelector('.page-no').textContent=String(i+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0'));step=Math.min(step,+slides[index].dataset.max);ui.future.textContent='Future: '+(includeFuture?'on':'off');ui.future.setAttribute('aria-pressed',includeFuture?'true':'false');draw();}
 function stop(){playing=false;clearTimeout(timer);ui.play.textContent='▶ Auto play';ui.play.classList.remove('on');}
 function next(){if(step<+slides[index].dataset.max)step++;else if(index<slides.length-1){index++;step=0;}else{stop();return false;}draw();return true;}
 function prev(){if(step>0)step--;else if(index>0){index--;step=+slides[index].dataset.max;}draw();}
 function hold(){if(slides[index].classList.contains('map-slide'))return step===0?2400:window.parkRoutes.durationFor(step)+1700;return step===0?1100:step===+slides[index].dataset.max?3800:1900;}
 function schedule(){timer=setTimeout(()=>{if(!playing)return;next();if(playing)schedule();},hold());}
 function play(){if(playing){stop();return;}if(index===slides.length-1&&step===+slides[index].dataset.max){index=0;step=0;draw();}playing=true;ui.play.textContent='Ⅱ Pause';ui.play.classList.add('on');schedule();}
 function goto(i,s=0){stop();index=Math.max(0,Math.min(i,slides.length-1));step=Math.max(0,Math.min(s,+slides[index].dataset.max));draw();}
 function replay(){stop();step=0;draw();}
 function toggleFuture(){stop();includeFuture=!includeFuture;rebuild();}
 function setRecording(value){document.body.classList.toggle('clean',value);fit();}
 async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{document.getElementById('help').textContent='Use your browser fullscreen command (F11).';}}
 ui.next.onclick=()=>{stop();next();};ui.previous.onclick=()=>{stop();prev();};ui.play.onclick=play;ui.future.onclick=toggleFuture;document.getElementById('replay').onclick=replay;document.getElementById('fullscreen').onclick=fullscreen;
 const stage=document.getElementById('stage');let touch=null,ignoreUntil=0;
 stage.onclick=e=>{if(performance.now()<ignoreUntil){e.preventDefault();return;}stop();next();};
 stage.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')touch={x:e.clientX,y:e.clientY};});
 stage.addEventListener('pointerup',e=>{if(!touch)return;const dx=e.clientX-touch.x,dy=e.clientY-touch.y;touch=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3){ignoreUntil=performance.now()+700;stop();if(dx<0)next();else prev();}});
 stage.addEventListener('pointercancel',()=>touch=null);
 document.addEventListener('keydown',e=>{if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,textarea,select'))return;const k=e.key.toLowerCase();if(k===' '&&e.target.closest('button'))return;if(['arrowright',' ','pagedown'].includes(k)){e.preventDefault();stop();next();}else if(['arrowleft','pageup'].includes(k)){e.preventDefault();stop();prev();}else if(k==='r')replay();else if(k==='p')play();else if(k==='f')fullscreen();else if(k==='h'){document.body.classList.toggle('clean');fit();}else if(k==='home')goto(0);else if(k==='end')goto(slides.length-1,99);});
 async function downloadPresentation(event){
  if(location.protocol==='file:')return;
  event.preventDefault();const button=document.getElementById('download');if(button.dataset.busy)return;button.dataset.busy='true';button.textContent='…';
  try{
   async function textFile(name){const response=await fetch(name,{cache:'no-store'});if(!response.ok)throw new Error('Download unavailable');return response.text();}
   const scriptNames=['map-data.js','map.js','presentation.js'];
   const [source,css,...codes]=await Promise.all(['index.html','presentation.css',...scriptNames].map(textFile));
   const endScript='<'+ '/script>';
   let payload=source.replace('<link rel="stylesheet" href="presentation.css">','<style>'+css+'</style>');
   scriptNames.forEach((name,i)=>{payload=payload.replace('<script src="'+name+'">'+endScript,'<script>'+codes[i]+endScript);});
   const names=[...new Set([...payload.matchAll(/assets\/([\w.-]+)/g)].map(match=>match[1]))],media={};
   await Promise.all(names.map(async name=>{
    const response=await fetch('assets/'+name);if(!response.ok)throw new Error('Download unavailable');const blob=await response.blob();
    const base64=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onerror=reject;reader.onload=()=>resolve(reader.result.slice(reader.result.indexOf(',')+1));reader.readAsDataURL(blob);});
    media[name]={mime:blob.type||'application/octet-stream',base64};
   }));
   names.forEach(name=>{payload=payload.split('assets/'+name).join('__PARK_ASSET_'+name+'__');});
   const safe=value=>JSON.stringify(value).replace(/</g,'\\u003c');
   const launch='let deck='+safe(payload)+';const media='+safe(media)+';for(const [name,asset] of Object.entries(media)){const binary=atob(asset.base64),bytes=new Uint8Array(binary.length);for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);const url=URL.createObjectURL(new Blob([bytes],{type:asset.mime}));deck=deck.split("__PARK_ASSET_"+name+"__").join(url);}document.open();document.write(deck);document.close();';
   const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Benghazi Park</title></head><body><p>Opening Benghazi Park…</p><script>'+launch+endScript+'</body></html>';
   const url=URL.createObjectURL(new Blob([html],{type:'text/html'})),link=document.createElement('a');link.href=url;link.download='Benghazi-Park-Presentation.html';link.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
  }catch{button.title='Download unavailable. Please try again.';}finally{delete button.dataset.busy;button.textContent='↓';}
 }
 document.getElementById('download').onclick=downloadPresentation;
 if(params.has('clean'))document.body.classList.add('clean');rebuild();fit();window.addEventListener('resize',fit);document.fonts.ready.then(fit);
 window.presentation={goto,next,prev,play,stop,replay,toggleCRM:toggleFuture,toggleFuture,setRecording,getState:()=>({slide:index,step,max:+slides[index].dataset.max,count:slides.length,playing}),getSchedule:()=>slides.map((s,i)=>({slide:i,name:s.dataset.name,max:+s.dataset.max})),getHold:hold};
 const initial=parseInt(location.hash.slice(1),10);if(initial>0&&initial<=slides.length)goto(initial-1);
 if(params.has('autoplay'))setTimeout(play,900);
})();
