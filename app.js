/* SubToUnlock — Task-first flow | 2026-11-16
 * 1. Tap a task -> navigate directly to YouTube/TikTok/etc (same tab).
 * 2. When visitor comes back -> automatically navigate to one ad (same tab).
 * 3. When visitor comes back from ad -> credit the step, after 3s minimum.
 * No second confirmation or popups. No claim of externally verified follows.
 */
(function () {
  'use strict';

  const THEME_KEY = 'subunlock-theme-v2';
  const params = new URLSearchParams(window.location.search);
  const id = (params.get('id') || params.get('page') || 'hackmenuios').trim();
  const pageData = typeof pages !== 'undefined' ? pages[id] : null;
  const STATE_KEY = 'subunlock-session-v14-tap-ad:' + id;
  const SESSION_TTL = 2 * 60 * 1000;  // Giữ thời hạn phiên cũ: 2 phút
  const AD_DELAY = 3 * 1000;         // Khoảng thời gian tối thiểu cho chặng quảng cáo
  const GUIDE_URL = 'https://youtu.be/kQGxcf2Pdc4?si=te-oGDi81xcU6lLL';
  const $ = id => document.getElementById(id);
  function clearChildren(node) {
    if (!node) return;
    if (typeof node.replaceChildren === 'function') node.replaceChildren();
    else while (node.firstChild) node.removeChild(node.firstChild);
  }

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
    if (themeColor) themeColor.content = light ? '#f4f5f7' : '#090a0e';
  }
  function toggleTheme() {
    const next = document.body.classList.contains('light') ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (_) { /* Private mode */ }
  }
  const selectedTheme = 'dark';
  applyTheme(selectedTheme);
  try { localStorage.setItem(THEME_KEY, 'dark'); } catch (_) {}
  // Public unlock page is intentionally locked to the requested dark theme.
  // Keep the theme helper defensive in case an older cached page still has the toggle.
  const themeButton = $('themeToggle');
  if (themeButton) themeButton.addEventListener('click', toggleTheme);

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
    {type:'youtube',label:'Đăng ký kênh NghĩaLQ TV',url:pageData.sub,description:'Mở kênh YouTube để thực hiện nhiệm vụ'},
    {type:'youtube',label:'Đăng ký kênh Cyber Mods',url:pageData.cyberMods,description:'Mở kênh YouTube để thực hiện nhiệm vụ'},
    {type:'tiktok',label:'Follow TikTok',url:pageData.followTikTok,description:'Mở TikTok để thực hiện nhiệm vụ'},
    {type:'telegram',label:'Tham gia nhóm Telegram',url:pageData.tele,description:'Mở nhóm Telegram để tham gia'}
  ];
  const taskDefinitions = (Array.isArray(pageData.tasks) && pageData.tasks.length >= 1 && pageData.tasks.length <= 8
    ? pageData.tasks : legacyTasks).map(task => ({
      type: allowedTypes.includes(task.type) ? task.type : 'custom',
      label: String(task.label || 'Mở liên kết nhiệm vụ'),
      url: task.url,
      description: task.description || 'Nhấn để mở liên kết nhiệm vụ'
    }));
  const totalTasks = taskDefinitions.length;
  const targets = taskDefinitions.map(task => task.url);
  const descriptions = taskDefinitions.map(task => task.description);

  function buildTaskButtons() {
    const list = $('tasksList');
    clearChildren(list);
    taskDefinitions.forEach((task, index) => {
      const step = index + 1;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'task task-' + task.type + (step > 1 ? ' locked' : '');
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
    if (pageData.title) $('unlockBtnLabel').textContent = 'Mở Khóa: '+pageData.title;
  }
  buildTaskButtons();
  function emptyState() { return {sessionStarted:0,pendingStep:0,pendingStage:'',pendingAt:0,adUrl:'',didLeave:false,adReturned:false,awaitingAdTap:false,adLaunched:false,done:Array(totalTasks).fill(false)}; }
  let state = emptyState();

  function persist() {
    try { sessionStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch (_) {}
  }
  function restore() {
    try {
      const parsed = JSON.parse(sessionStorage.getItem(STATE_KEY) || 'null');
      if (!parsed || !Array.isArray(parsed.done) || parsed.done.length !== totalTasks) return;
      // Do not drop a task that is still being performed in an external app.
      if (Date.now() >= Number(parsed.sessionStarted) + SESSION_TTL && !Number(parsed.pendingStep)) return;
      if (!Number.isFinite(Number(parsed.sessionStarted)) || !Number(parsed.sessionStarted)) return;
      state = {
        sessionStarted: Number(parsed.sessionStarted),
        pendingStep: Math.max(0, Math.min(totalTasks, Number(parsed.pendingStep) || 0)),
        pendingStage: ['task','ad'].includes(parsed.pendingStage) ? parsed.pendingStage : '',
        pendingAt: Number(parsed.pendingAt) || 0,
        adUrl: validUrl(parsed.adUrl) ? parsed.adUrl : '',
        didLeave: parsed.didLeave === true,
        adReturned: parsed.adReturned === true,
        awaitingAdTap: parsed.awaitingAdTap === true,
        adLaunched: parsed.adLaunched === true,
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
    // Time spent inside YouTube/TikTok/advertisement must not erase an in-flight step.
    if (state.pendingStep || !state.sessionStarted || Date.now() < state.sessionStarted + SESSION_TTL) return false;
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
  // Credit only after BOTH external visits: task first, advertisement second.
  // This tracks returns to the site, not actual YouTube subscriptions/follows.
  function settlePendingIfReady() {
    const step = state.pendingStep;
    if (!step || state.pendingStage !== 'ad' || !state.adReturned || remainingTime() > 0) return false;
    state.done[step - 1] = true;
    state.pendingStep = 0;
    state.pendingStage = '';
    state.pendingAt = 0;
    state.adUrl = '';
    state.didLeave = false;
    state.adReturned = false;
    state.awaitingAdTap = false;
    state.adLaunched = false;
    // Resume the ordinary 2-minute on-site session after a long app visit.
    if (Date.now() >= state.sessionStarted + SESSION_TTL) state.sessionStarted = Date.now();
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
      // Allow retry if a platform/ad redirect was blocked without leaving the page.
      const retryable = isPending && !state.didLeave && !state.adReturned;
      el.disabled = isDone || isLocked || (Boolean(pending) && !retryable);
      el.classList.toggle('completed', isDone);
      el.classList.toggle('pending', isPending);
      el.classList.toggle('locked', isLocked);
      el.setAttribute('aria-label', `Bước ${step}. ${el.querySelector('.task-text strong').textContent}. ${isDone ? 'Đã hoàn thành' : isPending ? 'Đang chờ quay lại' : isLocked ? 'Đang khóa' : 'Sẵn sàng'}`);
      if (symbol) symbol.setAttribute('href', '#icon-' + (isDone ? 'check-circle' : isLocked ? 'lock' : isPending ? 'hourglass' : 'chevron-right'));
      if (small) {
        if (isDone) small.textContent = 'Đã hoàn thành ✓';
        else if (isPending && state.pendingStage === 'task') small.textContent = 'Đang mở nền tảng nhiệm vụ';
        else if (isPending && state.adReturned) small.textContent = `Đang hoàn tất • ${Math.ceil(remainingTime() / 1000)} giây`;
        else if (isPending && state.awaitingAdTap) small.textContent = 'Đã quay lại • chạm bất kỳ đâu để tiếp tục';
        else if (isPending) small.textContent = 'Quảng cáo đã mở • quay lại để tiếp tục';
        else if (isLocked) small.textContent = 'Hoàn thành bước trước để tiếp tục';
        else small.textContent = descriptions[step - 1];
      }
    }

    $('percent').textContent = `${count} / ${totalTasks}`;
    $('progress').style.width = `${(count / totalTasks) * 100}%`;
    $('progressTrack').setAttribute('aria-valuenow', String(count));
    $('progressLabel').textContent = count === totalTasks
      ? 'Tất cả các bước đã hoàn thành'
      : pending ? (state.pendingStage === 'task' ? `Bước ${pending}: đang thực hiện nhiệm vụ` : state.adReturned ? `Bước ${pending}: đang hoàn tất...` : state.awaitingAdTap ? `Bước ${pending}: chạm để tiếp tục` : `Bước ${pending}: đang chờ quay lại` )
      : count ? 'Sẵn sàng cho nhiệm vụ tiếp theo'
      : 'Hoàn thành các bước theo thứ tự';

    // Keep the destination button visible from the beginning, locked until every task is complete.
    $('unlockBox').hidden = false;
    const unlockButton = $('openBtn');
    const successMessage = $('unlockBox').querySelector('.success');
    const isUnlocked = count === totalTasks;
    unlockButton.disabled = !isUnlocked;
    unlockButton.classList.toggle('is-locked', !isUnlocked);
    if (successMessage) successMessage.hidden = !isUnlocked;
    const unlockIcon = unlockButton.querySelector('svg use');
    if (unlockIcon) unlockIcon.setAttribute('href', isUnlocked ? '#icon-arrow-right' : '#icon-lock');
    $('unlockBtnLabel').textContent = isUnlocked
      ? (pageData.title ? 'Mở khóa: ' + pageData.title : 'Mở khóa nội dung')
      : (pageData.title || 'Mở khóa nội dung');
  }

  // Same-tab navigation gives direct access to YouTube/TikTok/etc, including
  // mobile deep-links. No window.open() is used for task or advertisement.
  function navigateTo(url) {
    try { window.location.assign(url); return true; }
    catch (_) { notify('Không thể mở liên kết. Hãy nhấn nhiệm vụ để thử lại.'); return false; }
  }

  function runTask(step) {
    if (expireIfNeeded()) return;
    if (getNextStep() !== step || state.done[step - 1]) return;
    if (state.pendingStep && state.pendingStep !== step) return;
    const destination = targets[step - 1];
    if (!validUrl(destination)) {
      notify('Liên kết nhiệm vụ chưa được cấu hình hợp lệ.');
      return;
    }
    // If Safari / a built-in browser refused an earlier redirect, a tap retries
    // the current stage. It never skips directly to an advertisement.
    if (state.pendingStep === step) {
      if (state.adReturned) return;
      const retryUrl = state.pendingStage === 'ad' ? state.adUrl : destination;
      if (!validUrl(retryUrl)) return;
      state.didLeave = false;
      persist();
      navigateTo(retryUrl);
      return;
    }
    const adUrl = pickAdUrl();
    if (!adUrl) {
      notify('Chưa có quảng cáo khả dụng. Hãy kiểm tra data/tiktok_ads.js.');
      return;
    }
    if (!state.sessionStarted) state.sessionStarted = Date.now();
    state.pendingStep = step;
    state.pendingStage = 'task';
    state.pendingAt = Date.now();
    state.adUrl = adUrl;
    state.didLeave = false;
    state.adReturned = false;
    state.awaitingAdTap = false;
    state.adLaunched = false;
    persist();
    render();
    // FIRST: directly visit the task. Advertisement is not opened yet.
    navigateTo(destination);
  }

  function recordDeparture() {
    if (!state.pendingStep || state.adReturned) return;
    // A departure during the task stage means the user visited the platform.
    // During the ad stage, only count a departure after the ad was actually launched.
    if (state.pendingStage === 'task' || (state.pendingStage === 'ad' && state.adLaunched)) {
      state.didLeave = true;
      persist();
    }
  }

  // Returning from a task arms the ad gate. The next user tap anywhere on the
  // page opens one ad in a fresh tab; browsers that block it fall back to same-tab.
  // Returning from that ad completes the current step after the short minimum delay.
  function advanceOnReturn() {
    if (!state.pendingStep || !state.didLeave) return;
    if (state.pendingStage === 'task') {
      if (!validUrl(state.adUrl)) {
        notify('Không có đường dẫn quảng cáo hợp lệ.');
        return;
      }
      state.pendingStage = 'ad';
      state.pendingAt = Date.now();
      state.didLeave = false;
      state.awaitingAdTap = true;
      state.adLaunched = false;
      persist();
      render();
      notify('Đã quay lại. Chạm bất kỳ vị trí nào để tiếp tục.');
    } else if (state.pendingStage === 'ad' && state.adLaunched) {
      state.adReturned = true;
      state.didLeave = false;
      persist();
      render();
    }
  }

  function handleAdTap(event) {
    if (!state.pendingStep || state.pendingStage !== 'ad' || !state.awaitingAdTap || state.adLaunched) return;
    if (!validUrl(state.adUrl)) {
      notify('Liên kết quảng cáo chưa hợp lệ.');
      return;
    }
    // Consume the first tap anywhere so the tap is a trusted gesture for window.open.
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
    state.awaitingAdTap = false;
    state.adLaunched = true;
    state.didLeave = false;
    state.pendingAt = Date.now();
    persist();
    render();
    if (!openExternal(state.adUrl)) {
      state.awaitingAdTap = true;
      state.adLaunched = false;
      persist();
      notify('Không mở được quảng cáo. Hãy chạm lại để thử.');
    }
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
  document.addEventListener('click', handleAdTap, true);

  function onReturn() {
    if (document.visibilityState === 'hidden') return;
    clockTick();
    if (expireIfNeeded()) return;
    advanceOnReturn();
    render();
  }
  window.addEventListener('pagehide', recordDeparture);
  window.addEventListener('pageshow', onReturn);
  window.addEventListener('focus', onReturn);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') recordDeparture();
    else onReturn();
  });
  setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    if (!expireIfNeeded() && state.pendingStep) render();
  }, 400);
  render();
})();
