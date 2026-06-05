const params = new URLSearchParams(location.search);
const id = params.get("id");

if (!id) {
  alert("Thiếu ID nhiệm vụ");
  throw new Error();
}

const data = pages[id];

if (!data) {
  alert("Không tìm thấy nhiệm vụ: " + id);
  throw new Error();
}

/* =========================
   RESET SAU 30 PHÚT
========================= */

const resetKey = id + "_reset";
const lastVisit = localStorage.getItem(resetKey);

if (
  !lastVisit ||
  Date.now() - Number(lastVisit) > 60000
)
  localStorage.removeItem(id + "_1");
  localStorage.removeItem(id + "_2");
  localStorage.removeItem(id + "_3");

  localStorage.setItem(
    resetKey,
    Date.now()
  );
}

/* =========================
   LOAD DATA
========================= */

let done1 =
  localStorage.getItem(id + "_1") === "true";

let done2 =
  localStorage.getItem(id + "_2") === "true";

let done3 =
  localStorage.getItem(id + "_3") === "true";

/* =========================
   SAVE
========================= */

function saveTasks() {
  localStorage.setItem(id + "_1", done1);
  localStorage.setItem(id + "_2", done2);
  localStorage.setItem(id + "_3", done3);
}

/* =========================
   UPDATE UI
========================= */

function updateProgress() {

  let done = 0;

  if (done1) done++;
  if (done2) done++;
  if (done3) done++;

  const percent =
    Math.round((done / 3) * 100);

  const progress =
    document.getElementById("progress");

  if (progress) {
    progress.style.width =
      percent + "%";
  }

  const percentText =
    document.getElementById("percent");

  if (percentText) {
    percentText.innerText =
      percent + "%";
  }

  const subBtn =
    document.getElementById("subBtn");

  const likeBtn =
    document.getElementById("likeBtn");

  const teleBtn =
    document.getElementById("teleBtn");

  if (subBtn && done1) {
    subBtn.innerHTML =
      "✓ Hoàn Thành";
    subBtn.disabled = true;
    subBtn.style.background =
      "#22c55e";
  }

  if (likeBtn && done2) {
    likeBtn.innerHTML =
      "✓ Hoàn Thành";
    likeBtn.disabled = true;
    likeBtn.style.background =
      "#22c55e";
  }

  if (teleBtn && done3) {
    teleBtn.innerHTML =
      "✓ Hoàn Thành";
    teleBtn.disabled = true;
    teleBtn.style.background =
      "#22c55e";
  }
}

/* =========================
   POPUP VERIFY
========================= */

function fakeVerify(step, link) {

  window.open(link, "_blank");

  const box =
    document.createElement("div");

  box.style.cssText = `
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,.7);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:9999;
  `;

  box.innerHTML = `
  <div style="
    background:rgba(15,23,42,.95);
    border:1px solid rgba(124,58,237,.4);
    box-shadow:0 0 30px rgba(124,58,237,.4);
    backdrop-filter:blur(15px);
    padding:25px;
    border-radius:20px;
    text-align:center;
    color:white;
    width:300px;
  ">
      <h2>⚡ Cyber TV</h2>
      <p id="verifyText">
      Đang xác minh 5 giây...
      </p>
  </div>
  `;

  document.body.appendChild(box);

  let time = 5;

  const timer = setInterval(() => {

    time--;

    const text =
      document.getElementById(
        "verifyText"
      );

    if (text) {
      text.innerHTML =
        "Đang xác minh " +
        time +
        " giây...";
    }

    if (time <= 0) {

      clearInterval(timer);

      if (step === 1)
        done1 = true;

      if (step === 2)
        done2 = true;

      if (step === 3)
        done3 = true;

      saveTasks();
      updateProgress();

      box.remove();
    }

  }, 1000);
}

/* =========================
   TASKS
========================= */

function subscribeYoutube() {

  if (done1) return;

  fakeVerify(1, data.sub);
}

function likeVideo() {

  if (done2) return;

  fakeVerify(2, data.like);
}

function joinTelegram() {

  if (done3) return;

  fakeVerify(3, data.tele);
}

/* =========================
   VERIFY
========================= */

function verifyTasks() {

  if (
    !done1 ||
    !done2 ||
    !done3
  ) {
    alert(
      "Bạn chưa hoàn thành tất cả nhiệm vụ!"
    );
    return;
  }

  const btn =
    document.getElementById(
      "verifyBtn"
    );

  if (btn.dataset.done)
    return;

  btn.disabled = true;

  window.open(
    "https://vt.tiktok.com/ZS92J8oEgKyLn-Iwhaj/",
    "_blank"
  );

  let time = 5;

  btn.innerHTML =
    "Đang mở khóa 5s";

  const timer = setInterval(() => {

    time--;

    btn.innerHTML =
      "Đang mở khóa " +
      time +
      "s";

    if (time <= 0) {

      clearInterval(timer);

      btn.innerHTML =
        "✓ Hoàn Thành";

      btn.style.background =
        "#22c55e";

      btn.dataset.done =
        "true";

      const unlock =
        document.getElementById(
          "unlockBox"
        );

      unlock.style.display =
        "block";

      unlock.animate(
        [
          {
            opacity: 0,
            transform:
              "translateY(30px)"
          },
          {
            opacity: 1,
            transform:
              "translateY(0)"
          }
        ],
        {
          duration: 500
        }
      );
    }

  }, 1000);
}

/* =========================
   OPEN FILE
========================= */

function openUnlock() {

  localStorage.removeItem(
    id + "_1"
  );

  localStorage.removeItem(
    id + "_2"
  );

  localStorage.removeItem(
    id + "_3"
  );

  localStorage.removeItem(
    id + "_reset"
  );

  const btn =
    document.getElementById(
      "openBtn"
    );

  if (btn) {
    btn.innerHTML =
      "Đang chuyển hướng...";
    btn.disabled = true;
  }

  window.open(
    "https://vt.tiktok.com/ZS9285w5ypGbD-rr3Jr/",
    "_blank"
  );

  setTimeout(() => {

    location.href =
      data.unlock;

  }, 5000);
}

/* =========================
   START
========================= */

updateProgress();
