const EMPLOYEES = [
  ["1","سلمان","رئيس قسم","الاستوديو التصميمي"],["2","خالد","مدير عام","الاستثمار"],
  ["3","فهد","مدير إدارة","مركز الزوار"],["4","نورة","مدير إدارة","المستودعات"],
  ["5","عبدالله","رئيس قسم","الاستثمار2"],["6","سارة","رئيس قسم","اللاونج"],
  ["7","محمد","مشرف","تقنية المعلومات"],["8","ريم","مشرف","اللاونج"],
  ["9","تركي","أخصائي","المراجعة الداخلية"],["10","هند","أخصائي","مركز البنية التحتية"],
  ["11","ماجد","محاسب","القانونية"],["12","لمى","محاسب",""],
  ["13","سعود","موظف","البيانات"],["14","أمل","موظف","البيانات"],
  ["15","ناصر","موظف","البيانات"],["16","منيرة","سكرتير",""],
  ["17","بندر","فني","GIS"],["18","العنود","موظف","الامن السيبراني"],
  ["19","يوسف","موظف","الامن السيبراني"],["20","دانة","مساعد إداري","الاستوديو التصميمي"],
].map(([id,name,pos,dept])=>({id,name,pos,dept}));

// كل دور: صورته، إطار العرض، مقياس الرسم، ونقطة البداية
const FLOORS = {
  G:{name:"الأرضي", img:"ground.jpg", vb:[0,0,1600,1460], s:2, start:[1490,500], from:"مدخل الموظفين"},
  M:{name:"الميزانين", img:"mezzanine.jpg", vb:[400,0,920,900], s:1, start:[1040,437], from:"بهو المصاعد"},
  1:{name:"الأول", img:"first.jpg", vb:[400,0,920,900], s:1, start:[1040,437], from:"بهو المصاعد"},
  2:{name:"الثاني", img:"second.jpg", vb:[400,0,920,900], s:1, start:[1035,440], from:"بهو المصاعد"},
  3:{name:"الثالث", img:"third.jpg", vb:[400,0,920,900], s:1, start:[1045,447], from:"بهو المصاعد"},
};
const LIFT = f => `استقلّ المصعد إلى <strong>الدور ${FLOORS[f].name}</strong>.`;

