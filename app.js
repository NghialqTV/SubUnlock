// GET ID

const params =
new URLSearchParams(location.search);

const id =
params.get('id');

// LOAD DATA

const data =
pages[id];

// CHECK

if(!data){

  alert("Không tìm thấy nhiệm vụ");

  throw new Error();
}

// STATUS

let done1 = false;
let done2 = false;
let done3 = false;

// UPDATE BAR

function updateProgress(){

  let total = 0;

  if(done1) total += 33;

  if(done2) total += 33;

  if(done3) total += 34;

  document.getElementById(
    'progress'
  ).style.width = total + "%";
}

// SUBSCRIBE

function subscribeYoutube(){

  window.open(
    data.sub,
    '_blank'
  );

  done1 = true;

  updateProgress();
}

// LIKE

function likeVideo(){

  window.open(
    data.like,
    '_blank'
  );

  done2 = true;

  updateProgress();
}

// TELEGRAM

function joinTelegram(){

  window.open(
    data.tele,
    '_blank'
  );

  done3 = true;

  updateProgress();
}

// VERIFY

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
      ).style.display = 'block';
    }

  },1000);
}

// OPEN LINK

function openUnlock(){

  window.open(
    data.unlock,
    '_blank'
  );
}

// ANTI RIGHT CLICK

window.addEventListener(
  'contextmenu',
  e => e.preventDefault()
);

// ANTI F12

window.addEventListener(
  'keydown',
  e =>{

    if(e.keyCode == 123){

      e.preventDefault();
    }

  }
);
