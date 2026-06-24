/* Sinaw Pharma Book — frontend app v3 */

const API = (document.querySelector('meta[name="sinaw-api"]')?.content
            || 'https://sinaw-pharma-api.sinaw20003.workers.dev').replace(/\/+$/,'');

const COVER_ORDER=['warfarin','bp','skincare','firstaid','sprays','motherbaby','general'];
const COVER_LABELS={
  en:{warfarin:'Anticoagulant',bp:'BP & Diabetes',skincare:'Skincare',firstaid:'First Aid',sprays:'Sprays & Drops',motherbaby:'Mother & Baby',general:'Medication'},
  ar:{warfarin:'مضادات التخثر',bp:'الضغط والسكري',skincare:'العناية بالبشرة',firstaid:'إسعافات',sprays:'بخّاخات وقطرات',motherbaby:'الأم والطفل',general:'الأدوية'}
};
const ACCEPT='.pdf,.png,.jpg,.jpeg,.webp,.gif,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv';

/* ====== translations ====== */
const T={
  en:{
    lib:'Library',admin:'Admin',
    lede:'A modern shelf of clinical knowledge. Open a folder to see what it holds, then preview or download any document.',
    searchPh:'Search folders and documents…',
    bulletin:'Bulletin:',joinChannel:'Join the WhatsApp channel',noChannel:'No channel linked yet.',
    collectionsL:'Folders',documentsL:'Documents',downloadsL:'Downloads',
    onShelves:'On the Shelves',searchResults:'Search results',collectionsWord:'folders',hoverFolder:'hover a book',
    back:'Back to the shelves',
    statDocuments:'Documents',statTotalDownloads:'Total downloads',statImagesPdfs:'Images / PDFs',
    preview:'Preview',download:'Download',documents:'documents',
    emptyTitle:'The shelves are empty.',emptySearchTitle:'No folder matches that.',
    emptyHint:'Open the Admin panel to add the first folder',emptySearchHint:'Try another title',
    collEmpty:'This folder is empty. The admin can add documents.',
    noPreview:'This file type cannot be previewed. Download it instead.',
    downloadBtn:'Download',
    adminTitle:'Admin Panel',adminPrompt:'Sign in to manage folders and documents.',
    signIn:'Sign in',password:'Password',signOut:'Sign out',
    panelChannel:'WhatsApp Channel',channelUrl:'Channel URL',saveChannel:'Save',saved:'Saved.',
    panelAddColl:'Add a New Folder',
    nameEn:'Folder name — English 🇬🇧',nameAr:'اسم المجلد — Oman 🇴🇲',
    descEn:'Description — English 🇬🇧',descAr:'الوصف — Oman 🇴🇲',
    phNameEn:'e.g. Mother & Baby Care',phNameAr:'مثال: رعاية الأم والطفل',
    phDescEn:'Short description in English',phDescAr:'وصف مختصر بالعربي',
    folderCover:'Folder cover',uploadShort:'Upload',
    addFolder:'Add folder',
    panelFoldersDocs:'Folders & Documents',
    uploadDoc:'+ Upload a document',
    sectionEn:'🇬🇧 English version',sectionAr:'🇴🇲 Arabic version',
    titleEn:'Title — English 🇬🇧',titleAr:'العنوان — عربي 🇴🇲',
    phTitleEn:'Document title in English',phTitleAr:'عنوان المستند بالعربي',
    fileEn:'File — English 🇬🇧',fileAr:'ملف — عربي 🇴🇲',
    chooseFile:'Choose file',noFileChosen:'No file chosen',
    uploadBtn:'Upload',uploading:'Uploading…',
    atLeastOne:'At least one file is required. If you only have one language, it will be used for both.',
    allowed:'Allowed: PDF, Images, Word, Excel, PowerPoint, TXT, CSV — max 20 MB each.',
    removeFolder:'Remove folder',
    editCover:'Edit cover',
    editDetails:'Edit title & description',
    saveDetails:'Save',
    detailsUpdated:'Folder updated.',
    editFileTitle:'Edit title',
    saveFileTitle:'Save title',
    fileTitleUpdated:'Title updated.',
    statsTitle:'Download Stats',
    hDocument:'Document',hType:'Type',hDownloads:'Downloads',
    noFolders:'No folders yet.',noDocs:'No documents yet.',downloadsWord:'downloads',
    remove:'Remove',
    confirmDelColl:'Remove this entire folder and all its documents?',
    confirmDelFile:'Remove this document?',
    alertFolderName:'Enter at least one folder name (English or Arabic).',
    alertNoFile:'Choose at least one file (English or Arabic).',
    security:'Security',currentPass:'Current password',newPass:'New password',confirmPass:'Confirm new password',
    changePass:'Change password',passChanged:'Password updated.',wrongPass:'Wrong password.',
    mismatch:'Passwords do not match.',
    locked:'Too many attempts. Try again in',secW:'s',attLeft:'attempts left',
    loadErr:'Could not reach the library. Check your connection.',retry:'Retry',
    secNote:'Admin actions and uploads are verified server-side. Your password is hashed (PBKDF2) — never stored in plain text.',
    footer:'Sinaw Pharma Book · A modern library of clinical imaging & documents',
  },
  ar:{
    lib:'المكتبة',admin:'الإدارة',
    lede:'رفٌّ حديث من المعرفة الدوائية. افتح مجلدًا لتطّلع على محتواه، ثم عاين أو نزّل أي مستند.',
    searchPh:'ابحث في المجلدات والمستندات…',
    bulletin:'إعلان:',joinChannel:'انضم إلى قناة الواتساب',noChannel:'لا توجد قناة بعد.',
    collectionsL:'المجلدات',documentsL:'المستندات',downloadsL:'التنزيلات',
    onShelves:'على الرفوف',searchResults:'نتائج البحث',collectionsWord:'مجلد',hoverFolder:'مرّر فوق كتاب',
    back:'العودة إلى الرفوف',
    statDocuments:'المستندات',statTotalDownloads:'إجمالي التنزيلات',statImagesPdfs:'صور / ملفات',
    preview:'معاينة',download:'تنزيل',documents:'مستند',
    emptyTitle:'الرفوف فارغة.',emptySearchTitle:'لا يوجد مجلد مطابق.',
    emptyHint:'افتح لوحة الإدارة لإضافة أول مجلد',emptySearchHint:'جرّب عنوانًا آخر',
    collEmpty:'هذا المجلد فارغ. يمكن للمدير إضافة مستندات.',
    noPreview:'لا يمكن معاينة هذا النوع. نزّله لعرضه.',
    downloadBtn:'تنزيل',
    adminTitle:'لوحة الإدارة',adminPrompt:'سجّل الدخول لإدارة المجلدات والمستندات.',
    signIn:'تسجيل الدخول',password:'كلمة المرور',signOut:'تسجيل الخروج',
    panelChannel:'قناة الواتساب',channelUrl:'رابط القناة',saveChannel:'حفظ',saved:'تم الحفظ.',
    panelAddColl:'إضافة مجلد جديد',
    nameEn:'اسم المجلد — إنجليزي 🇬🇧',nameAr:'اسم المجلد — عماني 🇴🇲',
    descEn:'الوصف — إنجليزي 🇬🇧',descAr:'الوصف — عربي 🇴🇲',
    phNameEn:'e.g. Mother & Baby Care',phNameAr:'مثال: رعاية الأم والطفل',
    phDescEn:'Short description in English',phDescAr:'وصف مختصر بالعربي',
    folderCover:'غلاف المجلد',uploadShort:'رفع',
    addFolder:'إضافة المجلد',
    panelFoldersDocs:'المجلدات والمستندات',
    uploadDoc:'+ رفع مستند',
    sectionEn:'🇬🇧 النسخة الإنجليزية',sectionAr:'🇴🇲 النسخة العربية',
    titleEn:'العنوان — إنجليزي 🇬🇧',titleAr:'العنوان — عربي 🇴🇲',
    phTitleEn:'Document title in English',phTitleAr:'عنوان المستند بالعربي',
    fileEn:'ملف — إنجليزي 🇬🇧',fileAr:'ملف — عربي 🇴🇲',
    chooseFile:'اختر ملفًا',noFileChosen:'لم يُختر ملف',
    uploadBtn:'رفع',uploading:'جارٍ الرفع…',
    atLeastOne:'مطلوب ملف واحد على الأقل. إذا أضفت نسخة واحدة فقط، ستُستخدم للغتين.',
    allowed:'المسموح: PDF وصور وWord وExcel وPowerPoint وTXT وCSV — الحد الأقصى 20 ميغابايت.',
    removeFolder:'حذف المجلد',
    editCover:'تغيير الغلاف',
    editDetails:'تعديل العنوان والوصف',
    saveDetails:'حفظ',
    detailsUpdated:'تم تحديث المجلد.',
    editFileTitle:'تعديل العنوان',
    saveFileTitle:'حفظ العنوان',
    fileTitleUpdated:'تم تحديث العنوان.',
    statsTitle:'إحصائيات التنزيل',
    hDocument:'المستند',hType:'النوع',hDownloads:'التنزيلات',
    noFolders:'لا توجد مجلدات بعد.',noDocs:'لا توجد مستندات بعد.',downloadsWord:'تنزيل',
    remove:'حذف',
    confirmDelColl:'حذف هذا المجلد وكل مستنداته؟',
    confirmDelFile:'حذف هذا المستند؟',
    alertFolderName:'أدخل اسم المجلد بالعربي أو الإنجليزي.',
    alertNoFile:'اختر ملفًا واحدًا على الأقل.',
    security:'الأمان',currentPass:'كلمة المرور الحالية',newPass:'كلمة مرور جديدة',confirmPass:'تأكيد كلمة المرور',
    changePass:'تغيير كلمة المرور',passChanged:'تم تحديث كلمة المرور.',wrongPass:'كلمة المرور غير صحيحة.',
    mismatch:'كلمتا المرور غير متطابقتين.',
    locked:'محاولات كثيرة. أعد المحاولة بعد',secW:'ث',attLeft:'محاولة متبقية',
    loadErr:'تعذّر الوصول. تحقّق من الاتصال.',retry:'إعادة المحاولة',
    secNote:'تُتحقق إجراءات الإدارة والرفع عبر الخادم. كلمة المرور مُجزّأة (PBKDF2) ولا تُخزَّن كنص عادي.',
    footer:'صيدلية سِناو · مكتبة إلكترونية حديثة للصور والمستندات الطبية',
  }
};

