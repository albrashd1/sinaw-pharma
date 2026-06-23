/* Sinaw Pharma Book — frontend app (talks to the Cloudflare Worker API) */

/* ====================================================================
   1) SET YOUR API URL HERE  (your deployed Worker URL, no trailing slash)
   ==================================================================== */
const API = (document.querySelector('meta[name="sinaw-api"]')?.content
            || 'https://YOUR-WORKER-SUBDOMAIN.workers.dev').replace(/\/+$/,'');

const COVER_ORDER=['warfarin','bp','skincare','firstaid','sprays','motherbaby','general'];
const COVER_LABELS={
  en:{warfarin:'Anticoagulant',bp:'BP & Diabetes',skincare:'Skincare',firstaid:'First Aid',sprays:'Sprays & Drops',motherbaby:'Mother & Baby',general:'Medication'},
  ar:{warfarin:'مضادات التخثر',bp:'الضغط والسكري',skincare:'العناية بالبشرة',firstaid:'إسعافات',sprays:'بخّاخات وقطرات',motherbaby:'الأم والطفل',general:'الأدوية'}
};
const ACCEPT='.pdf,.png,.jpg,.jpeg,.webp,.gif,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv';

const T={
  en:{lib:'Library',disp:'Dispensary',lede:'A warm, modern shelf of clinical knowledge. Open a folder to see what it holds, then preview or download any document.',searchPh:'Search collections and documents…',bulletin:'Bulletin:',joinChannel:'Join the WhatsApp channel',noChannel:'No channel linked yet — the dispensary can add one.',collectionsL:'Collections',documentsL:'Documents',dispensedL:'Downloads',onShelves:'On the Shelves',searchResults:'Search results',collectionsWord:'collections',hoverFolder:'hover a book',back:'Back to the shelves',statDocuments:'Documents',statTotalDispensed:'Total downloads',statImagesPdfs:'Images / PDFs',imageOpt:'Image',preview:'Preview',dispense:'Download',documents:'documents',emptyTitle:'The shelves are empty.',emptySearchTitle:'No book matches that.',emptyHint:'Open the dispensary to add the first collection',emptySearchHint:'Try another title',collEmpty:'This collection is empty. The dispensary can add documents.',noPreview:'This file type cannot be previewed. Download it to view.',dlView:'Download to view',dispenseDownload:'Download',gateTitle:'The Dispensary',gatePrompt:'Sign in to manage collections and documents.',signIn:'Sign in',password:'Password',lock:'Sign out',panelChannel:'WhatsApp Channel',channelUrl:'Channel URL',saveChannel:'Save channel',saved:'Saved.',panelAddColl:'Add a New Collection',collName:'Collection name',shortDesc:'Short description',folderCover:'Folder cover (choose one or upload an image)',uploadShort:'Upload',addColl:'Add collection',panelCollsDocs:'Collections & Documents',fileDoc:'+ Upload a document',chooseFile:'Choose file',docTitle:'Document title (optional)',addDoc:'Upload',removeColl:'Remove collection',editCover:'Edit cover',uploading:'Uploading…',dispensingLedger:'Download Ledger',hDocument:'Document',hType:'Type',hDispensed:'Downloads',noColls:'No collections yet.',noDocsYet:'No documents yet.',dispensedWord:'downloads',remove:'Remove',footer:'Sinaw Pharma Book · A modern apothecary library of clinical imaging & documents',alertCollName:'Enter a collection name first.',confirmDelColl:'Remove this entire collection and its documents?',confirmDelFile:'Remove this document?',allowed:'Allowed: PDF, images, Word, Excel, PowerPoint, TXT, CSV.',security:'Security',currentPass:'Current password',newPass:'New password',confirmPass:'Confirm new password',changePass:'Change password',passChanged:'Password updated.',wrongPass:'Wrong password.',locked:'Too many attempts. Try again in',secW:'s',loadErr:'Could not reach the library. Check your connection.',retry:'Retry',secNote:'Admin actions and uploads are verified by the server. Your password is hashed (PBKDF2) and never stored in this page.'},
  ar:{lib:'المكتبة',disp:'الإدارة',lede:'رفٌّ دافئ وحديث من المعرفة الدوائية. افتح مجلدًا لتطّلع على محتواه، ثم عاين أو نزّل أي مستند.',searchPh:'ابحث في المجموعات والمستندات…',bulletin:'إعلان:',joinChannel:'انضم إلى قناة الواتساب',noChannel:'لا توجد قناة بعد — يمكن للإدارة إضافتها.',collectionsL:'المجموعات',documentsL:'المستندات',dispensedL:'التنزيلات',onShelves:'على الرفوف',searchResults:'نتائج البحث',collectionsWord:'مجموعة',hoverFolder:'مرّر فوق كتاب',back:'العودة إلى الرفوف',statDocuments:'المستندات',statTotalDispensed:'إجمالي التنزيلات',statImagesPdfs:'صور / ملفات',imageOpt:'صورة',preview:'معاينة',dispense:'تنزيل',documents:'مستند',emptyTitle:'الرفوف فارغة.',emptySearchTitle:'لا يوجد كتاب مطابق.',emptyHint:'افتح الإدارة لإضافة أول مجموعة',emptySearchHint:'جرّب عنوانًا آخر',collEmpty:'هذه المجموعة فارغة. يمكن للإدارة إضافة مستندات.',noPreview:'لا يمكن معاينة هذا النوع. نزّله لعرضه.',dlView:'نزّل للعرض',dispenseDownload:'تنزيل',gateTitle:'لوحة الإدارة',gatePrompt:'سجّل الدخول لإدارة المجموعات والمستندات.',signIn:'تسجيل الدخول',password:'كلمة المرور',lock:'تسجيل الخروج',panelChannel:'قناة الواتساب',channelUrl:'رابط القناة',saveChannel:'حفظ القناة',saved:'تم الحفظ.',panelAddColl:'إضافة مجموعة جديدة',collName:'اسم المجموعة',shortDesc:'وصف مختصر',folderCover:'غلاف المجلد (اختر غلافًا أو ارفع صورة)',uploadShort:'رفع',addColl:'إضافة المجموعة',panelCollsDocs:'المجموعات والمستندات',fileDoc:'+ رفع مستند',chooseFile:'اختر ملفًا',docTitle:'عنوان المستند (اختياري)',addDoc:'رفع',removeColl:'حذف المجموعة',editCover:'تغيير الغلاف',uploading:'جارٍ الرفع…',dispensingLedger:'سجل التنزيلات',hDocument:'المستند',hType:'النوع',hDispensed:'التنزيلات',noColls:'لا توجد مجموعات بعد.',noDocsYet:'لا توجد مستندات بعد.',dispensedWord:'تنزيل',remove:'حذف',footer:'صيدلية سِناو · مكتبة إلكترونية حديثة للصور والمستندات الطبية',alertCollName:'أدخل اسم المجموعة أولًا.',confirmDelColl:'حذف هذه المجموعة وكل مستنداتها؟',confirmDelFile:'حذف هذا المستند؟',allowed:'المسموح: PDF وصور وWord وExcel وPowerPoint وTXT وCSV.',security:'الأمان',currentPass:'كلمة المرور الحالية',newPass:'كلمة مرور جديدة',confirmPass:'تأكيد كلمة المرور',changePass:'تغيير كلمة المرور',passChanged:'تم تحديث كلمة المرور.',wrongPass:'كلمة المرور غير صحيحة.',locked:'محاولات كثيرة. أعد المحاولة بعد',secW:'ث',loadErr:'تعذّر الوصول إلى المكتبة. تحقّق من الاتصال.',retry:'إعادة المحاولة',secNote:'إجراءات الإدارة والرفع يتحقق منها الخادم. كلمة المرور مُجزّأة (PBKDF2) ولا تُخزَّن في هذه الصفحة.'}
};

