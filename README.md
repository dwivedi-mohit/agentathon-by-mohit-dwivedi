<div align="center">

<!-- ===== ANIMATED BACKGROUND ORBS ===== -->
<div style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;overflow:hidden;pointer-events:none;">
  <div style="position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.12),transparent 70%);top:-15%;left:-10%;animation:orbDrift1 25s ease-in-out infinite;"></div>
  <div style="position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(59,130,246,0.1),transparent 70%);bottom:-20%;right:-8%;animation:orbDrift2 30s ease-in-out infinite;"></div>
  <div style="position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(16,185,129,0.06),transparent 70%);top:40%;left:50%;animation:orbDrift3 20s ease-in-out infinite;"></div>
  <div style="position:absolute;width:350px;height:350px;border-radius:50%;background:radial-gradient(circle,rgba(239,68,68,0.04),transparent 70%);top:10%;right:10%;animation:orbDrift4 22s ease-in-out infinite;"></div>
  <div style="position:absolute;width:450px;height:450px;border-radius:50%;background:radial-gradient(circle,rgba(129,140,248,0.08),transparent 70%);bottom:15%;left:15%;animation:orbDrift5 28s ease-in-out infinite;"></div>
  <div style="position:fixed;inset:0;background-image:linear-gradient(rgba(129,140,248,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(129,140,248,0.02) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 60% 50% at 50% 50%,black 20%,transparent 70%);-webkit-mask-image:radial-gradient(ellipse 60% 50% at 50% 50%,black 20%,transparent 70%);"></div>
  <div style="position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.02) 2px,rgba(0,0,0,0.02) 4px);"></div>
</div>

<!-- ===== SCROLL PROGRESS BAR ===== -->
<div id="scrollProgress" style="position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#818CF8,#7C3AED,#3B82F6);z-index:9999;width:0%;transition:width 0.1s ease;"></div>

<style>
@keyframes orbDrift1 { 0%,100% { transform:translate(0,0) scale(1); } 25% { transform:translate(80px,-60px) scale(1.08); } 50% { transform:translate(40px,40px) scale(0.95); } 75% { transform:translate(-60px,80px) scale(1.05); } }
@keyframes orbDrift2 { 0%,100% { transform:translate(0,0) scale(1); } 25% { transform:translate(-70px,50px) scale(1.05); } 50% { transform:translate(60px,-40px) scale(0.92); } 75% { transform:translate(30px,70px) scale(1.07); } }
@keyframes orbDrift3 { 0%,100% { transform:translate(-50%,-50%) translate(0,0); } 33% { transform:translate(-50%,-50%) translate(40px,-50px); } 66% { transform:translate(-50%,-50%) translate(-30px,40px); } }
@keyframes orbDrift4 { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(-50px,-30px) scale(1.1); } }
@keyframes orbDrift5 { 0%,100% { transform:translate(0,0) scale(1); } 33% { transform:translate(40px,-60px) scale(1.06); } 66% { transform:translate(-60px,30px) scale(0.94); } }
@keyframes gradientShift { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
@keyframes float { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-12px); } }
@keyframes pulseGlow { 0%,100% { box-shadow:0 0 20px rgba(124,58,237,0.15); } 50% { box-shadow:0 0 40px rgba(124,58,237,0.35),0 0 80px rgba(124,58,237,0.1); } }
@keyframes typewriter { from { width:0; } to { width:100%; } }
@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
@keyframes fadeInUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeInLeft { from { opacity:0; transform:translateX(-30px); } to { opacity:1; transform:translateX(0); } }
@keyframes fadeInRight { from { opacity:0; transform:translateX(30px); } to { opacity:1; transform:translateX(0); } }
@keyframes scaleIn { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }
@keyframes shimmer { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }
@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
@keyframes spinReverse { from { transform:rotate(360deg); } to { transform:rotate(0deg); } }
@keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
@keyframes neonFlicker { 0%,19%,21%,23%,25%,54%,56%,100% { opacity:1; } 20%,24%,55% { opacity:0.3; } }
@keyframes ripple { 0% { box-shadow:0 0 0 0 rgba(124,58,237,0.4); } 100% { box-shadow:0 0 0 20px rgba(124,58,237,0); } }
@keyframes countUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
@keyframes marquee { 0% { transform:translateX(100%); } 100% { transform:translateX(-100%); } }
@keyframes wave { 0%,100% { transform:rotate(0deg); } 25% { transform:rotate(3deg); } 75% { transform:rotate(-3deg); } }
@keyframes heartbeat { 0%,100% { transform:scale(1); } 14% { transform:scale(1.1); } 28% { transform:scale(1); } 42% { transform:scale(1.08); } 70% { transform:scale(1); } }
@keyframes expandRing { 0% { transform:scale(0.5); opacity:0.8; } 100% { transform:scale(2.5); opacity:0; } }
@keyframes shimmerBg { 0% { background-position:-500px 0; } 100% { background-position:500px 0; } }
@keyframes slideDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
@keyframes rotateY { from { transform:rotateY(0deg); } to { transform:rotateY(360deg); } }
@keyframes sparkle { 0%,100% { opacity:0; transform:scale(0) rotate(0deg); } 50% { opacity:1; transform:scale(1) rotate(180deg); } }
@keyframes progressPulse { 0% { opacity:0.6; } 50% { opacity:1; } 100% { opacity:0.6; } }

