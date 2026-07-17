const params =
new URLSearchParams(location.search);

const id =
params.get("id");

const data =
pages[id];

if(!data){

  alert(
  "Không tìm thấy nhiệm vụ: "
  + id
  );

  throw new Error();

}

/* KHỞI TẠO TRẠNG THÁI BAN ĐẦU ĐỀU LÀ CHƯA LÀM (MỖI KHI F5 SẼ RESET VỀ FALSE) */
let done1 = false;
let done2 = false;
let done3 = false;

/* UPDATE UI */

function updateProgress(){

  let total = 0;

  if(done1) total += 33;

  if(done2) total += 33;

  if(done3) total += 34;

  document.getElementById(
    "progress"
  ).style.width =
  total + "%";

  /* HIỆN TRẠNG THÁI & ĐỔI MÀU NÚT XANH LÁ */

  const subBtn =
  document.getElementById(
    "subBtn"
  );

  const likeBtn =
  document.getElementById(
    "likeBtn"
  );

  const teleBtn =
  document.getElementById(
    "teleBtn"
  );

  if(subBtn){

    subBtn.innerHTML =
    done1
    ? "✓ Đã đăng ký"
    : "Đăng ký kênh";
    
    if(done1) subBtn.classList.add("completed");
    else subBtn.classList.remove("completed");

  }

  if(likeBtn){

    likeBtn.innerHTML =
    done2
    ? "✓ Đã like video"
    : "Like video";
    
    if(done2) likeBtn.classList.add("completed");
    else likeBtn.classList.remove("completed");

  }

  if(teleBtn){

    teleBtn.innerHTML =
    done3
    ? "✓ Đã tham gia"
    : "Tham gia Telegram";
    
    if(done3) teleBtn.classList.add("completed");
    else teleBtn.classList.remove("completed");

  }

}

/* VERIFY */

function fakeVerify(
  step,
  link
){

  window.open(
    link,
    "_blank"
  );

  const box =
  document.createElement("div");

  box.style.position =
  "fixed";

  box.style.top = "0";

  box.style.left = "0";

  box.style.width =
  "100%";

  box.style.height =
  "100%";

  box.style.background =
  "rgba(0,0,0,0.7)";

  box.style.display =
  "flex";

  box.style.alignItems =
  "center";

  box.style.justifyContent =
  "center";

  box.style.zIndex =
  "9999";

  box.innerHTML = `
  <div style="
    background:#111;
    padding:20px;
    border-radius:15px;
    text-align:center;
    color:white;
    width:280px;
    font-family:sans-serif;
  ">
    <h2>Đang xác minh</h2>

    <p id="verifyText">
    Vui lòng chờ 5 giây...
    </p>
  </div>
  `;

  document.body.appendChild(
    box
  );

  let time = 5;

  const timer =
  setInterval(()=>{

    time--;

    document.getElementById(
      "verifyText"
    ).innerHTML =
    "Vui lòng chờ "
    + time +
    " giây...";

    if(time <= 0){

      clearInterval(timer);

      if(step === 1)
      done1 = true;

      if(step === 2)
      done2 = true;

      if(step === 3)
      done3 = true;

      updateProgress();

      box.remove();

      alert(
      "Xác minh thành công!"
      );

    }

  },1000);

}

/* TASK */

function subscribeYoutube(){

  if(done1){

    alert(
    "Đã hoàn thành bước này"
    );

    return;

  }

  fakeVerify(
    1,
    data.sub
  );

}

function likeVideo(){

  if(done2){

    alert(
    "Đã hoàn thành bước này"
    );

    return;

  }

  fakeVerify(
    2,
    data.like
  );

}

function joinTelegram(){

  if(done3){

    alert(
    "Đã hoàn thành bước này"
    );

    return;

  }

  fakeVerify(
    3,
    data.tele
  );

}

/* FINAL VERIFY */

function verifyTasks(){

  if(
    !done1 ||
    !done2 ||
    !done3
  ){

    alert(
    "Hoàn thành đủ nhiệm vụ trước"
    );

    return;

  }

  // TỰ ĐỘNG BẬT QUẢNG CÁO 1 KHI BẤM XÁC MINH
  window.open("https://vt.tiktok.com/ZS9rens8mRD7Y-7K5PX/", "_blank");

  const btn =
  document.getElementById(
    "verifyBtn"
  );

  btn.disabled = true;

  let time = 5;

  btn.innerHTML =
  "Đang mở khóa 5s";

  const timer =
  setInterval(()=>{

    time--;

    btn.innerHTML =
    "Đang mở khóa "
    + time + "s";

    if(time <= 0){

      clearInterval(timer);

      btn.innerHTML =
      "Hoàn Thành";

      document.getElementById(
        "unlockBox"
      ).style.display =
      "block";

    }

  },1000);

}

/* OPEN */

function openUnlock(){

  // TỰ ĐỘNG BẬT QUẢNG CÁO 2 KHI BẤM NÚT MỞ LINK
  window.open("https://vt.tiktok.com/ZS9renCAPBdSp-WwAIq/", "_blank");

  const openBtn = document.getElementById("openBtn");
  if(openBtn) {
    openBtn.disabled = true;
    openBtn.innerHTML = "Đang chuyển hướng...";
  }

  // Đợi 2 giây để quảng cáo bật lên hoàn tất, sau đó chuyển hướng thẳng tới link tải file chính
  setTimeout(() => {
    window.location.href = data.unlock;
  }, 2000);

}

/* START */

updateProgress();