let state={channelUrl:'',collections:[]}, view={name:'library',collId:null}, query='', lang='en';
let authToken=null, newName='', newDesc='', pendingCover='general', loadFailed=false;

function t(k){return (T[lang]&&T[lang][k])||T.en[k]||k}
function arrow(){return lang==='ar'?'→':'←'}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function coverSrc(c){if(c.cover&&window.COVERS[c.cover])return window.COVERS[c.cover];if(c.coverUrl)return c.coverUrl;return window.COVERS.general;}
const fileUrl=(id,preview)=>`${API}/files/${id}${preview?'?preview=1':''}`;
const getColl=id=>state.collections.find(c=>c.id===id);
const totalDocs=()=>state.collections.reduce((n,c)=>n+c.files.length,0);
const totalDisp=()=>state.collections.reduce((n,c)=>n+c.files.reduce((m,x)=>m+x.downloads,0),0);
const collDisp=c=>c.files.reduce((m,x)=>m+x.downloads,0);

let toastTimer=null;
function toast(msg,isErr){const el=document.getElementById('toast');el.textContent=msg;el.className='toast show'+(isErr?' err':'');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.className='toast',2600);}

/* ---------------- API ---------------- */
async function api(path,opts){
  opts=opts||{};
  const headers=opts.headers||{};
  if(authToken)headers['Authorization']='Bearer '+authToken;
  const res=await fetch(API+path,{...opts,headers});
  let data=null; try{data=await res.json();}catch(e){}
  if(res.status===401){authToken=null;}
  if(!res.ok){const e=new Error((data&&data.error)||('HTTP '+res.status));e.status=res.status;e.data=data;throw e;}
  return data;
}
async function loadState(){
  try{const d=await api('/api/state');state.channelUrl=d.channelUrl||'';state.collections=d.collections||[];loadFailed=false;}
  catch(e){loadFailed=true;}
}

