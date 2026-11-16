/* SubUnlock Studio – local editing + explicit GitHub Contents API publishing.
 * No embedded password or token. A token is NEVER persisted, exported or logged.
 */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  function clearChildren(node) {
    if (!node) return;
    if (typeof node.replaceChildren === 'function') node.replaceChildren();
    else while (node.firstChild) node.removeChild(node.firstChild);
  }
  const DRAFT_KEY = 'subunlock-admin-draft-v1';
  const KINDS = {
    youtube:  {name:'YouTube',   glyph:'▶', label:'Đăng ký kênh YouTube',   hint:'Nhấn để đăng ký kênh YouTube'},
    telegram: {name:'Telegram',  glyph:'➤', label:'Tham gia nhóm Telegram', hint:'Nhấn để tham gia Telegram'},
    tiktok:   {name:'TikTok',    glyph:'♪', label:'Follow TikTok',          hint:'Nhấn để theo dõi TikTok'},
    discord:  {name:'Discord',   glyph:'◕', label:'Tham gia Discord',       hint:'Nhấn để tham gia Discord'},
    facebook: {name:'Facebook',  glyph:'f', label:'Theo dõi Facebook',     hint:'Nhấn để theo dõi Facebook'},
    instagram:{name:'Instagram', glyph:'◎', label:'Theo dõi Instagram',    hint:'Nhấn để theo dõi Instagram'},
    zalo:     {name:'Zalo',      glyph:'Z', label:'Tham gia nhóm Zalo',     hint:'Nhấn để mở Zalo'},
    custom:   {name:'Tùy chỉnh', glyph:'ϟ', label:'Truy cập liên kết',      hint:'Nhấn để truy cập liên kết'}
  };
  const DEFAULTS = {
    sub: typeof DEFAULT_SUB === 'string' ? DEFAULT_SUB : '',
    cyberMods: typeof CYBER_MODS_URL === 'string' ? CYBER_MODS_URL : '',
    followTikTok: typeof DEFAULT_TIKTOK === 'string' ? DEFAULT_TIKTOK : '',
    tele: typeof DEFAULT_TELE === 'string' ? DEFAULT_TELE : ''
  };
  const initialPages = typeof pages === 'object' && pages !== null ? JSON.parse(JSON.stringify(pages)) : {};
  let entries = JSON.parse(JSON.stringify(initialPages));
  let selectedId = Object.hasOwn ? (Object.hasOwn(entries,'hackmenuios') ? 'hackmenuios' : Object.keys(entries)[0]) : (entries.hackmenuios ? 'hackmenuios' : Object.keys(entries)[0]);
  let autoSlug = false;
  let editing = false;
  let busy = false;
  let baselineText = '';
  const safe = value => String(value == null ? '' : value);
  function validUrl(value) {
    try { const url = new URL(safe(value).trim()); return url.hostname && (url.protocol === 'https:' || url.protocol === 'http:'); }
    catch (_) { return false; }
  }
  function validSlug(value) { return /^[a-z0-9][a-z0-9_-]{0,63}$/.test(value); }
  function slugify(input) {
    return safe(input).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'d')
      .toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,62) || 'link-moi';
  }
  function makeUniqueSlug(value) {
    let slug = slugify(value); let n = 2;
    while (Object.prototype.hasOwnProperty.call(entries,slug)) slug = slugify(value).slice(0,55) + '-' + n++;
    return slug;
  }
  function fallbackTasks(page) {
    return [
      {type:'youtube',label:'Đăng ký kênh NghĩaLQ TV',url:page.sub || DEFAULTS.sub},
      {type:'youtube',label:'Đăng ký kênh Cyber Mods',url:page.cyberMods || DEFAULTS.cyberMods},
      {type:'tiktok',label:'Follow TikTok',url:page.followTikTok || DEFAULTS.followTikTok},
      {type:'telegram',label:'Tham gia nhóm Telegram',url:page.tele || DEFAULTS.tele}
    ];
  }
  function getTasks(page) { return Array.isArray(page.tasks) ? page.tasks.map(t => ({type: KINDS[t.type] ? t.type : 'custom', label:safe(t.label), url:safe(t.url)})) : fallbackTasks(page); }
  function copyPages() {return JSON.parse(JSON.stringify(entries));}
  function getPageUrl(id) { const url = new URL('index.html',document.baseURI); url.searchParams.set('id',id); return url.href; }
  function alertUser(message, kind) {
    const notice=$('notice'); notice.textContent=message; notice.className='notice'+(kind==='error'?' error':kind==='warn'?' warn':''); notice.hidden=false;
    notice.scrollIntoView({block:'nearest',behavior:'smooth'});
  }
  function hideNotice(){ $('notice').hidden=true; }
  function updateCount() { const count=Object.keys(entries).length; $('linkCount').textContent=String(count); $('sidebarCount').textContent=String(count); }
  function renderSidebar() {
    updateCount(); const term=$('searchLinks').value.trim().toLowerCase();
    const list=$('linkList'); clearChildren(list);
    Object.keys(entries).reverse().filter(id => (id+' '+safe(entries[id].title)).toLowerCase().includes(term)).forEach(id => {
      const button=document.createElement('button'); button.type='button'; button.className='link-item'+(id===selectedId?' active':''); button.setAttribute('role','listitem');
      const icon=document.createElement('span'); icon.className='link-bullet'; icon.textContent='↗';
      const content=document.createElement('span'); content.className='link-details';
      const title=document.createElement('strong'); title.textContent=entries[id].title || id;
      const meta=document.createElement('small'); meta.textContent='?id='+id;
      const chevron=document.createElement('span'); chevron.className='link-chevron'; chevron.textContent='›';
      content.append(title,meta);button.append(icon,content,chevron);
      button.addEventListener('click',() => { if (id===selectedId) return; if(!storeCurrent()) return; selectedId=id;autoSlug=false;displaySelected(); });
      list.appendChild(button);
    });
    if (!list.children.length) { const empty=document.createElement('div');empty.style.cssText='padding:14px;color:#93a89a;font-size:12px';empty.textContent='Không tìm thấy link phù hợp.';list.appendChild(empty); }
  }
  function fieldWrap(labelText,input) {
    const wrap=document.createElement('label');const label=document.createElement('span');label.textContent=labelText;wrap.append(label,input);return wrap;
  }
  function readTaskEditor() {
    return [...$('taskEditorList').querySelectorAll('.task-editor')].map(card=>({
      type: card.dataset.type, label:card.querySelector('.task-label').value.trim(),url:card.querySelector('.task-url').value.trim()
    }));
  }
  function renderTaskEditor(tasks) {
    const list=$('taskEditorList');clearChildren(list);
    $('taskCount').textContent=String(tasks.length);
    tasks.forEach((task,index)=>{
      const kind=KINDS[task.type] ? task.type : 'custom';
      const card=document.createElement('article');card.className='task-editor';card.dataset.type=kind;
      const head=document.createElement('div');head.className='task-editor-head';
      const icon=document.createElement('span');icon.className='task-icon-sm '+kind;icon.textContent=KINDS[kind].glyph;
      const title=document.createElement('strong');title.textContent=`Nhiệm vụ ${index+1} · ${KINDS[kind].name}`;
      const actions=document.createElement('div');actions.className='actions';
      [['↑','Di chuyển lên',index>0,-1],['↓','Di chuyển xuống',index<tasks.length-1,1],['×','Xóa nhiệm vụ',true,0]].forEach(([sign,label,enabled,delta])=>{
        const btn=document.createElement('button');btn.type='button';btn.className='small-action'+(sign==='×'?' delete':'');btn.textContent=sign;btn.title=label;btn.setAttribute('aria-label',label);btn.disabled=!enabled;
        btn.addEventListener('click',()=>{
          const fresh=readTaskEditor();if(sign==='×')fresh.splice(index,1);else [fresh[index],fresh[index+delta]]=[fresh[index+delta],fresh[index]];
          renderTaskEditor(fresh);storeCurrent();refreshPreview();
        });actions.appendChild(btn);
      });
      head.append(icon,title,actions);
      const fields=document.createElement('div');fields.className='task-fields';
      const inputLabel=document.createElement('input');inputLabel.className='task-label';inputLabel.type='text';inputLabel.value=safe(task.label);inputLabel.maxLength=100;inputLabel.required=true;inputLabel.placeholder='Ví dụ: Đăng ký kênh YouTube';
      const inputUrl=document.createElement('input');inputUrl.className='task-url';inputUrl.type='url';inputUrl.inputMode='url';inputUrl.value=safe(task.url);inputUrl.placeholder='https://...';inputUrl.required=true;inputUrl.autocomplete='off';inputUrl.spellcheck=false;
      fields.append(fieldWrap('TÊN NHIỆM VỤ',inputLabel),fieldWrap('ĐƯỜNG DẪN NHIỆM VỤ',inputUrl));card.append(head,fields);list.appendChild(card);
      [inputLabel,inputUrl].forEach(el=>el.addEventListener('input',()=>{storeCurrent();refreshPreview();}));
    });
  }
  function storeCurrent() {
    if(editing || !selectedId || !entries[selectedId]) return true;
    const newId=$('linkSlug').value.trim();
    if(!validSlug(newId)) { alertUser('ID link chỉ được gồm chữ thường, số, dấu gạch ngang hoặc gạch dưới (tối đa 64 ký tự).','error');return false; }
    if(newId!==selectedId && Object.prototype.hasOwnProperty.call(entries,newId)) { alertUser('ID này đã tồn tại. Hãy đặt ID khác.','error');return false; }
    const data={...entries[selectedId], title:$('linkTitle').value.trim(), unlock:$('unlockUrl').value.trim(),tasks:readTaskEditor()};
    if (newId !== selectedId) {delete entries[selectedId]; entries[newId]=data; selectedId=newId;} else entries[selectedId]=data;
    return true;
  }
  function validateAll() {
    if(!storeCurrent()) return false;
    for(const [id,page] of Object.entries(entries)) {
      if(!validSlug(id)) return alertUser('ID link không hợp lệ: '+id,'error'),false;
      if(!Object.prototype.hasOwnProperty.call(initialPages,id) && !safe(page.title).trim())return alertUser('Hãy nhập tên cho link mới: '+id,'error'),false;
      if(!validUrl(page.unlock)) return alertUser('Link đích chưa hợp lệ tại: '+id,'error'),false;
      if(Array.isArray(page.tasks)) {
        if(page.tasks.length<1 || page.tasks.length>8) return alertUser('Mỗi link cần 1–8 nhiệm vụ. Hãy kiểm tra: '+id,'error'),false;
        for(const t of page.tasks){ if(!t.label || !validUrl(t.url))return alertUser('Tên hoặc URL nhiệm vụ chưa hợp lệ tại: '+id,'error'),false; }
      }
    }
    return true;
  }
  function displaySelected() {
    editing=true;
    if(!selectedId || !entries[selectedId]) {selectedId=Object.keys(entries)[0];}
    const page=entries[selectedId];
    $('pageHeading').textContent=Object.prototype.hasOwnProperty.call(initialPages,selectedId) ? 'Chỉnh sửa liên kết' : 'Tạo liên kết mới';
    $('linkTitle').value=safe(page.title || ''); $('linkSlug').value=selectedId; $('unlockUrl').value=safe(page.unlock);
    renderTaskEditor(getTasks(page));editing=false;renderSidebar();refreshPreview();
  }
  function refreshPreview() {
    const tasks=readTaskEditor();
    const title=$('linkTitle').value.trim() || 'Liên kết mới';
    $('previewTitle').textContent=title;
    $('previewCount').textContent='0 / '+tasks.length;
    $('previewUnlock').textContent='🔒 '+(title.length>27 ? title.slice(0,27)+'…' : 'Mở khóa · '+title);
    const url=$('linkSlug').value.trim() || selectedId;
    $('shareUrl').value=getPageUrl(url);
    const list=$('previewList');clearChildren(list);
    tasks.forEach((task,i)=>{
      const kind=KINDS[task.type]?task.type:'custom';
      const card=document.createElement('div');card.className='preview-task preview-'+kind;
      const icon=document.createElement('span');icon.className='preview-task-lock '+kind;icon.textContent=KINDS[kind].glyph;
      const name=document.createElement('span');name.className='preview-task-name';name.textContent=task.label || 'Nhiệm vụ '+(i+1);
      const arrow=document.createElement('span');arrow.className='preview-chevron';arrow.textContent='›';card.append(icon,name,arrow);list.appendChild(card);
    });
  }
  function makeNew() {
    if(!storeCurrent())return;
    const id=makeUniqueSlug('link-moi');
    entries[id]={title:'',unlock:'',tasks:fallbackTasks(DEFAULTS)};selectedId=id;autoSlug=true;
    hideNotice();displaySelected();$('linkTitle').focus();
    if(matchMedia('(max-width:750px)').matches)document.querySelector('.content-heading').scrollIntoView({behavior:'smooth'});
  }
  function duplicate() {
    if(!storeCurrent())return;
    const source=entries[selectedId];const id=makeUniqueSlug((source.title || selectedId)+' copy');
    entries[id]={...JSON.parse(JSON.stringify(source)),title:(source.title || selectedId)+' (bản sao)'};selectedId=id;autoSlug=false;displaySelected();
    alertUser('Đã tạo bản sao. Đổi tên và ID nếu cần, sau đó đăng lên GitHub.');
  }
  function removeCurrent() {
    if(Object.keys(entries).length<=1){alertUser('Cần giữ tối thiểu một link trong hệ thống.','error');return;}
    if(!window.confirm('Xóa link "'+selectedId+'" khỏi cấu hình? Link chia sẻ cũ sẽ không còn mở được sau khi đăng.'))return;
    delete entries[selectedId];selectedId=Object.keys(entries)[0];displaySelected();alertUser('Đã xóa khỏi bản chỉnh sửa. Hãy xuất file hoặc đăng GitHub để áp dụng.','warn');
  }
  function getRepoParts() {
    const owner=$('repoOwner').value.trim(),repo=$('repoName').value.trim(),branch=$('repoBranch').value.trim();
    if(!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37})$/.test(owner) || !/^[\w.-]{1,100}$/.test(repo) || !branch || branch.length>150 || /[\s?#[\]\\]/.test(branch))throw Error('GitHub username, tên repository hoặc branch không hợp lệ.');
    const token=$('githubToken').value.trim();if(!token)throw Error('Vui lòng nhập fine-grained token có quyền Contents: Read and write.');
    return {owner,repo,branch,token};
  }
  function sourceCode() {
    const sorted=copyPages();
    // Pages are a plain JSON object; no user-supplied string becomes executable JavaScript.
    // Preserve existing defaults, IDs and URL values for every page.
    return '// SubUnlock data.js – tạo bởi SubUnlock Studio. Không cần sửa file thủ công.\n'
      +'// Quản trị tại admin.html. Các link đích và nhiệm vụ được lưu dưới đây.\n\n'
      +'const DEFAULT_SUB = '+JSON.stringify(DEFAULTS.sub)+';\n'
      +'const DEFAULT_TIKTOK = '+JSON.stringify(DEFAULTS.followTikTok)+';\n'
      +'const DEFAULT_TELE = '+JSON.stringify(DEFAULTS.tele)+';\n'
      +'const CYBER_MODS_URL = '+JSON.stringify(DEFAULTS.cyberMods)+';\n\n'
      +'const pages = '+JSON.stringify(sorted,null,2)+';\n\n'
      +'Object.keys(pages).forEach(function (key) {\n'
      +'  if (!pages[key].sub) pages[key].sub = DEFAULT_SUB;\n'
      +'  if (!pages[key].followTikTok) pages[key].followTikTok = DEFAULT_TIKTOK;\n'
      +'  if (!pages[key].tele) pages[key].tele = DEFAULT_TELE;\n'
      +'  if (!pages[key].cyberMods) pages[key].cyberMods = CYBER_MODS_URL;\n'
      +'});\n';
  }
  function downloadFile(filename,content,type) {
    const blob=new Blob([content],{type:type||'text/javascript;charset=utf-8'});
    const url=URL.createObjectURL(blob); const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
  }
  function saveDraft(){if(!storeCurrent())return;try{localStorage.setItem(DRAFT_KEY,JSON.stringify({pages:entries,selectedId,createdAt:Date.now()}));alertUser('Đã lưu bản nháp trên thiết bị này. Chưa thay đổi website công khai.');}catch(e){alertUser('Trình duyệt không cho phép lưu bản nháp. Hãy tải data.js thay thế.','error');}}
  function exportFile(){if(!validateAll())return;downloadFile('data.js',sourceCode());alertUser('Đã tải data.js. Hãy tải file này lên đúng vị trí data.js trong repository GitHub Pages để cập nhật website.');}
  function utf8B64(value) {
    const bytes=new TextEncoder().encode(value);let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode.apply(null,bytes.subarray(i,i+8192));return btoa(binary);
  }
  function b64Utf8(value){const bin=atob(value.replace(/\s/g,''));const bytes=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);return new TextDecoder().decode(bytes);}
  async function requestGitHub(method,config,body) {
    const endpoint='https://api.github.com/repos/'+encodeURIComponent(config.owner)+'/'+encodeURIComponent(config.repo)+'/contents/data.js';
    const url=method==='GET'?endpoint+'?ref='+encodeURIComponent(config.branch):endpoint;
    const resp=await fetch(url,{method,headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+config.token,'X-GitHub-Api-Version':'2022-11-28',...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{}) ,cache:'no-store'});
    const result=await resp.json().catch(()=>({}));
    if(!resp.ok){const reason=result.message || 'Lỗi không xác định';throw Error('GitHub HTTP '+resp.status+': '+reason+'. Hãy kiểm tra repository, branch và quyền token.');}
    return result;
  }
  function setBusy(on){busy=on;['publishBtn','testGithubBtn','downloadBtn','draftBtn'].forEach(id=>{$(id).disabled=on;});}
  async function testGitHub(){
    if(busy)return;let config;try{config=getRepoParts();}catch(e){alertUser(e.message,'error');return;}
    setBusy(true);try{const result=await requestGitHub('GET',config);alertUser('Kết nối thành công! Tìm thấy data.js tại '+config.owner+'/'+config.repo+' · '+config.branch+' (SHA '+result.sha.slice(0,8)+').');}
    catch(e){alertUser(e.message,'error');}finally{setBusy(false);}
  }
  async function publishGithub(){
    if(busy || !validateAll())return;
    let config;try{config=getRepoParts();}catch(e){alertUser(e.message,'error');return;}
    if(!window.confirm('Đăng cập nhật '+Object.keys(entries).length+' link lên '+config.owner+'/'+config.repo+' ('+config.branch+')? Đây là thao tác thay đổi trực tiếp data.js trên GitHub.'))return;
    setBusy(true);
    try{
      const remote=await requestGitHub('GET',config);
      if(!remote.sha || !remote.content)throw Error('GitHub không trả về nội dung data.js để xác minh an toàn.');
      const remoteText=b64Utf8(remote.content);
      if(baselineText && remoteText.replace(/\r\n/g,'\n').trim()!==baselineText.replace(/\r\n/g,'\n').trim()){
        if(!window.confirm('CẢNH BÁO: data.js trên GitHub đã khác với dữ liệu tải khi bạn mở trang. Tiếp tục sẽ ghi đè thay đổi mới hơn. Bạn có chắc không?')){
          alertUser('Đã hủy để tránh ghi đè dữ liệu vừa cập nhật ở nơi khác. Hãy tải lại trang quản trị rồi chỉnh sửa lại.','warn');return;
        }
      }
      const newText=sourceCode();
      const result=await requestGitHub('PUT',config,{message:'Admin: cập nhật cấu hình link SubUnlock',content:utf8B64(newText),sha:remote.sha,branch:config.branch});
      if(!result.content || !result.commit)throw Error('GitHub chưa xác nhận commit thành công.');
      baselineText=newText;
      try{localStorage.removeItem(DRAFT_KEY);}catch(_){}
      alertUser('Đã đăng thành công '+Object.keys(entries).length+' link lên GitHub! GitHub Pages sẽ xuất bản thay đổi theo thời gian triển khai của repository.');
    }catch(e){alertUser('Không thể đăng: '+e.message,'error');}finally{setBusy(false);}
  }
  async function copyShareUrl(){
    const value=$('shareUrl').value;
    try{if(!navigator.clipboard)throw Error('unsupported');await navigator.clipboard.writeText(value);alertUser('Đã sao chép link: '+value);}
    catch(_){$('shareUrl').focus();$('shareUrl').select();try{document.execCommand('copy');alertUser('Đã sao chép link: '+value);}catch(__){alertUser('Hãy giữ vào đường dẫn để sao chép thủ công.','warn');}}
  }
  function setupRepoDefaults(){
    const host=location.hostname;
    if(host.endsWith('.github.io')){
      $('repoOwner').value=host.split('.')[0];
      $('repoName').value=decodeURIComponent(location.pathname.split('/').filter(Boolean)[0]||host);
      // root-hosted Github Pages use owner.github.io as repository
      if(location.pathname.split('/').filter(Boolean).length===1 && location.pathname.endsWith('admin.html'))$('repoName').value=host;
    }else{$('repoOwner').value='nghialqtv';$('repoName').value='SubUnlock';}
  }
  async function loadBaseline(){try{const response=await fetch('data.js?_admin_source='+Date.now(),{cache:'no-store'});if(response.ok)baselineText=await response.text();}catch(_){} }
  function maybeRestoreDraft(){
    try{
      const saved=JSON.parse(localStorage.getItem(DRAFT_KEY)||'null');
      if(!saved || !saved.pages || !Object.keys(saved.pages).length)return;
      const notice=$('notice');notice.replaceChildren();notice.className='notice warn';notice.hidden=false;
      const msg=document.createTextNode('Có bản nháp đã lưu trên thiết bị này. ');
      const btn=document.createElement('button');btn.type='button';btn.textContent='Khôi phục bản nháp';btn.style.cssText='border:1px solid #9f8a57;border-radius:7px;background:#544121;color:#fff2c4;padding:5px 10px;font-weight:800';
      btn.addEventListener('click',()=>{if(!window.confirm('Khôi phục sẽ thay thế bản chỉnh sửa đang hiển thị trên thiết bị. Tiếp tục?'))return;entries=saved.pages;selectedId=saved.selectedId&&entries[saved.selectedId]?saved.selectedId:Object.keys(entries)[0];autoSlug=false;displaySelected();alertUser('Đã khôi phục bản nháp. Cần tải data.js hoặc đăng lên GitHub để công khai.');});
      notice.append(msg,btn);
    }catch(_){}
  }
  $('newLinkBtn').addEventListener('click',makeNew);
  $('duplicateLinkBtn').addEventListener('click',duplicate);
  $('deleteLinkBtn').addEventListener('click',removeCurrent);
  $('searchLinks').addEventListener('input',renderSidebar);
  $('linkTitle').addEventListener('input',()=>{
    if(autoSlug){$('linkSlug').value=makeUniqueSlug($('linkTitle').value);}
    if(storeCurrent()){renderSidebar();refreshPreview();}
  });
  $('linkSlug').addEventListener('input',()=>{autoSlug=false;if(validSlug($('linkSlug').value.trim())){hideNotice();if(storeCurrent())renderSidebar();}refreshPreview();});
  $('unlockUrl').addEventListener('input',()=>{storeCurrent();refreshPreview();});
  $('platformGrid').addEventListener('click',event=>{
    const button=event.target.closest('[data-platform]');if(!button)return;
    const kind=button.dataset.platform;let tasks=readTaskEditor();
    if(tasks.length>=8){alertUser('Mỗi link có tối đa 8 nhiệm vụ.','warn');return;}
    tasks.push({type:kind,label:KINDS[kind].label,url:''});renderTaskEditor(tasks);storeCurrent();refreshPreview();
    const last=$('taskEditorList').lastElementChild;last.scrollIntoView({block:'nearest',behavior:'smooth'});last.querySelector('.task-url').focus();
  });
  $('draftBtn').addEventListener('click',saveDraft);
  $('downloadBtn').addEventListener('click',exportFile);
  $('testGithubBtn').addEventListener('click',testGitHub);
  $('publishBtn').addEventListener('click',publishGithub);
  $('copyUrlBtn').addEventListener('click',copyShareUrl);
  $('showToken').addEventListener('click',()=>{const token=$('githubToken');token.type=token.type==='password'?'text':'password';$('showToken').textContent=token.type==='password'?'Hiện':'Ẩn';});
  setupRepoDefaults();
  if(!selectedId){entries['link-moi']={unlock:'',tasks:fallbackTasks(DEFAULTS)};selectedId='link-moi';}
  displaySelected();loadBaseline();maybeRestoreDraft();
})();