.card-3d { transition:transform 0.4s ease, box-shadow 0.4s ease; }
.card-3d:hover { transform:perspective(800px) rotateX(2deg) rotateY(4deg) scale(1.02); box-shadow:0 20px 60px rgba(124,58,237,0.15); }
.section { animation:fadeInUp 0.8s ease forwards; opacity:0; }
.section:nth-child(1) { animation-delay:0.1s; }
.section:nth-child(2) { animation-delay:0.2s; }
.section:nth-child(3) { animation-delay:0.3s; }
.section:nth-child(4) { animation-delay:0.4s; }
.section:nth-child(5) { animation-delay:0.5s; }
.section:nth-child(6) { animation-delay:0.6s; }
.typing-cursor::after { content:'▍'; animation:blink 1s step-end infinite; color:#818CF8; }
.shimmer-text { background:linear-gradient(90deg,#818CF8 0%,#7C3AED 25%,#3B82F6 50%,#7C3AED 75%,#818CF8 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 3s linear infinite; }
.glow-border { position:relative; overflow:hidden; }
.glow-border::before { content:''; position:absolute; top:-2px;left:-2px;right:-2px;bottom:-2px;border-radius:16px;background:linear-gradient(45deg,#818CF8,#7C3AED,#3B82F6,#10B981,#818CF8);background-size:400% 400%;animation:gradientShift 4s ease infinite;z-index:-1;opacity:0.6; }
.pulse-ring::after { content:''; position:absolute;inset:-4px;border-radius:50%;border:2px solid rgba(124,58,237,0.3);animation:expandRing 2s ease-out infinite; }
.rainbow-underline { background:linear-gradient(90deg,#818CF8,#7C3AED,#3B82F6,#10B981,#F59E0B,#EF4444,#818CF8);background-size:200% auto;height:2px;width:100%;animation:shimmer 3s linear infinite; }
</style>

<!-- ===== HERO SECTION ===== -->
<div align="center" style="padding:60px 20px 40px;position:relative;animation:fadeInUp 1s ease forwards;">

  <!-- Animated Logo -->
  <div style="display:inline-block;animation:float 4s ease-in-out infinite;margin-bottom:10px;">
    <div style="width:80px;height:80px;border-radius:20px;background:linear-gradient(135deg,#818CF8,#7C3AED,#3B82F6);display:flex;align-items:center;justify-content:center;box-shadow:0 10px 40px rgba(124,58,237,0.3);animation:pulseGlow 3s ease-in-out infinite;transition:transform 0.5s ease;" onmouseover="this.style.transform='rotateY(180deg) scale(1.1)'" onmouseout="this.style.transform='rotateY(0deg) scale(1)'">
      <span style="font-size:36px;font-weight:900;color:white;font-family:'Inter',sans-serif;text-shadow:0 2px 10px rgba(0,0,0,0.3);">M</span>
    </div>
  </div>

  <!-- Animated Title with Gradient -->
  <h1 style="font-size:4.5rem;font-weight:900;margin:10px 0 5px;font-family:'Inter',-apple-system,sans-serif;letter-spacing:-2px;line-height:1.1;background:linear-gradient(135deg,#818CF8 0%,#7C3AED 25%,#3B82F6 50%,#10B981 75%,#818CF8 100%);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite;">
    ⚡ Mirror
  </h1>

  <!-- Typewriter Subtitle -->
  <div style="display:inline-block;overflow:hidden;white-space:nowrap;border-right:3px solid #818CF8;animation:typewriter 3s steps(30) 0.5s forwards,blink 1s step-end infinite;max-width:fit-content;margin:0 auto;animation-fill-mode:forwards;width:0;">
    <p style="font-size:1.3rem;color:#94A3B8;font-family:'Inter',monospace;font-weight:500;margin:0;">Strategic Decision War Room</p>
  </div>

  <!-- Tagline -->
  <p style="font-size:1rem;color:#64748B;max-width:600px;margin:25px auto 20px;line-height:1.6;font-family:'Inter',sans-serif;animation:fadeInUp 1s ease 1s forwards;opacity:0;">
    <span style="display:inline-block;animation:wave 2s ease-in-out infinite;">🤖</span>
    <strong style="color:#E2E8F0;">4 AI Personas</strong> · <strong style="color:#E2E8F0;">3 Rounds</strong> · <strong style="color:#E2E8F0;">1 Decision Brief</strong>
    <br>Pressure-test high-stakes choices through conflicting expert AI personas before committing capital.
  </p>

  <!-- Creator Badge with Animations -->
  <div style="display:inline-flex;align-items:center;gap:10px;padding:10px 24px;border-radius:50px;background:linear-gradient(135deg,rgba(124,58,237,0.1),rgba(59,130,246,0.1));border:1px solid rgba(124,58,237,0.2);animation:pulseGlow 3s ease-in-out infinite;margin-bottom:15px;position:relative;cursor:pointer;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" style="transition:all 0.3s ease;">
    <div style="position:relative;">
      <div style="position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(124,58,237,0.2);animation:expandRing 2s ease-out infinite;"></div>
      <span style="font-size:1.2rem;">👨‍💻</span>
    </div>
    <span style="font-size:0.9rem;font-weight:600;color:white;font-family:'Inter',sans-serif;">
      Built with ❤️ by
    </span>
    <span style="font-size:1rem;font-weight:800;background:linear-gradient(135deg,#818CF8,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:heartbeat 2s ease-in-out infinite;font-family:'Inter',sans-serif;">
      Mohit Dwivedi
    </span>
    <span style="display:inline-block;animation:sparkle 1.5s ease-in-out infinite;">✨</span>
  </div>

  <!-- Action Buttons -->
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:15px;animation:fadeInUp 1s ease 1.5s forwards;opacity:0;">
    <a href="#quick-start" style="display:inline-flex;align-items:center;gap:8px;padding:12px 28px;border-radius:12px;background:linear-gradient(135deg,#818CF8,#7C3AED);color:white;font-weight:700;font-size:0.9rem;text-decoration:none;font-family:'Inter',sans-serif;animation:ripple 2s ease-out infinite;transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px) scale(1.04)';this.style.boxShadow='0 12px 30px rgba(124,58,237,0.35)'" onmouseout="this.style.transform='translateY(0) scale(1)';this.style.boxShadow='none'">
      ⚡ Quick Start
    </a>
    <a href="#features" style="display:inline-flex;align-items:center;gap:8px;padding:12px 28px;border-radius:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#E2E8F0;font-weight:600;font-size:0.9rem;text-decoration:none;font-family:'Inter',sans-serif;transition:all 0.3s ease;" onmouseover="this.style.background='rgba(255,255,255,0.08)';this.style.transform='translateY(-3px)'" onmouseout="this.style.background='rgba(255,255,255,0.04)';this.style.transform='translateY(0)'">
      🎯 Features
    </a>
    <a href="#architecture" style="display:inline-flex;align-items:center;gap:8px;padding:12px 28px;border-radius:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#E2E8F0;font-weight:600;font-size:0.9rem;text-decoration:none;font-family:'Inter',sans-serif;transition:all 0.3s ease;" onmouseover="this.style.background='rgba(255,255,255,0.08)';this.style.transform='translateY(-3px)'" onmouseout="this.style.background='rgba(255,255,255,0.04)';this.style.transform='translateY(0)'">
      🏗️ Architecture
    </a>
  </div>

  <!-- ---- ANIMATED STATS BAR ---- -->
  <div style="display:flex;gap:30px;justify-content:center;flex-wrap:wrap;margin-top:35px;padding:20px 30px;border-radius:16px;background:rgba(18,18,30,0.6);border:1px solid rgba(255,255,255,0.04);backdrop-filter:blur(12px);animation:slideDown 1s ease 2s forwards;opacity:0;max-width:700px;margin-left:auto;margin-right:auto;">
    <div style="text-align:center;" onmouseover="this.querySelector('.stat-value').style.transform='scale(1.2)'" onmouseout="this.querySelector('.stat-value').style.transform='scale(1)'">
      <div class="stat-value" style="font-size:1.8rem;font-weight:900;background:linear-gradient(135deg,#818CF8,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;transition:transform 0.3s ease;">4</div>
      <div style="font-size:0.7rem;color:#64748B;text-transform:uppercase;letter-spacing:1px;font-weight:600;">AI Personas</div>
    </div>
    <div style="width:1px;background:rgba(255,255,255,0.06);"></div>
    <div style="text-align:center;" onmouseover="this.querySelector('.stat-value').style.transform='scale(1.2)'" onmouseout="this.querySelector('.stat-value').style.transform='scale(1)'">
      <div class="stat-value" style="font-size:1.8rem;font-weight:900;background:linear-gradient(135deg,#3B82F6,#10B981);-webkit-background-clip:text;-webkit-text-fill-color:transparent;transition:transform 0.3s ease;">3</div>
      <div style="font-size:0.7rem;color:#64748B;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Debate Rounds</div>
    </div>
    <div style="width:1px;background:rgba(255,255,255,0.06);"></div>
    <div style="text-align:center;" onmouseover="this.querySelector('.stat-value').style.transform='scale(1.2)'" onmouseout="this.querySelector('.stat-value').style.transform='scale(1)'">
      <div class="stat-value" style="font-size:1.8rem;font-weight:900;background:linear-gradient(135deg,#F59E0B,#EF4444);-webkit-background-clip:text;-webkit-text-fill-color:transparent;transition:transform 0.3s ease;">60s</div>
      <div style="font-size:0.7rem;color:#64748B;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Per Debate</div>
    </div>
    <div style="width:1px;background:rgba(255,255,255,0.06);"></div>
    <div style="text-align:center;" onmouseover="this.querySelector('.stat-value').style.transform='scale(1.2)'" onmouseout="this.querySelector('.stat-value').style.transform='scale(1)'">
      <div class="stat-value" style="font-size:1.8rem;font-weight:900;background:linear-gradient(135deg,#10B981,#818CF8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;transition:transform 0.3s ease;">$0</div>
      <div style="font-size:0.7rem;color:#64748B;text-transform:uppercase;letter-spacing:1px;font-weight:600;">To Start</div>
    </div>
  </div>
</div>

<div class="rainbow-underline" style="margin:10px auto;max-width:200px;"></div>

---

<!-- ===== FEATURES SECTION ===== -->
<div id="features" align="center" style="padding:40px 20px;">

## <span style="font-size:2.2rem;font-weight:800;font-family:'Inter',sans-serif;background:linear-gradient(135deg,#818CF8,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:pulseGlow 3s ease-in-out infinite;">🎯 Core Features</span>

<span class="rainbow-underline" style="display:block;margin:10px auto;max-width:120px;"></span>

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;max-width:1200px;margin:30px auto;text-align:left;">

<!-- Feature Card 1 -->
<div class="card-3d glow-border" style="padding:28px;border-radius:16px;border:1px solid rgba(255,255,255,0.05);background:rgba(18,18,30,0.5);backdrop-filter:blur(8px);animation:fadeInUp 0.8s ease forwards;opacity:0;">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
    <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,rgba(16,185,129,0.15),rgba(16,185,129,0.05));display:flex;align-items:center;justify-content:center;font-size:1.3rem;animation:bounce 3s ease-in-out infinite;">🤖</div>
    <h3 style="margin:0;font-size:1.1rem;color:white;font-family:'Inter',sans-serif;">Multi-Agent Debate Engine</h3>
  </div>
  <p style="margin:0;font-size:0.85rem;color:#94A3B8;line-height:1.6;font-family:'Inter',sans-serif;">4 conflicting AI personas (Optimist, Skeptic, Operator, Customer) debate your business question in real-time SSE streamed turns.</p>
</div>

<!-- Feature Card 2 -->
<div class="card-3d glow-border" style="padding:28px;border-radius:16px;border:1px solid rgba(255,255,255,0.05);background:rgba(18,18,30,0.5);backdrop-filter:blur(8px);animation:fadeInUp 0.8s ease 0.1s forwards;opacity:0;">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
    <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,rgba(59,130,246,0.15),rgba(59,130,246,0.05));display:flex;align-items:center;justify-content:center;font-size:1.3rem;animation:bounce 3s ease-in-out 0.5s infinite;">⚡</div>
    <h3 style="margin:0;font-size:1.1rem;color:white;font-family:'Inter',sans-serif;">Real-Time SSE Streaming</h3>
  </div>
  <p style="margin:0;font-size:0.85rem;color:#94A3B8;line-height:1.6;font-family:'Inter',sans-serif;">Server-Sent Events push persona responses character-by-character. Sub-500ms first token latency for a live, engaging experience.</p>
</div>

<!-- Feature Card 3 -->
<div class="card-3d glow-border" style="padding:28px;border-radius:16px;border:1px solid rgba(255,255,255,0.05);background:rgba(18,18,30,0.5);backdrop-filter:blur(8px);animation:fadeInUp 0.8s ease 0.2s forwards;opacity:0;">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
    <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,rgba(245,158,11,0.15),rgba(245,158,11,0.05));display:flex;align-items:center;justify-content:center;font-size:1.3rem;animation:bounce 3s ease-in-out 1s infinite;">📋</div>
    <h3 style="margin:0;font-size:1.1rem;color:white;font-family:'Inter',sans-serif;">Structured Decision Brief</h3>
  </div>
  <p style="margin:0;font-size:0.85rem;color:#94A3B8;line-height:1.6;font-family:'Inter',sans-serif;">Synthesizer agent distills 3 rounds of debate into 3 actionable options with upside/downside, confidence scores, and action steps.</p>
</div>

<!-- Feature Card 4 -->
<div class="card-3d glow-border" style="padding:28px;border-radius:16px;border:1px solid rgba(255,255,255,0.05);background:rgba(18,18,30,0.5);backdrop-filter:blur(8px);animation:fadeInUp 0.8s ease 0.3s forwards;opacity:0;">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
    <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,rgba(239,68,68,0.15),rgba(239,68,68,0.05));display:flex;align-items:center;justify-content:center;font-size:1.3rem;animation:bounce 3s ease-in-out 1.5s infinite;">🎨</div>
    <h3 style="margin:0;font-size:1.1rem;color:white;font-family:'Inter',sans-serif;">Immersive War Room UI</h3>
  </div>
  <p style="margin:0;font-size:0.85rem;color:#94A3B8;line-height:1.6;font-family:'Inter',sans-serif;">3-column dashboard with argument mindmap, rotating persona cards, 3D tilt, risk radar, timeline Gantt, and particle background.</p>
</div>

<!-- Feature Card 5 -->
<div class="card-3d glow-border" style="padding:28px;border-radius:16px;border:1px solid rgba(255,255,255,0.05);background:rgba(18,18,30,0.5);backdrop-filter:blur(8px);animation:fadeInUp 0.8s ease 0.4s forwards;opacity:0;">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
    <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,rgba(129,140,248,0.15),rgba(129,140,248,0.05));display:flex;align-items:center;justify-content:center;font-size:1.3rem;animation:bounce 3s ease-in-out 2s infinite;">🔬</div>
    <h3 style="margin:0;font-size:1.1rem;color:white;font-family:'Inter',sans-serif;">Bias Detection & "Call Bullshit"</h3>
  </div>
  <p style="margin:0;font-size:0.85rem;color:#94A3B8;line-height:1.6;font-family:'Inter',sans-serif;">Each persona card shows detected cognitive biases. Users can "Call Bullshit" — forcing the persona to defend or concede its argument.</p>
</div>

<!-- Feature Card 6 -->
<div class="card-3d glow-border" style="padding:28px;border-radius:16px;border:1px solid rgba(255,255,255,0.05);background:rgba(18,18,30,0.5);backdrop-filter:blur(8px);animation:fadeInUp 0.8s ease 0.5s forwards;opacity:0;">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
    <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,rgba(16,185,129,0.15),rgba(16,185,129,0.05));display:flex;align-items:center;justify-content:center;font-size:1.3rem;animation:bounce 3s ease-in-out 2.5s infinite;">🔄</div>
    <h3 style="margin:0;font-size:1.1rem;color:white;font-family:'Inter',sans-serif;">Decision Journal & Export</h3>
  </div>
  <p style="margin:0;font-size:0.85rem;color:#94A3B8;line-height:1.6;font-family:'Inter',sans-serif;">Track decisions with confidence ratings, rationale notes. Export briefs as Notion-compatible Markdown. JSON backup for history.</p>
</div>

</div>
</div>

---

<!-- ===== PERSONAS SECTION ===== -->
<div id="personas" align="center" style="padding:40px 20px;">

<h2 style="font-size:2.2rem;font-weight:800;font-family:'Inter',sans-serif;background:linear-gradient(135deg,#818CF8,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:pulseGlow 3s ease-in-out infinite;">👥 The 4 Personas</h2>

<span class="rainbow-underline" style="display:block;margin:10px auto;max-width:80px;"></span>

<p style="font-size:0.95rem;color:#94A3B8;max-width:600px;margin:15px auto 30px;">Each persona has a distinct personality, system prompt, and debate style. They are programmed to disagree and cross-reference each other.</p>

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;max-width:1000px;margin:0 auto;">

<!-- Uday -->
<div class="card-3d" style="padding:24px 20px;border-radius:16px;border:1px solid rgba(16,185,129,0.15);background:linear-gradient(135deg,rgba(16,185,129,0.05),transparent);transition:all 0.3s ease;animation:fadeInUp 0.8s ease forwards;opacity:0;" onmouseover="this.style.borderColor='rgba(16,185,129,0.4)';this.style.boxShadow='0 0 30px rgba(16,185,129,0.1)'" onmouseout="this.style.borderColor='rgba(16,185,129,0.15)';this.style.boxShadow='none'">
  <div style="font-size:2.5rem;margin-bottom:8px;animation:bounce 3s ease-in-out infinite;">●</div>
  <h3 style="margin:0;font-size:1.1rem;color:#10B981;font-family:'Inter',sans-serif;">Uday</h3>
  <p style="margin:2px 0 8px;font-size:0.8rem;color:#64748B;text-transform:uppercase;letter-spacing:1px;font-weight:600;">The Optimist</p>
  <p style="margin:0;font-size:0.8rem;color:#94A3B8;line-height:1.5;">Sees potential everywhere. First-mover advantage. "There is never a perfect time. Start now."</p>
  <div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap;">
    <span style="padding:3px 10px;border-radius:20px;font-size:0.65rem;background:rgba(16,185,129,0.1);color:#10B981;border:1px solid rgba(16,185,129,0.15);font-weight:600;">Growth</span>
    <span style="padding:3px 10px;border-radius:20px;font-size:0.65rem;background:rgba(16,185,129,0.1);color:#10B981;border:1px solid rgba(16,185,129,0.15);font-weight:600;">Speed</span>
  </div>
</div>

<!-- Kiran -->
<div class="card-3d" style="padding:24px 20px;border-radius:16px;border:1px solid rgba(239,68,68,0.15);background:linear-gradient(135deg,rgba(239,68,68,0.05),transparent);transition:all 0.3s ease;animation:fadeInUp 0.8s ease 0.1s forwards;opacity:0;" onmouseover="this.style.borderColor='rgba(239,68,68,0.4)';this.style.boxShadow='0 0 30px rgba(239,68,68,0.1)'" onmouseout="this.style.borderColor='rgba(239,68,68,0.15)';this.style.boxShadow='none'">
  <div style="font-size:2.5rem;margin-bottom:8px;animation:bounce 3s ease-in-out 0.3s infinite;">■</div>
  <h3 style="margin:0;font-size:1.1rem;color:#EF4444;font-family:'Inter',sans-serif;">Kiran</h3>
  <p style="margin:2px 0 8px;font-size:0.8rem;color:#64748B;text-transform:uppercase;letter-spacing:1px;font-weight:600;">The Skeptic</p>
  <p style="margin:0;font-size:0.8rem;color:#94A3B8;line-height:1.5;">Finds what breaks. Cash burn, hidden costs. "Hope is not a strategy."</p>
  <div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap;">
    <span style="padding:3px 10px;border-radius:20px;font-size:0.65rem;background:rgba(239,68,68,0.1);color:#EF4444;border:1px solid rgba(239,68,68,0.15);font-weight:600;">Risk</span>
    <span style="padding:3px 10px;border-radius:20px;font-size:0.65rem;background:rgba(239,68,68,0.1);color:#EF4444;border:1px solid rgba(239,68,68,0.15);font-weight:600;">Data</span>
  </div>
</div>

<!-- Mohan -->
<div class="card-3d" style="padding:24px 20px;border-radius:16px;border:1px solid rgba(59,130,246,0.15);background:linear-gradient(135deg,rgba(59,130,246,0.05),transparent);transition:all 0.3s ease;animation:fadeInUp 0.8s ease 0.2s forwards;opacity:0;" onmouseover="this.style.borderColor='rgba(59,130,246,0.4)';this.style.boxShadow='0 0 30px rgba(59,130,246,0.1)'" onmouseout="this.style.borderColor='rgba(59,130,246,0.15)';this.style.boxShadow='none'">
  <div style="font-size:2.5rem;margin-bottom:8px;animation:bounce 3s ease-in-out 0.6s infinite;">▲</div>
  <h3 style="margin:0;font-size:1.1rem;color:#3B82F6;font-family:'Inter',sans-serif;">Mohan</h3>
  <p style="margin:2px 0 8px;font-size:0.8rem;color:#64748B;text-transform:uppercase;letter-spacing:1px;font-weight:600;">The Operator</p>
  <p style="margin:0;font-size:0.8rem;color:#94A3B8;line-height:1.5;">Run businesses for 20 years. Execution, logistics. "The idea is easy. The execution is everything."</p>
  <div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap;">
    <span style="padding:3px 10px;border-radius:20px;font-size:0.65rem;background:rgba(59,130,246,0.1);color:#3B82F6;border:1px solid rgba(59,130,246,0.15);font-weight:600;">Ops</span>
    <span style="padding:3px 10px;border-radius:20px;font-size:0.65rem;background:rgba(59,130,246,0.1);color:#3B82F6;border:1px solid rgba(59,130,246,0.15);font-weight:600;">Plan</span>
  </div>
</div>

<!-- Priya -->
<div class="card-3d" style="padding:24px 20px;border-radius:16px;border:1px solid rgba(245,158,11,0.15);background:linear-gradient(135deg,rgba(245,158,11,0.05),transparent);transition:all 0.3s ease;animation:fadeInUp 0.8s ease 0.3s forwards;opacity:0;" onmouseover="this.style.borderColor='rgba(245,158,11,0.4)';this.style.boxShadow='0 0 30px rgba(245,158,11,0.1)'" onmouseout="this.style.borderColor='rgba(245,158,11,0.15)';this.style.boxShadow='none'">
  <div style="font-size:2.5rem;margin-bottom:8px;animation:bounce 3s ease-in-out 0.9s infinite;">◆</div>
  <h3 style="margin:0;font-size:1.1rem;color:#F59E0B;font-family:'Inter',sans-serif;">Priya</h3>
  <p style="margin:2px 0 8px;font-size:0.8rem;color:#64748B;text-transform:uppercase;letter-spacing:1px;font-weight:600;">The Customer</p>
  <p style="margin:0;font-size:0.8rem;color:#94A3B8;line-height:1.5;">The end-user. Value, convenience, trust. "I don't care about your vision. I care about what I get."</p>
  <div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap;">
    <span style="padding:3px 10px;border-radius:20px;font-size:0.65rem;background:rgba(245,158,11,0.1);color:#F59E0B;border:1px solid rgba(245,158,11,0.15);font-weight:600;">Value</span>
    <span style="padding:3px 10px;border-radius:20px;font-size:0.65rem;background:rgba(245,158,11,0.1);color:#F59E0B;border:1px solid rgba(245,158,11,0.15);font-weight:600;">UX</span>
  </div>
</div>

</div>
</div>

---

<!-- ===== QUICK START SECTION ===== -->
<div id="quick-start" align="center" style="padding:40px 20px;">

<h2 style="font-size:2.2rem;font-weight:800;font-family:'Inter',sans-serif;background:linear-gradient(135deg,#818CF8,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:pulseGlow 3s ease-in-out infinite;">⚡ Quick Start</h2>

<span class="rainbow-underline" style="display:block;margin:10px auto;max-width:100px;"></span>

<div style="max-width:800px;margin:30px auto;">

<!-- BACKEND SETUP -->
<div class="glow-border" style="border-radius:16px;margin-bottom:16px;">
  <div style="padding:24px;border-radius:16px;background:rgba(18,18,30,0.7);backdrop-filter:blur(8px);text-align:left;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
      <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,rgba(59,130,246,0.2),rgba(59,130,246,0.05));display:flex;align-items:center;justify-content:center;font-size:1rem;animation:spin 4s linear infinite;">🐍</div>
      <span style="font-size:1rem;font-weight:700;color:white;font-family:'Inter',sans-serif;">Backend Setup (FastAPI)</span>
    </div>
    
    <div style="position:relative;border-radius:10px;overflow:hidden;">
      <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#3B82F6,#7C3AED,#818CF8);background-size:200% auto;animation:shimmer 2s linear infinite;"></div>
      
      <!-- Animated Code Block -->
      <div style="background:rgba(7,7,13,0.8);padding:18px;border-radius:10px;border:1px solid rgba(255,255,255,0.04);font-family:'JetBrains Mono','SF Mono',monospace;font-size:0.8rem;line-height:1.8;overflow-x:auto;">
        <div style="display:flex;gap:8px;margin-bottom:12px;">
          <span style="width:10px;height:10px;border-radius:50%;background:#EF4444;animation:heartbeat 2s ease-in-out infinite;"></span>
          <span style="width:10px;height:10px;border-radius:50%;background:#F59E0B;animation:heartbeat 2s ease-in-out 0.3s infinite;"></span>
          <span style="width:10px;height:10px;border-radius:50%;background:#10B981;animation:heartbeat 2s ease-in-out 0.6s infinite;"></span>
        </div>
        <div style="color:#94A3B8;"><span style="color:#10B981;">#</span> Clone & setup backend</div>
        <div><span style="color:#818CF8;">git clone</span> <span style="color:#F59E0B;">https://github.com/dwivedi-mohit/agentathon-by-mohit-dwivedi.git</span></div>
        <div><span style="color:#818CF8;">cd</span> <span style="color:#F59E0B;">mirror/backend</span></div>
        <div><span style="color:#818CF8;">python -m venv</span> <span style="color:#F59E0B;">venv</span></div>
        <div><span style="color:#64748B;animation:blink 1s step-end infinite;">#</span> <span style="color:#64748B;">Windows:</span> <span style="color:#F59E0B;">venv\Scripts\activate</span></div>
        <div><span style="color:#818CF8;">pip install</span> <span style="color:#F59E0B;">-r requirements.txt</span></div>
        <div><span style="color:#818CF8;">cp</span> <span style="color:#F59E0B;">.env.example .env</span></div>
        <div><span style="color:#64748B;animation:blink 1s step-end infinite;">#</span> <span style="color:#64748B;">Edit .env → add GROQ_API_KEY</span></div>
        <div style="position:relative;">
          <span style="color:#818CF8;">uvicorn</span> <span style="color:#F59E0B;">app.main:app --reload --port 8000</span>
          <span style="display:inline-block;width:8px;height:16px;background:#818CF8;margin-left:4px;animation:blink 1s step-end infinite;vertical-align:text-bottom;"></span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- FRONTEND SETUP -->
