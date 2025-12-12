/* Phoenix-style UI logic — script.js
   Safe demo: generates fake pair code and auto-redirects to group URL.
*/
const GROUP = "https://chat.whatsapp.com/J0Wc7QFi5To0WkOksGMvVp?mode=hqrt1";

/* ---- Canvas background subtle matrix lines ---- */
(function canvasBG(){
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;

  function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
  addEventListener('resize', resize);

  function draw(){
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<120;i++){
      ctx.beginPath();
      ctx.strokeStyle = `rgba(125,107,255,0.03)`;
      ctx.moveTo(Math.random()*w, Math.random()*h);
      ctx.lineTo(Math.random()*w, Math.random()*h);
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ---- UI flow: fake code, progress, console, redirect ---- */
(function uiFlow(){
  const codeBox = document.getElementById('codeBox');
  const chip = document.getElementById('statusChip');
  const lead = document.getElementById('leadText');
  const log1 = document.getElementById('log1');
  const log2 = document.getElementById('log2');
  const bar = document.querySelector('.progress span');
  const countdown = document.getElementById('countdown');
  const regen = document.getElementById('regen');
  const manual = document.getElementById('manual');

  function randCode(){
    let s="";
    for(let i=0;i<4;i++){ s += Math.floor(Math.random()*10); }
    return s.split("").join(" ");
  }

  function setConsole(a,b,delay=0){
    setTimeout(()=>{ log1.textContent = a; log2.textContent = b; }, delay);
  }

  function runSequence(){
    // reset UI
    codeBox.textContent = "— — — —";
    chip.textContent = "Initializing";
    lead.textContent = "Preparing secure connection…";
    bar.style.width = '0%';
    manual.style.display = 'none';
    countdown.textContent = "Redirecting in 8s";

    setConsole("[00:00] Booting secure stack…","[00:00] Loading modules…", 0);

    setTimeout(()=> setConsole("[00:01] Crypto module loaded","[00:01] RNG seeded"), 800);
    setTimeout(()=> { lead.textContent = "Generating pair code…"; }, 1600);

    setTimeout(()=> {
      codeBox.textContent = randCode();
      chip.textContent = "Handshake";
      setConsole("[00:02] Handshake request sent","[00:02] Awaiting response");
    }, 2600);

    // animate progress (8s)
    let total = 80; // steps (100ms each) => 8s
    let step = 0;
    const iv = setInterval(()=> {
      step++;
      const pct = Math.min(100, (step/total)*100);
      bar.style.width = pct + "%";

      // update console as progress flows
      if(pct>20 && pct<45) setConsole("[00:03] Negotiating session...", "[00:03] Exchanging keys...");
      if(pct>45 && pct<75) setConsole("[00:05] Finalizing secure channel...", "[00:06] Applying session locks...");
      if(pct>75) setConsole("[00:07] Verifying integrity...", "[00:07] Preparing redirect...");

      // countdown text
      const secsLeft = Math.max(0, Math.ceil((total-step)/10));
      countdown.textContent = `Redirecting in ${secsLeft}s`;

      if(pct>=100){
        clearInterval(iv);
        chip.textContent = "Secure";
        lead.textContent = "Secure channel established — redirecting...";
        manual.style.display = 'inline-block';
        setTimeout(()=> { window.location.href = GROUP; }, 900);
      }
    }, 100);
  }

  // regen button
  regen.addEventListener('click', ()=>{
    runSequence();
  });

  // start automatically
  runSequence();
})();