const DEPTS = {
  // ===== الأرضي =====
  "الاستوديو التصميمي":{floor:"G", zone:"M685 80 H1085 V490 H685 Z", route:[[1490,500],[1250,450],[1050,415],[960,415]], pin:[860,420],
    steps:["ادخل من <strong>مدخل الموظفين</strong>.","سِر في الممر الرئيسي، وستمرّ بـ<strong>صالة انتظار الزوار</strong> على يمينك.","تابع السير مباشرة، ويقع مدخل <strong>الاستوديو التصميمي</strong> على يمينك بجوار مدخل الزوار."]},
  "الاستثمار":{floor:"G", zone:"M50 150 H350 V570 H50 Z", route:[[1490,500],[1250,460],[1060,520],[900,535],[640,530],[365,530]], pin:[200,400],
    steps:["ادخل من <strong>مدخل الموظفين</strong>.","سِر في الممر الرئيسي، وسيكون الدرج والمصاعد على يسارك.","تابع السير في الممر المحاذي لـ<strong>الاستوديو التصميمي</strong> حتى نهايته.","تقع إدارة <strong>الاستثمار</strong> أمامك في نهاية الممر."]},
  "مركز الزوار":{floor:"G", zone:"M50 885 H930 V1240 H560 V1290 H50 Z", route:[[1490,500],[1250,460],[1060,520],[900,540],[705,545],[705,705],[580,705],[460,760],[460,900]], pin:[470,1060],
    steps:["ادخل من <strong>مدخل الموظفين</strong>.","سِر في الممر الرئيسي حتى الصالة الوسطى.","انعطف يساراً عند <strong>استقبال كبار الزوار</strong>، ثم يميناً باتجاه بهو مدخل كبار الزوار.","يقع مدخل <strong>مركز الزوار</strong> على يسارك."]},
  // ===== الميزانين =====
  "الاستثمار2":{floor:"M", zone:"M1100 385 H1270 V490 H1100 Z", route:[[1040,437],[1122,437]], pin:[1200,432],
    steps:[LIFT("M"),"اخرج من بهو المصاعد من الجهة المقابلة للبهو الرئيسي (Lobby).","تقع إدارة <strong>الاستثمار2</strong> بجوار بهو المصاعد مباشرة."]},
  "اللاونج":{floor:"M", zone:"M470 95 L585 30 H870 V330 H470 Z", route:[[1040,437],[980,437],[980,500],[880,500],[855,470],[855,335],[820,312]], pin:[690,245],
    steps:[LIFT("M"),"من بهو المصاعد، اتجه إلى <strong>البهو الرئيسي (Lobby)</strong>.","سِر بين أحواض الزرع، وستجد <strong>اللاونج</strong> أمامك مباشرة."]},
  "المستودعات":{floor:"M", zone:"M465 565 H780 V865 H600 L470 765 Z", route:[[1040,437],[980,437],[980,500],[880,500],[800,548],[670,550],[670,572]], pin:[625,740],
    steps:[LIFT("M"),"من بهو المصاعد، اتجه إلى <strong>البهو الرئيسي (Lobby)</strong>.","ادخل الممر المحاذي لغرفة <strong>Franchise</strong>.","يقع مدخل <strong>الأرشيف والمستودعات</strong> على جانب الممر."]},
  // ===== الأول =====
  "تقنية المعلومات":{floor:"1", zone:"M975 35 L1045 35 L1145 110 V240 H975 Z", route:[[1040,437],[955,437],[955,258],[1117,258],[1117,236]], pin:[1065,180],
    steps:[LIFT("1"),"من بهو المصاعد، اتجه إلى الممر الداخلي وسِر حتى نهايته.","تابع مع انعطاف الممر حتى تصل إلى <strong>غرفة الخوادم (Server Room)</strong>.","تقع إدارة <strong>تقنية المعلومات</strong> بجوار مكتب الدعم الفني (IT Help Desk)."]},
  "المراجعة الداخلية":{floor:"1", zone:"M873 635 H1040 V800 L975 860 H873 Z", route:[[1040,437],[955,437],[955,605],[945,630]], pin:[925,720],
    steps:[LIFT("1"),"من بهو المصاعد، اتجه إلى الممر الداخلي وسِر في الاتجاه المعاكس لتقنية المعلومات حتى نهايته.","تقع إدارة <strong>المراجعة الداخلية</strong> أمامك مباشرة عند نهاية الممر."]},
  "مركز البنية التحتية":{floor:"1", zone:"M458 285 H688 V495 H458 Z", route:[[1040,437],[955,437],[955,258],[712,258],[712,390],[692,390]], pin:[570,400],
    steps:[LIFT("1"),"من بهو المصاعد، اتجه إلى الممر الداخلي وسِر حتى نهايته.","تابع مع انعطاف الممر باتجاه مكاتب نواب الرئيس (VP)، ثم ادخل الممر الجانبي.","يقع <strong>مركز البنية التحتية</strong> في منتصف الممر الجانبي."]},
  // ===== الثاني =====
  "GIS":{floor:"2", zone:"M975 40 L1050 40 L1200 140 V240 H975 Z", route:[[1035,440],[950,440],[950,262],[1110,262],[1110,240]], pin:[1075,175],
    steps:[LIFT("2"),"من بهو المصاعد، اتجه إلى الممر الداخلي وسِر حتى نهايته.","تابع مع انعطاف الممر، ويقع مدخل إدارة <strong>GIS</strong> عند زاويته."]},
  "البيانات":{floor:"2", zone:"M870 640 H1035 V820 L975 870 H870 Z", route:[[1035,440],[950,440],[950,612],[940,640]], pin:[920,760],
    steps:[LIFT("2"),"من بهو المصاعد، اتجه إلى الممر الداخلي وسِر في الاتجاه المعاكس لإدارة GIS حتى نهايته.","تقع إدارة <strong>البيانات</strong> أمامك مباشرة عند نهاية الممر."]},
  // ===== الثالث =====
  "الامن السيبراني":{floor:"3", zone:"M980 50 L1060 50 L1200 150 V240 H980 Z", route:[[1045,447],[960,447],[960,265],[1122,265],[1122,242]], pin:[1060,175],
    steps:[LIFT("3"),"من بهو المصاعد، اتجه إلى الممر الداخلي وسِر حتى نهايته.","تابع مع انعطاف الممر، ويقع مدخل إدارة <strong>الأمن السيبراني</strong> عند زاويته."]},
  "القانونية":{floor:"3", zone:"M540 125 L620 65 H690 V295 H470 V215 Z", route:[[1045,447],[960,447],[960,265],[705,265],[690,250]], pin:[595,215],
    steps:[LIFT("3"),"من بهو المصاعد، اتجه إلى الممر الداخلي وسِر حتى نهايته.","تابع مع انعطاف الممر وسِر حتى نهايته.","تقع <strong>الإدارة القانونية</strong> أمامك ضمن مكاتب نواب الرئيس (VP)."]},
  "شادي":{floor:"3", zone:"M460 600 H600 V740 H520 L470 690 Z", route:[[1045,447],[960,447],[960,613],[708,613],[700,640]], pin:[540,672],
    steps:[LIFT("3"),"من بهو المصاعد، اتجه إلى الممر الداخلي وسِر في الاتجاه المعاكس حتى نهايته.","تابع مع انعطاف الممر وسِر حتى نهايته.","يقع المكتب أمامك ضمن مكاتب نواب الرئيس (VP)."]},
};