<div class="glow-border" style="border-radius:16px;margin-bottom:16px;">
  <div style="padding:24px;border-radius:16px;background:rgba(18,18,30,0.7);backdrop-filter:blur(8px);text-align:left;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
      <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,rgba(129,140,248,0.2),rgba(129,140,248,0.05));display:flex;align-items:center;justify-content:center;font-size:1rem;animation:spinReverse 4s linear infinite;">⚛️</div>
      <span style="font-size:1rem;font-weight:700;color:white;font-family:'Inter',sans-serif;">Frontend Setup (React + Vite)</span>
    </div>
    
    <div style="background:rgba(7,7,13,0.8);padding:18px;border-radius:10px;border:1px solid rgba(255,255,255,0.04);font-family:'JetBrains Mono','SF Mono',monospace;font-size:0.8rem;line-height:1.8;">
      <div><span style="color:#818CF8;">cd</span> <span style="color:#F59E0B;">mirror/frontend</span></div>
      <div><span style="color:#818CF8;">npm install</span></div>
      <div><span style="color:#818CF8;">cp</span> <span style="color:#F59E0B;">.env.example .env</span></div>
      <div><span style="color:#818CF8;">npm run dev</span></div>
      <div><span style="color:#10B981;">✓</span> <span style="color:#94A3B8;">Open</span> <span style="color:#818CF8;">http://localhost:5173</span></div>
    </div>
  </div>