/* ---------------- render ---------------- */
function applyLang(){
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  document.body.classList.toggle('rtl',lang==='ar');
  document.getElementById('navLang').textContent=lang==='en'?'العربية':'English';
  document.getElementById('navLib').textContent=t('lib');
  document.getElementById('navDisp').textContent=t('disp');
  document.getElementById('footMain').textContent=t('footer');
}
function render(){
  const app=document.getElementById('app');app.className='fade';
  if(loadFailed&&view.name!=='dispensary'){app.innerHTML=`<div class="center-load"><div><p style="font-family:'DM Mono';color:var(--ink-2)">${t('loadErr')}</p><button class="mini" style="margin-top:16px" id="retryBtn">${t('retry')}</button></div></div>`;void app.offsetWidth;return;}
  if(view.name==='library')app.innerHTML=libraryHTML();
  else if(view.name==='collection')app.innerHTML=collectionHTML(getColl(view.collId));
  else if(view.name==='dispensary')app.innerHTML=dispensaryHTML();
  void app.offsetWidth;
}

function libraryHTML(){
  const q=query.trim().toLowerCase();
  let cols=state.collections;
  if(q){cols=state.collections.map(c=>{
    if(c.name.toLowerCase().includes(q))return c;
    const hits=c.files.filter(x=>x.name.toLowerCase().includes(q));
    return hits.length?{...c,files:hits}:null;
  }).filter(Boolean);}
  const ch=state.channelUrl
    ?`<a href="${esc(state.channelUrl)}" target="_blank" rel="noopener">◉ ${t('joinChannel')}</a>`
    :`<span class="off">${t('noChannel')}</span>`;
  const folders=cols.length?cols.map(c=>`
    <div class="slot">
      <button class="folder" data-open="${c.id}" aria-label="${esc(c.name)}">
        <span class="floattag">${c.files.length} ${t('documents')}</span>
        <span class="cover"><img src="${coverSrc(c)}" alt="${esc(c.name)}" loading="lazy"></span>
        <span class="fname">${esc(c.name)}</span>
        <span class="fqty">${c.files.length} ${t('documents')}</span>
      </button><span class="ledge"></span>
    </div>`).join(''):`<div class="empty"><div class="e">📚</div><p>${q?t('emptySearchTitle'):t('emptyTitle')}</p><span class="s">${q?t('emptySearchHint'):t('emptyHint')}</span></div>`;
  const kick=lang==='ar'?`<div class="kick">صيدلية سِناو · الجمعية الصيدلانية</div>`:`<div class="kick">Sinaw Pharmaceutical Society <span class="ar">·  صيدلية سِناو</span></div>`;
  const title=lang==='ar'?`<h1 class="head">المكتبة <em>الإلكترونية</em></h1>`:`<h1 class="head">The <em>Apothecary</em><br>Library</h1>`;
  return `
  <section class="hero">${kick}${title}
    <p class="lede">${t('lede')}</p>
    <div class="lookup"><span class="pre">⌕</span><input id="search" type="search" placeholder="${t('searchPh')}" value="${esc(query)}" autocomplete="off"></div>
    <div class="dispatch"><span>${t('bulletin')}</span> ${ch}</div>
    <div class="readout">
      <div class="cell"><div class="n">${state.collections.length}</div><div class="l">${t('collectionsL')}</div></div>
      <div class="cell"><div class="n">${totalDocs()}</div><div class="l">${t('documentsL')}</div></div>
      <div class="cell"><div class="n">${totalDisp()}</div><div class="l">${t('dispensedL')}</div></div>
    </div>
  </section>
  <div class="sec-head"><h2>${q?t('searchResults'):t('onShelves')}</h2><span class="m">${cols.length} ${t('collectionsWord')} · ${t('hoverFolder')}</span></div>
  <section class="shelves">${folders}</section>`;
}