/* ====== state ====== */
let state={channelUrl:'',collections:[]},view={name:'library',collId:null},query='',lang='en';
let authToken=null,loadFailed=false;
let openCoverEdit=null,openDetailsEdit=null,openFileTitle=null;
let nfNameEn='',nfNameAr='',nfDescEn='',nfDescAr='',pendingCover='general';

/* ====== helpers ====== */
function t(k){return (T[lang]&&T[lang][k])||T.en[k]||k}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function collName(c){return lang==='ar'?(c.name_ar||c.name_en):(c.name_en||c.name_ar);}
function collDesc(c){return lang==='ar'?(c.desc_ar||c.desc_en):(c.desc_en||c.desc_ar);}
function fileName(x){return lang==='ar'?(x.name_ar||x.name_en):(x.name_en||x.name_ar);}
function fileUrl(id,preview){return `/dl/files/${id}?lang=${lang}${preview?'&preview=1':''}`;}
function coverSrc(c){if(c.cover&&window.COVERS[c.cover])return window.COVERS[c.cover];if(c.cover==='custom')return `/dl/covers/${c.id}`;return window.COVERS.general;}
const getColl=id=>state.collections.find(c=>c.id===id);
const getFile=id=>{for(const c of state.collections){const f=c.files.find(x=>x.id===id);if(f)return{file:f,coll:c};}return null;}
const totalDocs=()=>state.collections.reduce((n,c)=>n+c.files.length,0);
const totalDl=()=>state.collections.reduce((n,c)=>n+c.files.reduce((m,x)=>m+x.downloads,0),0);
const collDl=c=>c.files.reduce((m,x)=>m+x.downloads,0);
function arrow(){return lang==='ar'?'→':'←'}

