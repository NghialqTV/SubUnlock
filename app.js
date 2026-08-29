const params=new URLSearchParams(location.search);
const id=params.get("id")||params.get("page")||"hackmenuios";
const data=pages[id];

if(!data){
 document.body.innerHTML='<div style="color:white;text-align:center;padding:50px;font-family:Arial">❌ Link không hợp lệ hoặc đã hết hạn.</div>';
 throw new Error("Invalid page: "+id);
}

/*
 * Cơ chế tối ưu:
 * 1. Một click người dùng -> mở quảng cáo ở tab mới.
 * 2. Tab hiện tại chuyển trực tiếp tới YouTube/Telegram.
 * 3. Lưu trạng thái bằng localStorage để quay lại trang không mất tiến trình.
 * 4. Không dùng setTimeout để mở popup thứ hai, giảm khả năng Chrome chặn.
 */
const STORAGE_KEY="nghialqtv_unlock_"+id;
const PENDING_KEY="nghialqtv_pending_"+id;
const RESET_AFTER_MS=2*60*1000;

// Theme button on mobile/desktop. Kept local so it cannot break page loading.
function toggleTheme(){
  document.body.classList.toggle("light");
  try {
    localStorage.setItem("nghialqtv_theme", document.body.classList.contains("light") ? "light" : "dark");
  } catch(e) {}
}
try {
  if(localStorage.getItem("nghialqtv_theme")==="light") document.body.classList.add("light");
} catch(e) {}

let saved={};
try{saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")}catch(e){saved={}}

let done1=!!saved.done1,done2=!!saved.done2,done3=!!saved.done3,done4=!!saved.done4;
let pending=null;
try{ pending=JSON.parse(sessionStorage.getItem(PENDING_KEY)||"null"); }catch(e){ pending=null; }

// Tự động reset tiến trình sau 2 phút kể từ lần hoạt động cuối.
function resetWebState(){
  try{
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(PENDING_KEY);
  }catch(e){}
  done1=done2=done3=done4=false;
  pending=null;
  updateProgress();
}

let lastActivity=Date.now();
function touchActivity(){ lastActivity=Date.now(); }
['click','touchstart','keydown'].forEach(ev=>document.addEventListener(ev,touchActivity,{passive:true}));

setInterval(function(){
  if(Date.now()-lastActivity >= RESET_AFTER_MS){
    resetWebState();
    lastActivity=Date.now();
  }
},1000);

function saveState(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      done1: !!done1, done2: !!done2, done3: !!done3, done4: !!done4
    }));
  }catch(e){}
  updateProgress();
}

function setPending(step,targetUrl){
  try{
    sessionStorage.setItem(PENDING_KEY, JSON.stringify({
      step: step, targetUrl: targetUrl, startedAt: Date.now()
    }));
  }catch(e){}
}

function clearPending(){
  try{ sessionStorage.removeItem(PENDING_KEY); }catch(e){}
}

function runTask(step,targetUrl){
  touchActivity();
  const done=[done1,done2,done3,done4];
  if(done[step-1] || !targetUrl) return;

  setPending(step,targetUrl);

  // First go directly to the YouTube task. No ad is opened here.
  window.location.href=targetUrl;
}

function finishReturnedTask(){
  touchActivity();
  if(!pending || !pending.step) return;

  if(pending.startedAt && Date.now()-pending.startedAt > 15*60*1000){
    clearPending();
    pending=null;
    return;
  }

  const step=Number(pending.step);
  clearPending();
  pending=null;

  // Only after returning from YouTube do we open one random ad.
  if(typeof window.tiktokAdGate==="function"){
    window.tiktokAdGate("about:blank");
  }

  if(step===1) done1=true;
  if(step===2) done2=true;
  if(step===3) done3=true;
  if(step===4) done4=true;
  saveState();
}

window.addEventListener("pageshow",function(){
  try{ pending=JSON.parse(sessionStorage.getItem(PENDING_KEY)||"null"); }catch(e){ pending=null; }
  if(pending) setTimeout(finishReturnedTask,150);
});

function subscribeYoutube(){
 if(done1)return;
 runTask(1,data.sub);
}

function subscribeCyber(){
 if(done2)return;
 runTask(2,data.cyberSub);
}

function likeVideo(){
 if(done3)return;
 runTask(3,data.like);
}

function joinTelegram(){
 if(done4)return;
 runTask(4,data.tele);
}

function updateProgress(){
 const count=[done1,done2,done3,done4].filter(Boolean).length;
 const progress=document.getElementById("progress");
 const percent=document.getElementById("percent");

 if(progress)progress.style.width=(count*25)+"%";
 if(percent)percent.textContent=count+" / 4";

 const ids=[["task1",done1],["task2",done2],["task3",done3],["task4",done4]];
 ids.forEach(([x,ok])=>{
   const el=document.getElementById(x);
   if(el)el.classList.toggle("completed",ok);
 });
}

function verifyTasks(){
 if(!(done1&&done2&&done3&&done4)){
   alert("Vui lòng hoàn thành đủ 4 bước trước khi mở khóa!");
   return;
 }

 const btn=document.getElementById("verifyBtn");
 if(!btn)return;

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
     const box=document.getElementById("unlockBox");
     if(box)box.style.display="block";
   }
 },1000);
}

function openUnlock(){
 const b=document.getElementById("openBtn");
 if(!b)return;

 b.disabled=true;
 b.textContent="Đang chuyển hướng...";

 // Bốn nhiệm vụ đã dùng quảng cáo. Nút này chỉ mở link đích.
 location.href=data.unlock;
}

function openGuide(){
 window.open("https://youtu.be/kQGxcf2Pdc4?si=te-oGDi81xcU6lLL");
}

function updateClock(){
 const d=new Date();
 const el=document.getElementById("clock");
 if(el){
   el.textContent=d.toLocaleTimeString("en-US",{
     hour:"numeric",
     minute:"2-digit"
   });
 }
}

updateClock();
setInterval(updateClock,30000);
updateProgress();
