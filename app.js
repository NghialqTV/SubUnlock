/* SubToUnlock — Direct-on-tap ad flow | 2026-11-16
 * Each task tap opens its configured platform URL plus one randomized ad.
 * No separate ad-confirmation click is required. The 3-second cooldown
 * completes automatically. On restrictive browsers, the ad has priority.
 */
(function () {
  'use strict';

  const THEME_KEY = 'subunlock-theme-v1';
  const params = new URLSearchParams(window.location.search);
  const id = (params.get('id') || params.get('page') || 'hackmenuios').trim();
  const pageData = typeof pages !== 'undefined' ? pages[id] : null;
  const STATE_KEY = 'subunlock-session-v12:' + id;
  const SESSION_TTL = 2 * 60 * 1000;  // Giữ thời hạn phiên cũ: 2 phút
  const AD_DELAY = 3 * 1000;         // Tự xác nhận sau 3 giây, không cần nhấn thêm
  const GUIDE_URL = 'https://youtu.be/kQGxcf2Pdc4?si=te-oGDi81xcU6lLL';
  const $ = id => document.getElementById(id);

  function applyTheme(theme) {
    const light = theme === 'light';
    document.body.classList.toggle('light', light);
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
    const button = $('themeToggle');
    if (button) {
      const icon = button.querySelector('svg use');
      if (icon) icon.setAttribute('href', light ? '#icon-moon' : '#icon-sun');
      button.setAttribute('aria-label', light ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng');
      button.title = light ? 'Bật giao diện tối' : 'Bật giao diện sáng';
    }
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = light ? '#f4f8f5' : '#080e0d';
  }
  function toggleTheme() {
    const next = document.body.classList.contains('light') ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (_) { /* Private mode */ }
  }
  let selectedTheme = 'dark';
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') selectedTheme = saved;
  } catch (_) {}
  applyTheme(selectedTheme);
  $('themeToggle').addEventListener('click', toggleTheme);

  function clockTick() {
    const el = $('clock');
    if (!el) return;
    try {
      el.textContent = new Date().toLocaleTimeString('en-US', {hour:'numeric',minute:'2-digit'});
    } catch (_) {
      el.textContent = new Date().toLocaleTimeString();
    }
  }
  clockTick();
  setInterval(clockTick, 30000);

  if (!pageData) {
    $('mainContent').innerHTML = '<div style="text-align:center;margin:70px 10px;padding:28px;border:1px solid #345242;border-radius:18px"><h1>Link không hợp lệ hoặc đã hết hạn.</h1><p>Hãy kiểm tra lại đường dẫn.</p></div>';
    return;
  }

  // Old page IDs still use their original four tasks; newly managed pages
  // may define 1–8 tasks in data.js via admin.html.
  const allowedTypes = ['youtube','tiktok','telegram','discord','facebook','instagram','zalo','custom'];
  const legacyTasks = [
    {type:'youtube',label:'Đăng ký kênh NghĩaLQ TV',url:pageData.sub,description:'Nhấn mở kênh và quảng cáo'},
    {type:'youtube',label:'Đăng ký kênh Cyber Mods',url:pageData.cyberMods,description:'Nhấn mở kênh và quảng cáo'},
    {type:'tiktok',label:'Follow TikTok',url:pageData.followTikTok,description:'Nhấn mở TikTok và quảng cáo'},
    {type:'telegram',label:'Tham gia nhóm Telegram',url:pageData.tele,description:'Nhấn mở nhóm và quảng cáo'}
  ];
  const taskDefinitions = (Array.isArray(pageData.tasks) && pageData.tasks.length >= 1 && pageData.tasks.length <= 8
    ? pageData.tasks : legacyTasks).map(task => ({
      type: allowedTypes.includes(task.type) ? task.type : 'custom',
      label: String(task.label || 'Mở liên kết nhiệm vụ'),
      url: task.url,
      description: task.description || 'Nhấn để mở nhiệm vụ và quảng cáo'
    }));
  const totalTasks = taskDefinitions.length;
  const targets = taskDefinitions.map(task => task.url);
  const descriptions = taskDefinitions.map(task => task.description);

  function buildTaskButtons() {
    const list = $('tasksList');
    list.replaceChildren();
    taskDefinitions.forEach((task, index) => {
      const step = index + 1;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'task' + (step > 1 ? ' locked' : '');
      button.id = 'task' + step;
      button.dataset.step = step;
      button.disabled = step > 1;
      const icon = document.createElement('span');
      icon.className = 'task-icon ' + task.type;
      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('class','icon-svg');svg.setAttribute('aria-hidden','true');
      const use = document.createElementNS('http://www.w3.org/2000/svg','use');
      use.setAttribute('href','#icon-' + task.type);svg.appendChild(use);icon.appendChild(svg);
      const content = document.createElement('span');content.className = 'task-text';
      const strong = document.createElement('strong');strong.textContent = task.label;
      const small = document.createElement('small');small.textContent = task.description;
      content.append(strong,small);
      const ending = document.createElement('span');ending.className = 'task-end';
      const counter = document.createElement('span');counter.className = 'task-number';counter.textContent = String(step).padStart(2,'0');
      const statusSvg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      statusSvg.setAttribute('class','icon-svg');statusSvg.setAttribute('aria-hidden','true');
      const statusUse = document.createElementNS('http://www.w3.org/2000/svg','use');
      statusUse.setAttribute('href',step === 1 ? '#icon-chevron-right' : '#icon-lock');
      statusSvg.appendChild(statusUse);ending.append(counter,statusSvg);button.append(icon,content,ending);
      list.appendChild(button);
      button.addEventListener('click',() => runTask(step));
    });
    $('stepsPill').textContent = totalTasks + ' BƯỚC';
    $('stepRange').textContent = 'BƯỚC 01—' + String(totalTasks).padStart(2,'0');
    $('progressTrack').setAttribute('aria-valuemax',String(totalTasks));
    $('heroSubtitle').textContent = pageData.title
      ? 'Hoàn thành '+totalTasks+' nhiệm vụ để nhận: '+pageData.title
      : 'Hoàn thành '+totalTasks+' nhiệm vụ để truy cập nội dung của bạn.';
    if (pageData.title) $('unlockBtnLabel').textContent = 'Mở Khóa: '+pageData.title;
  }
  buildTaskButtons();
  function emptyState() { return {sessionStarted:0,pendingStep:0,pendingAt:0,done:Array(totalTasks).fill(false)}; }
  let state = emptyState();

  function persist() {
    try { sessionStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch (_) {}
  }
  function restore() {
    try {
      const parsed = JSON.parse(sessionStorage.getItem(STATE_KEY) || 'null');
      if (!parsed || !Array.isArray(parsed.done) || parsed.done.length !== totalTasks) return;
      if (Date.now() >= Number(parsed.sessionStarted) + SESSION_TTL) return;
      if (!Number.isFinite(Number(parsed.sessionStarted)) || !Number(parsed.sessionStarted)) return;
      state = {
        sessionStarted: Number(parsed.sessionStarted),
        pendingStep: Math.max(0, Math.min(totalTasks, Number(parsed.pendingStep) || 0)),
        pendingAt: Number(parsed.pendingAt) || 0,
        done: parsed.done.map(Boolean)
      };
    } catch (_) {}
  }
  restore();

  let toastTimer = null;
  function notify(message) {
    const el = $('appToast');
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 5500);
  }
  function expireIfNeeded() {
    if (!state.sessionStarted || Date.now() < state.sessionStarted + SESSION_TTL) return false;
    state = emptyState();
    try { sessionStorage.removeItem(STATE_KEY); } catch (_) {}
    render();
    notify('Phiên đã hết hạn sau 2 phút. Hãy bắt đầu lại từ nhiệm vụ đầu tiên.');
    return true;
  }
  function countDone() { return state.done.filter(Boolean).length; }
  function getNextStep() {
    const index = state.done.indexOf(false);
    return index < 0 ? 0 : index + 1;
  }
  function remainingTime() {
    return Math.max(0, AD_DELAY - (Date.now() - state.pendingAt));
  }
  function validUrl(value) {
    if (typeof value !== 'string') return false;
    try { return ['https:', 'http:'].includes(new URL(value).protocol); }
    catch (_) { return false; }
  }
  // Only call this synchronously from a trusted click handler. No timers open tabs.
  function openExternal(url) {
    if (!validUrl(url)) return false;
    let newTab = null;
    try { newTab = window.open(url, '_blank'); } catch (_) {}
    if (newTab) {
      try { newTab.opener = null; } catch (_) {}
    } else {
      // Popup-blocking in Safari / iOS in-app browsers: same-tab navigation
      // works after a user tap; sessionStorage restores progress on Back.
      window.location.assign(url);
    }
    return true;
  }
  function pickAdUrl() {
    // The ad gate returns exactly one link; never launch an extra popup here.
    try {
      if (typeof window.tiktokAdGate === 'function') {
        const picked = window.tiktokAdGate();
        if (validUrl(picked)) return picked;
      }
    } catch (_) {}
    // Fallback if the gate script failed to load.
    const list = Array.isArray(window.TIKTOK_AD_LINKS)
      ? window.TIKTOK_AD_LINKS.filter(validUrl) : [];
    return list.length ? list[Math.floor(Math.random() * list.length)] : '';
  }
  // Settle a started task without asking the visitor to confirm anything.
  // This also runs after browser Back / pageshow when the page was suspended.
  function settlePendingIfReady() {
    const step = state.pendingStep;
    if (!step || remainingTime() > 0) return false;
    state.done[step - 1] = true;
    state.pendingStep = 0;
    state.pendingAt = 0;
    persist();
    return true;
  }
  function render() {
    settlePendingIfReady();
    const count = countDone();
    const next = getNextStep();
    const pending = state.pendingStep;

    for (let step = 1; step <= totalTasks; step++) {
      const el = $('task' + step);
      if (!el) continue;
      const isDone = state.done[step - 1];
      const isPending = pending === step;
      const isLocked = !isDone && !isPending && next !== step;
      const small = el.querySelector('.task-text small');
      const symbol = el.querySelector('.task-end svg use');
      el.disabled = isDone || isLocked || Boolean(pending);
      el.classList.toggle('completed', isDone);
      el.classList.toggle('pending', isPending);
      el.classList.toggle('locked', isLocked);
      el.setAttribute('aria-label', `Bước ${step}. ${el.querySelector('.task-text strong').textContent}. ${isDone ? 'Đã hoàn thành' : isPending ? 'Đang tự hoàn tất' : isLocked ? 'Đang khóa' : 'Sẵn sàng'}`);
      if (symbol) symbol.setAttribute('href', '#icon-' + (isDone ? 'check-circle' : isLocked ? 'lock' : isPending ? 'hourglass' : 'chevron-right'));
      if (small) {
        if (isDone) small.textContent = 'Đã hoàn thành ✓';
        else if (isPending) small.textContent = `Đã mở nhiệm vụ & quảng cáo • tự hoàn tất sau ${Math.ceil(remainingTime() / 1000)} giây`;
        else if (isLocked) small.textContent = 'Hoàn thành bước trước để tiếp tục';
        else small.textContent = descriptions[step - 1] + ' • Kèm quảng cáo';
      }
    }

    $('percent').textContent = `${count} / ${totalTasks}`;
    $('progress').style.width = `${(count / totalTasks) * 100}%`;
    $('progressTrack').setAttribute('aria-valuenow', String(count));
    $('progressLabel').textContent = count === totalTasks
      ? 'Tất cả các bước đã hoàn thành'
      : pending ? `Tự động hoàn tất bước ${pending}...`
      : count ? 'Sẵn sàng cho nhiệm vụ tiếp theo'
      : 'Hoàn thành các bước theo thứ tự';

    $('unlockBox').hidden = count !== totalTasks;
  }

  // Run only synchronously inside a real user click. Browsers generally
  // permit one new tab from one tap, but can block popups in private/in-app
  // browsing. In that case we still navigate directly to the advertisement.
  function openTaskAndAd(taskUrl, adUrl) {
    let adTab = null;
    try { adTab = window.open(adUrl, '_blank'); } catch (_) {}
    if (adTab) {
      try { adTab.opener = null; } catch (_) {}
      // Keep the selected task URL functioning, as before; ad is a new tab.
      window.location.assign(taskUrl);
    } else {
      // Avoid silently skipping the ad when an iOS/Android popup is blocked.
      window.location.assign(adUrl);
    }
  }

  function runTask(step) {
    if (expireIfNeeded()) return;
    if (state.pendingStep || getNextStep() !== step || state.done[step - 1]) return;
    const destination = targets[step - 1];
    if (!validUrl(destination)) {
      notify('Liên kết nhiệm vụ chưa được cấu hình hợp lệ.');
      return;
    }
    const adUrl = pickAdUrl();
    if (!adUrl) {
      notify('Chưa có quảng cáo khả dụng. Hãy kiểm tra data/tiktok_ads.js.');
      return;
    }
    if (!state.sessionStarted) state.sessionStarted = Date.now();
    state.pendingStep = step;
    state.pendingAt = Date.now();
    persist();
    render();
    // Both navigations are initiated by this single tap, no modal/confirm.
    openTaskAndAd(destination, adUrl);
  }

  function openUnlock() {
    if (expireIfNeeded() || countDone() !== totalTasks) return;
    if (!validUrl(pageData.unlock)) {
      notify('Liên kết mở khóa không hợp lệ.');
      return;
    }
    $('openBtn').disabled = true;
    window.location.assign(pageData.unlock);
  }

  $('openBtn').addEventListener('click', openUnlock);
  $('guideBtn').addEventListener('click', () => openExternal(GUIDE_URL));

  function onReturn() {
    clockTick();
    if (expireIfNeeded()) return;
    render();
  }
  window.addEventListener('pageshow', onReturn);
  window.addEventListener('focus', onReturn);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') onReturn();
  });
  setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    if (!expireIfNeeded() && state.pendingStep) render();
  }, 400);
  render();
})();