let toastTimer=null;
function toast(msg,isErr){const el=document.getElementById('toast');el.textContent=msg;el.className='toast show'+(isErr?' err':'');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.className='toast',2800);}

/* ====== API ====== */
async function api(path,opts){
  opts=opts||{};const headers=opts.headers||{};
  if(authToken)headers['Authorization']='Bearer '+authToken;
  const res=await fetch(API+path,{...opts,headers});
  let data=null;try{data=await res.json();}catch(e){}
  if(res.status===401)authToken=null;
  if(!res.ok){const e=new Error((data&&data.error)||('HTTP '+res.status));e.status=res.status;e.data=data;throw e;}
  return data;
}
async function loadState(){
  try{const d=await api('/api/state');state.channelUrl=d.channelUrl||'';state.collections=d.collections||[];loadFailed=false;}
  catch(e){loadFailed=true;}
}

/* ====== lang ====== */
function applyLang(){
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  document.body.classList.toggle('rtl',lang==='ar');
  document.getElementById('navLang').textContent=lang==='en'?'العربية':'English';
  document.getElementById('navLib').textContent=t('lib');
  document.getElementById('navDisp').textContent=t('admin');
  document.getElementById('footMain').textContent=t('footer');
}

/* ====== render ====== */
function render(){
  const app=document.getElementById('app');app.className='fade';
  if(loadFailed&&view.name!=='admin'){
    app.innerHTML=`<div class="center-load"><div><p style="font-family:'DM Mono';color:var(--ink-2)">${t('loadErr')}</p><button class="mini" style="margin-top:16px" id="retryBtn">${t('retry')}</button></div></div>`;
    void app.offsetWidth;return;
  }
  if(view.name==='library')app.innerHTML=libraryHTML();
  else if(view.name==='collection')app.innerHTML=collectionHTML(getColl(view.collId));
  else if(view.name==='admin')app.innerHTML=adminHTML();
  void app.offsetWidth;
}

/* ====== library ====== */
function libraryHTML(){
  const q=query.trim().toLowerCase();
  let cols=state.collections;
  if(q){cols=state.collections.map(c=>{
    const nm=collName(c).toLowerCase();
    if(nm.includes(q))return c;
    const hits=c.files.filter(x=>fileName(x).toLowerCase().includes(q));
    return hits.length?{...c,files:hits}:null;
  }).filter(Boolean);}
  const ch=state.channelUrl
    ?`<a href="${esc(state.channelUrl)}" target="_blank" rel="noopener">◉ ${t('joinChannel')}</a>`
    :`<span class="off">${t('noChannel')}</span>`;
  const folders=cols.length?cols.map(c=>`
    <div class="slot">
      <button class="folder" data-open="${c.id}" aria-label="${esc(collName(c))}">
        <span class="floattag">${c.files.length} ${t('documents')}</span>
        <span class="cover"><img src="${coverSrc(c)}" alt="${esc(collName(c))}" loading="lazy"></span>
        <span class="fname">${esc(collName(c))}</span>
        <span class="fqty">${c.files.length} ${t('documents')}</span>
      </button><span class="ledge"></span>
    </div>`).join('')
    :`<div class="empty"><div class="e">📚</div><p>${q?t('emptySearchTitle'):t('emptyTitle')}</p><span class="s">${q?t('emptySearchHint'):t('emptyHint')}</span></div>`;
  const kick=lang==='ar'?`<div class="kick">صيدلية سِناو · الجمعية الصيدلانية</div>`:`<div class="kick">Sinaw Pharmaceutical Society <span class="ar">·  صيدلية سِناو</span></div>`;
  const title=lang==='ar'?`<h1 class="head">المكتبة <em>الإلكترونية</em></h1>`:`<h1 class="head">The <em>Pharma</em><br>Library</h1>`;
  return `
  <section class="hero">${kick}${title}
    <p class="lede">${t('lede')}</p>
    <div class="lookup"><span class="pre">⌕</span><input id="search" type="search" placeholder="${t('searchPh')}" value="${esc(query)}" autocomplete="off"></div>
    <div class="dispatch"><span>${t('bulletin')}</span> ${ch}</div>
    <div class="readout">
      <div class="cell"><div class="n">${state.collections.length}</div><div class="l">${t('collectionsL')}</div></div>
      <div class="cell"><div class="n">${totalDocs()}</div><div class="l">${t('documentsL')}</div></div>
      <div class="cell"><div class="n">${totalDl()}</div><div class="l">${t('downloadsL')}</div></div>
    </div>
  </section>
  <div class="sec-head"><h2>${q?t('searchResults'):t('onShelves')}</h2><span class="m">${cols.length} ${t('collectionsWord')} · ${t('hoverFolder')}</span></div>
  <section class="shelves">${folders}</section>`;
}

