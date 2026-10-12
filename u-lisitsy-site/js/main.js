/* === ФОТО: вставьте свои URL или data-URI. Пустое значение = фирменная заглушка === */
const IMG={"hero": "assets/img/hero.jpg", "price": "assets/img/services-adaptive.jpg", "svc": ["assets/img/service-1.jpg", "assets/img/service-2.jpg", "assets/img/service-3.jpg", "assets/img/service-4.jpg", "assets/img/service-5.jpg"], "works": ["assets/img/work-1.jpg", "assets/img/work-2.jpg", "assets/img/work-3.jpg", "assets/img/work-4.jpg", "assets/img/work-5.jpg", "assets/img/work-6.jpg", "assets/img/work-7.jpg", "assets/img/work-8.jpg"], "team": ["assets/img/team-1.jpg", "assets/img/team-2.jpg", "assets/img/team-3.jpg", "assets/img/team-4.jpg", "assets/img/team-5.jpg", "assets/img/team-6.jpg", "assets/img/team-7.jpg", "assets/img/team-8.jpg"], "faq": "assets/img/faq.jpg", "map": "assets/img/map.jpg", "edu": "assets/img/education-video-cover.jpg"};
IMG.hand='assets/img/price-arm.jpg';
const LOGO='assets/img/logo-wordmark.svg';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const setImg=(el,u)=>{if(u){el.style.backgroundImage=`url(${u})`;el.classList.add('img')}};
/* hero */
$('#wm').innerHTML='<div class="wl"><img alt="У Лисицы" src="'+LOGO+'"></div>';
$$('#hbg i').forEach((e,i)=>e.style.backgroundImage='url('+[IMG.hero,IMG.edu][i]+')');$$('[data-k]').forEach(e=>setImg(e,IMG[e.dataset.k]));{const pp=$('.pph');pp.style.setProperty('--d','url('+new URL(IMG.hand,document.baseURI).href+')');pp.style.setProperty('--m','url('+new URL(IMG.price,document.baseURI).href+')');pp.classList.add('img')}
addEventListener('scroll',()=>{const y=scrollY;$('#h').classList.toggle('sc',y>40);if(y<innerHeight)$('#hbg').style.transform=`translateY(${y*.25}px) scale(${1+y/4000})`},{passive:true});
/* burger */
const tgl=f=>{document.body.classList.toggle('open',f);document.body.style.overflow=document.body.classList.contains('open')?'hidden':''};
$('#bg').onclick=()=>tgl();$$('.burger a').forEach(a=>a.onclick=()=>tgl(false));
/* reveal + counters */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');const b=$('b[data-n]',e.target);if(b){const n=+b.dataset.n;let t=0;const k=setInterval(()=>{t+=1;b.textContent=Math.round(n*(1-Math.pow(1-t/40,3)));if(t>=40)clearInterval(k)},25)}io.unobserve(e.target)}}),{threshold:.15});
const obs=()=>$$('.rv:not(.in)').forEach(e=>io.observe(e));
/* hover photo that follows cursor */
const fl=$('#fl');IMG.svc.forEach((u,i)=>{const d=document.createElement('i');d.className='ph';d.dataset.l=['Татуировка','Перманент','Пирсинг','Лазер','Обучение'][i];d.style.borderRadius='14px';setImg(d,u);fl.appendChild(d)});
let mx=0,my=0,x=0,y=0,rot=0,over=false;
$$('.svc').forEach(r=>{r.addEventListener('mouseenter',()=>{over=true;fl.classList.add('on');$$('i',fl).forEach((d,j)=>d.classList.toggle('on',j==r.dataset.i))});r.addEventListener('mouseleave',()=>{over=false;fl.classList.remove('on')})});
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function loop(){const dx=mx-x;x+=dx*.12;y+=(my-y)*.12;rot+=(Math.max(-14,Math.min(14,dx*.25))-rot)*.15;fl.style.transform=`translate(${x+30}px,${y-170}px) rotate(${rot}deg)`;requestAnimationFrame(loop)})();
/* prices */
const P={'Татуировка':[['Тату','','от 95 р.'],['Эскиз','20% от стоимости тату · не входит в цену','20%'],['Консультация мастера','','бесплатно']],
'Перманентный макияж':[['Перманентный макияж','','от 150 р.'],['Брови','волосковая техника и пудровое напыление','от 150 р.'],['Коррекция','скидка 50%','−50%'],['Консультация мастера','','бесплатно']],
'Пирсинг':[['Пирсинг','все виды · мастера с мед. образованием','от 55 р.'],['Украшения','премиум-класса','по прайсу'],['Консультация мастера','','бесплатно']],
'Удаление':[['Удаление татуировок','курс рассчитывает врач','от 34 р.'],['Консультация','','бесплатно']],
'Обучение':[['Татуировка','индивидуально','2100 р.'],['Перманентный макияж','индивидуально','2100 р.'],['Пирсинг','индивидуально','1200 р.']]};
const ts=$('#tabs'),pr=$('#prices');
const show=k=>{$$('.chip',ts).forEach(c=>c.classList.toggle('on',c.textContent==k));pr.innerHTML=P[k].map((r,i)=>`<div class="prow" style="animation-delay:${i*.07}s"><div>${r[0]}<small>${r[1]}</small></div><b class="o">${r[2]}</b></div>`).join('')};
Object.keys(P).forEach(k=>{const b=document.createElement('button');b.className='chip';b.textContent=k;b.onclick=()=>show(k);ts.appendChild(b)});show('Татуировка');
/* works & team */
const W=[['Лайнворк','t'],['Блэкворк','t'],['Графика','t'],['Олд скул','t'],['Традишнл','t'],['Губы','p'],['Брови, волосковая','p'],['Хрящ, хеликс','x']];
$('#wk').innerHTML=W.map((w,i)=>`<div class="w rv" data-f="${w[1]}" style="--d:${i%4*.08}s"><div class="ph" data-l="Работа ${i+1}"></div><p>${w[0]}</p></div>`).join('');
$$('#wk .ph').forEach((e,i)=>setImg(e,IMG.works[i]));
const T=[['Александра','Тату-мастер · 8 лет в профессии','t'],['Антон','Тату-мастер · 14 лет в профессии','t'],['Владимир','Врач · пирсинг и лазерное удаление','x l'],['Алесь','Тату-мастер · 12 лет в профессии','t'],['Ирина','Мастер перманентного макияжа · 10 лет','p'],['Мария','Мастер перманентного макияжа · 6 лет','p'],['Алеся','Мастер перманентного макияжа','p'],['Анастасия','Мастер по пирсингу','x l']];
$('#tm').innerHTML=T.map((m,i)=>`<div class="m rv" data-f="${m[2]}" style="--d:${i%4*.08}s"><div class="ph" data-l="Фото мастера"></div>${m[0]?`<h3>${m[0]}</h3>`:""}<p style="margin:${m[0]?'4px 0 14px':'12px 0 14px'}">${m[1]}</p><a class="btn s" href="#ct">Записаться к мастеру</a></div>`).join('');
$$('#tm .ph').forEach((e,i)=>setImg(e,IMG.team[i]));
const filt=(box,sel)=>$$('.chip',box).forEach(c=>c.onclick=()=>{$$('.chip',box).forEach(x=>x.classList.toggle('on',x==c));$$(sel).forEach(e=>{const h=c.dataset.f!='all'&&!e.dataset.f.split(' ').includes(c.dataset.f);e.classList.toggle('h',h);if(!h){e.classList.remove('in');setTimeout(()=>e.classList.add('in'),30)}})});
filt($('#wf'),'.w');
/* reviews marquee */
const R=[['«Сегодня сделала первую татуировку. Спасибо мастеру Александре за превосходную работу: быстро, качественно и вообще не больно.»','Мастер: Александра'],['«Сделала перманент бровей у Ирины. Вот где действительно мастер своего дела: профессионально, красиво, качественно.»','Мастер: Ирина'],['«Антону — за две мои татуировки, Владимиру — за безболезненные проколы хрящей, девочкам на ресепшене — за улыбки.»','Мастера: Антон, Владимир'],['«Делала прокол хряща — совсем не больно, мастер объяснил каждый шаг. Стерильность на высоте.»','Мастер: Владимир']];
const rh=R.map(r=>`<div class="rev"><s>★★★★★</s><p>${r[0]}</p><div><span>${r[1]}</span><span>Yandex</span></div></div>`).join('');loopM($('#tr'),rh,55);
/* faq */
const F=[['Больно ли это?','Зависит от зоны и порога чувствительности: предплечье и плечо переносятся легко, рёбра и стопа — сложнее. Большинство описывают ощущения как терпимое покалывание. Анестезию не используем.'],['Нужна ли предоплата для записи?','Уточняйте у администратора при записи — условия зависят от услуги и мастера.'],['Как обеспечивается стерильность?','Одноразовые иглы и расходники вскрываются при вас, нормы подтверждены госэкспертизой.'],['Можно ли перекрыть старую неудачную татуировку?','Да, мастер оценит работу на бесплатной консультации и предложит эскиз для перекрытия.'],['Сколько длится заживление?','Обычно 2–4 недели, мастер остаётся на связи до полного заживления.'],['Есть ли противопоказания?','Да, врач проверяет их на консультации перед процедурой.'],['Можно в рассрочку?','Да, до 8 месяцев по картам банков-партнёров — оформляется в студии.']];
$('#fq').innerHTML=F.map((f,i)=>`<div class="fi rv${i?'':' is-open'}"><h3>${f[0]}<i></i></h3><div><p>${f[1]}</p></div></div>`).join('');
$$('.fi').forEach(f=>f.onclick=()=>{const o=f.classList.contains('is-open');$$('.fi').forEach(x=>x.classList.remove('is-open'));if(!o)f.classList.add('is-open')});
/* extra motion */
{const pb=$('#pb'),h=$('#h');let ly=0;addEventListener('scroll',()=>{const y=scrollY,m=document.documentElement.scrollHeight-innerHeight;pb.style.transform=`scaleX(${m>0?y/m:0})`;if(!document.body.classList.contains('open'))h.classList.toggle('hide',y>ly&&y>300);ly=y},{passive:true})}
$$('.btn.p').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')});
{const cd=$('#cd');let cx=0,cy=0,tx=0,ty=0;addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY});(function f(){cx+=(tx-cx)*.25;cy+=(ty-cy)*.25;cd.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(f)})();document.addEventListener('mouseover',e=>cd.classList.toggle('big',!!e.target.closest('a,button,.svc,.chip,.fi')))}
function loopM(el,html,speed){const build=()=>{el.innerHTML='<div class="mg">'+html+'</div>';const g=el.firstChild;let n=1;while(g.scrollWidth<innerWidth*1.2&&n<40){g.insertAdjacentHTML('beforeend',html);n++}el.appendChild(g.cloneNode(true));el.style.animationDuration=(g.scrollWidth/speed)+'s'};build();let t;addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(build,250)});if(document.fonts)document.fonts.ready.then(build)}
{const bd=$('.band>div');loopM(bd,bd.innerHTML,70)}
function alignFacts(){const f=$('.facts'),st=$$('.step')[3];if(!f||!st)return;f.style.marginTop='';if(innerWidth>1100){const d=st.offsetTop-f.offsetTop;if(d>0)f.style.marginTop=(parseFloat(getComputedStyle(f).marginTop)+d)+'px'}}
alignFacts();addEventListener('resize',alignFacts);addEventListener('load',alignFacts);if(document.fonts)document.fonts.ready.then(alignFacts);
obs();
