const params = new URLSearchParams(location.search);
const pageId = params.get("id");

const page = pages[pageId];

if (!page) {
  document.body.innerHTML = "<h2>Page không tồn tại</h2>";
  throw new Error("Invalid page");
}

const STORAGE_KEY = `task_${pageId}`;

const state =
JSON.parse(localStorage.getItem(STORAGE_KEY))
|| {
  sub:false,
  like:false,
  tele:false,
  verified:false
};

function save(){
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
  );
}

function updateUI(){

  updateButton(
    "btnSub",
    state.sub,
    "✓ Đã Subscribe",
    "Subscribe"
  );

  updateButton(
    "btnLike",
    state.like,
    "✓ Đã Like",
    "Like Video"
  );

  updateButton(
    "btnTele",
    state.tele,
    "✓ Đã Join",
    "Join Telegram"
  );

  const percent =
    (Number(state.sub)
    + Number(state.like)
    + Number(state.tele))
    * 33.33;

  document.getElementById(
    "progress"
  ).style.width =
  percent + "%";

  if(state.verified){
    document.getElementById(
      "unlockBox"
    ).style.display = "block";
  }
}

function updateButton(
  id,
  done,
  doneText,
  normalText
){
  const btn =
  document.getElementById(id);

  btn.textContent =
  done ? doneText : normalText;

  btn.classList.toggle(
    "completed",
    done
  );
}

function completeTask(
  key,
  url
){
  if(state[key]) return;

  const tab =
  window.open(url,"_blank");

  if(!tab){
    alert("Popup bị chặn");
    return;
  }

  setTimeout(()=>{
    state[key] = true;
    save();
    updateUI();
  },3000);
}

function subscribeYoutube(){
  completeTask(
    "sub",
    page.sub
  );
}

function likeVideo(){

  if(!state.sub){
    alert(
      "Hãy Subscribe trước"
    );
    return;
  }

  completeTask(
    "like",
    page.like
  );
}

function joinTelegram(){

  if(!state.like){
    alert(
      "Hãy Like Video trước"
    );
    return;
  }

  completeTask(
    "tele",
    page.tele
  );
}

function startVerify(){

  if(
    !state.sub ||
    !state.like ||
    !state.tele
  ){
    alert(
      "Chưa hoàn thành đủ nhiệm vụ"
    );
    return;
  }

  document.getElementById(
    "loadingText"
  ).style.display =
  "block";

  setTimeout(()=>{

    state.verified = true;

    save();

    document.getElementById(
      "loadingText"
    ).style.display =
    "none";

    updateUI();

  },5000);
}

function openAdsStep2(){

  if(!state.verified){
    return;
  }

  location.href =
  page.unlock;
}

updateUI();
