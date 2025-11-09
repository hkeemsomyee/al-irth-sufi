const pdfCount = 20;
const list = document.getElementById('pdfList');
const searchInput = document.getElementById('searchInput');
const viewerSection = document.getElementById('viewerSection');
const pdfFrame = document.getElementById('pdfFrame');
const viewerTitle = document.getElementById('viewerTitle');
const backBtn = document.getElementById('backBtn');

function makeItem(i){
  const li = document.createElement('li');
  const title = document.createElement('div');
  title.className = 'pdf-item-title';
  title.textContent = `ملف PDF ${i}`;
  const row = document.createElement('div');
  row.className = 'row';
  const openBtn = document.createElement('button');
  openBtn.className = 'open-btn';
  openBtn.textContent = 'افتح';
  openBtn.onclick = ()=> openPdf(i);
  const download = document.createElement('a');
  download.textContent = 'تحميل';
  download.href = `pdfs/pdf${i}.pdf`;
  download.setAttribute('download', `pdf${i}.pdf`);
  row.appendChild(download);
  row.appendChild(openBtn);
  li.appendChild(title);
  li.appendChild(row);
  return li;
}

function populate(){
  list.innerHTML = '';
  for(let i=1;i<=pdfCount;i++){
    list.appendChild(makeItem(i));
  }
}

function openPdf(i){
  viewerTitle.textContent = `ملف PDF ${i}`;
  pdfFrame.src = `pdfs/pdf${i}.pdf`;
  viewerSection.hidden = false;
  window.scrollTo({top:0,behavior:'smooth'});
}

backBtn.addEventListener('click', ()=>{
  viewerSection.hidden = true;
  pdfFrame.src = '';
});

searchInput.addEventListener('input', ()=>{
  const q = searchInput.value.trim();
  if(!q){ populate(); return; }
  const filtered = [];
  for(let i=1;i<=pdfCount;i++){
    const name = `pdf${i}`; const label = `ملف PDF ${i}`;
    if(name.includes(q) || label.includes(q) || `${i}`===q){
      filtered.push(i);
    }
  }
  list.innerHTML = '';
  filtered.forEach(i=> list.appendChild(makeItem(i)));
});

populate();
