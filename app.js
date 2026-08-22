const params=new URLSearchParams(location.search);
const id=params.get("id")||params.get("page")||"hackmenuios";
const data=pages[id];

if(!data){
 document.body.innerHTML='<div style="color:white;text-align:center;padding:50px;font-family:Arial">❌ Link không hợp lệ hoặc đã hết hạn.</div>';
 throw new Error("Invalid page: "+id);
}

let done1=false,done2=false,done3=false,done4=false;

const AD_LINKS=[
 "https://vt.tiktok.com/ZS9h3gQA8qtcw-5DkY3/",
 "https://vt.tiktok.com/ZS9g3gAbafKqu-OVqcS/"
];

function openAd(step){
 const ad=AD_LINKS[(step-1)%AD_LINKS.length];
 try{window.open(ad,"_blank","noopener,noreferrer")}catch(e){}
}

function openTask(step,link){
 openAd(step);
 setTimeout(()=>{try{window.open(link,"_blank","noopener,noreferrer")}catch(e){}},120);
}

function updateProgress(){
 const count=[done1,done2,done3,done4].filter(Boolean).length;
 document.getElementById("progress").style.width=(count*25)+"%";
 document.getElementById("percent").textContent=count+" / 4";
 const ids=[["task1",done1],["task2",done2],["task3",done3],["task4",done4]];
 ids.forEach(([x,ok])=>document.getElementById(x).classList.toggle("completed",ok));
}

function subscribeYoutube(){
 if(done1)return;
 done1=true;updateProgress();openTask(1,data.sub);
}
function subscribeCyber(){
 if(done2)return;
 done2=true;updateProgress();openTask(2,data.cyberSub);
}
function likeVideo(){
 if(done3)return;
 done3=true;updateProgress();openTask(3,data.like);
}
function joinTelegram(){
 if(done4)return;
 done4=true;updateProgress();openTask(4,data.tele);
}

function verifyTasks(){
 if(!(done1&&done2&&done3&&done4)){
   alert("Vui lòng hoàn thành đủ 4 bước trước khi mở khóa!");
   return;
 }
 const btn=document.getElementById("verifyBtn");
 btn.disabled=true;
 let t=5;
 btn.innerHTML='<i class="fa-solid fa-shield-halved"></i> Đang xác minh '+t+'s';
 const timer=setInterval(()=>{
   t--;
   btn.innerHTML=t>0
     ?'<i class="fa-solid fa-shield-halved"></i> Đang xác minh '+t+'s'
     :'<i class="fa-solid fa-circle-check"></i> Đã xác minh';
   if(t<=0){
     clearInterval(timer);
     document.getElementById("unlockBox").style.display="block";
   }
 },1000);
}

function openUnlock(){
 const b=document.getElementById("openBtn");
 b.disabled=true;b.textContent="Đang chuyển hướng...";
 window.open("https://vt.tiktok.com/ZS9rjdWyymvK4-b2Bgs/","_blank","noopener,noreferrer");
 setTimeout(()=>location.href=data.unlock,1800);
}

function openGuide(){
 window.open("https://youtu.be/obW5KpwwOzA","_blank","noopener,noreferrer");
}

function updateClock(){
 const d=new Date();
 document.getElementById("clock").textContent=d.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"});
}
updateClock();setInterval(updateClock,30000);

function toggleTheme(){
 document.body.classList.toggle("light");
}
updateProgress();