/* ====== collection / folder page ====== */
function collectionHTML(c){
  if(!c){view={name:'library'};return libraryHTML();}
  const docs=c.files.length?c.files.map(x=>{
    let thumb;
    if(x.kind==='image')thumb=`<div class="thumb"><img src="${fileUrl(x.id,true)}" alt="${esc(fileName(x))}" loading="lazy"><span class="badge">${lang==='ar'?'صورة':'Image'}</span></div>`;
    else if(x.kind==='pdf')thumb=`<div class="thumb pdf"><div class="page"></div><span class="badge">PDF</span></div>`;
    else thumb=`<div class="thumb img-blank"><span class="ig">📄</span><span class="badge">DOC</span></div>`;
    const canPreview=x.kind==='image'||x.kind==='pdf';
    return `<article class="doc">${thumb}
      <div class="meta">
        <h4>${esc(fileName(x))}</h4>
        <div class="disp-n"><b>${x.downloads}</b> ${t('downloadsWord')}</div>
        <div class="acts">
          ${canPreview?`<button class="da" data-read="${x.id}">${t('preview')}</button>`:''}
          <button class="da solid" data-get="${x.id}">${t('download')}</button>
        </div>
      </div></article>`;
  }).join(''):`<p style="margin-top:24px;color:var(--ink-3)">${t('collEmpty')}</p>`;
  return `
  <section class="coll">
    <button class="back" data-lib>${arrow()} ${t('back')}</button>
    <div class="coll-head">
      <span class="coll-cover"><img src="${coverSrc(c)}" alt="${esc(collName(c))}"></span>
      <div class="coll-main">
        <h1>${esc(collName(c))}</h1>
        <p>${esc(collDesc(c))}</p>
        <div class="coll-stats">
          <div class="s"><b>${c.files.length}</b><span>${t('statDocuments')}</span></div>
          <div class="s"><b>${collDl(c)}</b><span>${t('statTotalDownloads')}</span></div>
          <div class="s"><b>${c.files.filter(x=>x.kind==='image').length}/${c.files.filter(x=>x.kind==='pdf').length}</b><span>${t('statImagesPdfs')}</span></div>
        </div>
      </div>
    </div>
    <div class="docs">${docs}</div>
  </section>`;
}

/* ====== cover picker ====== */
function coverPicker(sel,target){
  const tiles=COVER_ORDER.map(k=>{
    const on=sel===k?'on':'';
    const da=target==='new'?`data-pickcover="${k}"`:`data-setcover="${target}:${k}"`;
    return `<button type="button" class="cv-tile ${on}" ${da} title="${COVER_LABELS[lang][k]}"><img src="${window.COVERS[k]}" alt=""></button>`;
  }).join('');
  const upDa=target==='new'?`data-uploadcover="new"`:`data-uploadcover="${target}"`;
  return `<div class="coverpick">${tiles}<button type="button" class="cv-tile upload ${sel&&!window.COVERS[sel]?'on':''}" ${upDa} title="${t('uploadShort')}"><span><span class="pl">＋</span><br>${t('uploadShort')}</span></button></div>`;
}

/* ====== admin ====== */
function loginHTML(extra){
  return `<section class="disp-page"><div class="gate">
    <div class="g"><img src="${window.LOGO}" alt="Sinaw Pharma Book"></div>
    <h2>${t('adminTitle')}</h2><p>${t('adminPrompt')}</p>
    <input id="pw" type="password" placeholder="${t('password')}" maxlength="80" aria-label="${t('password')}" style="letter-spacing:.12em">
    <div class="err" id="loginErr">${extra||''}</div>
    <button id="doLogin">${t('signIn')}</button>
  </div></section>`;
}

function biSection(color,labelKey,children){
  return `<div style="border:1.5px solid ${color};border-radius:12px;padding:14px;margin-bottom:12px">
    <div style="font-family:'DM Mono','Noto Kufi Arabic',sans-serif;font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:${color==='var(--herb-3)'?'var(--herb)':'var(--walnut)'};margin-bottom:12px">${t(labelKey)}</div>
    ${children}
  </div>`;
}

function adminFileRow(x){
  const avail=`${x.hasEn?'🇬🇧':''}${x.hasAr?'🇴🇲':''}`;
  return `
  <div class="cbfile">
    <span class="fn">
      <span class="tag ${x.kind==='image'?'image':'pdf'}">${x.kind}</span>
      ${esc(fileName(x))}
      <span style="font-size:11px;color:var(--ink-3);margin-inline-start:4px">${avail}</span>
    </span>
    <span style="display:flex;gap:8px;align-items:center;flex:none;flex-wrap:wrap">
      <span class="mt">${x.downloads} ${t('downloadsWord')}</span>
      <button class="editbtn ${openFileTitle===x.id?'on':''}" data-edittitle="${x.id}">${t('editFileTitle')}</button>
      <button class="del" data-delfile="${x.id}">${t('remove')}</button>
    </span>
  </div>
  ${openFileTitle===x.id?`
    <div class="inl">
      <div class="row">
        <div class="field"><label>${t('titleEn')}</label><input data-edit-name-en="${x.id}" value="${esc(x.name_en)}" placeholder="${t('phTitleEn')}" dir="ltr"></div>
        <div class="field"><label>${t('titleAr')}</label><input data-edit-name-ar="${x.id}" value="${esc(x.name_ar)}" placeholder="${t('phTitleAr')}" dir="rtl"></div>
      </div>
      <button class="mini" data-savetitle="${x.id}">${t('saveFileTitle')}</button>
      <span class="live" id="fmsg-${x.id}"></span>
    </div>`:''}`;
}