function collectionHTML(c){
  if(!c){view={name:'library'};return libraryHTML();}
  const docs=c.files.length?c.files.map(x=>{
    let thumb;
    if(x.type==='image')thumb=`<div class="thumb"><img src="${fileUrl(x.id,true)}" alt="${esc(x.name)}" loading="lazy"><span class="badge">${t('imageOpt')}</span></div>`;
    else if(x.type==='pdf')thumb=`<div class="thumb pdf"><div class="page"></div><span class="badge">PDF</span></div>`;
    else thumb=`<div class="thumb img-blank"><span class="ig">📄</span><span class="badge">DOC</span></div>`;
    return `<article class="doc">${thumb}
      <div class="meta"><h4>${esc(x.name)}</h4>
        <div class="disp-n"><b>${x.downloads}</b> ${t('dispensedWord')}</div>
        <div class="acts">${x.type==='doc'?'':`<button class="da" data-read="${x.id}">${t('preview')}</button>`}<button class="da solid" data-get="${x.id}">${t('dispense')}</button></div>
      </div></article>`;
  }).join(''):`<p style="margin-top:24px;color:var(--ink-3)">${t('collEmpty')}</p>`;
  return `
  <section class="coll">
    <button class="back" data-lib>${arrow()} ${t('back')}</button>
    <div class="coll-head">
      <span class="coll-cover"><img src="${coverSrc(c)}" alt="${esc(c.name)}"></span>
      <div class="coll-main"><h1>${esc(c.name)}</h1><p>${esc(c.desc||'')}</p>
        <div class="coll-stats">
          <div class="s"><b>${c.files.length}</b><span>${t('statDocuments')}</span></div>
          <div class="s"><b>${collDisp(c)}</b><span>${t('statTotalDispensed')}</span></div>
          <div class="s"><b>${c.files.filter(x=>x.type==='image').length}/${c.files.filter(x=>x.type==='pdf').length}</b><span>${t('statImagesPdfs')}</span></div>
        </div>
      </div>
    </div>
    <div class="docs">${docs}</div>
  </section>`;
}

