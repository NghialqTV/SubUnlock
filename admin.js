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
  // Keep only a verified publication snapshot until GitHub Pages catches up.
  const PUBLISHED_KEY='subunlock-last-published-v3';
  function getPublished(){try{return JSON.parse(localStorage.getItem(PUBLISHED_KEY)||'null');}catch(_){return null;}}
  function rememberPublished(manifest){try{localStorage.setItem(PUBLISHED_KEY,JSON.stringify({pages:copyPages(),version:manifest.version,owner:document.getElementById('repoOwner').value.trim(),repo:document.getElementById('repoName').value.trim(),branch:document.getElementById('repoBranch').value.trim(),savedAt:Date.now()}));}catch(_){}}

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
  let initialPages = typeof pages === 'object' && pages !== null ? JSON.parse(JSON.stringify(pages)) : {};
  const published=getPublished();
  // Pages deployment may lag behind the confirmed Git commit.
  const pendingPublished=published && published.pages && String(window.__subunlockManifestVersion||'')!==String(published.version) && Object.keys(published.pages).length>=Object.keys(initialPages).length && Date.now()-published.savedAt<86400000;
  if(pendingPublished)initialPages=JSON.parse(JSON.stringify(published.pages));
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
      {type:'youtube',label:'Đăng Kí Kênh NghĩaLQ TV',url:page.sub || DEFAULTS.sub},
      {type:'youtube',label:'Đăng Kí Kênh Cyber Mods',url:page.cyberMods || DEFAULTS.cyberMods},
      {type:'tiktok',label:'Follow TikTok',url:page.followTikTok || DEFAULTS.followTikTok},
      {type:'telegram',label:'Tham Gia Telegram',url:page.tele || DEFAULTS.tele}
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
    queueAutosave();return true;
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
  function exportFile(){if(!validateAll())return;downloadFile('data.js',sourceCode());alertUser('Đã tải data.js. Hãy tải file này lên đúng vị trí data.js trong repository GitHub Pages để cập nhật website.');}
  function utf8B64(value) {
    const bytes=new TextEncoder().encode(value);let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode.apply(null,bytes.subarray(i,i+8192));return btoa(binary);
  }
  function b64Utf8(value){const bin=atob(value.replace(/\s/g,''));const bytes=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);return new TextDecoder().decode(bytes);}
  async function githubApi(method,config,path,body){
    const url='https://api.github.com/repos/'+encodeURIComponent(config.owner)+'/'+encodeURIComponent(config.repo)+(path?'/'+path:'');
    let resp;try{resp=await fetch(url,{method,headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+config.token,'X-GitHub-Api-Version':'2022-11-28',...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{}) ,cache:'no-store'});}catch(e){throw Error('Không kết nối được GitHub API ('+method+' '+(path||'repository')+'). Kiểm tra mạng, trình duyệt hoặc tiện ích chặn kết nối. Chi tiết: '+e.message);}
    const result=await resp.json().catch(()=>({}));
    if(!resp.ok){
      const hint=resp.status===404?'Không tìm thấy repository, branch hoặc tài nguyên API. Kiểm tra GitHub username, tên repository, branch và quyền truy cập token (Contents: Read and write).':resp.status===401?'Token không hợp lệ hoặc đã hết hạn.':resp.status===403?'Token thiếu quyền hoặc bị giới hạn API.':resp.status===409?'Có xung đột dữ liệu; tải lại trang trước khi đăng.':'';
      throw Error('GitHub HTTP '+resp.status+' tại '+method+' /'+path.split('?')[0]+': '+(result.message||'Unknown error')+(hint?' — '+hint:''));
    }
    return result;
  }
  async function requestGitHub(method,config,body){
    return githubApi(method,config,'contents/data.js'+(method==='GET'?'?ref='+encodeURIComponent(config.branch):''),body);
  }
  function makeShards(){
    const result=[];let current={};let bytes=2;
    for(const [id,page] of Object.entries(entries)){
      const n=new TextEncoder().encode(JSON.stringify({[id]:page})).length;
      if(n>800000)throw Error('Một mục dữ liệu vượt 800 KB: '+id);
      if(bytes+n>750000 && Object.keys(current).length){result.push(current);current={};bytes=2;}
      current[id]=page;bytes+=n;
    }
    if(Object.keys(current).length)result.push(current);
    if(result.length>2000)throw Error('Quá nhiều phần dữ liệu.');
    const files=result.map((_,i)=>'part-'+String(i+1).padStart(5,'0')+'.json');
    return {files,parts:result};
  }
  async function publishShards(config){
    // Validate remote state first. A single atomic commit updates both legacy and sharded data.
    await githubApi('GET',config,'');
    const branch=await githubApi('GET',config,'branches/'+encodeURIComponent(config.branch));
    const refPath='git/refs/heads/'+config.branch.split('/').map(encodeURIComponent).join('/');
    const oldSha=branch.commit.sha;
    const oldCommit=await githubApi('GET',config,'git/commits/'+oldSha);
    const oldTree=await githubApi('GET',config,'git/trees/'+oldCommit.tree.sha+'?recursive=1');
    if(oldTree.truncated)throw Error('Repository quá lớn; dừng để tránh ghi đè dữ liệu.');
    const oldManifest=oldTree.tree.find(item=>item.path==='data/manifest.json');
    const shardPaths=oldTree.tree.filter(item=>/^data\/part-[0-9]{5}\.json$/.test(item.path));
    const remote=await requestGitHub('GET',config);
    if(!remote.content)throw Error('Không đọc được data.js trên GitHub. Dừng để bảo vệ dữ liệu.');
    const remoteText=b64Utf8(remote.content).replace(/\r\n/g,'\n').trim();
    const localText=(baselineText||'').replace(/\r\n/g,'\n').trim();
    if(!oldManifest && (!localText || remoteText!==localText))
      throw Error('data.js trên GitHub khác bản website đang mở. Hãy đồng bộ website hoặc tải bản sao trước; không tự ghi đè dữ liệu cũ.');
    if(oldManifest){
      const manifestResponse=await githubApi('GET',config,'contents/data/manifest.json?ref='+encodeURIComponent(config.branch));
      if(!loadedManifestSha)throw Error('Đã có dữ liệu phân mảnh trên GitHub. Hãy nhấn KIỂM TRA KẾT NỐI trước khi đăng để xác nhận phiên bản mới nhất.');
      if(manifestResponse.sha!==loadedManifestSha)throw Error('Dữ liệu GitHub đã thay đổi từ lần kiểm tra gần nhất. Hãy tải lại trang, kiểm tra kết nối rồi đăng lại.');
      const manifest=JSON.parse(b64Utf8(manifestResponse.content));
      if(manifest.count!==Object.keys(initialPages).length)
        throw Error('Số link trên GitHub ('+manifest.count+') khác dữ liệu trang đang mở ('+Object.keys(initialPages).length+'). Dừng để tránh mất link; hãy tải lại trang.');
    }
    const shards=makeShards();
    const version=Date.now().toString();
    const changes=[];
    for(let i=0;i<shards.files.length;i++)changes.push({path:'data/'+shards.files[i],mode:'100644',type:'blob',content:JSON.stringify(shards.parts[i])});
    const manifest={version,count:Object.keys(entries).length,files:shards.files};
    changes.push({path:'data/manifest.json',mode:'100644',type:'blob',content:JSON.stringify(manifest,null,2)+'\n'});
    changes.push({path:'data.js',mode:'100644',type:'blob',content:sourceCode()});
    for(const old of shardPaths)if(!shards.files.includes(old.path.slice(5)))changes.push({path:old.path,mode:'100644',type:'blob',sha:null});
    const tree=await githubApi('POST',config,'git/trees',{base_tree:oldCommit.tree.sha,tree:changes});
    const commit=await githubApi('POST',config,'git/commits',{message:'SubUnlock: cập nhật đồng bộ '+manifest.count+' link',tree:tree.sha,parents:[oldSha]});
    await githubApi('PATCH',config,refPath,{sha:commit.sha,force:false});
    loadedManifestSha=null;
    baselineText=sourceCode();
    return manifest;
  }
  let loadedManifestSha=null;
  async function checkManifestBaseline(){
    try{const owner=$('repoOwner').value.trim(),repo=$('repoName').value.trim(),branch=$('repoBranch').value.trim(),token=$('githubToken').value.trim();
      if(!owner||!repo||!token)return;
      const response=await githubApi('GET',{owner,repo,branch,token},'contents/data/manifest.json?ref='+encodeURIComponent(branch));
      loadedManifestSha=response.sha;
    }catch(e){loadedManifestSha=null;}
  }
  function setBusy(on){busy=on;['publishBtn','testGithubBtn','downloadBtn'].forEach(id=>{$(id).disabled=on;});}
  async function testGitHub(){
    if(busy)return;let config;try{config=getRepoParts();}catch(e){alertUser(e.message,'error');return;}
    setBusy(true);try{await githubApi('GET',config,'');await githubApi('GET',config,'branches/'+encodeURIComponent(config.branch));const result=await requestGitHub('GET',config);await checkManifestBaseline();alertUser('Kết nối thành công! Tìm thấy data.js tại '+config.owner+'/'+config.repo+' · '+config.branch+' (SHA '+result.sha.slice(0,8)+').');}
    catch(e){alertUser(e.message,'error');}finally{setBusy(false);}
  }
  async function publishGithub(){
    if(busy || !validateAll())return;
    let config;try{config=getRepoParts();}catch(e){alertUser(e.message,'error');return;}
    if(!window.confirm('Đăng '+Object.keys(entries).length+' link lên GitHub dưới dạng nhiều file dữ liệu?'))return;
    setBusy(true);
    try{
      // Recheck GitHub version before every publish.
      if(!loadedManifestSha)await checkManifestBaseline();
      const manifest=await publishShards(config);
      rememberPublished(manifest);
      initialPages=copyPages();
      loadedManifestSha=await githubApi('GET',config,'contents/data/manifest.json?ref='+encodeURIComponent(config.branch)).then(x=>x.sha);
      alertUser('Đã đăng đồng bộ '+manifest.count+' link (data.js và '+manifest.files.length+' file dữ liệu). Có thể tạo và đăng link tiếp ngay; GitHub Pages cần thời gian cập nhật.');
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
  $('downloadBtn').addEventListener('click',exportFile);
  $('testGithubBtn').addEventListener('click',testGitHub);
  $('publishBtn').addEventListener('click',publishGithub);
  $('copyUrlBtn').addEventListener('click',copyShareUrl);
  $('showToken').addEventListener('click',()=>{const token=$('githubToken');token.type=token.type==='password'?'text':'password';$('showToken').textContent=token.type==='password'?'Hiện':'Ẩn';});
  setupRepoDefaults();
  if(!selectedId){entries['link-moi']={unlock:'',tasks:fallbackTasks(DEFAULTS)};selectedId='link-moi';}
  displaySelected();loadBaseline();if(pendingPublished)alertUser('Đã giữ dữ liệu đăng thành công gần nhất trên thiết bị để tránh mất link khi GitHub Pages chưa cập nhật.','warn');
})();
