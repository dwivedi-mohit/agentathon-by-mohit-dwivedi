export class ParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Array<{
    x: number; y: number; vx: number; vy: number;
    size: number; alpha: number; life: number; maxLife: number;
    hue: number;
  }> = [];
  private mouse = { x: -1000, y: -1000 };
  private running = false;
  private rafId = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    this.running = true;
    this.spawn();
    this.tick();
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  private spawn() {
    if (!this.running) return;
    for (let i = 0; i < 2; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 80;
      this.particles.push({
        x: this.mouse.x + Math.cos(angle) * dist,
        y: this.mouse.y + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.15,
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        life: 0,
        maxLife: 100 + Math.random() * 80,
        hue: 240 + Math.random() * 60,
      });
    }
    setTimeout(() => this.spawn(), 150);
  }

  private tick() {
    if (!this.running) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life++;
      if (p.life > p.maxLife) {
        this.particles.splice(i, 1);
        continue;
      }
      const fade = Math.min(p.life / 20, 1) * (1 - p.life / p.maxLife);
      const alpha = p.alpha * fade;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${alpha})`;
      this.ctx.fill();
      // Glow
      if (p.size > 1.5) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${alpha * 0.08})`;
        this.ctx.fill();
      }
    }

    this.rafId = requestAnimationFrame(() => this.tick());
  }
}