function coverPicker(sel,target){
  const tiles=COVER_ORDER.map(k=>{
    const on=sel===k?'on':'';
    const da=target==='new'?`data-pickcover="${k}"`:`data-setcover="${target}:${k}"`;
    return `<button type="button" class="cv-tile ${on}" ${da} title="${COVER_LABELS[lang][k]}"><img src="${window.COVERS[k]}" alt=""></button>`;
  }).join('');
  const upDa=target==='new'?`data-uploadcover="new"`:`data-uploadcover="${target}"`;
  return `<div class="coverpick">${tiles}<button type="button" class="cv-tile upload" ${upDa} title="${t('uploadShort')}"><span><span class="pl">＋</span><br>${t('uploadShort')}</span></button></div>`;
}

function loginHTML(extra){
  return `<section class="disp-page"><div class="gate">
    <div class="g"><img src="${window.LOGO}" alt="Sinaw Pharma Book"></div>
    <h2>${t('gateTitle')}</h2><p>${t('gatePrompt')}</p>
    <input id="pw" type="password" placeholder="${t('password')}" maxlength="80" aria-label="${t('password')}" style="letter-spacing:.12em">
    <div class="err" id="loginErr">${extra||''}</div>
    <button id="doLogin">${t('signIn')}</button>
  </div></section>`;
}

function dispensaryHTML(){
  if(!authToken)return loginHTML();
  let ledger='';
  state.collections.forEach(c=>{
    ledger+=`<tr class="grp"><td colspan="3">${esc(c.name)} <span style="color:var(--ink-3)">· ${c.files.length} ${t('documents')} · ${collDisp(c)} ${t('dispensedWord')}</span></td><td></td></tr>`;
    if(!c.files.length)ledger+=`<tr><td colspan="4" class="indent" style="color:var(--ink-3)">—</td></tr>`;
    c.files.forEach(x=>{ledger+=`<tr><td class="indent">${esc(x.name)}</td><td><span class="tag ${x.type==='image'?'image':'pdf'}">${x.type}</span></td><td class="n">${x.downloads}</td><td class="end"><button class="del" data-delfile="${x.id}">${t('remove')}</button></td></tr>`;});
  });
  const blocks=state.collections.map(c=>{const isOpen=openEdit===c.id;return `
    <div class="cblock">
      <div class="cbh">
        <div class="nm"><span class="thumb-mini"><img src="${coverSrc(c)}" alt=""></span><h4>${esc(c.name)}<small>${c.files.length} ${t('documents')}</small></h4></div>
        <div class="ctrls"><button class="editbtn ${isOpen?'on':''}" data-editappear="${c.id}">${t('editCover')}</button><button class="del" data-delcoll="${c.id}">${t('removeColl')}</button></div>
      </div>
      <div class="cbf">
        ${isOpen?`<div class="inl"><div class="field" style="margin-bottom:0"><label>${t('folderCover')}</label>${coverPicker(c.cover,c.id)}</div></div>`:''}
        ${c.files.map(x=>`<div class="cbfile"><span class="fn"><span class="tag ${x.type==='image'?'image':'pdf'}">${x.type}</span>${esc(x.name)}</span><span class="mt">${x.downloads} ${t('dispensedWord')}</span></div>`).join('')||`<div class="mt" style="padding:6px 0">${t('noDocsYet')}</div>`}
        <button class="adddoc" data-adddoc="${c.id}">${t('fileDoc')}</button>
        <div class="inl" id="dc-${c.id}" style="display:none">
          <div class="field"><label>${t('docTitle')}</label><input data-dname="${c.id}" placeholder=""></div>
          <div class="upload-row">
            <label class="filebtn">${t('chooseFile')}<input type="file" data-dfile="${c.id}" accept="${ACCEPT}" style="display:none"></label>
            <span class="filename" id="fn-${c.id}"></span>
            <button class="mini" data-savedoc="${c.id}">${t('addDoc')}</button>
          </div>
          <div class="hint">${t('allowed')}</div>
        </div>
      </div>
    </div>`;}).join('');

  return `<section class="disp-page">
    <div class="reg-top"><button data-lib>${arrow()} ${t('lib')}</button><span>/ ${t('disp')}</span><button id="lock" class="lk">${t('lock')}</button></div>

    <div class="panel"><div class="pt">${t('panelChannel')}</div>
      <div class="field"><label>${t('channelUrl')}</label><input id="chUrl" placeholder="https://whatsapp.com/channel/…" value="${esc(state.channelUrl||'')}"></div>
      <button class="mini" id="saveCh">${t('saveChannel')}</button><span class="live" id="chMsg"></span>
    </div>

    <div class="panel"><div class="pt">${t('panelAddColl')}</div>
      <div class="row">
        <div class="field"><label>${t('collName')}</label><input id="nfName" value="${esc(newName)}" placeholder=""></div>
        <div class="field"><label>${t('shortDesc')}</label><input id="nfDesc" value="${esc(newDesc)}" placeholder=""></div>
      </div>
      <div class="field"><label>${t('folderCover')}</label>${coverPicker(pendingCover,'new')}</div>
      <button class="mini" id="addColl">${t('addColl')}</button>
    </div>

    <div class="panel"><div class="pt">${t('panelCollsDocs')}</div>${blocks||`<div class="mt" style="color:var(--ink-3)">${t('noColls')}</div>`}</div>

    <div class="panel"><div class="pt">${t('dispensingLedger')}</div>
      <div class="readout" style="max-width:none;margin-bottom:22px">
        <div class="cell"><div class="n">${state.collections.length}</div><div class="l">${t('collectionsL')}</div></div>
        <div class="cell"><div class="n">${totalDocs()}</div><div class="l">${t('documentsL')}</div></div>
        <div class="cell"><div class="n">${totalDisp()}</div><div class="l">${t('dispensedL')}</div></div>
      </div>
      <div style="overflow-x:auto"><table class="ledger"><thead><tr><th>${t('hDocument')}</th><th>${t('hType')}</th><th>${t('hDispensed')}</th><th></th></tr></thead><tbody>${ledger||`<tr><td colspan="4">${t('noDocsYet')}</td></tr>`}</tbody></table></div>
    </div>

    <div class="panel"><div class="pt">${t('security')}</div>
      <div class="row">
        <div class="field"><label>${t('currentPass')}</label><input id="curPass" type="password" maxlength="80" style="letter-spacing:.12em"></div>
        <div class="field"><label>${t('newPass')}</label><input id="newPass1" type="password" maxlength="80" style="letter-spacing:.12em"></div>
      </div>
      <div class="field"><label>${t('confirmPass')}</label><input id="newPass2" type="password" maxlength="80" style="letter-spacing:.12em"></div>
      <button class="mini" id="changePassBtn">${t('changePass')}</button><span class="live" id="secMsg"></span>
      <p style="margin-top:16px;font-size:12px;color:var(--ink-3);line-height:1.5">${t('secNote')}</p>
    </div>
  </section>`;
}
let openEdit=null;

