const params=new URLSearchParams(location.search);
const id=(params.get("id")||params.get("page")||"hackmenuios").trim();
const data=pages[id];

if(!data){
 document.body.innerHTML='<div style="color:white;text-align:center;padding:50px;font-family:Arial">❌ Link không hợp lệ hoặc đã hết hạn.</div>';
 throw new Error("Invalid page: "+id);
}

/*
 * FLOW NHIỆM VỤ MỚI:
 * - Không còn nút "Xác nhận bước".
 * - Bấm một nhiệm vụ -> mở link nhiệm vụ ở tab mới.
 * - Sau 3 giây tự động mở 1 quảng cáo và tự đánh dấu bước hoàn thành.
 * - Sau khi bước trước hoàn thành mới được làm bước tiếp theo.
 */
const APP_STATE_VERSION=11;
const SESSION_TTL=2*60*1000;
const AD_DELAY=3*1000;

// Trạng thái chỉ sống trong tab hiện tại. Reload trang = phiên mới hoàn toàn.
let sessionStarted=0;
let pendingStep=0;
let pendingAt=0;
let adTimer=null;
let expiryTimer=null;
let taskWindow=null;

let done1=false,done2=false,done3=false,done4=false;

function saveState(){
  updateProgress();
  updateTaskUI();
}