</div>

<!-- DOCKER COMPOSE -->
<div class="glow-border" style="border-radius:16px;margin-bottom:16px;">
  <div style="padding:24px;border-radius:16px;background:rgba(18,18,30,0.7);backdrop-filter:blur(8px);text-align:left;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
      <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,rgba(16,185,129,0.2),rgba(16,185,129,0.05));display:flex;align-items:center;justify-content:center;font-size:1rem;animation:bounce 2s ease-in-out infinite;">🐳</div>
      <span style="font-size:1rem;font-weight:700;color:white;font-family:'Inter',sans-serif;">Production Deploy</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div style="padding:12px;border-radius:10px;background:rgba(7,7,13,0.6);border:1px solid rgba(255,255,255,0.03);text-align:center;">
        <div style="font-size:0.9rem;font-weight:700;color:#3B82F6;margin-bottom:4px;">Frontend → Vercel</div>
        <div style="font-size:0.7rem;color:#64748B;">Zero-config deploy auto HTTPS</div>
      </div>
      <div style="padding:12px;border-radius:10px;background:rgba(7,7,13,0.6);border:1px solid rgba(255,255,255,0.03);text-align:center;">
        <div style="font-size:0.9rem;font-weight:700;color:#10B981;margin-bottom:4px;">Backend → Railway</div>
        <div style="font-size:0.7rem;color:#64748B;">Auto-deploy from GitHub free tier</div>
      </div>
    </div>
  </div>
