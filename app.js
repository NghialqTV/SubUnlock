const params = new URLSearchParams(location.search);
const id = params.get("id");
const data = pages[id];

if(!data){
  alert("Không tìm thấy nhiệm vụ: " + id);
  throw new Error();
}

/* LOAD */
let done1 = localStorage.getItem(id + "_1") === "true";
let done2 = localStorage.getItem(id + "_2") === "true";
let done3 = localStorage.getItem(id + "_3") === "true";

/* SAVE */
function saveTasks(){
  localStorage.setItem(id + "_1", done1);
  localStorage.setItem(id + "_2", done2);
  localStorage.setItem(id + "_3", done3);
}

/* UPDATE UI */
function updateProgress(){
  let total = 0;
  if(done1) total += 33;
  if(done2) total += 33;
  if(done3) total += 34;

  document.getElementById("progress").style.width = total + "%";

  /* HIỆN TRẠNG THÁI */
  const subBtn = document.getElementById("subBtn");
  const likeBtn = document.getElementById("likeBtn");
  const teleBtn = document.getElementById("teleBtn");

  if(subBtn){
    subBtn.innerHTML = done1 ? "✓ Đã đăng ký" : "Đăng ký kênh";
    if(done1) subBtn.style.background = "#28a745";
  }
  if(likeBtn){
    likeBtn.innerHTML = done2 ? "✓ Đã like video" : "Like video";
    if(done2) likeBtn.style.background = "#28a745";
  }
  if(teleBtn){
    teleBtn.innerHTML = done3 ? "✓ Đã tham gia" : "Tham gia Telegram";
    if(done3) teleBtn.style.background = "#28a745";
  }
}

/* VERIFY BƯỚC NHỎ */
function fakeVerify(step, link){

  const box = document.createElement("div");
  ...
  
  let time = 5;

  const timer = setInterval(()=>{
    time--;

    if(time <= 0){
      clearInterval(timer);

      if(step === 1) done1 = true;
      if(step === 2) done2 = true;
      if(step === 3) done3 = true;

      saveTasks();
      updateProgress();

      window.open(link, "_blank");

      box.remove();
    }
  },1000);
}
      // ĐÃ XÓA BỎ BẢNG ALERT THÔNG BÁO Ở ĐÂY ĐỂ USER ĐỠ PHẢI BẤM OK
    }
  }, 1000);
}

/* TASK */
function subscribeYoutube(){
  if(done1){
    alert("Đã hoàn thành bước này");
    return;
  }
  fakeVerify(1, data.sub);
}

function likeVideo(){
  if(done2){
    alert("Đã hoàn thành bước này");
    return;
  }
  fakeVerify(2, data.like);
}

function joinTelegram(){
  if(done3){
    alert("Đã hoàn thành bước này");
    return;
  }
  fakeVerify(3, data.tele);
}

/* FINAL VERIFY (BƯỚC 4 - CÓ QUẢNG CÁO TIKTOK 1) */
function verifyTasks(){
  if(!done1 || !done2 || !done3){
    alert("Bạn phải hoàn thành tất cả các bước 1, 2, 3 trước khi xác minh!");
    return;
  }

  const btn = document.getElementById("verifyBtn");
  btn.disabled = true;
  
  // Mở quảng cáo TikTok 1
  window.open("https://vt.tiktok.com/ZS92J8oEgKyLn-Iwhaj/", "_blank");

  let time = 5;
  btn.innerHTML = "Đang mở khóa 5s";

  const timer = setInterval(()=>{
    time--;
    btn.innerHTML = "Đang mở khóa " + time + "s";

    if(time <= 0){
      clearInterval(timer);
      btn.innerHTML = "Hoàn Thành";
      btn.style.background = "#28a745";
      document.getElementById("unlockBox").style.display = "block";
    }
  }, 1000);
}

/* OPEN (BƯỚC CUỐI - CÓ QUẢNG CÁO TIKTOK 2) */
function openUnlock(){
  const openBtn = document.getElementById("openBtn");
  openBtn.disabled = true;

  // Mở quảng cáo TikTok 2
  window.open("https://vt.tiktok.com/ZS9285w5ypGbD-rr3Jr/", "_blank");

  // Reset đăng ký + like sau 3 phút (180000ms)
  setTimeout(() => {
    localStorage.removeItem(id + "_1");
    localStorage.removeItem(id + "_2");
  }, 180000);

  // Đợi 5 giây rồi mới chuyển hướng đến link tải file
  setTimeout(() => {
    window.location.href = data.unlock;
  }, 5000);
}

/* START */
updateProgress();
