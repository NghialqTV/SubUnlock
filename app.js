/* SubUnlock — GET KEY AOV layout + exactly two ad opportunities
 * Ad #1: first tap anywhere on the page (one time per tab session).
 * Ad #2: click the unlock button after all tasks are completed.
 * No ads between tasks. Task returns are recorded locally; external follows
 * are not independently verified by a static GitHub Pages website.
 */
(function () {
  'use strict';

  const THEME_KEY = 'subunlock-theme-v2';
  const params = new URLSearchParams(window.location.search);
  const id = (params.get('id') || params.get('page') || 'hackmenuios').trim();
  const pageData = typeof pages !== 'undefined' ? pages[id] : null;
  const STATE_KEY = 'subunlock-session-v17-follow-ad-reset:' + id;
  const SESSION_TTL_MS = 3 * 60 * 1000;
  const GUIDE_URL = 'https://youtu.be/kQGxcf2Pdc4?si=te-oGDi81xcU6lLL';
  const $ = id => document.getElementById(id);

  function clearChildren(node) {
    if (!node) return;
    if (typeof node.replaceChildren === 'function') node.replaceChildren();
    else while (node.firstChild) node.removeChild(node.firstChild);
  }
  function validUrl(value) {
    if (typeof value !== 'string') return false;
    try { return ['https:', 'http:'].includes(new URL(value).protocol); }
    catch (_) { return false; }
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
    if (themeColor) themeColor.content = light ? '#f4f5f7' : '#050505';
  }
  function toggleTheme() {
    const next = document.body.classList.contains('light') ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
  }
  applyTheme('dark');
  const themeButton = $('themeToggle');
  if (themeButton) themeButton.addEventListener('click', toggleTheme);

  if (!pageData) {
    const main = $('mainContent');
    if (main) main.innerHTML = '<div class="invalid-page"><h1>Link không hợp lệ hoặc đã hết hạn.</h1><p>Hãy kiểm tra lại đường dẫn.</p></div>';
    return;
  }

  const allowedTypes = ['youtube','tiktok','telegram','discord','facebook','instagram','zalo','custom'];
  const legacyTasks = [
    {type:'youtube',label:'Đăng Kí Kênh NghĩaLQ TV',url:pageData.sub,description:'Mở YouTube để đăng ký kênh'},
    {type:'youtube',label:'Đăng Kí Kênh Cyber Mods',url:pageData.cyberMods,description:'Mở YouTube để đăng ký kênh'},
    {type:'tiktok',label:'Follow TikTok',url:pageData.followTikTok,description:'Mở TikTok để theo dõi'},
    {type:'telegram',label:'Tham Gia Telegram',url:pageData.tele,description:'Mở Telegram để tham gia nhóm'}
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

  function emptyState() {
    return {
      sessionStarted: Date.now(),
      pendingStep: 0,
      pendingAt: 0,
      didLeave: false,
      firstAdLaunched: false,
      followAdPendingAfterReturn: false,
      unlockAdLaunched: false,
      unlockPendingAfterAd: false,
      done: Array(totalTasks).fill(false)
    };
  }
  let state = emptyState();
  function persist() {
    try { sessionStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch (_) {}
  }
  function getNavigationType() {
    try {
      const entry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
      if (entry && entry.type) return entry.type;
    } catch (_) {}
    try {
      if (performance.navigation) {
        if (performance.navigation.type === 1) return 'reload';
        if (performance.navigation.type === 2) return 'back_forward';
      }
    } catch (_) {}
    return 'navigate';
  }
  function restore() {
    const navigationType = getNavigationType();
    // A manual reload or a fresh visit starts a clean task run. Back/forward
    // navigation is preserved so returning from YouTube/TikTok does not lose progress.
    if (navigationType === 'reload' || navigationType === 'navigate') {
      state = emptyState();
      persist();
      return;
    }
    try {
      const parsed = JSON.parse(sessionStorage.getItem(STATE_KEY) || 'null');
      if (!parsed || !Array.isArray(parsed.done) || parsed.done.length !== totalTasks) {
        state = emptyState();
        persist();
        return;
      }
      state = {
        sessionStarted: Number(parsed.sessionStarted) || Date.now(),
        pendingStep: Math.max(0, Math.min(totalTasks, Number(parsed.pendingStep) || 0)),
        pendingAt: Number(parsed.pendingAt) || 0,
        didLeave: parsed.didLeave === true,
        firstAdLaunched: parsed.firstAdLaunched === true,
        followAdPendingAfterReturn: parsed.followAdPendingAfterReturn === true,
        unlockAdLaunched: parsed.unlockAdLaunched === true,
        unlockPendingAfterAd: parsed.unlockPendingAfterAd === true,
        done: parsed.done.map(Boolean)
      };
      if (Date.now() - state.sessionStarted >= SESSION_TTL_MS) state = emptyState();
      persist();
    } catch (_) {
      state = emptyState();
      persist();
    }
  }
  restore();

  let toastTimer = null;
  function notify(message) {
    const el = $('appToast');
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 4200);
  }
  function countDone() { return state.done.filter(Boolean).length; }
  function getNextStep() {
    const index = state.done.indexOf(false);
    return index < 0 ? 0 : index + 1;
  }
  function pickAdUrl() {
    try {
      if (typeof window.tiktokAdGate === 'function') {
        const picked = window.tiktokAdGate();
        if (validUrl(picked)) return picked;
      }
    } catch (_) {}
    const list = Array.isArray(window.TIKTOK_AD_LINKS) ? window.TIKTOK_AD_LINKS.filter(validUrl) : [];
    return list.length ? list[Math.floor(Math.random() * list.length)] : '';
  }
  function openAdPopup(url) {
    if (!validUrl(url)) return false;
    let tab = null;
    try { tab = window.open(url, '_blank'); } catch (_) {}
    if (!tab) return false;
    try { tab.opener = null; } catch (_) {}
    return true;
  }
  function openExternal(url) {
    if (!validUrl(url)) return false;
    let tab = null;
    try { tab = window.open(url, '_blank'); } catch (_) {}
    if (tab) { try { tab.opener = null; } catch (_) {} }
    else window.location.assign(url);
    return true;
  }
  function navigateTo(url) {
    if (!validUrl(url)) {
      notify('Liên kết nhiệm vụ chưa được cấu hình hợp lệ.');
      return false;
    }
    try { window.location.assign(url); return true; }
    catch (_) { notify('Không thể mở liên kết. Hãy nhấn nhiệm vụ để thử lại.'); return false; }
  }

  function buildTaskButtons() {
    const list = $('tasksList');
    clearChildren(list);
    taskDefinitions.forEach((task, index) => {
      const step = index + 1;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'task task-' + task.type + (step > 1 ? ' locked' : '');
      button.id = 'task' + step;
      button.dataset.step = String(step);
      button.disabled = step > 1;

      const icon = document.createElement('span');
      icon.className = 'task-icon ' + task.type;
      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('class','icon-svg');
      svg.setAttribute('aria-hidden','true');
      const use = document.createElementNS('http://www.w3.org/2000/svg','use');
      use.setAttribute('href','#icon-' + task.type);
      svg.appendChild(use);
      icon.appendChild(svg);

      const content = document.createElement('span');
      content.className = 'task-text';
      const strong = document.createElement('strong');
      strong.textContent = task.label;
      const small = document.createElement('small');
      small.textContent = task.description;
      content.append(strong, small);

      const ending = document.createElement('span');
      ending.className = 'task-end';
      const statusSvg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      statusSvg.setAttribute('class','icon-svg');
      statusSvg.setAttribute('aria-hidden','true');
      const statusUse = document.createElementNS('http://www.w3.org/2000/svg','use');
      statusUse.setAttribute('href', step === 1 ? '#icon-chevron-right' : '#icon-lock');
      statusSvg.appendChild(statusUse);
      ending.appendChild(statusSvg);
      button.append(icon, content, ending);
      list.appendChild(button);
      button.addEventListener('click', () => runTask(step));
    });
    const stepsPill = $('stepsPill');
    const stepRange = $('stepRange');
    if (stepsPill) stepsPill.textContent = totalTasks + ' BƯỚC';
    if (stepRange) stepRange.textContent = 'BƯỚC 01—' + String(totalTasks).padStart(2,'0');
    const track = $('progressTrack');
    if (track) track.setAttribute('aria-valuemax', String(totalTasks));
  }
  buildTaskButtons();

  function render() {
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
      const retryable = isPending && !state.didLeave;
      el.disabled = isDone || isLocked || (Boolean(pending) && !retryable);
      el.classList.toggle('completed', isDone);
      el.classList.toggle('pending', isPending);
      el.classList.toggle('locked', isLocked);
      el.setAttribute('aria-label', `Bước ${step}. ${el.querySelector('.task-text strong').textContent}. ${isDone ? 'Đã hoàn thành' : isPending ? 'Đang chờ quay lại' : isLocked ? 'Đang khóa' : 'Sẵn sàng'}`);
      if (symbol) symbol.setAttribute('href', '#icon-' + (isDone ? 'check-circle' : isLocked ? 'lock' : isPending ? 'hourglass' : 'chevron-right'));
      if (small) {
        if (isDone) small.textContent = 'Đã hoàn thành ✓';
        else if (isPending && state.didLeave) small.textContent = 'Đang ghi nhận lượt quay lại…';
        else if (isPending) small.textContent = 'Đã mở • quay lại trang để tiếp tục';
        else if (isLocked) small.textContent = 'Hoàn thành bước trước để tiếp tục';
        else small.textContent = descriptions[step - 1];
      }
    }

    const percent = $('percent');
    const progress = $('progress');
    const track = $('progressTrack');
    const progressLabel = $('progressLabel');
    if (percent) percent.textContent = `${count} / ${totalTasks}`;
    if (progress) progress.style.width = `${(count / totalTasks) * 100}%`;
    if (track) track.setAttribute('aria-valuenow', String(count));
    if (progressLabel) progressLabel.textContent = count === totalTasks
      ? 'Đã hoàn thành tất cả nhiệm vụ'
      : pending ? `Đang thực hiện bước ${pending}`
      : 'Hoàn thành các bước theo thứ tự';

    const unlockBox = $('unlockBox');
    if (unlockBox) unlockBox.hidden = false;
    const unlockButton = $('openBtn');
    if (unlockButton) {
      const successMessage = unlockBox ? unlockBox.querySelector('.success') : null;
      const isUnlocked = count === totalTasks;
      unlockButton.disabled = !isUnlocked;
      unlockButton.classList.toggle('is-locked', !isUnlocked);
      if (successMessage) successMessage.hidden = !isUnlocked;
      const unlockIcon = unlockButton.querySelector('svg use');
      if (unlockIcon) unlockIcon.setAttribute('href', isUnlocked ? '#icon-arrow-right' : '#icon-lock');
      const label = $('unlockBtnLabel');
      if (label) label.textContent = 'Mở Khóa ' + (pageData.title || 'Liên Kết');
    }
  }

  function completePendingStep() {
    const step = state.pendingStep;
    if (!step) return false;
    state.done[step - 1] = true;
    state.pendingStep = 0;
    state.pendingAt = 0;
    state.didLeave = false;
    persist();
    return true;
  }
  function runTask(step) {
    if (getNextStep() !== step || state.done[step - 1]) return;
    if (state.pendingStep && state.pendingStep !== step) return;
    const task = taskDefinitions[step - 1];
    const destination = targets[step - 1];
    if (!validUrl(destination)) {
      notify('Liên kết nhiệm vụ chưa được cấu hình hợp lệ.');
      return;
    }
    if (state.pendingStep === step) {
      if (state.didLeave) return;
      state.pendingAt = Date.now();
      persist();
      navigateTo(destination);
      return;
    }
    state.pendingStep = step;
    state.pendingAt = Date.now();
    state.didLeave = false;
    persist();
    render();

    // The first ad is opened only when the TikTok task is clicked.
    if (task.type === 'tiktok' && !state.firstAdLaunched) {
      const adResult = launchFollowTaskAd();
      if (adResult === 'same-tab') return;
    }
    navigateTo(destination);
  }

  function recordDeparture() {
    if (!state.pendingStep || state.didLeave) return;
    state.didLeave = true;
    persist();
  }
  function advanceOnReturn() {
    if (state.unlockPendingAfterAd) {
      state.unlockPendingAfterAd = false;
      persist();
      // The user already pressed Unlock. If popups were blocked, show the ad
      // in this tab first, then continue to the requested destination on return.
      window.location.assign(pageData.unlock);
      return true;
    }
    if (state.followAdPendingAfterReturn && state.pendingStep) {
      state.followAdPendingAfterReturn = false;
      state.didLeave = false;
      state.pendingAt = Date.now();
      persist();
      navigateTo(targets[state.pendingStep - 1]);
      return true;
    }
    if (!state.pendingStep || !state.didLeave) return false;
    completePendingStep();
    render();
    notify('Đã ghi nhận lượt quay lại. Bạn có thể tiếp tục nhiệm vụ tiếp theo.');
    return true;
  }

  let sessionResetTimer = null;
  function resetExpiredSession(showMessage) {
    if (Date.now() - state.sessionStarted < SESSION_TTL_MS) return false;
    state = emptyState();
    persist();
    render();
    if (showMessage) notify('Phiên nhiệm vụ đã được làm mới sau 3 phút. Hãy bắt đầu lại từ bước 1.');
    scheduleSessionReset();
    return true;
  }
  function scheduleSessionReset() {
    if (sessionResetTimer) clearTimeout(sessionResetTimer);
    const remaining = Math.max(50, state.sessionStarted + SESSION_TTL_MS - Date.now());
    sessionResetTimer = setTimeout(() => {
      if (!resetExpiredSession(true)) scheduleSessionReset();
    }, remaining);
  }

  // Ad #1 is tied only to the Follow TikTok task, never to arbitrary page taps.
  function launchFollowTaskAd() {
    if (state.firstAdLaunched) return 'already';
    const adUrl = pickAdUrl();
    if (!validUrl(adUrl)) {
      notify('Chưa có link quảng cáo hợp lệ trong data/tiktok_ads.js.');
      return 'missing';
    }
    state.firstAdLaunched = true;
    if (openAdPopup(adUrl)) {
      persist();
      return 'popup';
    }
    // Popup blocked: show the ad in this tab, then open TikTok automatically
    // when the user returns to the task page.
    state.followAdPendingAfterReturn = true;
    persist();
    navigateTo(adUrl);
    return 'same-tab';
  }

  function openUnlock() {
    if (countDone() !== totalTasks) {
      notify(`Bạn cần hoàn thành đủ ${totalTasks} nhiệm vụ trước khi mở khóa.`);
      return;
    }
    if (!validUrl(pageData.unlock)) {
      notify('Liên kết mở khóa không hợp lệ.');
      return;
    }
    const button = $('openBtn');
    if (button) button.disabled = true;

    // Ad #2: only when the completed user presses the main unlock button.
    if (!state.unlockAdLaunched) {
      const adUrl = pickAdUrl();
      if (validUrl(adUrl)) {
        state.unlockAdLaunched = true;
        persist();
        const opened = openAdPopup(adUrl);
        if (opened) {
          window.location.assign(pageData.unlock);
          return;
        }
        // Popup blocked: use the current tab for the ad, then automatically
        // continue to the unlock URL when the user returns with Back.
        state.unlockPendingAfterAd = true;
        persist();
        window.location.assign(adUrl);
        return;
      }
      notify('Không có link quảng cáo hợp lệ. Đang mở link chính.');
    }
    window.location.assign(pageData.unlock);
  }

  const openButton = $('openBtn');
  if (openButton) openButton.addEventListener('click', openUnlock);
  const guideButton = $('guideBtn');
  if (guideButton) guideButton.addEventListener('click', () => openExternal(GUIDE_URL));

  function onReturn() {
    if (document.visibilityState === 'hidden') return;
    if (resetExpiredSession(true)) return;
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
  render();
  scheduleSessionReset();
})();
