// GET PARAM
const params = new URLSearchParams(window.location.search);

const id = params.get("id");

// CHECK PARAM
if (!id) {
  alert("Thiếu ID");
  throw new Error("Missing ID");
}

// CHECK PAGES
if (typeof pages === "undefined") {
  alert("Không tìm thấy dữ liệu pages");
  throw new Error("Pages Undefined");
}

// LOAD DATA
const data = pages[id];

// CHECK DATA
if (!data) {

  alert("Không tìm thấy nhiệm vụ: " + id);

  throw new Error("Invalid ID");
}

// STATUS
let done1 = false;
let done2 = false;
let done3 = false;

// UPDATE PROGRESS
function updateProgress() {

  let total = 0;

  if (done1) total += 33;
  if (done2) total += 33;
  if (done3) total += 34;

  document.getElementById("progress").style.width =
    total + "%";
}

// OPEN LINK
function openTask(link) {

  window.open(link, "_blank");
}

// SUBSCRIBE
function subscribeYoutube() {

  done1 = true;

  updateProgress();

  openTask(data.sub);
}

// LIKE VIDEO
function likeVideo() {

  done2 = true;

  updateProgress();

  openTask(data.like);
}

// JOIN TELEGRAM
function joinTelegram() {

  done3 = true;

  updateProgress();

  openTask(data.tele);
}

// VERIFY TASKS
function verifyTasks() {

  if (!done1 || !done2 || !done3) {

    alert("Hoàn thành nhiệm vụ trước");

    return;
  }

  const btn =
    document.getElementById("verifyBtn");

  let time = 5;

  btn.disabled = true;

  btn.innerHTML =
    "Đang xác minh 5s";

  const timer = setInterval(() => {

    time--;

    btn.innerHTML =
      "Đang xác minh " + time + "s";

    if (time <= 0) {

      clearInterval(timer);

      btn.innerHTML =
        "Hoàn Thành";

      document.getElementById(
        "unlockBox"
      ).style.display = "block";
    }

  }, 1000);
}

// OPEN UNLOCK
function openUnlock() {

  window.location.href =
    data.unlock;
}

// DISABLE RIGHT CLICK
window.addEventListener(
  "contextmenu",
  e => e.preventDefault()
);

// DISABLE F12
window.addEventListener(
  "keydown",
  e => {

    if (e.key === "F12") {

      e.preventDefault();
    }

  }
);