</div>

</div>
</div>

---

<!-- ===== ARCHITECTURE SECTION ===== -->
<div id="architecture" align="center" style="padding:40px 20px;">

<h2 style="font-size:2.2rem;font-weight:800;font-family:'Inter',sans-serif;background:linear-gradient(135deg,#818CF8,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:pulseGlow 3s ease-in-out infinite;">🏗️ Architecture</h2>

<span class="rainbow-underline" style="display:block;margin:10px auto;max-width:120px;"></span>

<!-- Animated SVG Flow Diagram -->
<div style="max-width:900px;margin:30px auto;background:rgba(18,18,30,0.5);border-radius:20px;padding:30px;border:1px solid rgba(255,255,255,0.04);overflow:hidden;">

<svg viewBox="0 0 800 420" style="width:100%;height:auto;max-width:800px;">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818CF8">
        <animate attributeName="stop-color" values="#818CF8;#7C3AED;#3B82F6;#818CF8" dur="6s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" stop-color="#7C3AED">
        <animate attributeName="stop-color" values="#7C3AED;#3B82F6;#818CF8;#7C3AED" dur="6s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background grid -->
  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(129,140,248,0.03)" stroke-width="0.5"/>
  </pattern>
  <rect width="800" height="420" fill="url(#grid)" rx="12"/>

  <!-- Animated connection lines -->
  <g>
    <!-- Browser to FastAPI -->
    <line x1="130" y1="80" x2="270" y2="80" stroke="rgba(129,140,248,0.2)" stroke-width="1.5">
      <animate attributeName="stroke-dashoffset" from="0" to="200" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="stroke-dasharray" values="4 4;4 4" dur="1s" repeatCount="indefinite"/>
    </line>
    <!-- FastAPI to Orchestrator -->
    <line x1="400" y1="80" x2="400" y2="150" stroke="rgba(129,140,248,0.2)" stroke-width="1.5">
      <animate attributeName="stroke-dashoffset" from="0" to="100" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="stroke-dasharray" values="4 4;4 4" dur="1s" repeatCount="indefinite"/>
    </line>
    <!-- Orchestrator to Personas -->
    <line x1="320" y1="150" x2="200" y2="250" stroke="rgba(16,185,129,0.15)" stroke-width="1">
      <animate attributeName="stroke-dashoffset" from="0" to="100" dur="2.5s" repeatCount="indefinite"/>
    </line>
    <line x1="370" y1="150" x2="300" y2="250" stroke="rgba(239,68,68,0.15)" stroke-width="1">
      <animate attributeName="stroke-dashoffset" from="0" to="100" dur="2.5s" repeatCount="indefinite"/>
    </line>
    <line x1="430" y1="150" x2="500" y2="250" stroke="rgba(59,130,246,0.15)" stroke-width="1">
      <animate attributeName="stroke-dashoffset" from="0" to="100" dur="2.5s" repeatCount="indefinite"/>
    </line>
    <line x1="480" y1="150" x2="600" y2="250" stroke="rgba(245,158,11,0.15)" stroke-width="1">
      <animate attributeName="stroke-dashoffset" from="0" to="100" dur="2.5s" repeatCount="indefinite"/>
    </line>
    <!-- Personas to Synthesizer -->
    <line x1="200" y1="350" x2="300" y2="380" stroke="rgba(129,140,248,0.15)" stroke-width="1"/>
    <line x1="300" y1="350" x2="300" y2="380" stroke="rgba(129,140,248,0.15)" stroke-width="1"/>
    <line x1="500" y1="350" x2="500" y2="380" stroke="rgba(129,140,248,0.15)" stroke-width="1"/>
    <line x1="600" y1="350" x2="500" y2="380" stroke="rgba(129,140,248,0.15)" stroke-width="1"/>
  </g>

  <!-- Browser Node -->
  <rect x="20" y="55" width="220" height="50" rx="10" fill="rgba(18,18,30,0.8)" stroke="rgba(129,140,248,0.2)" stroke-width="1">
    <animate attributeName="stroke-opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite"/>
  </rect>
  <text x="130" y="85" text-anchor="middle" fill="#E2E8F0" font-size="13" font-weight="600" font-family="Inter,sans-serif">🌐 React Frontend (Vite)</text>

  <!-- FastAPI Node -->
  <rect x="280" y="55" width="240" height="50" rx="10" fill="rgba(18,18,30,0.8)" stroke="url(#g1)" stroke-width="1.5" filter="url(#glow)"/>
  <text x="400" y="85" text-anchor="middle" fill="#E2E8F0" font-size="13" font-weight="600" font-family="Inter,sans-serif">🐍 FastAPI Backend (Uvicorn)</text>

  <!-- Orchestrator Node -->
  <rect x="320" y="150" width="160" height="40" rx="8" fill="rgba(18,18,30,0.8)" stroke="rgba(129,140,248,0.2)" stroke-width="1">
    <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite"/>
  </rect>
  <text x="400" y="175" text-anchor="middle" fill="#818CF8" font-size="11" font-weight="700" font-family="Inter,sans-serif">⚙️ DebateOrchestrator</text>

  <!-- Persona Nodes -->
  <g>
    <rect x="120" y="250" width="160" height="40" rx="8" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.2)" stroke-width="1">
      <animate attributeName="y" values="250;248;250" dur="3s" repeatCount="indefinite"/>
    </rect>
    <text x="200" y="275" text-anchor="middle" fill="#10B981" font-size="11" font-weight="700" font-family="Inter,sans-serif">🟢 Uday (Optimist)</text>

    <rect x="290" y="310" width="0" height="0" rx="0" fill="none"/>
    <rect x="220" y="250" width="160" height="40" rx="8" fill="rgba(239,68,68,0.05)" stroke="rgba(239,68,68,0.2)" stroke-width="1">
      <animate attributeName="y" values="250;252;250" dur="3.5s" repeatCount="indefinite"/>
    </rect>
    <text x="300" y="275" text-anchor="middle" fill="#EF4444" font-size="11" font-weight="700" font-family="Inter,sans-serif">🔴 Kiran (Skeptic)</text>

    <rect x="420" y="250" width="160" height="40" rx="8" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.2)" stroke-width="1">
      <animate attributeName="y" values="250;249;250" dur="4s" repeatCount="indefinite"/>
    </rect>
    <text x="500" y="275" text-anchor="middle" fill="#3B82F6" font-size="11" font-weight="700" font-family="Inter,sans-serif">🔵 Mohan (Operator)</text>

    <rect x="520" y="250" width="160" height="40" rx="8" fill="rgba(245,158,11,0.05)" stroke="rgba(245,158,11,0.2)" stroke-width="1">
      <animate attributeName="y" values="250;251;250" dur="2.8s" repeatCount="indefinite"/>
    </rect>
    <text x="600" y="275" text-anchor="middle" fill="#F59E0B" font-size="11" font-weight="700" font-family="Inter,sans-serif">🟡 Priya (Customer)</text>
  </g>

  <!-- Synthesizer Node -->
  <rect x="360" y="380" width="160" height="40" rx="8" fill="rgba(18,18,30,0.8)" stroke="rgba(129,140,248,0.2)" stroke-width="1">
    <animate attributeName="stroke-opacity" values="0.2;0.7;0.2" dur="5s" repeatCount="indefinite"/>
    <animate attributeName="y" values="380;378;380" dur="3s" repeatCount="indefinite"/>
  </rect>
  <text x="440" y="405" text-anchor="middle" fill="#818CF8" font-size="11" font-weight="700" font-family="Inter,sans-serif">🧠 Synthesizer Agent</text>

  <!-- LLM Gateway Node -->
  <rect x="50" y="370" width="180" height="40" rx="8" fill="rgba(18,18,30,0.8)" stroke="rgba(245,158,11,0.2)" stroke-width="1">
    <animate attributeName="stroke-opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite"/>
  </rect>
  <text x="140" y="395" text-anchor="middle" fill="#F59E0B" font-size="11" font-weight="700" font-family="Inter,sans-serif">📡 LLM Gateway (Groq)</text>

  <!-- SSE Label -->
  <rect x="280" y="5" width="240" height="25" rx="6" fill="rgba(129,140,248,0.05)" stroke="rgba(129,140,248,0.1)" stroke-width="0.5">
    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
  </rect>
  <text x="400" y="22" text-anchor="middle" fill="#64748B" font-size="9" font-weight="600" font-family="Inter,sans-serif">⬇️ SSE Streaming (text/event-stream)</text>