/* ---------------- preview / download ---------------- */
function openPreview(fileId){
  let x=null,c=null;
  for(const col of state.collections){const f=col.files.find(i=>i.id===fileId);if(f){x=f;c=col;break;}}
  if(!x)return;
  let body;
  if(x.type==='image')body=`<img class="pv-img" src="${fileUrl(x.id,true)}" alt="${esc(x.name)}">`;
  else if(x.type==='pdf')body=`<iframe class="pv-frame" src="${fileUrl(x.id,true)}" title="${esc(x.name)}"></iframe>`;
  else body=`<div class="pv-blank"><div><div class="i">📄</div><p style="margin-top:12px;color:var(--ink-2)">${t('noPreview')}</p></div></div>`;
  document.getElementById('modal').innerHTML=`
    <div class="mh"><h3>${esc(x.name)}</h3><button class="x" id="closeModal" aria-label="Close">×</button></div>
    <div class="mb">${body}</div>
    <div class="mf"><span class="st">${esc(c.name)} · ${x.type} · ${x.downloads} ${t('dispensedWord')}</span>
      <button class="get" data-get="${x.id}">↓ ${t('dispenseDownload')}</button></div>`;
  document.getElementById('scrim').classList.add('on');
  document.getElementById('closeModal').onclick=closeModal;
}
function closeModal(){document.getElementById('scrim').classList.remove('on')}
function download(fileId){
  const a=document.createElement('a');a.href=fileUrl(fileId,false);a.target='_blank';a.rel='noopener';
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(async()=>{await loadState();render();},1200);
}