function docUploadForm(cid){
  return `
  <div class="inl" id="dc-${cid}" style="display:none">
    ${biSection('var(--herb-3)','sectionEn',`
      <div class="field"><label>${t('titleEn')}</label><input data-dname-en="${cid}" placeholder="${t('phTitleEn')}" dir="ltr"></div>
      <div class="field"><label>${t('fileEn')}</label>
        <div class="upload-row">
          <label class="filebtn">${t('chooseFile')}<input type="file" data-dfile-en="${cid}" accept="${ACCEPT}" style="display:none"></label>
          <span class="filename" id="fn-en-${cid}">${t('noFileChosen')}</span>
        </div>
      </div>`)}
    ${biSection('#f5e8d6','sectionAr',`
      <div class="field"><label>${t('titleAr')}</label><input data-dname-ar="${cid}" placeholder="${t('phTitleAr')}" dir="rtl"></div>
      <div class="field"><label>${t('fileAr')}</label>
        <div class="upload-row">
          <label class="filebtn">${t('chooseFile')}<input type="file" data-dfile-ar="${cid}" accept="${ACCEPT}" style="display:none"></label>
          <span class="filename" id="fn-ar-${cid}">${t('noFileChosen')}</span>
        </div>
      </div>`)}
    <div class="hint" style="margin-bottom:10px">${t('atLeastOne')}</div>
    <div class="hint" style="margin-bottom:12px">${t('allowed')}</div>
    <button class="mini" data-savedoc="${cid}">${t('uploadBtn')}</button>
  </div>`;
}

function adminHTML(){
  if(!authToken)return loginHTML();

  let statsRows='';
  state.collections.forEach(c=>{
    statsRows+=`<tr class="grp"><td colspan="3">${esc(collName(c))} <span style="color:var(--ink-3)">· ${c.files.length} ${t('documents')} · ${collDl(c)} ${t('downloadsWord')}</span></td><td></td></tr>`;
    if(!c.files.length)statsRows+=`<tr><td colspan="4" class="indent" style="color:var(--ink-3)">—</td></tr>`;
    c.files.forEach(x=>{
      const avail=`${x.hasEn?'🇬🇧':''}${x.hasAr?'🇴🇲':''}`;
      statsRows+=`<tr><td class="indent">${esc(fileName(x))} <span style="font-size:11px">${avail}</span></td><td><span class="tag ${x.kind==='image'?'image':'pdf'}">${x.kind}</span></td><td class="n">${x.downloads}</td><td class="end"><button class="del" data-delfile="${x.id}">${t('remove')}</button></td></tr>`;
    });
  });

  const blocks=state.collections.map(c=>`
    <div class="cblock">
      <div class="cbh">
        <div class="nm">
          <span class="thumb-mini"><img src="${coverSrc(c)}" alt=""></span>
          <h4>${esc(collName(c))}<small>${c.files.length} ${t('documents')}</small></h4>
        </div>
        <div class="ctrls">
          <button class="editbtn ${openDetailsEdit===c.id?'on':''}" data-editdetails="${c.id}">${t('editDetails')}</button>
          <button class="editbtn ${openCoverEdit===c.id?'on':''}" data-editappear="${c.id}">${t('editCover')}</button>
          <button class="del" data-delcoll="${c.id}">${t('removeFolder')}</button>
        </div>
      </div>
      <div class="cbf">
        ${openDetailsEdit===c.id?`
        <div class="inl">
          ${biSection('var(--herb-3)','sectionEn',`
            <div class="row">
              <div class="field"><label>${t('nameEn')}</label><input data-det-name-en="${c.id}" value="${esc(c.name_en)}" placeholder="${t('phNameEn')}" dir="ltr"></div>
              <div class="field"><label>${t('descEn')}</label><input data-det-desc-en="${c.id}" value="${esc(c.desc_en)}" placeholder="${t('phDescEn')}" dir="ltr"></div>
            </div>`)}
          ${biSection('#f5e8d6','sectionAr',`
            <div class="row">
              <div class="field"><label>${t('nameAr')}</label><input data-det-name-ar="${c.id}" value="${esc(c.name_ar)}" placeholder="${t('phNameAr')}" dir="rtl"></div>
              <div class="field"><label>${t('descAr')}</label><input data-det-desc-ar="${c.id}" value="${esc(c.desc_ar)}" placeholder="${t('phDescAr')}" dir="rtl"></div>
            </div>`)}
          <button class="mini" data-savedetails="${c.id}">${t('saveDetails')}</button>
          <span class="live" id="dmsg-${c.id}"></span>
        </div>`:''}
        ${openCoverEdit===c.id?`<div class="inl"><div class="field" style="margin-bottom:0"><label>${t('folderCover')}</label>${coverPicker(c.cover,c.id)}</div></div>`:''}
        ${c.files.length?c.files.map(adminFileRow).join(''):`<div class="mt" style="padding:6px 0">${t('noDocs')}</div>`}
        <button class="adddoc" data-adddoc="${c.id}">${t('uploadDoc')}</button>
        ${docUploadForm(c.id)}
      </div>
    </div>`).join('');

  return `<section class="disp-page">
    <div class="reg-top">
      <button data-lib>${arrow()} ${t('lib')}</button>
      <span>/ ${t('admin')}</span>
      <button id="lock" class="lk">${t('signOut')}</button>
    </div>

    <div class="panel"><div class="pt">${t('panelChannel')}</div>
      <div class="field"><label>${t('channelUrl')}</label>
        <input id="chUrl" placeholder="https://whatsapp.com/channel/…" value="${esc(state.channelUrl||'')}">
      </div>
      <button class="mini" id="saveCh">${t('saveChannel')}</button>
      <span class="live" id="chMsg"></span>
    </div>

    <div class="panel"><div class="pt">${t('panelAddColl')}</div>
      ${biSection('var(--herb-3)','sectionEn',`
        <div class="row">
          <div class="field"><label>${t('nameEn')}</label><input id="nfNameEn" value="${esc(nfNameEn)}" placeholder="${t('phNameEn')}" dir="ltr"></div>
          <div class="field"><label>${t('descEn')}</label><input id="nfDescEn" value="${esc(nfDescEn)}" placeholder="${t('phDescEn')}" dir="ltr"></div>
        </div>`)}
      ${biSection('#f5e8d6','sectionAr',`
        <div class="row">
          <div class="field"><label>${t('nameAr')}</label><input id="nfNameAr" value="${esc(nfNameAr)}" placeholder="${t('phNameAr')}" dir="rtl"></div>
          <div class="field"><label>${t('descAr')}</label><input id="nfDescAr" value="${esc(nfDescAr)}" placeholder="${t('phDescAr')}" dir="rtl"></div>
        </div>`)}
      <div class="field"><label>${t('folderCover')}</label>${coverPicker(pendingCover,'new')}</div>
      <button class="mini" id="addColl">${t('addFolder')}</button>
    </div>

    <div class="panel"><div class="pt">${t('panelFoldersDocs')}</div>
      ${blocks||`<div class="mt" style="color:var(--ink-3)">${t('noFolders')}</div>`}
    </div>

    <div class="panel"><div class="pt">${t('statsTitle')}</div>
      <div class="readout" style="max-width:none;margin-bottom:22px">
        <div class="cell"><div class="n">${state.collections.length}</div><div class="l">${t('collectionsL')}</div></div>
        <div class="cell"><div class="n">${totalDocs()}</div><div class="l">${t('documentsL')}</div></div>
        <div class="cell"><div class="n">${totalDl()}</div><div class="l">${t('downloadsL')}</div></div>
      </div>
      <div style="overflow-x:auto"><table class="ledger">
        <thead><tr><th>${t('hDocument')}</th><th>${t('hType')}</th><th>${t('hDownloads')}</th><th></th></tr></thead>
        <tbody>${statsRows||`<tr><td colspan="4">${t('noDocs')}</td></tr>`}</tbody>
      </table></div>
    </div>

    <div class="panel"><div class="pt">${t('security')}</div>
      <div class="row">
        <div class="field"><label>${t('currentPass')}</label><input id="curPass" type="password" maxlength="80" style="letter-spacing:.12em"></div>
        <div class="field"><label>${t('newPass')}</label><input id="newPass1" type="password" maxlength="80" style="letter-spacing:.12em"></div>
      </div>
      <div class="field"><label>${t('confirmPass')}</label><input id="newPass2" type="password" maxlength="80" style="letter-spacing:.12em"></div>
      <button class="mini" id="changePassBtn">${t('changePass')}</button>
      <span class="live" id="secMsg"></span>
      <p style="margin-top:16px;font-size:12px;color:var(--ink-3);line-height:1.5">${t('secNote')}</p>
    </div>
  </section>`;
}

