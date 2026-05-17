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

let done1 = false;
let done2 = false;
let done3 = false;

function updateProgress(){

  let total = 0;

  if(done1) total += 33;

  if(done2) total += 33;

  if(done3) total += 34;

  document.getElementById(
    "progress"
  ).style.width =
  total + "%";

}

function openTask(link){

  window.location.href =
  link;

}

function subscribeYoutube(){

  done1 = true;

  updateProgress();

  openTask(data.sub);

}

function likeVideo(){

  done2 = true;

  updateProgress();

  openTask(data.like);

}

function joinTelegram(){

  done3 = true;

  updateProgress();

  openTask(data.tele);

}

function verifyTasks(){

  if(
    !done1 ||
    !done2 ||
    !done3
  ){

    alert(
    "Hoàn thành nhiệm vụ trước"
    );

    return;

  }

  const btn =
  document.getElementById(
    "verifyBtn"
  );

  let time = 5;

  btn.disabled = true;

  btn.innerHTML =
  "Đang xác minh 5s";

  const timer =
  setInterval(()=>{

    time--;

    btn.innerHTML =
    "Đang xác minh "
    + time + "s";

    if(time <= 0){

      clearInterval(
      timer
      );

      btn.innerHTML =
      "Hoàn Thành";

      document.getElementById(
        "unlockBox"
      ).style.display =
      "block";

    }

  },1000);

}

function openUnlock(){

  window.location.href =
  data.unlock;

}