function armExpiryTimer(){
  if(expiryTimer)clearTimeout(expiryTimer);
  if(!sessionStarted)return;
  const remain=Math.max(0,sessionStarted+SESSION_TTL-Date.now());
  expiryTimer=setTimeout(checkSessionExpiry,remain+50);
}
function startSession(){
  if(!sessionStarted)sessionStarted=Date.now();
  armExpiryTimer();
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
function taskDescription(step){
  return step===1?"Nhấn để đăng ký kênh YouTube":step===2?"Nhấn để đăng ký kênh YouTube":step===3?"Mở video và bấm Like":"Nhấn để tham gia nhóm Telegram";
}

function getNextStep(){
  if(!done1)return 1;
  if(!done2)return 2;
  if(!done3)return 3;
  if(!done4)return 4;
  return 0;
}

function pickAdUrl(){
  try{
    if(typeof window.tiktokAdGate==="function"){
      const ad=window.tiktokAdGate();
      if(typeof ad==="string" && /^https?:\/\//i.test(ad)) return ad;
    }
  }catch(e){}
  const links=Array.isArray(window.TIKTOK_AD_LINKS)
    ? window.TIKTOK_AD_LINKS.map(String).filter(u=>/^https?:\/\//i.test(u)) : [];
  if(!links.length)return "";
  return links[Math.floor(Math.random()*links.length)];
}

function runTask(step,targetUrl){
  if(!targetUrl || taskIsDone(step) || pendingStep)return;
  const next=getNextStep();
  if(next!==step)return;

  startSession();
  pendingStep=step;
  pendingAt=Date.now();
  saveState();

  // Chỉ mở MỘT tab từ thao tác click của người dùng.
  // Sau 3 giây tab này sẽ được chuyển sang quảng cáo. Trang chính không đổi URL.
  try{
    // Tạo tab rỗng ngay trong thao tác click của người dùng.
    // Sau đó mới điều hướng sang nhiệm vụ; Chrome Android ít chặn hơn.
    taskWindow=window.open("about:blank","_blank");
    if(taskWindow){
      taskWindow.location.href=String(targetUrl);
    }
  }catch(e){taskWindow=null;}

  if(!taskWindow){
    pendingStep=0;
    pendingAt=0;
    saveState();
    const notice=document.getElementById("percent");
    if(notice)notice.textContent="0 / 4 • Hãy cho phép mở tab mới rồi thử lại";
    return;
  }

  try{taskWindow.opener=null;}catch(e){}
  scheduleAutoComplete();
}

function subscribeYoutube(){runTask(1,data.sub)}
function subscribeCyberMods(){runTask(2,data.cyberMods)}
function likeVideo(){runTask(3,data.like)}
function joinTelegram(){runTask(4,data.tele)}

function openAutoAd(){
  const ad=pickAdUrl();
  if(!ad)return false;

  // Ưu tiên chính tab nhiệm vụ đã được tạo từ cú click.
  try{
    if(taskWindow && !taskWindow.closed){
      taskWindow.location.href=ad;
      return true;
    }
  }catch(e){}

  // Fallback: thử popup mới. Nếu trình duyệt chặn thì không làm treo trang chính.
  try{
    const w=window.open(ad,"_blank");
    if(w){taskWindow=w;return true;}
  }catch(e){}
  return false;
}

function completePending(){
  adTimer=null;
  if(!pendingStep)return;
  if(checkSessionExpiry())return;

  const step=pendingStep;
  const elapsed=Date.now()-pendingAt;
  if(elapsed<AD_DELAY){scheduleAutoComplete();return;}

  // Quảng cáo chỉ là bước phụ; tuyệt đối không để lỗi popup/tab làm kẹt nhiệm vụ.
  try{ openAutoAd(); }catch(e){}
  setDone(step,true);
  pendingStep=0;
  pendingAt=0;
  saveState();
}

function scheduleAutoComplete(){
  if(adTimer)clearTimeout(adTimer);
  if(!pendingStep)return;
  const remain=Math.max(0,AD_DELAY-(Date.now()-pendingAt));
  adTimer=setTimeout(completePending,remain+20);
  updateTaskUI();
}

function updateProgress(){
  const count=[done1,done2,done3,done4].filter(Boolean).length;
  const progress=document.getElementById("progress");
  const percent=document.getElementById("percent");
  if(progress)progress.style.width=(count*25)+"%";
  if(percent)percent.textContent=count+" / 4";
  [["task1",done1],["task2",done2],["task3",done3],["task4",done4]].forEach(([x,ok])=>{
    const el=document.getElementById(x);
    if(el)el.classList.toggle("completed",ok);
  });
  const box=document.getElementById("unlockBox");
  if(box)box.style.display=(done1&&done2&&done3&&done4)?"block":"none";
}

function updateTaskUI(){
  const ids=[1,2,3,4];
  ids.forEach(step=>{
    const el=document.getElementById("task"+step);
    if(!el)return;
    const small=el.querySelector("small");
    const done=taskIsDone(step);
    const next=getNextStep();

    el.disabled=done || (next!==step) || !!pendingStep;
    el.classList.toggle("pending",pendingStep===step);
    el.classList.toggle("locked",!done && next!==step && !pendingStep);

    if(done){
      small.textContent="Đã hoàn thành ✓";
    }else if(pendingStep===step){
      const remain=Math.max(0,Math.ceil((AD_DELAY-(Date.now()-pendingAt))/1000));
      small.textContent=remain>0?"Đang xử lý • quảng cáo sau "+remain+"s":"Đang mở quảng cáo...";
    }else if(next===step){
      small.textContent=taskDescription(step);
    }else{
      small.textContent="Hoàn thành bước trước để tiếp tục";
    }
  });
}

function openUnlock(){
  const b=document.getElementById("openBtn");
  if(!b)return;
  b.disabled=true;
  b.textContent="Đang chuyển hướng...";
  location.href=data.unlock;
}

function openGuide(){window.open("https://youtu.be/kQGxcf2Pdc4?si=te-oGDi81xcU6lLL","_blank");}

function handleReturnFromTask(){
  if(checkSessionExpiry())return;
  if(pendingStep){
    const elapsed=Date.now()-pendingAt;
    if(elapsed>=AD_DELAY){ completePending(); return; }
    scheduleAutoComplete();
  }
  updateTaskUI();
}

function updateClock(){
  const d=new Date();
  const el=document.getElementById("clock");
  if(el)el.textContent=d.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"});
}

function resetSessionAndReload(){
  done1=done2=done3=done4=false;
  pendingStep=0;
  pendingAt=0;
  sessionStarted=0;
  if(adTimer){clearTimeout(adTimer);adTimer=null;}
  if(expiryTimer){clearTimeout(expiryTimer);expiryTimer=null;}
  try{if(taskWindow && !taskWindow.closed)taskWindow.close();}catch(e){}
  taskWindow=null;
  window.location.reload();
}

function checkSessionExpiry(){
  const now=Date.now();
  const started=Number(sessionStarted||0);
  const expires=Number(started ? started+SESSION_TTL : 0);

  if(expires && now>=expires){
    resetSessionAndReload();
    return true;
  }
  return false;
}



// Mobile Chrome có thể tạm dừng timer khi tab ở nền. Kiểm tra lại ngay
// khi người dùng quay lại trang để không bị kẹt ở trạng thái cũ.
window.addEventListener("pageshow",()=>{
  if(checkSessionExpiry())return;
  if(pendingStep){
    const elapsed=Date.now()-pendingAt;
    if(elapsed>=AD_DELAY) completePending();
    else scheduleAutoComplete();
  }
  updateProgress();
  updateTaskUI();
});

document.addEventListener("visibilitychange",()=>{
  if(document.visibilityState==="visible") window.dispatchEvent(new Event("pageshow"));
});

window.addEventListener("focus",()=>{
  if(checkSessionExpiry())return;
  if(pendingStep)scheduleAutoComplete();
  updateTaskUI();
});

function onReturn(){
  if(checkSessionExpiry())return;
  if(pendingStep)scheduleAutoComplete();
  updateTaskUI();
}


updateClock();
setInterval(updateClock,30000);
setInterval(()=>{
  if(checkSessionExpiry())return;
  if(pendingStep)updateTaskUI();
},1000);
updateProgress();
updateTaskUI();
if(sessionStarted) armExpiryTimer();
if(pendingStep)scheduleAutoComplete();