/* ====== preview / download ====== */
function openPreview(fileId){
  const found=getFile(fileId);if(!found)return;
  const {file:x,coll:c}=found;
  let body;
  if(x.kind==='image')body=`<img class="pv-img" src="${fileUrl(x.id,true)}" alt="${esc(fileName(x))}">`;
  else if(x.kind==='pdf')body=`<iframe class="pv-frame" src="${fileUrl(x.id,true)}" title="${esc(fileName(x))}"></iframe>`;
  else body=`<div class="pv-blank"><div><div class="i">📄</div><p style="margin-top:12px;color:var(--ink-2)">${t('noPreview')}</p></div></div>`;
  document.getElementById('modal').innerHTML=`
    <div class="mh"><h3>${esc(fileName(x))}</h3><button class="x" id="closeModal" aria-label="Close">×</button></div>
    <div class="mb">${body}</div>
    <div class="mf">
      <span class="st">${esc(collName(c))} · ${x.downloads} ${t('downloadsWord')}</span>
      <button class="get" data-get="${x.id}">↓ ${t('downloadBtn')}</button>
    </div>`;
  document.getElementById('scrim').classList.add('on');
  document.getElementById('closeModal').onclick=closeModal;
}
function closeModal(){document.getElementById('scrim').classList.remove('on')}
async function doDownload(fileId){
  const found=getFile(fileId);
  const fname=found?fileName(found.file):'document';
  const url=fileUrl(fileId,false);

  // iOS / modern mobile: use Web Share API so the user gets
  // "Save to Files", "Save to Photos", AirDrop, etc.
  if(typeof navigator.canShare==='function'){
    toast(lang==='ar'?'جارٍ التحضير…':'Preparing file…',false);
    try{
      const res=await fetch(url);
      if(!res.ok)throw new Error('fetch failed');
      const blob=await res.blob();
      // extract filename from Content-Disposition if available
      const cd=res.headers.get('content-disposition')||'';
      const cdName=(/filename[^;=\n]*=\s*['"]?([^'"\n;]+)/i.exec(cd)||[])[1]?.trim();
      const ext=cdName?.split('.').pop()||blob.type.split('/')[1]||'bin';
      const shareFile=new File([blob],cdName||`${fname}.${ext}`,{type:blob.type});
      if(navigator.canShare({files:[shareFile]})){
        await navigator.share({files:[shareFile],title:fname});
        setTimeout(async()=>{await loadState();render();},800);
        return;
      }
    }catch(e){
      if(e.name==='AbortError')return; // user dismissed share sheet — that's fine
      // any other error: fall through to standard link
    }
  }

  // Desktop / Android fallback: standard <a download> link
  const a=document.createElement('a');
  a.href=url;a.download=fname;a.target='_blank';a.rel='noopener';
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(async()=>{await loadState();render();},1200);
}

/* ====== login ====== */
async function doLogin(){
  const pw=document.getElementById('pw').value;
  const btn=document.getElementById('doLogin');btn.classList.add('busy');
  try{
    const d=await api('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw})});
    authToken=d.token;await loadState();render();
  }catch(e){
    let msg=t('wrongPass');
    if(e.data&&e.data.error==='locked')msg=`${t('locked')} ${e.data.retryAfter} ${t('secW')}`;
    else if(e.data&&typeof e.data.attemptsLeft==='number')msg=`${t('wrongPass')} · ${e.data.attemptsLeft} ${t('attLeft')}`;
    else if(e.status===409)msg='Setup required — visit /setup.html first.';
    document.getElementById('app').innerHTML=loginHTML(msg);
    document.getElementById('pw')?.focus();
  }
}

/* ====== nav ====== */
function goLib(){view={name:'library',collId:null};render();window.scrollTo({top:0})}
document.getElementById('brandBtn').onclick=goLib;
document.getElementById('navLib').onclick=goLib;
document.getElementById('navDisp').onclick=()=>{view={name:'admin'};render();window.scrollTo({top:0})};
document.getElementById('navLang').onclick=()=>{lang=lang==='en'?'ar':'en';try{localStorage.setItem('sinaw_lang',lang)}catch(e){}applyLang();render();};
document.getElementById('scrim').onclick=e=>{if(e.target.id==='scrim')closeModal()};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

/* ====== click handler — on document so modal download works ====== */
document.addEventListener('click',async e=>{
  /* retry */
  if(e.target.id==='retryBtn'){await loadState();render();return;}
  /* login */
  if(e.target.id==='doLogin'){doLogin();return;}
  /* sign out */
  if(e.target.id==='lock'){authToken=null;openCoverEdit=null;openDetailsEdit=null;openFileTitle=null;goLib();return;}
  /* channel */
  if(e.target.id==='saveCh'){
    try{
      await api('/api/admin/settings',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({channelUrl:(document.getElementById('chUrl').value||'').trim()})});
      await loadState();const m=document.getElementById('chMsg');if(m)m.textContent=t('saved');
    }catch(er){toast(er.message,true);}
    return;
  }
  /* add folder */
  if(e.target.id==='addColl'){
    if(!nfNameEn.trim()&&!nfNameAr.trim()){toast(t('alertFolderName'),true);return;}
    try{
      await api('/api/admin/collections',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name_en:nfNameEn.trim(),name_ar:nfNameAr.trim(),desc_en:nfDescEn.trim(),desc_ar:nfDescAr.trim(),cover:pendingCover})});
      nfNameEn='';nfNameAr='';nfDescEn='';nfDescAr='';pendingCover='general';
      await loadState();render();
    }catch(er){toast(er.message,true);}
    return;
  }
  /* change password */
  if(e.target.id==='changePassBtn'){
    const cur=document.getElementById('curPass').value,a=document.getElementById('newPass1').value,b=document.getElementById('newPass2').value;
    const sm=document.getElementById('secMsg');sm.style.color='#b4452f';
    if(a!==b){sm.textContent=t('mismatch');return;}
    try{
      await api('/api/admin/change-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({current:cur,next:a})});
      sm.style.color='var(--herb)';sm.textContent=t('passChanged');
      document.getElementById('curPass').value='';document.getElementById('newPass1').value='';document.getElementById('newPass2').value='';
    }catch(er){sm.textContent=er.message;}
    return;
  }

  /* delegated — works for both #app and #modal because listener is on document */
  const tg=e.target.closest('[data-open],[data-lib],[data-read],[data-get],[data-pickcover],[data-setcover],[data-uploadcover],[data-editappear],[data-editdetails],[data-savedetails],[data-edittitle],[data-savetitle],[data-adddoc],[data-savedoc],[data-delfile],[data-delcoll]');
  if(!tg)return;

  if(tg.dataset.lib!==undefined){goLib();return;}
  if(tg.dataset.open){view={name:'collection',collId:tg.dataset.open};render();window.scrollTo({top:0});return;}
  if(tg.dataset.read){openPreview(tg.dataset.read);return;}
  if(tg.dataset.get){doDownload(tg.dataset.get);return;}

  if(tg.dataset.pickcover){pendingCover=tg.dataset.pickcover;render();return;}
  if(tg.dataset.setcover){
    const i=tg.dataset.setcover.indexOf(':'),cid=tg.dataset.setcover.slice(0,i),k=tg.dataset.setcover.slice(i+1);
    try{await api('/api/admin/collections/'+cid,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({cover:k})});await loadState();render();}
    catch(er){toast(er.message,true);}
    return;
  }
  if(tg.dataset.uploadcover){
    const target=tg.dataset.uploadcover;
    if(target==='new'){toast('Add the folder first, then upload a cover.',true);return;}
    pickImage(async file=>{
      const fd=new FormData();fd.append('file',file);
      try{await api('/api/admin/cover/'+target,{method:'POST',body:fd});await loadState();render();}
      catch(er){toast(er.message,true);}
    });
    return;
  }

  /* toggle cover editor */
  if(tg.dataset.editappear){
    openCoverEdit=openCoverEdit===tg.dataset.editappear?null:tg.dataset.editappear;
    openDetailsEdit=null;render();return;
  }
  /* toggle details editor */
  if(tg.dataset.editdetails){
    openDetailsEdit=openDetailsEdit===tg.dataset.editdetails?null:tg.dataset.editdetails;
    openCoverEdit=null;render();return;
  }
  /* save folder details */
  if(tg.dataset.savedetails){
    const cid=tg.dataset.savedetails;
    const body={
      name_en:(document.querySelector(`[data-det-name-en="${cid}"]`)?.value||'').trim(),
      name_ar:(document.querySelector(`[data-det-name-ar="${cid}"]`)?.value||'').trim(),
      desc_en:(document.querySelector(`[data-det-desc-en="${cid}"]`)?.value||'').trim(),
      desc_ar:(document.querySelector(`[data-det-desc-ar="${cid}"]`)?.value||'').trim(),
    };
    if(!body.name_en&&!body.name_ar){toast(t('alertFolderName'),true);return;}
    try{
      await api('/api/admin/collections/'+cid,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      await loadState();
      const m=document.getElementById('dmsg-'+cid);if(m){m.textContent=t('detailsUpdated');}
      render();
    }catch(er){toast(er.message,true);}
    return;
  }
  /* toggle file title editor */
  if(tg.dataset.edittitle){
    openFileTitle=openFileTitle===tg.dataset.edittitle?null:tg.dataset.edittitle;render();return;
  }
  /* save file title */
  if(tg.dataset.savetitle){
    const fid=tg.dataset.savetitle;
    const body={
      name_en:(document.querySelector(`[data-edit-name-en="${fid}"]`)?.value||'').trim(),
      name_ar:(document.querySelector(`[data-edit-name-ar="${fid}"]`)?.value||'').trim(),
    };
    try{
      await api('/api/admin/files/'+fid,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      await loadState();
      const m=document.getElementById('fmsg-'+fid);if(m)m.textContent=t('fileTitleUpdated');
      render();
    }catch(er){toast(er.message,true);}
    return;
  }

  if(tg.dataset.adddoc){const f=document.getElementById('dc-'+tg.dataset.adddoc);f.style.display=f.style.display==='none'?'block':'none';return;}

  /* upload document */
  if(tg.dataset.savedoc){
    const cid=tg.dataset.savedoc;
    const inpEn=document.querySelector(`[data-dfile-en="${cid}"]`);
    const inpAr=document.querySelector(`[data-dfile-ar="${cid}"]`);
    const fileEn=inpEn?.files?.[0],fileAr=inpAr?.files?.[0];
    if(!fileEn&&!fileAr){toast(t('alertNoFile'),true);return;}
    const nameEn=(document.querySelector(`[data-dname-en="${cid}"]`)?.value||'').trim();
    const nameAr=(document.querySelector(`[data-dname-ar="${cid}"]`)?.value||'').trim();
    const fd=new FormData();
    if(fileEn)fd.append('file_en',fileEn);
    if(fileAr)fd.append('file_ar',fileAr);
    if(nameEn)fd.append('name_en',nameEn);
    if(nameAr)fd.append('name_ar',nameAr);
    tg.textContent=t('uploading');tg.classList.add('busy');
    try{await api('/api/admin/collections/'+cid+'/files',{method:'POST',body:fd});await loadState();render();}
    catch(er){toast(er.message,true);tg.classList.remove('busy');tg.textContent=t('uploadBtn');}
    return;
  }

  if(tg.dataset.delfile){if(!confirm(t('confirmDelFile')))return;try{await api('/api/admin/files/'+tg.dataset.delfile,{method:'DELETE'});await loadState();render();}catch(er){toast(er.message,true);}return;}
  if(tg.dataset.delcoll){if(!confirm(t('confirmDelColl')))return;try{await api('/api/admin/collections/'+tg.dataset.delcoll,{method:'DELETE'});await loadState();render();}catch(er){toast(er.message,true);}return;}
});

/* ====== input ====== */
document.getElementById('app').addEventListener('input',e=>{
  if(e.target.id==='search'){query=e.target.value;const p=e.target.selectionStart;render();const s=document.getElementById('search');if(s){s.focus();try{s.setSelectionRange(p,p)}catch(_){}}return;}
  if(e.target.id==='nfNameEn'){nfNameEn=e.target.value;return;}
  if(e.target.id==='nfNameAr'){nfNameAr=e.target.value;return;}
  if(e.target.id==='nfDescEn'){nfDescEn=e.target.value;return;}
  if(e.target.id==='nfDescAr'){nfDescAr=e.target.value;return;}
});
/* ====== file chosen labels ====== */
document.addEventListener('change',e=>{
  if(e.target.dataset.dfileEn){const sp=document.getElementById('fn-en-'+e.target.dataset.dfileEn);if(sp)sp.textContent=e.target.files[0]?.name||t('noFileChosen');}
  if(e.target.dataset.dfileAr){const sp=document.getElementById('fn-ar-'+e.target.dataset.dfileAr);if(sp)sp.textContent=e.target.files[0]?.name||t('noFileChosen');}
});
/* ====== keyboard ====== */
document.addEventListener('keydown',e=>{
  const f=e.target.closest('.folder');
  if(f&&(e.key==='Enter'||e.key===' ')){e.preventDefault();view={name:'collection',collId:f.dataset.open};render();window.scrollTo({top:0});}
  if(e.target.id==='pw'&&e.key==='Enter')doLogin();
});

function pickImage(cb){const i=document.createElement('input');i.type='file';i.accept='image/*';i.onchange=()=>{const f=i.files?.[0];if(f)cb(f);};i.click();}

/* ====== PWA ====== */
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();deferredPrompt=e;
  const b=document.getElementById('installBtn');b.style.display='';
  b.onclick=async()=>{b.style.display='none';deferredPrompt.prompt();deferredPrompt=null;};
});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));

/* ====== boot ====== */
(async function(){
  try{lang=localStorage.getItem('sinaw_lang')||'en';}catch(e){}
  document.getElementById('brandLogo').src=window.LOGO;
  applyLang();
  await loadState();
  render();
})();
