const params=new URLSearchParams(location.search);
const id=params.get("id")||params.get("page")||"hackmenuios";
const data=pages[id];

if(!data){
 document.body.innerHTML='<div style="color:white;text-align:center;padding:50px;font-family:Arial">❌ Link không hợp lệ hoặc đã hết hạn.</div>';
 throw new Error("Invalid page: "+id);
}

/*
 * FLOW NHIỆM VỤ:
 * 1. Bấm nhiệm vụ -> mở đúng 1 quảng cáo ở tab mới.
 * 2. Tab nhiệm vụ tự chuyển sang link YouTube/Telegram tương ứng.
 * 3. Khi người dùng quay lại trang nhiệm vụ -> phải chờ đủ thời gian xác nhận
 *    rồi bấm "Xác nhận bước". Không đánh dấu hoàn thành ngay khi vừa bấm nhiệm vụ.
 * 4. Phiên nhiệm vụ tự RESET sau 2 phút kể từ hoạt động đầu tiên.
 */
const STORAGE_KEY="nghialqtv_unlock_"+id;
const SESSION_TTL=2*60*1000;
const CONFIRM_TIME=5;

function toggleTheme(){
  document.body.classList.toggle("light");
  try{localStorage.setItem("nghialqtv_theme",document.body.classList.contains("light")?"light":"dark");}catch(e){}
}
try{if(localStorage.getItem("nghialqtv_theme")==="light")document.body.classList.add("light");}catch(e){}

let saved={};
try{saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")}catch(e){saved={};}

// Tự reset nếu phiên cũ quá 2 phút.
if(saved.sessionStarted && Date.now()-saved.sessionStarted>SESSION_TTL){
  try{localStorage.removeItem(STORAGE_KEY);}catch(e){}
  saved={};
}

let done1=!!saved.done1,done2=!!saved.done2,done3=!!saved.done3,done4=!!saved.done4;
let pendingStep=Number(saved.pendingStep||0);
let pendingAt=Number(saved.pendingAt||0);
let sessionStarted=Number(saved.sessionStarted||0);
let confirmTimer=null;

function stateObject(){
  return {done1,done2,done3,done4,pendingStep,pendingAt,sessionStarted};
}

function saveState(){
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(stateObject()));}catch(e){}
  updateProgress();
  updatePendingUI();
}

function startSession(){
  if(!sessionStarted) sessionStarted=Date.now();
}

function taskIsDone(step){return [done1,done2,done3,done4][step-1];}
function setDone(step,value){
  if(step===1)done1=value;
  if(step===2)done2=value;
  if(step===3)done3=value;
  if(step===4)done4=value;
}

function taskLabel(step){
  return step===1?"Đăng ký kênh NghĩaLQ TV":step===2?"Đăng ký kênh Cyber Mods":step===3?"Like Video":"Tham gia nhóm Telegram";
}

function runTask(step,targetUrl){
  if(taskIsDone(step)||pendingStep||!targetUrl)return;

  startSession();
  pendingStep=step;
  pendingAt=Date.now();
  saveState();

  // Mở thẳng link nhiệm vụ. Quảng cáo KHÔNG chạy ở bước này.
  // Quảng cáo chỉ được mở khi người dùng bấm "Xác nhận bước".
  window.location.assign(targetUrl);
}

function subscribeYoutube(){runTask(1,data.sub)}
function subscribeCyber(){runTask(2,data.cyberSub)}
function likeVideo(){runTask(3,data.like)}
function joinTelegram(){runTask(4,data.tele)}

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

function updatePendingUI(){
  const ids=[1,2,3,4];
  ids.forEach(step=>{
    const el=document.getElementById("task"+step);
    if(!el)return;
    const small=el.querySelector("small");
    if(!small)return;

    if(done1&&step===1 || done2&&step===2 || done3&&step===3 || done4&&step===4){
      small.textContent="Đã xác nhận ✓";
      return;
    }
    if(pendingStep===step){
      const remain=Math.max(0,CONFIRM_TIME-Math.floor((Date.now()-pendingAt)/1000));
      small.textContent=remain>0?"Quay lại trang này • xác nhận sau "+remain+"s":"Đã đủ thời gian • bấm để xác nhận";
      el.classList.add("pending");
    }else{
      el.classList.remove("pending");
      small.textContent=step===3?"Mở video và bấm Like":step===4?"Nhấn để tham gia nhóm":"Nhấn để đăng ký kênh YouTube";
    }
  });

  // Nút xác nhận riêng, không cần tạo lại HTML.
  const verifyStep=document.getElementById("stepConfirm");
  if(!verifyStep)return;
  if(!pendingStep){
    verifyStep.style.display="none";
    return;
  }
  const remain=Math.max(0,CONFIRM_TIME-Math.floor((Date.now()-pendingAt)/1000));
  verifyStep.style.display="block";
  verifyStep.disabled=remain>0;
  verifyStep.innerHTML=remain>0
    ? '<i class="fa-solid fa-hourglass-half"></i> Xác nhận '+taskLabel(pendingStep)+' sau '+remain+'s'
    : '<i class="fa-solid fa-circle-check"></i> Xác nhận bước '+pendingStep;
}

function confirmPending(){
  if(!pendingStep)return;
  const elapsed=Date.now()-pendingAt;
  if(elapsed<CONFIRM_TIME*1000){updatePendingUI();return;}

  const step=pendingStep;

  // Chỉ tại đây mới mở 1 quảng cáo random.
  // Vì đây là thao tác click trực tiếp của người dùng nên popup ít bị trình duyệt chặn.
  if(typeof window.tiktokAdGate==="function"){
    window.tiktokAdGate();
  }

  setDone(step,true);
  pendingStep=0;
  pendingAt=0;
  saveState();
}

function verifyTasks(){
  if(!(done1&&done2&&done3&&done4)){
    alert("Vui lòng hoàn thành và xác nhận đủ 4 bước trước khi mở khóa!");
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
  location.href=data.unlock;
}

function openGuide(){window.open("https://youtu.be/kQGxcf2Pdc4?si=te-oGDi81xcU6lLL","_blank");}

function updateClock(){
  const d=new Date();
  const el=document.getElementById("clock");
  if(el)el.textContent=d.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"});
}

// Khi quay lại từ YouTube/Telegram, cập nhật bộ đếm xác nhận.
// Flow: Bấm nhiệm vụ -> đi thẳng link đích -> quay lại -> chờ -> Xác nhận -> quảng cáo.
function onReturn(){
  if(sessionStarted && Date.now()-sessionStarted>SESSION_TTL){
    try{localStorage.removeItem(STORAGE_KEY);}catch(e){}
    location.reload();
    return;
  }
  updatePendingUI();
}

window.addEventListener("pageshow",onReturn);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")onReturn();});

updateClock();
setInterval(updateClock,30000);
setInterval(updatePendingUI,1000);
updateProgress();
updatePendingUI();