</svg>

</div>
</div>

---

<!-- ===== TECH STACK SECTION ===== -->
<div id="tech-stack" align="center" style="padding:40px 20px;">

<h2 style="font-size:2.2rem;font-weight:800;font-family:'Inter',sans-serif;background:linear-gradient(135deg,#818CF8,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:pulseGlow 3s ease-in-out infinite;">🛠️ Tech Stack</h2>

<span class="rainbow-underline" style="display:block;margin:10px auto;max-width:100px;"></span>

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;max-width:900px;margin:30px auto;">

<!-- Tech Badges with hover animations -->
<div class="card-3d" style="padding:16px;border-radius:12px;background:rgba(18,18,30,0.5);border:1px solid rgba(255,255,255,0.04);text-align:center;animation:fadeInUp 0.6s ease forwards;opacity:0;" onmouseover="this.style.borderColor='rgba(59,130,246,0.3)'">
  <div style="font-size:2rem;margin-bottom:6px;animation:bounce 3s ease-in-out infinite;">⚛️</div>
  <div style="font-size:0.85rem;font-weight:700;color:white;">React 19</div>
  <div style="font-size:0.65rem;color:#64748B;">Frontend</div>
</div>

<div class="card-3d" style="padding:16px;border-radius:12px;background:rgba(18,18,30,0.5);border:1px solid rgba(255,255,255,0.04);text-align:center;animation:fadeInUp 0.6s ease 0.05s forwards;opacity:0;" onmouseover="this.style.borderColor='rgba(59,130,246,0.3)'">
  <div style="font-size:2rem;margin-bottom:6px;animation:bounce 3s ease-in-out 0.2s infinite;">🐍</div>
  <div style="font-size:0.85rem;font-weight:700;color:white;">FastAPI</div>
  <div style="font-size:0.65rem;color:#64748B;">Backend</div>
</div>

<div class="card-3d" style="padding:16px;border-radius:12px;background:rgba(18,18,30,0.5);border:1px solid rgba(255,255,255,0.04);text-align:center;animation:fadeInUp 0.6s ease 0.1s forwards;opacity:0;" onmouseover="this.style.borderColor='rgba(129,140,248,0.3)'">
  <div style="font-size:2rem;margin-bottom:6px;animation:bounce 3s ease-in-out 0.4s infinite;">⚡</div>
  <div style="font-size:0.85rem;font-weight:700;color:white;">Vite 8</div>
  <div style="font-size:0.65rem;color:#64748B;">Build Tool</div>
</div>

<div class="card-3d" style="padding:16px;border-radius:12px;background:rgba(18,18,30,0.5);border:1px solid rgba(255,255,255,0.04);text-align:center;animation:fadeInUp 0.6s ease 0.15s forwards;opacity:0;" onmouseover="this.style.borderColor='rgba(16,185,129,0.3)'">
  <div style="font-size:2rem;margin-bottom:6px;animation:bounce 3s ease-in-out 0.6s infinite;">🎨</div>
  <div style="font-size:0.85rem;font-weight:700;color:white;">Tailwind 4</div>
  <div style="font-size:0.65rem;color:#64748B;">Styling</div>
</div>

<div class="card-3d" style="padding:16px;border-radius:12px;background:rgba(18,18,30,0.5);border:1px solid rgba(255,255,255,0.04);text-align:center;animation:fadeInUp 0.6s ease 0.2s forwards;opacity:0;" onmouseover="this.style.borderColor='rgba(239,68,68,0.3)'">
  <div style="font-size:2rem;margin-bottom:6px;animation:bounce 3s ease-in-out 0.8s infinite;">🎬</div>
  <div style="font-size:0.85rem;font-weight:700;color:white;">Framer Motion</div>
  <div style="font-size:0.65rem;color:#64748B;">Animations</div>
</div>

<div class="card-3d" style="padding:16px;border-radius:12px;background:rgba(18,18,30,0.5);border:1px solid rgba(255,255,255,0.04);text-align:center;animation:fadeInUp 0.6s ease 0.25s forwards;opacity:0;" onmouseover="this.style.borderColor='rgba(245,158,11,0.3)'">
  <div style="font-size:2rem;margin-bottom:6px;animation:bounce 3s ease-in-out 1s infinite;">📡</div>
  <div style="font-size:0.85rem;font-weight:700;color:white;">SSE Streaming</div>
  <div style="font-size:0.65rem;color:#64748B;">Real-time</div>
</div>

<div class="card-3d" style="padding:16px;border-radius:12px;background:rgba(18,18,30,0.5);border:1px solid rgba(255,255,255,0.04);text-align:center;animation:fadeInUp 0.6s ease 0.3s forwards;opacity:0;" onmouseover="this.style.borderColor='rgba(129,140,248,0.3)'">
  <div style="font-size:2rem;margin-bottom:6px;animation:bounce 3s ease-in-out 1.2s infinite;">🧠</div>
  <div style="font-size:0.85rem;font-weight:700;color:white;">Claude / Groq</div>
  <div style="font-size:0.65rem;color:#64748B;">LLM Provider</div>
</div>

<div class="card-3d" style="padding:16px;border-radius:12px;background:rgba(18,18,30,0.5);border:1px solid rgba(255,255,255,0.04);text-align:center;animation:fadeInUp 0.6s ease 0.35s forwards;opacity:0;" onmouseover="this.style.borderColor='rgba(16,185,129,0.3)'">
  <div style="font-size:2rem;margin-bottom:6px;animation:bounce 3s ease-in-out 1.4s infinite;">🐙</div>
  <div style="font-size:0.85rem;font-weight:700;color:white;">Uvicorn</div>
  <div style="font-size:0.65rem;color:#64748B;">ASGI Server</div>
</div>

</div>
</div>

---

<!-- ===== PROJECT STRUCTURE ===== -->
<div align="center" style="padding:40px 20px;">

<h2 style="font-size:2.2rem;font-weight:800;font-family:'Inter',sans-serif;background:linear-gradient(135deg,#818CF8,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:pulseGlow 3s ease-in-out infinite;">📁 Project Structure</h2>

<span class="rainbow-underline" style="display:block;margin:10px auto;max-width:120px;"></span>

