// GET PARAM

const params =
new URLSearchParams(location.search);

const id =
params.get('id');

// LOAD DATA

const data =
pages[id];

// CHECK DATA

if(!data){

  alert("Không tìm thấy nhiệm vụ");

  throw new Error();
}

// STATUS

let done1 = false;
let done2 = false;
let done3 = false;

// UPDATE PROGRESS

function updateProgress(){

  let total = 0;

  if(done1) total += 33;

  if(done2) total += 33;

  if(done3) total += 34;

  document.getElementById(
    'progress'
  ).style.width =
  total + "%";
}

// SUBSCRIBE

function subscribeYoutube(){

  done1 = true;

  updateProgress();

  location.href =
  data.sub;
}

// LIKE VIDEO

function likeVideo(){

  done2 = true;

  updateProgress();

  location.href =
  data.like;
}

// JOIN TELEGRAM

function joinTelegram(){

  done3 = true;

  updateProgress();

  location.href =
  data.tele;
}

// VERIFY TASKS

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
    'verifyBtn'
  );

  let time = 5;

  btn.disabled = true;

  btn.innerHTML =
  "Đang xác minh 5s";

  const timer =
  setInterval(()=>{

    time--;

    btn.innerHTML =
    "Đang xác minh " +
    time + "s";

    if(time <= 0){

      clearInterval(timer);

      btn.innerHTML =
      "Hoàn Thành";

      document.getElementById(
        'unlockBox'
      ).style.display =
      'block';
    }

  },1000);
}

// OPEN UNLOCK LINK

function openUnlock(){

  location.href =
  data.unlock;
}

// DISABLE RIGHT CLICK

window.addEventListener(
  'contextmenu',
  e => e.preventDefault()
);

// DISABLE F12

window.addEventListener(
  'keydown',
  e =>{

    if(e.keyCode == 123){

      e.preventDefault();
    }

  }
);
