'use strict';
/* English stays in the editable HTML. Arabic copy is applied to the same
   objects, so switching language preserves every reveal and map route. */
(()=>{
 const copy=[
  ['cover.eyebrow','.cover .eyebrow','حديقة بنغازي / تجربة الزائر'],
  ['cover.chapter','.cover .chapter','بطاقة صغيرة. حديقة كاملة.'],
  ['cover.title','.cover h1','بطاقة واحدة.<br>تجربة متكاملة<br><em>في حديقة واحدة.</em>'],
  ['cover.sub','.cover-sub','مفتاحك إلى الأماكن<br>التي تأتي لتستمتع بها.'],
  ['cover.wallet','.card-focus','<i></i> محفظة واحدة للزائر'],
  ['cover.footer','.cover footer>span:first-child','بطاقة + سوار بتقنية <bdi>NFC</bdi>'],
  ['journey.eyebrow','.journey .eyebrow','01 / رحلة الزائر'],
  ['journey.title','.journey h2','بطاقة واحدة.<br><em>استمتع. اشحن. كرّر.</em>'],
  ['journey.start','.start-here','ابدأ من هنا <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M25 7 7 25M7 12v13h13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'],
  ['journey.before','.ticket-stop .place-label','قبل المدخل الرئيسي'],
  ['journey.firstTopup','.ticket-actions>span:first-child','الشحن الأول <b>02</b>'],
  ['journey.getCard','.ticket-actions>span:last-child','احصل على بطاقة <b>01</b>'],
  ['journey.twoOperations','.ticket-stop .stop-caption','شباك تذاكر واحد. عمليتان.'],
  ['journey.carriers','.ticket-carriers span','بطاقة أو سوار<br>بتقنية <bdi>NFC</bdi>'],
  ['journey.inPark','.ride-stop .place-label','في الحديقة'],
  ['journey.enjoy','.ride-stop h3','استمتع بالحديقة <b>03</b>'],
  ['journey.paid','.ride-stop .stop-caption','استخدم المحفظة للتجارب المدفوعة.'],
  ['journey.inside','.topup-stop .place-label','داخل الحديقة'],
  ['journey.topup','.topup-stop h3','اشحن داخل الحديقة <b class="green">04</b>'],
  ['journey.nearby','.topup-stop .stop-caption','توجّه إلى أقرب نقطة خدمة.'],
  ['journey.repeat','.repeat-caption','اشحن وواصل الاستمتاع'],
  ['journey.note','.journey .bottom-note','<strong>شحن المحفظة وتذكرة الدخول عمليتان منفصلتان.</strong> يمكنك الشحن دون دخول الحديقة.'],
  ['journey.footer','.journey footer>span:first-child','محفظة واحدة · بطاقة أو سوار للدفع دون تلامس'],
  ['map.eyebrow','.map-slide .eyebrow','02 / محفظة واحدة، تجارب متعددة'],
  ['map.title','.map-slide h2','محفظة واحدة. <em>في كل أنحاء الحديقة.</em>'],
  ['map.legend','.map-legend>p','بطاقة واحدة. وجهات متعددة.'],
  ['map.key1','.route-key>span:first-child','<i></i>1 · المدخل الرئيسي'],
  ['map.key2','.route-key>span:last-child','<i></i>2 · المدخل الهادئ'],
  ['map.footer','.map-slide footer>span:first-child','ادفع في الوجهات المدفوعة · محفظة واحدة متصلة للزائر'],
  ['system.eyebrow','.system-slide .eyebrow','03 / النظام الذي يدعم الزيارة'],
  ['system.title','.system-slide h2','نظام واحد.<br><em>أدوات متصلة.</em>'],
  ['system.core','.system-hub>p','منصة مركزية واحدة'],
  ['system.hub','.system-hub h3','نظام إدارة<br>الحديقة'],
  ['system.hubNote','.system-hub>span','المحفظة · المعاملات · الدخول'],
  ['system.cashMicro','.node-cash .micro','إصدار البطاقة · الشحن · التذاكر'],
  ['system.cashTitle','.node-cash h3','<em>13</em> شباك خدمة<br>متكامل'],
  ['system.cashNote','.node-cash p','10 عند المدخل الرئيسي + 3 عند المدخل الثاني'],
  ['system.entryMicro','.node-entry .micro','دخول الحديقة'],
  ['system.entryTitle','.node-entry h3','بوابات<br>الدخول'],
  ['system.entryNote','.node-entry p','التحقق من تذاكر الدخول'],
  ['system.rideMicro','.node-attractions .micro','الدخول إلى الألعاب'],
  ['system.rideTitle','.node-attractions h3','بوابات<br>الألعاب'],
  ['system.rideNote','.node-attractions p','الدفع + إذن استخدام اللعبة'],
  ['system.posMicro','.node-pos .micro','الدفع من المحفظة'],
  ['system.posTitle','.node-pos h3','نقاط بيع المطاعم<br>والمتاجر'],
  ['system.posNote','.node-pos p','محفظة واحدة في جميع الوجهات'],
  ['system.internalMicro','.node-internal .micro','شحن المحفظة'],
  ['system.internalTitle','.node-internal h3','<span class="purple-text">9</span> نقاط خدمة<br>داخلية'],
  ['system.internalNote','.node-internal p','الشحن بمساعدة موظف الخدمة'],
  ['system.proposed','.node-sports .proposed','ربط مقترح'],
  ['system.sportsTitle','.node-sports h3','المجمّع الرياضي'],
  ['system.sportsNote','.node-sports p','آلية الدفع قيد التأكيد'],
  ['system.controller','.controller-node h3','وحدة التحكم'],
  ['system.carriers','.system-carriers-caption','محفظة واحدة للزائر · بطاقة أو سوار <bdi>NFC</bdi>'],
  ['system.footer','.system-slide footer>span:first-child','تصوّر وظيفي · المنصة والأجهزة للمراجعة التقنية'],
  ['service.eyebrow','.service-slide .eyebrow','04 / خدمة قريبة طوال الزيارة'],
  ['service.title','.service-slide h2','خدمة البطاقة.<br><em>في أنحاء الحديقة.</em>'],
  ['service.keyEntry','.service-key>span:first-child','① شبابيك الخدمة عند المداخل'],
  ['service.keyTopup','.service-key>span:last-child','⊕ الشحن داخل الحديقة'],
  ['service.main','.service-stats article:nth-child(1) h3','المدخل<br>الرئيسي'],
  ['service.second','.service-stats article:nth-child(2) h3','المدخل<br>الثاني'],
  ['service.inside','.service-stats article:nth-child(3) h3','داخل<br>الحديقة'],
  ['service.desks','.service-stats article:nth-child(-n+2) p','شبابيك خدمة متكاملة'],
  ['service.points','.service-stats article:nth-child(3) p','نقاط خدمة للشحن'],
  ['service.tap','.cashier-scene h3','مرّر. اشحن. واصل.'],
  ['service.assistance','.cashier-scene p','بطاقة أو سوار بتقنية <bdi>NFC</bdi>.<br>مساعدة شخصية عند الشباك.'],
  ['service.note','.service-slide .bottom-note','<strong>الشحن مستقل عن تذكرة الدخول.</strong><br><span>التحقق من الرصيد · فقدان البطاقة · استرداد الرصيد المتبقي — القواعد قيد التأكيد.</span>'],
  ['service.footer','.service-slide footer>span:first-child','خدمة البطاقة طوال الزيارة'],
  ['future.eyebrow','.future-slide .eyebrow','05 / إمكانات مستقبلية'],
  ['future.title','.future-slide h2','على تواصل<br><em>مع الزائر.</em>'],
  ['future.tag','.future-tag','اختياري · خيارات مستقبلية'],
  ['future.staffMicro','.future-feature.staff .micro','الوصول عبر الهاتف'],
  ['future.staffTitle','.future-feature.staff h3','أدوات للفريق'],
  ['future.staffNote','.future-feature.staff p','دراسة أدوات خدمة للموظفين،<br>بما فيها شبابيك التذاكر.'],
  ['future.profileMicro','.future-feature.profile .micro','علاقات الزوار وسجل الخدمة'],
  ['future.profileTitle','.future-feature.profile h3','ملف الزائر'],
  ['future.profileNote','.future-feature.profile p','ربط الملف وفق آلية محددة قد يساعد<br>الموظفين في معالجة الاستفسارات لاحقاً.'],
  ['future.feedbackMicro','.future-feature.feedback .micro','الآراء والزيارات المتكررة'],
  ['future.feedbackTitle','.future-feature.feedback h3','تواصل مستمر'],
  ['future.feedbackNote','.future-feature.feedback p','فهم تجربة الزائر.<br>دراسة ما يشجعه على العودة.'],
  ['future.onlineMicro','.future-feature.online .micro','خيار مستقبلي للشحن'],
  ['future.onlineTitle','.future-feature.online h3','الشحن عبر الإنترنت'],
  ['future.onlineNote','.future-feature.online p','دراسة إضافة رصيد<br>قبل الزيارة أو أثناءها.'],
  ['future.note','.future-slide .bottom-note','<span>مقترحات للنقاش. الوظائف والصلاحيات وآلية ربط الملفات لم تُحدّد بعد.</span>'],
  ['future.concept','.concept-label','واجهة توضيحية · لا تتضمن بيانات فعلية للزوار'],
  ['future.footer','.future-slide footer>span:first-child','وحدة اختيارية · خاضعة للمراجعة التقنية والتجارية'],
  ['closing.eyebrow','.closing .eyebrow','النتيجة المتوقعة'],
  ['closing.title','.closing h2','زيارة أفضل.<br><em>رؤية أوضح</em><br>للحديقة.'],
  ['closing.guestMicro','.closing-benefits article:first-child .micro','للزائر'],
  ['closing.guestTitle','.closing-benefits article:first-child h3','زيارة أبسط.'],
  ['closing.guestNote','.closing-benefits article:first-child p','دفع سهل.<br>شحن قريب.<br>خدمة متّسقة.'],
  ['closing.managementMicro','.closing-benefits article:last-child .micro','للإدارة'],
  ['closing.managementTitle','.closing-benefits article:last-child h3','صورة أوضح.'],
  ['closing.managementNote','.closing-benefits article:last-child p','سجل موحّد للمعاملات.<br>المبيعات حسب الوجهة.<br>متابعة نشاط الحديقة.'],
  ['closing.signoff','.closing-signoff','<i></i>بطاقة واحدة. تجربة متكاملة في حديقة واحدة.'],
  ['closing.footer','.closing footer>span:first-child','بطاقة · سوار <bdi>NFC</bdi> · محفظة واحدة للزائر']
 ];
 const messages={
  'park':['Benghazi Park','حديقة بنغازي'],
  'name.cover':['One card','بطاقة واحدة'],
  'name.journey':['The guest journey','رحلة الزائر'],
  'name.map':['Connected across the park','متصل في أنحاء الحديقة'],
  'name.system':['One connected system','نظام واحد متصل'],
  'name.service':['Card service across the park','خدمة البطاقة في أنحاء الحديقة'],
  'name.future':['Connected with the guest','على تواصل مع الزائر'],
  'name.closing':['A better visit','زيارة أفضل'],
  'ui.controls':['Presentation controls','أدوات العرض'],
  'ui.deck':['Benghazi Park presentation','عرض حديقة بنغازي'],
  'ui.previous':['Previous reveal / slide','الخطوة أو الشريحة السابقة'],
  'ui.next':['Next →','التالي ←'],
  'ui.nextTitle':['Next reveal / slide','الخطوة أو الشريحة التالية'],
  'ui.play':['▶ Auto play','▶ عرض تلقائي'],
  'ui.pause':['Ⅱ Pause','Ⅱ إيقاف مؤقت'],
  'ui.replay':['Replay this slide (R)','إعادة عرض الشريحة (R)'],
  'ui.futureTitle':['Include or exclude the future-options slide','إظهار أو إخفاء شريحة الخيارات المستقبلية'],
  'ui.futureOn':['Future: on','المستقبل: مفعّل'],
  'ui.futureOff':['Future: off','المستقبل: مخفي'],
  'ui.fullscreen':['Fullscreen (F)','ملء الشاشة (F)'],
  'ui.fullscreenHelp':['Use your browser fullscreen command (F11).','استخدم أمر ملء الشاشة في المتصفح (F11).'],
  'ui.download':['Download an offline copy','تنزيل نسخة تعمل دون إنترنت'],
  'ui.downloadLabel':['Download the presentation','تنزيل العرض'],
  'ui.downloadError':['Download unavailable. Please try again.','التنزيل غير متاح. يرجى المحاولة مجدداً.'],
  'ui.help':['Click / → next · ← back · R replay · P auto play · F fullscreen · H hide controls · swipe on touch screens','نقرة / → التالي · ← السابق · R إعادة · P عرض تلقائي · F ملء الشاشة · H إخفاء الأدوات · السحب على شاشات اللمس'],
  'ui.language':['Switch to Arabic','التبديل إلى الإنجليزية'],
  'route.readyTitle':['TWO GUEST JOURNEYS','مساران للزوار'],
  'route.readyCaption':['Click: guest 1 · Click again: guest 2','انقر: الزائر الأول · انقر مجدداً: الزائر الثاني'],
  'route.ready':['READY TO EXPLORE','جاهز للاستكشاف'],
  'route.one':['GUEST ROUTE 1','مسار الزائر الأول'],
  'route.two':['GUEST ROUTE 2','مسار الزائر الثاني'],
  'route.main':['MAIN ENTRANCE','المدخل الرئيسي'],
  'route.second':['SECOND ENTRANCE','المدخل الثاني'],
  'route.next':['NEXT: {place}','التالي: {place}'],
  'route.oneComplete':['ROUTE 1 COMPLETE · CLICK FOR ROUTE 2','اكتمل المسار الأول · انقر لعرض المسار الثاني'],
  'route.bothComplete':['BOTH ROUTES COMPLETE','اكتمل المساران'],
  'route.completeTitle':['TWO COMPLETE GUEST JOURNEYS','مساران كاملان للزوار'],
  'route.completeCaption':['Orange: main entrance · Light blue: quiet second entrance','البرتقالي: المدخل الرئيسي · الأزرق الفاتح: المدخل الثاني الهادئ'],
  'legend.1':['Main entrance','المدخل الرئيسي'],
  'legend.2':['Second entrance','المدخل الثاني'],
  'legend.3':['Arcade centre','مركز الألعاب الإلكترونية'],
  'legend.4':['Food court','ساحة المطاعم'],
  'legend.5':['Karting','الكارتينغ'],
  'legend.6':['Boats','القوارب'],
  'legend.7':['Stadium','الملعب'],
  'legend.8':['Restaurant','المطعم'],
  'legend.9':['Food trucks','عربات الطعام'],
  'legend.10':['Top-up kiosks','أكشاك الشحن'],
  'legend.11':['Attraction complex','مجمّع الألعاب'],
  'legend.12':['Zoo','حديقة الحيوانات'],
  'legend.13':['Playground','منطقة ألعاب الأطفال'],
  'legend.note.9':['14 locations','14 موقعاً'],
  'legend.note.10':['9 service points','9 نقاط خدمة'],
  'legend.note.12':['Free animal viewing','مشاهدة الحيوانات مجاناً'],
  'a11y.location':['Park location','موقع في الحديقة'],
  'a11y.truck':['Food truck {n}','عربة طعام {n}'],
  'a11y.topup':['Top-up service point {n}','نقطة خدمة للشحن {n}'],
  'a11y.internal':['Internal top-up point {n}','نقطة شحن داخلية {n}'],
  'a11y.mainDesks':['Main entrance: 10 universal cash desks','المدخل الرئيسي: 10 شبابيك خدمة متكاملة'],
  'a11y.secondDesks':['Second entrance: 3 universal cash desks','المدخل الثاني: 3 شبابيك خدمة متكاملة']
 };
 const attributes=[
  ['#stage','aria-label','ui.deck'],['#controls','aria-label','ui.controls'],
  ['#previous','title','ui.previous'],['#previous','aria-label','ui.previous'],
  ['#next','title','ui.nextTitle'],['#replay','title','ui.replay'],['#replay','aria-label','ui.replay'],
  ['#future-toggle','title','ui.futureTitle'],['#fullscreen','title','ui.fullscreen'],['#fullscreen','aria-label','ui.fullscreen'],
  ['#download','title','ui.download'],['#download','aria-label','ui.downloadLabel']
 ];
 const descriptions=[
  ['.brand','Benghazi Park','حديقة بنغازي'],
  ['.cover .hero-image','The Benghazi Park girl with a small branded plastic card in front of the main park entrance','فتاة حديقة بنغازي تحمل بطاقة صغيرة أمام المدخل الرئيسي'],
  ['.ticket-art','Benghazi Park Ticket Office','شباك تذاكر حديقة بنغازي','aria-label'],
  ['.ticket-carriers img','Guest card and NFC wristband','بطاقة الزائر وسوار بتقنية NFC'],
  ['.ride-art','Ferris wheel','عجلة الملاهي'],
  ['.topup-art img','Small guest card','بطاقة صغيرة للزائر'],
  ['#main-map .terrain','Benghazi Park clay diorama with grey asphalt perimeter and the separate internal lakes','مجسّم حديقة بنغازي بطريق أسفلتي رمادي محيطي وبحيرات داخلية منفصلة'],
  ['#route-layer','Two animated guest journeys','مساران متحركان لرحلة الزائر','aria-label'],
  ['.pos-art img','Contactless card','بطاقة دفع دون تلامس'],
  ['.controller-node img','A stylized card controller based on the supplied equipment photo','رسم توضيحي لوحدة التحكم بالبطاقة بناءً على صورة الجهاز المقدمة'],
  ['.system-carriers','Benghazi Park guest card and NFC wristband','بطاقة زائر حديقة بنغازي وسوار بتقنية NFC'],
  ['#service-map .terrain',"The park's two entrances and internal top-up service points",'مدخلا الحديقة ونقاط خدمة الشحن الداخلية'],
  ['.cashier-scene .sprite','The guest gives a small park card to a cashier','الزائر يقدّم بطاقة الحديقة لموظف الخدمة','aria-label'],
  ['.future-phone','A conceptual guest-service phone, park card and wristband','تصوّر لهاتف لخدمة الزائر مع بطاقة الحديقة وسوارها','aria-label'],
  ['.closing .hero-image','The Benghazi Park girl with her small park card','فتاة حديقة بنغازي مع بطاقة الحديقة الصغيرة']
 ];
 const elements=[],bindings=[];
 let language='en';
 function t(key,values={}){let value=messages[key]?.[language==='ar'?1:0]??key;return value.replace(/\{(\w+)\}/g,(_,name)=>String(values[name]??''));}
 function bind(el,key,attribute=null,values={}){
  const binding={el,key,attribute,values};bindings.push(binding);renderBinding(binding);
 }
 function renderBinding({el,key,attribute,values}){if(attribute)el.setAttribute(attribute,t(key,values));else el.textContent=t(key,values);}
 copy.forEach(([key,selector,ar])=>{
  const targets=[...document.querySelectorAll(selector)];
  if(!targets.length)throw new Error('Missing translation target: '+key);
  targets.forEach(el=>{el.dataset.i18n=key;elements.push({el,en:el.innerHTML,ar});});
 });
 descriptions.forEach(([selector,en,ar,attribute='alt'],i)=>{const key='image.'+i;messages[key]=[en,ar];document.querySelectorAll(selector).forEach(el=>bind(el,key,attribute));});
 attributes.forEach(([selector,attr,key])=>bind(document.querySelector(selector),key,attr));
 bind(document.getElementById('next'),'ui.next');bind(document.getElementById('help'),'ui.help');
 document.querySelectorAll('.slide').forEach((el,i)=>bind(el,['name.cover','name.journey','name.map','name.system','name.service','name.future','name.closing'][i],'data-name'));
 const toggle=document.getElementById('language-toggle');
 function setLanguage(value){
  language=value==='ar'?'ar':'en';
  document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr';
  elements.forEach(({el,en,ar})=>{el.innerHTML=language==='ar'?ar:en;});
  bindings.forEach(renderBinding);
  toggle.setAttribute('aria-checked',String(language==='ar'));toggle.setAttribute('aria-label',t('ui.language'));
  document.dispatchEvent(new CustomEvent('parklanguagechange',{detail:{language}}));
 }
 toggle.onclick=e=>{e.stopPropagation();setLanguage(language==='en'?'ar':'en');};
 window.parkI18n={t,bind,setLanguage,getLanguage:()=>language,keys:()=>copy.map(row=>row[0])};
 // English is the consistent default on every device. Selection lasts for the
 // current viewing session; no account or local storage is required.
 setLanguage(new URLSearchParams(location.search).get('lang'));
})();