<div class="glow-border" style="max-width:700px;margin:30px auto;border-radius:16px;">
  <div style="padding:24px;border-radius:16px;background:rgba(7,7,13,0.8);text-align:left;font-family:'JetBrains Mono','SF Mono',monospace;font-size:0.75rem;line-height:1.9;overflow-x:auto;">
    <div style="display:flex;gap:8px;margin-bottom:12px;">
      <span style="width:10px;height:10px;border-radius:50%;background:#EF4444;animation:heartbeat 2s ease-in-out infinite;"></span>
      <span style="width:10px;height:10px;border-radius:50%;background:#F59E0B;animation:heartbeat 2s ease-in-out 0.3s infinite;"></span>
      <span style="width:10px;height:10px;border-radius:50%;background:#10B981;animation:heartbeat 2s ease-in-out 0.6s infinite;"></span>
    </div>
    <div><span style="color:#818CF8;">mirror/</span><span style="color:#64748B;animation:blink 1s step-end infinite;"> ▸ root</span></div>
    <div style="padding-left:20px;"><span style="color:#10B981;">├──</span> <span style="color:#F59E0B;">frontend/</span> <span style="color:#64748B;"># React + Vite + Tailwind</span></div>
    <div style="padding-left:40px;"><span style="color:#10B981;">├──</span> <span style="color:#F59E0B;">src/</span></div>
    <div style="padding-left:60px;"><span style="color:#10B981;">├──</span> <span style="color:#94A3B8;">components/</span> <span style="color:#64748B;"># UI + debate components</span></div>
    <div style="padding-left:80px;"><span style="color:#10B981;">├──</span> <span style="color:#94A3B8;">debate/</span> <span style="color:#64748B;"># PersonaCard, PersonaGrid, SynthesizerCard...</span></div>
    <div style="padding-left:80px;"><span style="color:#10B981;">├──</span> <span style="color:#94A3B8;">layout/</span> <span style="color:#64748B;"># AppShell, Header, Footer, Sidebars</span></div>
    <div style="padding-left:80px;"><span style="color:#10B981;">├──</span> <span style="color:#94A3B8;">ui/</span> <span style="color:#64748B;"># Button, Icons</span></div>
    <div style="padding-left:60px;"><span style="color:#10B981;">├──</span> <span style="color:#94A3B8;">hooks/</span> <span style="color:#64748B;"># useDebate, useSSE</span></div>
    <div style="padding-left:60px;"><span style="color:#10B981;">├──</span> <span style="color:#94A3B8;">lib/</span> <span style="color:#64748B;"># api, constants, particles, utils</span></div>
    <div style="padding-left:60px;"><span style="color:#10B981;">├──</span> <span style="color:#94A3B8;">types/</span> <span style="color:#64748B;"># TypeScript interfaces</span></div>
    <div style="padding-left:20px;"><span style="color:#10B981;">├──</span> <span style="color:#F59E0B;">backend/</span> <span style="color:#64748B;"># Python FastAPI</span></div>
    <div style="padding-left:40px;"><span style="color:#10B981;">├──</span> <span style="color:#F59E0B;">app/</span></div>
    <div style="padding-left:60px;"><span style="color:#10B981;">├──</span> <span style="color:#94A3B8;">agents/</span> <span style="color:#64748B;"># orchestrator, persona_agent, synthesizer</span></div>
    <div style="padding-left:60px;"><span style="color:#10B981;">├──</span> <span style="color:#94A3B8;">api/</span> <span style="color:#64748B;"># debate, health routes</span></div>
    <div style="padding-left:60px;"><span style="color:#10B981;">├──</span> <span style="color:#94A3B8;">models/</span> <span style="color:#64748B;"># persona, debate, schemas (Pydantic)</span></div>
    <div style="padding-left:60px;"><span style="color:#10B981;">├──</span> <span style="color:#94A3B8;">services/</span> <span style="color:#64748B;"># llm_service</span></div>
    <div style="padding-left:60px;"><span style="color:#10B981;">├──</span> <span style="color:#94A3B8;">store/</span> <span style="color:#64748B;"># session_store (in-memory)</span></div>
    <div style="padding-left:60px;"><span style="color:#10B981;">├──</span> <span style="color:#94A3B8;">utils/</span> <span style="color:#64748B;"># prompts, streaming</span></div>
    <div style="padding-left:40px;"><span style="color:#10B981;">├──</span> <span style="color:#94A3B8;">config.py</span> <span style="color:#64748B;"># Environment config</span></div>
    <div style="padding-left:40px;"><span style="color:#10B981;">├──</span> <span style="color:#94A3B8;">main.py</span> <span style="color:#64748B;"># FastAPI app entry</span></div>
    <div style="padding-left:20px;"><span style="color:#10B981;">├──</span> <span style="color:#F59E0B;">PRD-MIRROR.md</span> <span style="color:#64748B;"># Product requirements</span></div>
    <div style="padding-left:20px;"><span style="color:#10B981;">├──</span> <span style="color:#F59E0B;">FRONTEND-SPEC.md</span> <span style="color:#64748B;"># UI/UX spec</span></div>
    <div style="padding-left:20px;"><span style="color:#10B981;">├──</span> <span style="color:#F59E0B;">TECH-ARCHITECTURE.md</span> <span style="color:#64748B;"># Architecture docs</span></div>
    <div style="padding-left:20px;"><span style="color:#10B981;">├──</span> <span style="color:#F59E0B;">SECURITY.md</span> <span style="color:#64748B;"># Security notes</span></div>
  </div>
</div>
</div>

---

<!-- ===== INTERACTIVE COMPONENTS SHOWCASE ===== -->
<div align="center" style="padding:40px 20px;">

<h2 style="font-size:2rem;font-weight:800;font-family:'Inter',sans-serif;background:linear-gradient(135deg,#818CF8,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">🎮 Interactive Components</h2>

<span class="rainbow-underline" style="display:block;margin:10px auto;max-width:100px;"></span>

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;max-width:900px;margin:30px auto;">

<div class="card-3d" style="padding:18px;border-radius:14px;background:rgba(18,18,30,0.4);border:1px solid rgba(255,255,255,0.04);animation:fadeInUp 0.6s ease forwards;opacity:0;">
  <div style="font-size:1.8rem;margin-bottom:8px;animation:bounce 3s ease-in-out infinite;">🃏</div>
  <div style="font-size:0.85rem;font-weight:700;color:white;">3D Tilt Cards</div>
  <div style="font-size:0.7rem;color:#64748B;">Persona cards with perspective tilt on hover</div>
</div>

<div class="card-3d" style="padding:18px;border-radius:14px;background:rgba(18,18,30,0.4);border:1px solid rgba(255,255,255,0.04);animation:fadeInUp 0.6s ease 0.05s forwards;opacity:0;">
  <div style="font-size:1.8rem;margin-bottom:8px;animation:bounce 3s ease-in-out 0.3s infinite;">🕸️</div>
  <div style="font-size:0.85rem;font-weight:700;color:white;">Risk Radar</div>
  <div style="font-size:0.7rem;color:#64748B;">SVG spider chart for risk analysis</div>
</div>

<div class="card-3d" style="padding:18px;border-radius:14px;background:rgba(18,18,30,0.4);border:1px solid rgba(255,255,255,0.04);animation:fadeInUp 0.6s ease 0.1s forwards;opacity:0;">
  <div style="font-size:1.8rem;margin-bottom:8px;animation:bounce 3s ease-in-out 0.6s infinite;">📅</div>
  <div style="font-size:0.85rem;font-weight:700;color:white;">90-Day Gantt</div>
  <div style="font-size:0.7rem;color:#64748B;">Timeline planner per option</div>
</div>

<div class="card-3d" style="padding:18px;border-radius:14px;background:rgba(18,18,30,0.4);border:1px solid rgba(255,255,255,0.04);animation:fadeInUp 0.6s ease 0.15s forwards;opacity:0;">
  <div style="font-size:1.8rem;margin-bottom:8px;animation:bounce 3s ease-in-out 0.9s infinite;">🧠</div>
  <div style="font-size:0.85rem;font-weight:700;color:white;">Argument Mindmap</div>
  <div style="font-size:0.7rem;color:#64748B;">Animated SVG debate visualization</div>
</div>

<div class="card-3d" style="padding:18px;border-radius:14px;background:rgba(18,18,30,0.4);border:1px solid rgba(255,255,255,0.04);animation:fadeInUp 0.6s ease 0.2s forwards;opacity:0;">
  <div style="font-size:1.8rem;margin-bottom:8px;animation:bounce 3s ease-in-out 1.2s infinite;">🚩</div>
  <div style="font-size:0.85rem;font-weight:700;color:white;">Call Bullshit</div>
  <div style="font-size:0.7rem;color:#64748B;">Force persona to defend argument</div>
</div>

<div class="card-3d" style="padding:18px;border-radius:14px;background:rgba(18,18,30,0.4);border:1px solid rgba(255,255,255,0.04);animation:fadeInUp 0.6s ease 0.25s forwards;opacity:0;">
  <div style="font-size:1.8rem;margin-bottom:8px;animation:bounce 3s ease-in-out 1.5s infinite;">🔊</div>
  <div style="font-size:0.85rem;font-weight:700;color:white;">TTS Read Aloud</div>
  <div style="font-size:0.7rem;color:#64748B;">Text-to-speech with persona voices</div>
</div>

</div>
</div>

---

<!-- ===== VERIFICATION / UAT SECTION ===== -->
<div align="center" style="padding:40px 20px;">

<h2 style="font-size:2rem;font-weight:800;font-family:'Inter',sans-serif;background:linear-gradient(135deg,#818CF8,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">✅ Verification & UAT</h2>

<span class="rainbow-underline" style="display:block;margin:10px auto;max-width:80px;"></span>

<div style="max-width:700px;margin:30px auto;">

