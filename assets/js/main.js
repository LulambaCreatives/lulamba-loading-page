// assets/js/main.js
// Handles theme, sound toggle, name cycling, particles and progress logic
(function(){
  // Theme
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  function setTheme(t){
    if(t==='light'){
      document.body.style.background = 'linear-gradient(135deg,#f5f5f5,#e0e0e0)';
      document.documentElement.style.setProperty('--text-color','#111111');
      document.documentElement.style.setProperty('--text-secondary','#555555');
      themeToggle.textContent='☀️';
      themeToggle.setAttribute('aria-pressed','true');
      localStorage.setItem('theme','light');
    } else {
      document.body.style.background = 'var(--bg-gradient)';
      document.documentElement.style.setProperty('--text-color','#ffffff');
      document.documentElement.style.setProperty('--text-secondary','#cccccc');
      themeToggle.textContent='🌙';
      themeToggle.setAttribute('aria-pressed','false');
      localStorage.setItem('theme','dark');
    }
  }
  setTheme(savedTheme);
  themeToggle.addEventListener('click', ()=>{
    const cur = localStorage.getItem('theme')||'dark';
    setTheme(cur==='dark'?'light':'dark');
  });

  // Sound toggle (UI-only placeholder)
  const soundToggle = document.getElementById('soundToggle');
  let isMuted = localStorage.getItem('soundMuted')==='true';
  function updateSoundUI(){
    soundToggle.textContent = isMuted? '🔇' : '🔊';
    soundToggle.setAttribute('aria-pressed', String(!isMuted));
  }
  updateSoundUI();
  soundToggle.addEventListener('click', ()=>{ isMuted = !isMuted; localStorage.setItem('soundMuted', isMuted); updateSoundUI(); });

  // Names cycling
  const people = ["Stickie Fingers","Marshal","Cawas","Danny West","Kai","Bebeko"];
  let nameIndex = 0;
  const nameEl = document.getElementById('nameCycle');
  setInterval(()=>{
    if(!nameEl) return;
    nameEl.style.opacity = 0;
    setTimeout(()=>{
      nameEl.textContent = people[nameIndex];
      nameEl.style.opacity = 1;
      nameIndex = (nameIndex+1)%people.length;
    },200);
  },2000);

  // Progress logic (fills in and enables Enter button)
  const progressFill = document.getElementById('progressFill');
  const enterBtn = document.getElementById('enterSite');
  let progress = 0;
  const progressInterval = setInterval(()=>{
    progress = Math.min(100, progress + Math.random()*8 + 6);
    progressFill.style.width = progress + '%';
    const pb = document.querySelector('.progress-bar');
    if(pb) pb.setAttribute('aria-valuenow', Math.round(progress));
    if(progress>=100){
      clearInterval(progressInterval);
      enterBtn.disabled = false;
      enterBtn.setAttribute('aria-disabled','false');
      enterBtn.classList.add('ready');
    }
  },400);
  enterBtn.addEventListener('click', ()=>{
    // Default behaviour: go to configured target or just reveal a message
    // For now navigate to the original target as an example behind a confirm
    const target = 'https://miguel4wdc.rf.gd';
    window.location.href = target;
  });

  // Particle animation (lightweight and throttled on small screens)
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  function resize(){ if(!canvas) return; canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);

  if(ctx){
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let particles = [];
    let particleCount = window.innerWidth < 600 ? 30 : 80;
    function createParticles(){ particles = []; for(let i=0;i<particleCount;i++){ particles.push({ x:Math.random()*canvas.width, y:Math.random()*canvas.height, size:Math.random()*2+0.5, speed:Math.random()*1+0.3, opacity:Math.random()*0.5+0.2, vx:(Math.random()-0.5)*0.5, vy:(Math.random()-0.5)*0.5 }) } }
    createParticles();
    let rafId;
    function animate(){ ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{
      p.y -= p.speed; p.x += p.vx; if(p.y<0) p.y = canvas.height; if(p.x<0) p.x = canvas.width; if(p.x>canvas.width) p.x = 0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fillStyle = `rgba(0,255,208,${p.opacity})`; ctx.fill();
      // lines
      for(let j=0;j<particles.length;j++){ const o=particles[j]; const dx=p.x-o.x; const dy=p.y-o.y; const dist=Math.hypot(dx,dy); if(dist<100){ ctx.strokeStyle = `rgba(0,255,208,${0.1*(1-dist/100)})`; ctx.lineWidth=0.5; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(o.x,o.y); ctx.stroke(); } }
    });
      rafId = requestAnimationFrame(animate);
    }
    if(!isReduced) animate();
    document.addEventListener('visibilitychange', ()=>{ if(document.hidden && rafId) cancelAnimationFrame(rafId); else if(!isReduced) animate(); });
  }
})();
