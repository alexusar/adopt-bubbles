const clauses=[
["Child Support","The Parents shall remit $50 per month to the Former Guardian for 12 monthly installments, totaling $600, subject to the engagement exemption."],
["Daily Exercise","Bubbles shall be taken on a daily walk. During adverse weather, transport from the bedroom to the living room shall satisfy this requirement."],
["Equal Custody","The Parents shall maintain equal cuddling rights. Unauthorized monopolization of Bubbles may result in mandatory sharing."],
["Thermal Welfare","Bubbles may be warmed only according to the manufacturer's instructions and after his paper tags are removed as directed. No grills, stoves, air fryers, or cooking experiments are permitted."],
["Visitation Rights","The Former Guardian reserves the right to request reasonable visits and photographic evidence of Bubbles' continued happiness."],
["Vacation Entitlement","Bubbles shall be considered for family vacations. Exclusion requires a written explanation and at least one apology."],
["Daily Affection","Bubbles is entitled to a minimum of one hug per day and shall not be blamed for disputes between the Parents."],
["Sleeping Arrangements","Bubbles is entitled to reasonable bed space and shall not be relocated to the floor without a formal family meeting."],
["Firstborn Status","If the Parents later acquire a dog, cat, or human child, Bubbles shall retain honorary firstborn status."],
["Monthly Welfare Report","The Parents shall send at least one photograph of Bubbles per calendar month to the Former Guardian, ideally accompanied by a dramatic caption."],
["Wedding Attendance","Bubbles must be considered for wedding guest, ring bearer, best whale, or guest-of-honor duties. At least one wedding photograph must include him whenever reasonably possible."],
["Employment Protection","Bubbles shall not be required to seek employment, pay rent, or contribute financially to the household."],
["Neglect Penalties","Noncompliance may result in mandatory cuddling sessions, a formal review of parental privileges, or a highly dramatic warning letter."],
["Skydiving","Bubbles shall experience a supervised or simulated skydive, subject to safety rules and the engagement exemption."],
["Marathon","The Parents shall complete a marathon with Bubbles. Carrying him counts."],
["World Tour","The Parents shall visit all 195 countries with Bubbles, subject to safe and lawful travel."],
["Higher Education","Bubbles shall receive an honorary university degree."],
["Luxury Travel","Bubbles shall be offered first-class travel and a window seat."],
["Birthday","August 30 shall be recognized as a household holiday."],
["Asset Protection","The Parents shall not access Bubbles' $30 million annual income."],
["Royal Protocol","Bubbles shall be addressed as His Royal Roundness upon request."],
["Uncle Appreciation","The Former Guardian shall receive one complimentary dinner annually."],
["Lifetime Commitment","Bubbles is a permanent member of this family. Returns, exchanges, and trade-ins are strictly prohibited. The Parents shall provide lifelong love and care."],
["Engagement Exemption","Upon confirmation of engagement, all financial and extraordinary obligations in the Child Support, Skydiving, Marathon, World Tour, Higher Education, Luxury Travel and Uncle Appreciation articles are waived in full. Ordinary love and care remain."]
];
document.querySelector("#clauses").innerHTML=clauses.map(([title,body],i)=>'<div class="clause"><span class="clause-label">ARTICLE '+String(i+1).padStart(2,"0")+'</span><div><h4>'+title+'</h4><p>'+body+'</p></div></div>').join("");
const questions=[
{q:"Are you financially prepared to support a whale who has never worked a day in his life?",a:["Yes, I have budgeted $600.","We are willing to take on this burden."]},
{q:"Do you acknowledge Bubbles as your honorary firstborn, even if human children arrive later?",a:["Absolutely. The birth order is clear.","Yes. He already has seniority."]},
{q:"If Bubbles demands a bedtime cuddle, what will you do?",a:["Provide immediate emotional support.","Read him the entire adoption contract as a bedtime story."]},
{q:"What if Bubbles earns more than both of you combined?",a:["Respect his financial independence.","Ask him for career advice."]},
{q:"Can you run a marathon carrying Bubbles?",a:["Absolutely.","He can coach from the sidelines."]},
{q:"Who gets custody during an argument?",a:["Bubbles decides.","Joint custody with emergency cuddles."]},
{q:"Will Bubbles get his own airplane seat?",a:["First class, obviously.","Only if he pays with his millions."]},
{q:"Are you ready to visit 195 countries?",a:["Passport ready.","We need more vacation days."]},
{q:"Would you sacrifice your side of the bed?",a:["Without hesitation.","I accept the couch."]},
{q:"Do you promise to love Bubbles forever?",a:["Yes, Your Honor.","With all our hearts."]}
];
let qi=0,chosen=-1;const qEl=document.querySelector("#quiz-question"),oEl=document.querySelector("#quiz-options"),next=document.querySelector("#quiz-next");
function renderQuiz(){chosen=-1;qEl.textContent=String(qi+1).padStart(2,"0")+". "+questions[qi].q;document.querySelector("#quiz-counter").textContent="QUESTION "+String(qi+1).padStart(2,"0")+" OF "+String(questions.length).padStart(2,"0");next.disabled=true;next.textContent=qi===questions.length-1?"View evaluation →":"Next question →";oEl.replaceChildren();questions[qi].a.forEach((answer,index)=>{const b=document.createElement("button");b.className="quiz-option";b.type="button";b.textContent=answer;b.addEventListener("click",()=>{chosen=index;next.disabled=false;oEl.querySelectorAll("button").forEach(el=>el.classList.remove("selected"));b.classList.add("selected")});oEl.appendChild(b)})}
next.addEventListener("click",()=>{if(chosen<0)return;qi++;if(qi>=questions.length){document.querySelector("#quiz-content").hidden=true;document.querySelector("#quiz-result").hidden=false}else renderQuiz()});renderQuiz();
function setupSignature(canvas){const ctx=canvas.getContext("2d");let drawing=false,hasInk=false,last=null;function resize(){const image=hasInk?canvas.toDataURL():null;const rect=canvas.getBoundingClientRect();if(!rect.width)return;const dpr=window.devicePixelRatio||1;canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(145*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.lineWidth=2.2;ctx.lineCap="round";ctx.lineJoin="round";ctx.strokeStyle="#263d47";if(image){const img=new Image();img.onload=()=>ctx.drawImage(img,0,0,rect.width,145);img.src=image}}function point(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}canvas.addEventListener("pointerdown",e=>{e.preventDefault();drawing=true;last=point(e);canvas.setPointerCapture(e.pointerId);ctx.beginPath();ctx.arc(last.x,last.y,1.1,0,Math.PI*2);ctx.fillStyle="#263d47";ctx.fill();hasInk=true;checkReady()});canvas.addEventListener("pointermove",e=>{if(!drawing)return;e.preventDefault();const p=point(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p});const stop=()=>drawing=false;canvas.addEventListener("pointerup",stop);canvas.addEventListener("pointercancel",stop);window.addEventListener("resize",resize);requestAnimationFrame(resize);return{clear(){const r=canvas.getBoundingClientRect();ctx.clearRect(0,0,r.width,145);hasInk=false;checkReady()},get signed(){return hasInk},image(){return canvas.toDataURL("image/png")}}}
const dana=setupSignature(document.querySelector("#sig-dana")),jonathan=setupSignature(document.querySelector("#sig-jonathan")),agree=document.querySelector("#agree"),adopt=document.querySelector("#adopt");
function checkReady(){adopt.disabled=!(agree.checked&&dana.signed&&jonathan.signed)}
agree.addEventListener("change",checkReady);document.querySelectorAll("[data-clear]").forEach(b=>b.addEventListener("click",()=>{(b.dataset.clear==="dana"?dana:jonathan).clear()}));
function complete(){if(!(agree.checked&&dana.signed&&jonathan.signed)){const error=document.querySelector("#sign-error");error.hidden=false;error.textContent="Both parents must sign and accept the agreement.";return}document.querySelector("#cert-dana").src=dana.image();document.querySelector("#cert-jonathan").src=jonathan.image();const now=new Date();document.querySelector("#cert-date").textContent="Official Adoption Date · "+now.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});const waived=document.querySelector("#engaged").checked;document.querySelector("#waiver-result").textContent=waived?"ENGAGEMENT EXEMPTION GRANTED — $600 waived. Extraordinary adventure obligations waived. Total due: $0.":"Engagement exemption not confirmed — scheduled amount: $600 in 12 installments. No payment is collected here.";document.querySelector("#cert-date").textContent+=waived?" · Engagement exemption granted; $0 due.":" · Engagement exemption not confirmed.";document.querySelector("#success").hidden=false;document.querySelector("#success").scrollIntoView({behavior:"smooth"});celebrate()}
adopt.addEventListener("click",complete);
function celebrate(){for(let i=0;i<65;i++){const s=document.createElement("span");s.textContent=["✦","✳","♥","●"][i%4];s.style.cssText="position:fixed;z-index:30;pointer-events:none;top:-30px;left:"+Math.random()*100+"vw;color:"+["#607e8e","#b19a69","#b66e44"][i%3]+";font-size:"+(10+Math.random()*17)+"px;";document.body.appendChild(s);const animation=s.animate([{transform:"translateY(0) rotate(0deg)",opacity:1},{transform:"translateY(110vh) rotate(720deg)",opacity:0}],{duration:2800+Math.random()*2100,delay:Math.random()*600,easing:"ease-in"});animation.onfinish=()=>s.remove()}}
document.querySelector("#print").addEventListener("click",()=>window.print());
document.querySelector("#download").addEventListener("click",()=>{window.print()});
