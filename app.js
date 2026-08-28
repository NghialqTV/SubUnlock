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

const RESET_AFTER_MS = 2 * 60 * 1000; // Tự reset sau 2 phút

let saved={};
try{saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")}catch(e){saved={}}

// Nếu quá 2 phút kể từ lần hoàn thành/lưu trạng thái cuối, bắt làm lại từ đầu.
if(saved.updated && (Date.now() - Number(saved.updated) >= RESET_AFTER_MS)){
  localStorage.removeItem(STORAGE_KEY);
  saved={};
}

let done1=!!saved.done1,done2=!!saved.done2,done3=!!saved.done3,done4=!!saved.done4;

const AD_LINKS=[
 "https://omg10.com/4/11023287",
 "https://omg10.com/4/11019149"
];

function saveState(){
 localStorage.setItem(STORAGE_KEY,JSON.stringify({
   done1,done2,done3,done4,
   updated:Date.now()
 }));
 updateProgress();
}

function openAd(adUrl){
 try{
   const popup=window.open(adUrl,"_blank","noopener,noreferrer");
   return !!popup;
 }catch(e){
   return false;
 }
}

/*
 * YouTube/Telegram được điều hướng bằng chính click hiện tại.
 * Đây là phần quan trọng giúp hạn chế popup blocker.
 */
function runTask(step,targetUrl){
 const adUrl=AD_LINKS[(step-1)%AD_LINKS.length];

 // Đánh dấu nhiệm vụ trước khi rời trang.
 if(step===1) done1=true;
 if(step===2) done2=true;
 if(step===3) done3=true;
 if(step===4) done4=true;
 saveState();

 // Quảng cáo ở tab mới.
 openAd(adUrl);

 // Tab hiện tại đi thẳng đến nhiệm vụ.
 window.location.assign(targetUrl);
}

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

 // Link mở khóa phải đi thẳng tới link đã cấu hình trong data.js.
 // Không mở link quảng cáo ở bước này để tránh bị chuyển sang
 // MediaFire/error.php hoặc một trang trung gian ngoài ý muốn.
 const unlockUrl = String(data.unlock || "").trim();

 if(!unlockUrl){
   b.disabled=false;
   b.textContent="Đã Mở Khoá";
   alert("Link mở khóa chưa được cấu hình.");
   return;
 }

 window.location.assign(unlockUrl);
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

// Kiểm tra định kỳ: sau 2 phút trạng thái nhiệm vụ sẽ mất và phải
// đăng ký kênh / like video / hoàn thành lại từ đầu.
setInterval(()=>{
  try{
    const current=JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}");
    if(current.updated && (Date.now() - Number(current.updated) >= RESET_AFTER_MS)){
      localStorage.removeItem(STORAGE_KEY);
      done1=done2=done3=done4=false;
      const box=document.getElementById("unlockBox");
      if(box)box.style.display="none";
      const btn=document.getElementById("verifyBtn");
      if(btn){
        btn.disabled=false;
        btn.innerHTML='<i class="fa-solid fa-lock"></i> <span>Mở Khoá</span>';
      }
      updateProgress();
    }
  }catch(e){}
},1000);
