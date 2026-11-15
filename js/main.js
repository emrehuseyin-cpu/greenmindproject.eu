(function(){
  var $=function(id){return document.getElementById(id)};
  var motionOK=!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ---------- reveal + count-up ---------- */
  var rvs=[].slice.call(document.querySelectorAll(".rv"));
  function countUp(el){var n=+el.dataset.count,t0=null;function f(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/900);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
  if(motionOK&&"IntersectionObserver" in window){
    document.documentElement.classList.add("anim");
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var d=[].indexOf.call(e.target.parentNode.children,e.target)%4*90;setTimeout(function(){e.target.classList.add("in")},d);
      [].forEach.call(e.target.querySelectorAll("[data-count]"),countUp);io.unobserve(e.target)})},{threshold:.12});
    rvs.forEach(function(el){io.observe(el)});
  }

  /* ---------- journey status + countdown ---------- */
  var stops=[].slice.call(document.querySelectorAll(".stop")),now=Date.now(),next=null;
  stops.forEach(function(li){
    var s=new Date(li.dataset.start+"T09:00:00+03:00").getTime(),e=new Date(li.dataset.end+"T23:59:00+03:00").getTime(),chip=li.querySelector(".chip");
    li.classList.remove("is-next");
    if(now>e){chip.className="chip done";chip.textContent="Done"}
    else if(now>=s){chip.className="chip next";chip.textContent="Happening now";li.classList.add("is-next");if(!next)next={li:li,s:s,live:true}}
    else if(!next){chip.className="chip next";chip.textContent="Next";li.classList.add("is-next");next={li:li,s:s}}
    else{chip.className="chip";chip.textContent="Planned"}
  });
  function tick(){
    if(!next){$("nx-title").textContent="All four meetings are complete";$("nx-meta").textContent="Results are being published";$("cd").innerHTML="";return}
    $("nx-title").textContent=next.li.querySelector("h3").textContent;
    var place=next.li.querySelector("p").textContent.split(".")[0];
    $("nx-meta").textContent=(next.live?"Happening now · ":"Next stop · ")+place+" · "+next.li.querySelector(".when").textContent;
    if(next.live){$("cd").innerHTML="<span>Live</span>";return}
    var s=Math.max(0,Math.floor((next.s-Date.now())/1000)),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60);
    $("cd").innerHTML="<span>"+d+" d</span><span>"+h+" h</span><span>"+m+" min</span>";
  }
  tick();setInterval(tick,30000);

  /* ---------- hero parallax + falling leaves ---------- */
  var hero=$("hero"),scene=$("scene");
  if(motionOK){
    hero.addEventListener("pointermove",function(e){var r=hero.getBoundingClientRect();scene.style.setProperty("--px",((e.clientX-r.left)/r.width-.5)*-2);scene.style.setProperty("--py",((e.clientY-r.top)/r.height-.5)*-2)});
    var cv=$("leaves"),cx=cv.getContext("2d"),W=0,H=0,run=true,cols=["#8FCFA5","#F4B79A","#F3D36B","#E9A3B5","#A9C8F0"],L=[];
    function size(){var r=hero.getBoundingClientRect(),dp=Math.min(2,window.devicePixelRatio||1);W=r.width;H=r.height;cv.width=W*dp;cv.height=H*dp;cx.setTransform(dp,0,0,dp,0,0)}
    size();window.addEventListener("resize",size);
    for(var i=0;i<16;i++)L.push({x:Math.random()*1600,y:Math.random()*800,s:7+Math.random()*8,v:.25+Math.random()*.45,a:Math.random()*6.3,w:.008+Math.random()*.012,c:cols[i%cols.length],ph:Math.random()*6.3});
    function draw(t){
      if(run){cx.clearRect(0,0,W,H);
        L.forEach(function(l){l.y+=l.v;l.a+=l.w;var x=(l.x%(W+60))-30+Math.sin(t/1400+l.ph)*26;if(l.y>H+20){l.y=-20;l.x=Math.random()*1600}
          cx.save();cx.translate(x,l.y);cx.rotate(l.a);cx.globalAlpha=.75;cx.fillStyle=l.c;cx.beginPath();cx.moveTo(0,-l.s);cx.quadraticCurveTo(l.s*.8,0,0,l.s);cx.quadraticCurveTo(-l.s*.8,0,0,-l.s);cx.fill();cx.restore()})}
      requestAnimationFrame(draw)}
    requestAnimationFrame(draw);
    if("IntersectionObserver" in window)new IntersectionObserver(function(es){run=es[0].isIntersecting}).observe(hero);
  }

  /* ---------- tabs ---------- */
  var tabs=[].slice.call(document.querySelectorAll('[role="tab"]'));
  tabs.forEach(function(t){t.addEventListener("click",function(){tabs.forEach(function(o){o.setAttribute("aria-selected",o===t);$(o.getAttribute("aria-controls")).hidden=o!==t})})});

  /* ---------- history strip ---------- */
  var IC={
    drop:'<path d="M15 4c5 6 8 10 8 14a8 8 0 0 1-16 0c0-4 3-8 8-14z"/>',
    target:'<circle cx="15" cy="15" r="11"/><circle cx="15" cy="15" r="6"/><circle cx="15" cy="15" r="1.5"/>',
    sun:'<circle cx="15" cy="15" r="5"/><path d="M15 3v4M15 23v4M3 15h4M23 15h4M6.5 6.5l3 3M20.5 20.5l3 3M6.5 23.5l3-3M20.5 9.5l3-3"/>',
    flask:'<path d="M12 4h6M13 4v8L6 24a1.5 1.5 0 0 0 1.4 2h15.2A1.5 1.5 0 0 0 24 24l-7-12V4M9.5 19h11"/>',
    gear:'<circle cx="15" cy="15" r="4"/><circle cx="15" cy="15" r="9" stroke-dasharray="4.2 2.9"/>',
    hill:'<path d="M3 24l8-13 5 7 4-5 7 11z"/>',
    star:'<path d="M15 4l3.2 7 7.3.8-5.5 5 1.6 7.4L15 20.4 8.4 24.2 10 16.8l-5.5-5 7.3-.8z"/>',
    coin:'<circle cx="15" cy="15" r="11"/><path d="M15 9v12M18 12c-1-2-6-2-6 .7 0 3 6 1.6 6 4.6 0 2.700-5 2.700-6 .7"/>',
    heart:'<path d="M15 25s-10-6-10-14a5.500 5.500 0 0 1 10-3 5.500 5.500 0 0 1 10 3c0 8-10 14-10 14z"/>',
    chart:'<path d="M5 25V17M12 25V12M19 25V8M26 25V4"/>',
    factory:'<path d="M4 25V13l7 5v-5l7 5V6h6v19zM4 25h22"/>',
    land:'<path d="M3 21c5-8 10-8 14-2 2-4 6-4 10 2M3 26h24"/><circle cx="22" cy="8" r="3"/>',
    leaf:'<path d="M6 24c0-12 6-18 18-18 0 12-6 18-18 18zM6 24l10-10"/>',
    scroll:'<path d="M8 5h14v17a3 3 0 0 1-3 3H8zM12 11h6M12 16h6"/><path d="M8 25a3 3 0 0 1-3-3v-2h3"/>'
  };
  var phil=[
    ["Thales","c. 624–546 BC","Water is the source of everything. The first try at explaining nature from nature itself.","drop","--sky"],
    ["Aristotle","384–322 BC","Every living thing has its own purpose. Humans sit inside an ordered nature.","target","--butter"],
    ["Thomas Aquinas","1225–1274","Creation reflects the divine. People may use nature, but as stewards who answer for it.","sun","--peach"],
    ["Francis Bacon","1561–1626","Knowledge is power over nature. Science should make nature serve human needs.","flask","--lilac"],
    ["René Descartes","1596–1650","Animals are complex machines. Mind and matter are separate things.","gear","--rose"],
    ["J.-J. Rousseau","1712–1778","Civilisation corrupts. A life closer to nature is freer and more honest.","hill","--mint"],
    ["Adam Smith","1723–1790","Markets and self-interest create wealth. Nature appears mostly as land and resources.","coin","--butter"],
    ["Immanuel Kant","1724–1804","Cruelty to animals is wrong mainly because it damages our own moral character.","star","--sky"],
    ["Jeremy Bentham","1748–1832","The question is not whether animals can reason, but whether they can suffer.","heart","--rose"],
    ["Thomas Malthus","1766–1834","Population grows faster than food supply. An early warning about natural limits.","chart","--peach"],
    ["Karl Marx","1818–1883","Industrial capitalism breaks the exchange between society and the soil.","factory","--lilac"],
    ["Aldo Leopold","1887–1948","The land ethic: people are plain members of a community of soils, waters, plants and animals.","land","--mint"],
    ["Arne Næss","1912–2009","Deep ecology: every living being has value in itself, not only in its use to us.","leaf","--mint-deep"],
    ["Roderick Nash","b. 1939","Moral rights have widened through history. Nature is the next step.","scroll","--butter"]
  ];
  $("strip").innerHTML=phil.map(function(p){return '<article class="ph" style="background:var('+p[4]+')"><div class="med"><svg viewBox="0 0 30 30">'+IC[p[3]]+'</svg></div><span class="yr">'+p[1]+'</span><h3>'+p[0]+'</h3><p>'+p[2]+'</p></article>'}).join("");

  /* ---------- ecology wheel ---------- */
  var MN=["January","February","March","April","May","June","July","August","September","October","November","December"];
  var MC=["--sky","--sky","--mint","--rose","--mint","--butter","--butter","--butter","--peach","--peach","--peach","--sky"];
  var days={
    0:[["26","World Environmental Education Day","What should every adult know about the place they live?"]],
    1:[["2","World Wetlands Day","Does a swamp have value if no one ever visits it?"]],
    2:[["3","World Wildlife Day","Do wild animals have rights, or only interests?"],["21","International Day of Forests","Who owns a forest: its owner, its town, or no one?"],["22","World Water Day","Should water ever be sold for profit?"]],
    3:[["22","Earth Day","If Earth could speak, what would it ask of us?"]],
    4:[["22","International Day for Biological Diversity","Is losing a species we never knew still a loss?"]],
    5:[["5","World Environment Day","Whose responsibility is a clean environment?"],["8","World Oceans Day","Can something with no borders be protected by nations?"],["17","Desertification and Drought Day","Who pays when land stops giving?"]],
    6:[["3","International Plastic Bag Free Day","Is convenience a good enough reason?"]],
    7:[["All month","Summer reading","Read one chapter of Leopold or Næss and discuss it with a friend."]],
    8:[["16","International Day for the Preservation of the Ozone Layer","What does the ozone success teach us about cooperation?"]],
    9:[["16","World Food Day","Is wasting food a moral failure?"]],
    10:[["6","Day for Preventing the Exploitation of the Environment in War","Is nature a victim of war?"],["16–19","GreenMind workshop in Eskişehir","Climate justice and the rights of nature."]],
    11:[["5","World Soil Day","Can we owe something to the ground under our feet?"],["11","International Mountain Day","Why do mountains make people stop and think?"]]
  };
  var wheel=$("wheel"),C=170;
  function pt(r,a){var x=a*Math.PI/180;return (C+r*Math.cos(x)).toFixed(1)+" "+(C+r*Math.sin(x)).toFixed(1)}
  var segs="";
  for(var mi=0;mi<12;mi++){var a0=mi*30-90+1,a1=mi*30-60-1,mid=mi*30-75;
    segs+='<g class="seg" data-m="'+mi+'" role="button" tabindex="0" aria-label="'+MN[mi]+'"><path fill="var('+MC[mi]+')" d="M'+pt(160,a0)+'A160 160 0 0 1 '+pt(160,a1)+'L'+pt(84,a1)+'A84 84 0 0 0 '+pt(84,a0)+'Z"/><text x="'+pt(122,mid).split(" ")[0]+'" y="'+pt(122,mid).split(" ")[1]+'">'+MN[mi].slice(0,3)+'</text></g>';}
  wheel.innerHTML=segs+'<circle cx="170" cy="170" r="74" fill="var(--bg)"/><text class="ctr2" x="170" y="150">MONTH</text><text class="ctr" id="wctr" x="170" y="176"></text>';
  function showMonth(i){
    [].forEach.call(wheel.querySelectorAll(".seg"),function(g){g.classList.toggle("on",+g.dataset.m===i)});
    $("wctr").textContent=MN[i];
    $("days").innerHTML=days[i].map(function(d){return '<li><span class="d">'+d[0]+'</span><div><b>'+d[1]+'</b><small>'+d[2]+'</small></div></li>'}).join("");
  }
  function pick(e){var g=e.target.closest(".seg");if(g)showMonth(+g.dataset.m)}
  wheel.addEventListener("click",pick);
  wheel.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();pick(e)}});
  showMonth(new Date().getMonth());

  /* ---------- ecosystem pyramid ---------- */
  var LY=[["Apex predators","eagles, wolves, sharks",30,"--rose"],["Secondary consumers","frogs, songbirds, small fish",54,"--peach"],["Primary consumers","insects, rabbits, zooplankton",77,"--butter"],["Producers","plants, algae, phytoplankton",100,"--mint-deep"]];
  var PR=[
    ["Clear a forest","Fewer plants means less food and shelter at every level above.",[.6,.65,.7,.55]],
    ["Spray pesticides","Insects fall first. The poison then builds up in the animals that eat them.",[.6,.7,.55,1]],
    ["Overfish and overhunt","With top predators gone, grazers multiply and strip the plants.",[.4,.85,1.15,.9]],
    ["Warm the climate","Seasons shift and species fall out of step with their food.",[.8,.8,.8,.8]]
  ],on=[false,false,false,false];
  $("layers").innerHTML=LY.map(function(l,i){return '<div class="ly"><div class="ghost" style="width:'+l[2]+'%"><div class="fill" id="f'+i+'" style="width:100%;background:var('+l[3]+')"></div></div><div class="lab"><b>'+l[0]+'</b><span>'+l[1]+'</span> <em id="v'+i+'">100%</em></div></div>'}).join("");
  $("press").innerHTML=PR.map(function(p,i){return '<button type="button" aria-pressed="false" data-i="'+i+'"><i></i><div><b>'+p[0]+'</b><span>'+p[1]+'</span></div></button>'}).join("");
  $("press").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;var i=+b.dataset.i;on[i]=!on[i];b.setAttribute("aria-pressed",on[i]);
    LY.forEach(function(l,k){var v=1;PR.forEach(function(p,j){if(on[j])v*=p[2][k]});$("f"+k).style.width=Math.min(100,v*100)+"%";$("v"+k).textContent=Math.round(v*100)+"%"})});

  /* ---------- ethics quiz ---------- */
  var views=[["Mechanistic","Nature is a machine with no value of its own."],["Strict anthropocentric","Only humans matter morally. Nature is a resource."],["Weak anthropocentric","Humans come first, but we protect nature for future generations."],["Humanist ecocentric","Nature has its own value. We need deep reform."],["Strict ecocentric","The whole ecosystem matters more than any one species, including us."]];
  var qs=[
    ["A rare plant grows where a hospital is planned. What should happen?",["Build. A plant is just matter.","Build. People’s health comes first.","Build, but replant the species elsewhere.","Find another site. The plant has a right to exist.","No building. The ecosystem comes first."]],
    ["Why protect a river?",["There is no reason unless it is useful.","Because people need clean water.","Because our grandchildren will need it.","Because the river has value of its own.","Because people are only one part of the river’s living system."]],
    ["Eating meat is…",["Not a moral question at all.","Fine. Animals exist for us.","Fine, if it is done sustainably.","Hard to justify where alternatives exist.","Only acceptable as part of a natural food web."]]
  ];
  var sp=$("spectrum"),qz=$("quiz"),bal=$("balance"),qi=0,total=0;
  sp.innerHTML=views.map(function(v){return "<div><b>"+v[0]+".</b> "+v[1]+"</div>"}).join("");
  function tilt(avg){bal.style.setProperty("--tilt",((avg-2)*7)+"deg")}
  function renderQ(){
    if(qi>=qs.length){var pos=Math.round(total/qs.length);[].forEach.call(sp.children,function(d,i){d.classList.toggle("hit",i===pos)});
      qz.innerHTML='<span class="progress">Your result</span><p class="qt">You sit closest to the '+views[pos][0].toLowerCase()+' view.</p><p style="color:var(--muted)">There is no right answer. Compare with someone else and ask why you differ.</p><div><button class="btn" id="again">Start again</button></div>';
      $("again").onclick=function(){qi=0;total=0;tilt(2);[].forEach.call(sp.children,function(d){d.classList.remove("hit")});renderQ()};return}
    var q=qs[qi],order=[0,1,2,3,4].sort(function(){return Math.random()-.5});
    qz.innerHTML='<span class="progress">Question '+(qi+1)+' of '+qs.length+'</span><p class="qt">'+q[0]+'</p><div class="opts">'+order.map(function(i){return '<button type="button" data-v="'+i+'">'+q[1][i]+'</button>'}).join("")+'</div>';
    qz.querySelector(".opts").onclick=function(e){var b=e.target.closest("button");if(!b)return;total+=+b.dataset.v;qi++;tilt(total/qi);renderQ()};
  }
  renderQ();

  /* ---------- tabu ---------- */
  var cards=[["Sustainability",["Green","Future","Environment","Resources","Last"]],["Deep ecology",["Næss","Nature","Value","Shallow","Deep"]],["Anthropocentrism",["Human","Centre","Man","Nature","Value"]],["Carbon footprint",["CO₂","Foot","Emissions","Travel","Climate"]],["Biodiversity",["Species","Life","Variety","Animals","Plants"]],["Stoicism",["Seneca","Calm","Emotion","Greek","Virtue"]],["Climate justice",["Fair","Poor","Rich","Countries","Law"]],["Minimalism",["Less","Things","Simple","Buy","Own"]],["Land ethic",["Leopold","Soil","Community","Farm","Moral"]],["Rights of nature",["River","Court","Law","Person","Legal"]]];
  var ci=0,score=0,tc=$("tcard"),tcols=["--lilac","--butter","--rose","--sky","--peach"];
  function showCard(){$("tabu-target").textContent=cards[ci][0];$("tabu-forbid").innerHTML=cards[ci][1].map(function(w){return "<li>"+w+"</li>"}).join("");tc.style.background="var("+tcols[ci%tcols.length]+")"}
  function nextCard(){ci=(ci+1)%cards.length;if(!motionOK){showCard();return}tc.classList.remove("flip");void tc.offsetWidth;tc.classList.add("flip");setTimeout(showCard,220)}
  $("tabu-next").onclick=nextCard;
  $("tabu-score").onclick=function(){score++;$("score").textContent=score;nextCard()};
  showCard();

  /* ---------- copy email ---------- */
  $("copy").addEventListener("click",function(){var el=$("mail"),btn=this;function sel(){getSelection().selectAllChildren(el)}
    try{navigator.clipboard.writeText(el.textContent).then(function(){btn.textContent="Copied";setTimeout(function(){btn.textContent="Copy"},1500)},sel)}catch(e){sel()}});
})();