/* ---------------- admin actions ---------------- */
async function doLogin(){
  const pw=document.getElementById('pw').value;
  const btn=document.getElementById('doLogin');btn.classList.add('busy');
  try{
    const d=await api('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw})});
    authToken=d.token;await loadState();render();
  }catch(e){
    let msg=t('wrongPass');
    if(e.data&&e.data.error==='locked')msg=`${t('locked')} ${e.data.retryAfter} ${t('secW')}`;
    else if(e.data&&typeof e.data.attemptsLeft==='number')msg=`${t('wrongPass')} · ${e.data.attemptsLeft}`;
    else if(e.status===409)msg='Setup required — see deployment steps.';
    document.getElementById('app').innerHTML=loginHTML(msg);
    const p=document.getElementById('pw');if(p)p.focus();
  }
}
async function refreshAdmin(){await loadState();render();}

/* ---------------- events ---------------- */
function goLib(){view={name:'library',collId:null};render();window.scrollTo({top:0})}
document.getElementById('brandBtn').onclick=goLib;
document.getElementById('navLib').onclick=goLib;
document.getElementById('navDisp').onclick=()=>{view={name:'dispensary'};render();window.scrollTo({top:0})};
document.getElementById('navLang').onclick=()=>{lang=lang==='en'?'ar':'en';try{localStorage.setItem('sinaw_lang',lang)}catch(e){}applyLang();render()};
document.getElementById('scrim').onclick=e=>{if(e.target.id==='scrim')closeModal()};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

document.getElementById('app').addEventListener('click',async e=>{
  if(e.target.id==='retryBtn'){await loadState();render();return;}
  if(e.target.id==='doLogin'){doLogin();return;}
  if(e.target.id==='lock'){authToken=null;openEdit=null;goLib();return;}
  if(e.target.id==='saveCh'){
    try{await api('/api/admin/settings',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({channelUrl:document.getElementById('chUrl').value.trim()})});await loadState();const m=document.getElementById('chMsg');if(m)m.textContent=t('saved');}catch(err){toast(err.message,true);}
    return;
  }
  if(e.target.id==='addColl'){
    if(!newName.trim()){toast(t('alertCollName'),true);return;}
    try{await api('/api/admin/collections',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:newName.trim(),desc:newDesc.trim(),cover:pendingCover})});newName='';newDesc='';pendingCover='general';await refreshAdmin();}catch(err){toast(err.message,true);}
    return;
  }
  if(e.target.id==='changePassBtn'){
    const cur=document.getElementById('curPass').value,a=document.getElementById('newPass1').value,b=document.getElementById('newPass2').value;
    const sm=document.getElementById('secMsg');sm.style.color='#b4452f';
    if(a!==b){sm.textContent='✗';return;}
    try{await api('/api/admin/change-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({current:cur,next:a})});sm.style.color='var(--herb)';sm.textContent=t('passChanged');document.getElementById('curPass').value='';document.getElementById('newPass1').value='';document.getElementById('newPass2').value='';}catch(err){sm.textContent=err.message;}
    return;
  }
  const tg=e.target.closest('[data-open],[data-lib],[data-read],[data-get],[data-pickcover],[data-setcover],[data-uploadcover],[data-editappear],[data-adddoc],[data-savedoc],[data-delfile],[data-delcoll]');
  if(!tg)return;
  if(tg.dataset.lib!==undefined){goLib();return;}
  if(tg.dataset.open){view={name:'collection',collId:tg.dataset.open};render();window.scrollTo({top:0});return;}
  if(tg.dataset.read){openPreview(tg.dataset.read);return;}
  if(tg.dataset.get){download(tg.dataset.get);return;}
  if(tg.dataset.pickcover){pendingCover=tg.dataset.pickcover;render();return;}
  if(tg.dataset.setcover){const i=tg.dataset.setcover.indexOf(':');const cid=tg.dataset.setcover.slice(0,i),k=tg.dataset.setcover.slice(i+1);try{await api('/api/admin/collections/'+cid,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({cover:k})});await refreshAdmin();}catch(err){toast(err.message,true);}return;}
  if(tg.dataset.uploadcover){const target=tg.dataset.uploadcover;pickImage(async(file)=>{const fd=new FormData();fd.append('file',file);try{if(target==='new'){toast('Add the collection first, then upload a cover.',true);return;}await api('/api/admin/cover/'+target,{method:'POST',body:fd});await refreshAdmin();}catch(err){toast(err.message,true);}});return;}
  if(tg.dataset.editappear){openEdit=openEdit===tg.dataset.editappear?null:tg.dataset.editappear;render();return;}
  if(tg.dataset.adddoc){const f=document.getElementById('dc-'+tg.dataset.adddoc);f.style.display=f.style.display==='none'?'block':'none';return;}
  if(tg.dataset.savedoc){
    const cid=tg.dataset.savedoc;
    const inp=document.querySelector('[data-dfile="'+cid+'"]');
    const file=inp&&inp.files&&inp.files[0];
    if(!file){toast(t('chooseFile'),true);return;}
    const name=(document.querySelector('[data-dname="'+cid+'"]').value||'').trim();
    const fd=new FormData();fd.append('file',file);if(name)fd.append('name',name);
    tg.classList.add('busy');tg.textContent=t('uploading');
    try{await api('/api/admin/collections/'+cid+'/files',{method:'POST',body:fd});await refreshAdmin();}
    catch(err){toast(err.message,true);tg.classList.remove('busy');tg.textContent=t('addDoc');}
    return;
  }
  if(tg.dataset.delfile){if(!confirm(t('confirmDelFile')))return;try{await api('/api/admin/files/'+tg.dataset.delfile,{method:'DELETE'});await refreshAdmin();}catch(err){toast(err.message,true);}return;}
  if(tg.dataset.delcoll){if(!confirm(t('confirmDelColl')))return;try{await api('/api/admin/collections/'+tg.dataset.delcoll,{method:'DELETE'});await refreshAdmin();}catch(err){toast(err.message,true);}return;}
});