<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:left;">
  <div style="padding:14px;border-radius:10px;background:rgba(16,185,129,0.03);border:1px solid rgba(16,185,129,0.1);">
    <span style="color:#10B981;font-size:1.1rem;">✓</span>
    <span style="color:white;font-size:0.85rem;font-weight:600;margin-left:8px;">Text-only question input</span>
  </div>
  <div style="padding:14px;border-radius:10px;background:rgba(16,185,129,0.03);border:1px solid rgba(16,185,129,0.1);">
    <span style="color:#10B981;font-size:1.1rem;">✓</span>
    <span style="color:white;font-size:0.85rem;font-weight:600;margin-left:8px;">4 fixed personas with avatar cards</span>
  </div>
  <div style="padding:14px;border-radius:10px;background:rgba(16,185,129,0.03);border:1px solid rgba(16,185,129,0.1);">
    <span style="color:#10B981;font-size:1.1rem;">✓</span>
    <span style="color:white;font-size:0.85rem;font-weight:600;margin-left:8px;">3 debate rounds, turn-based</span>
  </div>
  <div style="padding:14px;border-radius:10px;background:rgba(16,185,129,0.03);border:1px solid rgba(16,185,129,0.1);">
    <span style="color:#10B981;font-size:1.1rem;">✓</span>
    <span style="color:white;font-size:0.85rem;font-weight:600;margin-left:8px;">SSE streaming output</span>
  </div>
  <div style="padding:14px;border-radius:10px;background:rgba(16,185,129,0.03);border:1px solid rgba(16,185,129,0.1);">
    <span style="color:#10B981;font-size:1.1rem;">✓</span>
    <span style="color:white;font-size:0.85rem;font-weight:600;margin-left:8px;">Synthesizer brief with 3 options</span>
  </div>
  <div style="padding:14px;border-radius:10px;background:rgba(16,185,129,0.03);border:1px solid rgba(16,185,129,0.1);">
    <span style="color:#10B981;font-size:1.1rem;">✓</span>
    <span style="color:white;font-size:0.85rem;font-weight:600;margin-left:8px;">No login required</span>
  </div>
  <div style="padding:14px;border-radius:10px;background:rgba(16,185,129,0.03);border:1px solid rgba(16,185,129,0.1);">
    <span style="color:#10B981;font-size:1.1rem;">✓</span>
    <span style="color:white;font-size:0.85rem;font-weight:600;margin-left:8px;">Responsive web (mobile-first)</span>
  </div>
  <div style="padding:14px;border-radius:10px;background:rgba(16,185,129,0.03);border:1px solid rgba(16,185,129,0.1);">
    <span style="color:#10B981;font-size:1.1rem;">✓</span>
    <span style="color:white;font-size:0.85rem;font-weight:600;margin-left:8px;">AgentField.ai orchestration</span>
  </div>
</div>

</div>
</div>

---

<!-- ===== ENVIRONMENT VARIABLES ===== -->
<div align="center" style="padding:40px 20px;">

<h2 style="font-size:2rem;font-weight:800;font-family:'Inter',sans-serif;background:linear-gradient(135deg,#818CF8,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">🔐 Environment Variables</h2>

<span class="rainbow-underline" style="display:block;margin:10px auto;max-width:100px;"></span>

<div class="glow-border" style="max-width:700px;margin:30px auto;border-radius:16px;">
  <div style="padding:24px;border-radius:16px;background:rgba(7,7,13,0.8);text-align:left;font-family:'JetBrains Mono','SF Mono',monospace;font-size:0.75rem;line-height:2;overflow-x:auto;">
    <div><span style="color:#64748B;"># Required</span></div>
    <div><span style="color:#818CF8;">GROQ_API_KEY</span>=<span style="color:#F59E0B;">gsk_xxxxxxxxxxxx</span></div>
    <div><span style="color:#64748B;"># Optional</span></div>
    <div><span style="color:#818CF8;">PERSONA_MODEL</span>=<span style="color:#F59E0B;">llama-3.3-70b-versatile</span></div>
    <div><span style="color:#818CF8;">SYNTHESIZER_MODEL</span>=<span style="color:#F59E0B;">llama-3.3-70b-versatile</span></div>
    <div><span style="color:#818CF8;">LLM_TEMPERATURE</span>=<span style="color:#F59E0B;">0.8</span></div>
    <div><span style="color:#818CF8;">CORS_ORIGINS</span>=<span style="color:#F59E0B;">http://localhost:5173</span></div>
    <div><span style="color:#818CF8;">VITE_API_URL</span>=<span style="color:#F59E0B;">http://localhost:8000</span></div>
  </div>
</div>
</div>

---

<!-- ===== CONTRIBUTING ===== -->
<div align="center" style="padding:40px 20px;">

<h2 style="font-size:2rem;font-weight:800;font-family:'Inter',sans-serif;background:linear-gradient(135deg,#818CF8,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">🤝 Contributing</h2>

<span class="rainbow-underline" style="display:block;margin:10px auto;max-width:80px;"></span>

<div style="max-width:600px;margin:20px auto;padding:20px;border-radius:16px;background:rgba(18,18,30,0.5);border:1px solid rgba(255,255,255,0.04);">

1. 🍴 Fork the repository
2. 🌿 Create a feature branch: `git checkout -b feature/amazing`
3. 💻 Commit changes: `git commit -m 'Add amazing feature'`
4. 🚀 Push: `git push origin feature/amazing`
5. 🔁 Open a Pull Request

</div>
</div>

---

<!-- ===== FOOTER ===== -->
<div align="center" style="padding:30px 20px;position:relative;">

<div style="max-width:700px;margin:0 auto;padding:30px;border-radius:20px;background:linear-gradient(135deg,rgba(124,58,237,0.05),rgba(59,130,246,0.03));border:1px solid rgba(124,58,237,0.1);overflow:hidden;position:relative;">
  
  <!-- Animated border glow -->
  <div style="position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:conic-gradient(from 0deg,transparent,rgba(124,58,237,0.03),transparent,rgba(59,130,246,0.03),transparent);animation:spin 10s linear infinite;pointer-events:none;"></div>
  
  <div style="position:relative;z-index:1;">
    <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:15px;">
      <div style="width:50px;height:50px;border-radius:14px;background:linear-gradient(135deg,#818CF8,#7C3AED);display:flex;align-items:center;justify-content:center;animation:heartbeat 2s ease-in-out infinite;box-shadow:0 5px 20px rgba(124,58,237,0.3);">
        <span style="font-size:1.5rem;font-weight:900;color:white;">M</span>
      </div>
      <div>
        <p style="font-size:1.5rem;font-weight:800;color:white;margin:0;font-family:'Inter',sans-serif;">Mirror</p>
        <p style="font-size:0.7rem;color:#64748B;margin:0;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Strategic Decision War Room</p>
      </div>
    </div>

    <p style="font-size:0.85rem;color:#94A3B8;margin:15px 0;">
      Built with ❤️ during <strong style="color:#818CF8;">Agent{A}thon 2026</strong>
    </p>

    <!-- Creator Credit with Animations -->
    <div style="display:inline-flex;align-items:center;gap:10px;padding:10px 24px;border-radius:50px;background:linear-gradient(135deg,rgba(124,58,237,0.15),rgba(59,130,246,0.1));border:1px solid rgba(124,58,237,0.2);animation:pulseGlow 3s ease-in-out infinite;cursor:pointer;transition:all 0.3s ease;" onmouseover="this.style.transform='scale(1.05)';this.querySelector('.sparkle-container').style.opacity='1'" onmouseout="this.style.transform='scale(1)';this.querySelector('.sparkle-container').style.opacity='0'">
      <span style="font-size:1.2rem;">👨‍💻</span>
      <span style="font-weight:700;color:white;font-family:'Inter',sans-serif;">Created by</span>
      <span style="font-size:1.1rem;font-weight:900;background:linear-gradient(135deg,#818CF8,#7C3AED,#3B82F6);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 3s linear infinite;font-family:'Inter',sans-serif;">Mohit Dwivedi</span>
      <span style="display:inline-block;animation:sparkle 1.5s ease-in-out infinite;">✨</span>
      <div class="sparkle-container" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:0;transition:opacity 0.3s ease;">
        <span style="position:absolute;top:-10px;left:20%;font-size:0.8rem;animation:sparkle 1s ease-in-out infinite;">⭐</span>
        <span style="position:absolute;bottom:-10px;right:20%;font-size:0.6rem;animation:sparkle 1.5s ease-in-out 0.3s infinite;">✨</span>
        <span style="position:absolute;top:50%;left:-5px;font-size:0.7rem;animation:sparkle 1.2s ease-in-out 0.6s infinite;">💫</span>
      </div>
    </div>

    <!-- Social Links -->
    <div style="display:flex;gap:12px;justify-content:center;margin:20px 0 10px;">
      <a href="https://github.com/dwivedi-mohit/agentathon-by-mohit-dwivedi" target="_blank" style="display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);color:#94A3B8;text-decoration:none;font-size:0.8rem;font-weight:600;transition:all 0.3s ease;" onmouseover="this.style.background='rgba(255,255,255,0.06)';this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(255,255,255,0.03)';this.style.transform='translateY(0)'">
        <span style="display:inline-block;transition:transform 0.3s ease;" onmouseover="this.style.transform='rotateY(360deg)'" onmouseout="this.style.transform='rotateY(0deg)'">🐙</span> GitHub
      </a>
    </div>

    <p style="font-size:0.65rem;color:#4A4A6A;margin-top:15px;border-top:1px solid rgba(255,255,255,0.04);padding-top:15px;">
      AI-generated perspectives. Verify independently before acting.<br>
      © 2026 Mohit Dwivedi · All Rights Reserved
    </p>
  </div>
</div>
</div>

<!-- ===== SCROLL PROGRESS SCRIPT ===== -->
<script>
window.addEventListener('scroll', function() {
  var docHeight = document.documentElement.scrollHeight - window.innerHeight;
  var scrollPos = window.scrollY;
  var progress = (scrollPos / docHeight) * 100;
  document.getElementById('scrollProgress').style.width = progress + '%';
});
</script>
