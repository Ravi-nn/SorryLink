const pages=[formPage,loadingPage,introPage,letterPage,meterPage,finalPage];
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
function show(id){pages.forEach(p=>p.classList.remove('active'));id.classList.add('active');window.scrollTo(0,0);document.querySelector('.preview-bar').classList.toggle('hidden',id===formPage||id===loadingPage)}
function initials(name){return (name||'Nj').trim().split(/\s+/).map(x=>x[0]).join('').slice(0,2)}
previewBtn.onclick=()=>{show(loadingPage);setTimeout(()=>{recipientBig.textContent=initials(theirName.value);show(introPage);},2300)}
readBtn.onclick=()=>{letterCards.innerHTML=messages.map(m=>`<div class="card"><div class="quote">&quot;</div><h3>${m[0]}</h3><p>${m[1]}</p></div>`).join('');customText.textContent=personalMsg.value||'You are still the one my heart looks for.';show(letterPage)}
meterBtn.onclick=()=>{show(meterPage);meterPercent.textContent='50%';meterFill.style.width='50%';meterStatus.textContent='Initialising quantum love sensors...';meterResult.classList.add('hidden');setTimeout(()=>{meterPercent.textContent='???%';meterFill.style.width='100%';meterStatus.textContent='💥 ERROR: TOO MUCH LOVE DETECTED';meterResult.classList.remove('hidden')},1800)}
loveBtn.onclick=()=>{senderSign.textContent=initials(yourName.value);show(finalPage)}
shareBtn.onclick=async()=>{const url=location.href; if(navigator.share){await navigator.share({title:'A letter for you',text:'I made this for you 🌹',url})}else{navigator.clipboard.writeText(url);alert('Link copied!')}}
let sec=6;setInterval(()=>{ if(introPage.classList.contains('active')) seconds.textContent=++sec; },1000);
musicBtn.onclick=()=>alert('Add your music file in code if needed 🎵');
