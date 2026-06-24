import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Header } from './Header';
import { ParticleSystem } from '../../lib/particles';

interface AppShellProps {
  children: ReactNode;
  onNewDebate?: () => void;
  showNewDebate?: boolean;
}

function Background() {
  return (
    <div className="bg-layer" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-orb" />
      <div className="bg-orb" />
      <div className="bg-orb" />
      <div className="bg-orb" />
      <div className="bg-orb" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07070D]/40 pointer-events-none z-[1]" />
      <div className="bg-noise" />
      <div className="bg-scanline" />
    </div>
  );
}

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ps = new ParticleSystem(ref.current);
    ps.start();
    return () => ps.stop();
  }, []);
  return <canvas ref={ref} id="particles-canvas" />;
}

export function AppShell({ children, onNewDebate, showNewDebate }: AppShellProps) {
  return (
    <div className="h-screen w-screen flex flex-col relative overflow-hidden bg-[#07070D]">
      <Background />
      <Particles />
      <div className="relative z-10 flex flex-col h-full w-full overflow-hidden">
        <Header onNewDebate={onNewDebate} showNewDebate={showNewDebate} />
        <main className="flex-1 flex flex-row overflow-hidden min-h-0 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