document.getElementById('app').addEventListener('input',e=>{
  if(e.target.id==='search'){query=e.target.value;const p=e.target.selectionStart;render();const s=document.getElementById('search');if(s){s.focus();try{s.setSelectionRange(p,p)}catch(_){}}return;}
  if(e.target.id==='nfName'){newName=e.target.value;return;}
  if(e.target.id==='nfDesc'){newDesc=e.target.value;return;}
});
document.getElementById('app').addEventListener('change',e=>{
  if(e.target.dataset&&e.target.dataset.dfile){const sp=document.getElementById('fn-'+e.target.dataset.dfile);if(sp)sp.textContent=(e.target.files[0]&&e.target.files[0].name)||'';}
});
document.getElementById('app').addEventListener('keydown',e=>{
  const f=e.target.closest('.folder');
  if(f&&(e.key==='Enter'||e.key===' ')){e.preventDefault();view={name:'collection',collId:f.dataset.open};render();window.scrollTo({top:0});}
  if(e.target.id==='pw'&&e.key==='Enter')doLogin();
});

function pickImage(cb){const inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.onchange=()=>{const f=inp.files&&inp.files[0];if(f)cb(f);};inp.click();}

/* ---------------- PWA ---------------- */
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;const b=document.getElementById('installBtn');b.style.display='';b.onclick=async()=>{b.style.display='none';deferredPrompt.prompt();deferredPrompt=null;};});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));}

/* ---------------- boot ---------------- */
(async function(){
  try{lang=localStorage.getItem('sinaw_lang')||'en';}catch(e){}
  document.getElementById('brandLogo').src=window.LOGO;
  applyLang();
  await loadState();
  render();
})();
