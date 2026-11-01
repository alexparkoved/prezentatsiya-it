/* Destination positions are editable. ownerPoint records the owner's older image frame;
   x/y identify the same destination in the restored clay render. */
window.PARK_MAP={
 version:5,
 legend:[
  {n:1,label:'Main entrance'},{n:2,label:'Second entrance'},{n:3,label:'Arcade centre'},
  {n:4,label:'Food court'},{n:5,label:'Karting'},{n:6,label:'Boats'},{n:7,label:'Stadium'},
  {n:8,label:'Restaurant'},{n:9,label:'Food trucks',note:'14 locations'},
  {n:10,label:'Top-up kiosks',note:'9 service points'},{n:11,label:'Attraction complex'},
  {n:12,label:'Zoo',note:'Free animal viewing'},{n:13,label:'Playground'}
 ],
 places:[
  {id:'main',n:1,x:67.5,y:17.5,size:61,sprite:1},
  {id:'second',n:2,x:15.7,y:67.5,size:50,sprite:0,ownerPoint:[13.5,62.9]},
  {id:'arcade',n:3,x:57.0,y:13.5,size:54,sprite:8},
  {id:'rides',n:11,x:50,y:31.3,size:64,wheel:true,ownerPoint:[50,31.3]},
  {id:'food',n:4,x:59.3,y:55.5,size:45,ownerPoint:[61.9,55.9]},
  {id:'restaurant',n:8,x:72.5,y:33.5,size:43,ownerPoint:[75.5,34.3],rotation:90},
  {id:'karting',n:5,x:74.9,y:65.2,size:36},
  {id:'boats',n:6,x:56.5,y:75.2,size:36},
  {id:'sports',n:7,x:34.5,y:91.3,size:36},
  {id:'zoo',n:12,x:28.8,y:55.7,size:36,free:true,ownerPoint:[29.85,52.2]},
  {id:'playground',n:13,x:63,y:40.5,size:36,ownerPoint:[64.65,45.3]}
 ],
 topups:[[53.6,17.6],[40.3,30.7],[58.5,23.8],[47.8,43.6],[56,50.1],[70,38.4],[79,58.8],[35,70.7],[57,74.6]],
 trucks:[[50.5,20.5],[46.3,30.5],[41.7,38.5],[49.5,42.5],[53.5,42.9],[57.0,45.5],[64.5,48.5],[69.8,45.0],[76.5,43.9],[78.5,39.3],[57.8,60.0],[45.3,65.0],[36.0,65.5],[29.0,69.0]],
 routes:[
  {name:'GUEST ROUTE 1',entrance:'MAIN ENTRANCE',color:'#ed6c2f',ids:['main','arcade','rides','food','playground','restaurant','main'],
   legs:[
    [[67.5,17.5],[64,19],[61,17.2],[58,16.5],[57,13.5]],
    [[57,13.5],[56,18],[53,21],[50,23],[48.5,26.5],[50,31.3]],
    [[50,31.3],[49,35],[48.8,40.5],[51.5,44.5],[54,44.5],[58,45.3],[61,47.3],[61.6,50],[59.3,55.5]],
    [[59.3,55.5],[62,57],[64.5,55.5],[65,51],[64,47],[63,44],[63,40.5]],
    [[63,40.5],[63,44],[66,47],[70,46],[74,42],[74,37],[72.5,33.5]],
    [[72.5,33.5],[74,35],[78,31],[81,28],[81,22],[76,18],[72,17],[67.5,17.5]]
   ]},
  {name:'GUEST ROUTE 2',entrance:'SECOND ENTRANCE',color:'#72c7f2',ids:['second','boats','food','playground','rides','zoo','second'],
   legs:[
    [[15.7,67.5],[17.7,72.3],[19.6,80.5],[22.5,88.5],[27.8,87.4],[34.8,81.9],[42.5,76.1],[50.4,69.7],[52,71.6],[56.5,75.2]],
    [[56.5,75.2],[55,71],[55,66],[58,62],[60.7,59],[59.3,55.5]],
    [[59.3,55.5],[62,57],[64.5,55.5],[65,51],[64,47],[63,44],[63,40.5]],
    [[63,40.5],[63,44],[60,46],[56,44.5],[52,44.5],[49,40],[49,35],[50,31.3]],
    [[50,31.3],[47.5,35],[44,39],[41,42],[39,46.5],[36,51],[32,54],[28.8,55.7]],
    [[28.8,55.7],[26,57.5],[23,60],[20,63],[15.7,67.5]]
   ]}
 ]
};
