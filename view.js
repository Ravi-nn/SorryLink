const API_BASE = 'PASTE_YOUR_CLOUDFLARE_WORKER_URL_HERE';
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
function show(id){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));id.classList.add('active')}
async function loadLetter(){
  try{
    const id=new URLSearchParams(location.search).get('id');
    if(!id || API_BASE.includes('PASTE_YOUR'))throw new Error('missing');
    const res=await fetch(`${API_BASE}/api/letter/${encodeURIComponent(id)}`);
    const data=await res.json();
    if(!res.ok)throw new Error('not found');
    toName.textContent=data.theirName||'My Love';
    senderSign.textContent=data.yourName||'Someone who loves you';
    customText.textContent=data.message||'You are still the one my heart looks for.';
    letterCards.innerHTML=messages.map(m=>`<div class="card"><div class="quote">&quot;</div><h3>${m[0]}</h3><p>${m[1]}</p></div>`).join('');
    show(letter);
  }catch(e){show(error)}
}
setTimeout(loadLetter,900);
