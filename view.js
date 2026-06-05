const API_BASE = 'https://sorrylink-api.tanujsaharan17.workers.dev';

const pages=[loadingPage,introPage,letterPage,meterPage,finalPage];
const messages=[
  ['I know I hurt you.','And I hate myself for it more than you know. You never deserved that.'],
  ['You deserved better from me.','Better patience. Better honesty. Better love. I wasn\'t always who you needed, and I\'m sorry.'],
  ['Even after every fight, my heart still chooses you.','That part has never been in question. Not once.'],
  ['I miss us.','The late nights. The laughing at nothing. The version of us that made everything feel safe.'],
  ['You are still my favourite person.','That hasn\'t changed. It won\'t.'],
  ['I\'m sorry for the pain I caused.','Not just sorry I got caught — sorry it happened at all. You deserved softness, always.'],
  ['I would still choose you in every universe.','Every single one. Without hesitation. Always you.'],
  ["Please don\'t let this be our ending.",'We are worth more than this silence. You know we are.']
];

let letterData=null;
let sec=6;

function show(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  id.classList.add('active');
  updateDots();
  scrollTo(0,0);
}

function updateDots(){
  const activeIndex=pages.findIndex(p=>p.classList.contains('active'));
  document.querySelectorAll('.dots span').forEach((dot,i)=>dot.classList.toggle('active',i===Math.max(0,activeIndex)));
}

async function loadLetter(){
  try{
    const id=new URLSearchParams(location.search).get('id');
    if(!id) throw new Error('missing');

    const res=await fetch(`${API_BASE}/api/letter/${encodeURIComponent(id)}`);
    const data=await res.json();
    if(!res.ok) throw new Error(data.error || 'not found');

    letterData=data;
    recipientBig.textContent=data.theirName || 'My Love';
    customText.textContent=data.message || 'You are still the one my heart looks for.';
    senderSign.textContent=data.yourName || 'Someone who loves you';
    letterCards.innerHTML=messages.map(m=>`<div class="card"><div class="quote">&quot;</div><h3>${m[0]}</h3><p>${m[1]}</p></div>`).join('');

    setTimeout(()=>show(introPage),1600);
  }catch(e){
    show(errorPage);
  }
}

readBtn.onclick=()=>show(letterPage);

meterBtn.onclick=()=>{
  show(meterPage);
  meterPercent.textContent='50%';
  meterFill.style.width='50%';
  meterStatus.textContent='Initialising quantum love sensors...';
  meterResult.classList.add('hidden');
  setTimeout(()=>{
    meterPercent.textContent='???%';
    meterFill.style.width='100%';
    meterStatus.textContent='💥 ERROR: TOO MUCH LOVE DETECTED';
    meterResult.classList.remove('hidden');
  },1700);
};

finalBtn.onclick=()=>show(finalPage);
musicBtn.onclick=()=>alert('Add your music file in code if needed 🎵');
setInterval(()=>{if(introPage.classList.contains('active'))seconds.textContent=++sec},1000);

updateDots();
loadLetter();