function drawMap(d){
  const F=FLOORS[d.floor], s=F.s, [vx,vy,vw,vh]=F.vb;
  const pts=d.route.map(p=>p.join(" ")).join(" L");
  const [px,py]=d.pin, [sx,sy]=d.route[0];
  const svg=document.getElementById("map");
  svg.setAttribute("viewBox",F.vb.join(" "));
  svg.innerHTML=`
  <defs><mask id="m"><rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="#fff"/><path d="${d.zone}" fill="#000"/></mask></defs>
  <image href="${F.img}" x="${vx}" y="${vy}" width="${vw}" height="${vh}"/>
  <rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="#0F1430" opacity=".38" mask="url(#m)"/>
  <path d="${d.zone}" fill="var(--target)" fill-opacity=".22" stroke="var(--target)" stroke-width="${4*s}" stroke-linejoin="round"/>
  <path class="route" d="M${pts}" fill="none" stroke="var(--route)" stroke-width="${7*s}" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:${5*s} ${4*s}"/>
  <circle cx="${sx}" cy="${sy}" r="${12*s}" fill="var(--route)" stroke="#fff" stroke-width="${3*s}"/>
  <g transform="translate(${sx} ${sy+22*s}) scale(${s})"><rect x="-55" width="110" height="24" rx="12" fill="#16204F"/><text y="17" text-anchor="middle" font-size="13" font-weight="600" fill="#fff" font-family="IBM Plex Sans Arabic,Tahoma">موقعك الحالي</text></g>
  <g transform="translate(${px} ${py}) scale(${s})"><path d="M0 5 l-13 -23 a15 15 0 1 1 26 0 z" fill="#F2B12B" stroke="#16204F" stroke-width="2.5"/><circle cy="-26" r="5.5" fill="#16204F"/></g>`;
}

function show(id){
  const err=document.getElementById("err");
  const e=EMPLOYEES.find(x=>x.id===id.trim().replace(/^0+/,""));
  if(!e){ err.textContent = id.trim() ? "الرقم الوظيفي المُدخل غير مسجّل. يُرجى التحقق منه والمحاولة مرة أخرى." : "يُرجى إدخال الرقم الوظيفي."; err.hidden=false; document.getElementById("result").hidden=true; return; }
  err.hidden=true;
  document.getElementById("result").hidden=false;
  const d=DEPTS[e.dept], F=d&&FLOORS[d.floor];
  document.getElementById("who").innerHTML=`
    <div><small>الاسم</small><b>${e.name}</b></div>
    <div><small>المسمى الوظيفي</small><b>${e.pos}</b></div>
    <div><small>الإدارة</small><b>${e.dept||"غير محددة"}</b></div>
    <div class="big"><small>الدور</small><b>${F?F.name:"—"}</b></div>`;
  document.getElementById("planBox").hidden=!d;
  document.getElementById("stepsBox").hidden=!d;
  document.getElementById("noPlan").hidden=!!d;
  if(!d){ document.getElementById("noPlanMsg").textContent = e.dept
      ? `لم يُضَف موقع إدارة ${e.dept} إلى المخطط بعد. للاستفسار يُرجى التواصل مع إدارة المرافق.`
      : "لا تتوفر بيانات إدارتك في النظام. يُرجى التواصل مع إدارة الموارد البشرية لتحديثها."; return; }
  document.getElementById("planTitle").textContent=`الدور ${F.name} · ${e.dept}`;
  document.getElementById("fromLbl").textContent=`المسار من ${F.from}`;
  document.getElementById("map").setAttribute("aria-label",`مخطط الدور ${F.name} والطريق من ${F.from} إلى ${e.dept}`);
  drawMap(d);
  document.getElementById("steps").innerHTML=d.steps.map(t=>`<li><span>${t}</span></li>`).join("");
}

const input=document.getElementById("emp");
document.getElementById("f").addEventListener("submit",ev=>{ev.preventDefault(); show(input.value);});
input.addEventListener("input",()=>{input.value=input.value.replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/\D/g,"");});
const start=(location.hash||"").replace("#","");
// the page opens empty; a link ending in #<ID> still opens straight on that employee
if(EMPLOYEES.some(e=>e.id===start)){ input.value=start; show(start); }
