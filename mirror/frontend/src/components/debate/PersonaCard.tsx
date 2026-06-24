import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { PERSONA_ICONS } from '../../lib/constants';
import type { PersonaInfo } from '../../types';
import { Icons } from '../ui/Icons';

interface PersonaCardProps {
  persona: PersonaInfo;
  isSpeaking: boolean;
  text?: string;
  done?: boolean;
  round?: number;
}

function TypewriterText({ text, isSpeaking }: { text: string; isSpeaking: boolean }) {
  return (
    <div className="text-xs text-[#C8CFD8] leading-relaxed min-h-[3.5em]">
      {text ? (
        <span>
          {text}
          {isSpeaking && (
            <motion.span
              className="inline-block w-[2px] h-[1em] bg-[#818CF8] ml-0.5 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
            />
          )}
        </span>
      ) : isSpeaking ? (
        <motion.span className="text-[#64748B] italic" animate={{ opacity: [1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2 }}>
          Formulating response<span className="inline-flex gap-0.5 ml-0.5">
            {[0, 1, 2].map(i => (
              <motion.span key={i} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}>.</motion.span>
            ))}
          </span>
        </motion.span>
      ) : (
        <span className="text-[#3A3A5A] italic">Waiting for turn...</span>
      )}
    </div>
  );
}

export function PersonaCard({ persona, isSpeaking, text, done = false, round }: PersonaCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [isSpeakingTts, setIsSpeakingTts] = useState(false);
  const [lang, setLang] = useState('en');
  const [isChallenged, setIsChallenged] = useState(false);
  const [challengeResponse, setChallengeResponse] = useState('');

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current || !hovered) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
  };

  const handleTts = () => {
    if (!text) return;
    if (isSpeakingTts) {
      window.speechSynthesis.cancel();
      setIsSpeakingTts(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      // Give Uday and Kiran slightly different pitches/rates to distinguish voices
      if (persona.id === 'uday') {
        utterance.pitch = 1.2;
        utterance.rate = 1.1;
      } else if (persona.id === 'kiran') {
        utterance.pitch = 0.8;
        utterance.rate = 0.95;
      } else if (persona.id === 'mohan') {
        utterance.pitch = 1.0;
        utterance.rate = 1.05;
      } else {
        utterance.pitch = 1.1;
        utterance.rate = 1.0;
      }
      utterance.onend = () => setIsSpeakingTts(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeakingTts(true);
    }
  };

  // Mock translation triggers
  const getTranslatedText = () => {
    if (!text) return '';
    if (lang === 'es') return `[Traducido al Español]: ${text.replace(/the/gi, 'el').replace(/we/gi, 'nosotros').replace(/decision/gi, 'decisión')}`;
    if (lang === 'fr') return `[Traduit en Français]: ${text.replace(/the/gi, 'le').replace(/we/gi, 'nous')}`;
    if (lang === 'ja') return `[日本語翻訳]: ${text.substring(0, 40)}... (日本語で要約)`;
    if (lang === 'hi') return `[हिन्दी अनुवाद]: ${text.substring(0, 40)}... (हिन्दी में अनुवादित)`;
    return text;
  };

  // Live challenge ("Call Bullshit") triggers
  const handleChallenge = () => {
    setIsChallenged(true);
    const responses: Record<string, string> = {
      uday: "I stand by my optimism! However, I admit there are sunk cost concerns if growth flatlines in quarter one.",
      kiran: "Skepticism is safety. If my risk limits feel restrictive, it's because bankruptcy is permanent.",
      mohan: "Action plans can adapt, but analysis paralysis has killed more startups than bad launches.",
      priya: "Customers are fickle, but if we don't build what they want first, our code is worthless.",
    };
    setChallengeResponse(responses[persona.id] || "I concede that further validation is beneficial.");
  };

  // Get persona specific sentiment intensity
  const getSentimentText = () => {
    if (persona.id === 'uday') return 'High Enthusiasm (+92%)';
    if (persona.id === 'kiran') return 'High Caution (-84%)';
    if (persona.id === 'mohan') return 'Execution Pragmatism (+65%)';
    return 'Customer Centric (+78%)';
  };

  // Get detected bias
  const getDetectedBias = () => {
    if (persona.id === 'uday') return 'Optimism Fallacy';
    if (persona.id === 'kiran') return 'Loss Aversion';
    if (persona.id === 'mohan') return 'Action Bias';
    return 'Subjective Anecdote';
  };

  const activeText = getTranslatedText();

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered && isSpeaking ? 'none' : 'transform 0.4s ease',
      }}
      animate={{
        scale: isSpeaking ? 1.02 : done ? 1 : 0.95,
        opacity: isSpeaking ? 1 : done ? 0.95 : 0.5,
        zIndex: isSpeaking ? 20 : 1,
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
    >
      {/* Glow border */}
      {isSpeaking && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{
            background: `radial-gradient(circle at 50% 50%, ${persona.color}15, transparent 75%)`,
            boxShadow: `inset 0 0 30px ${persona.color}08`,
          }}
        />
      )}

      {/* Card body */}
      <div
        className="relative bg-[#12121E] rounded-2xl p-4.5 h-full border border-white/[0.05] flex flex-col justify-between"
        style={isSpeaking ? { borderColor: `${persona.color}44` } : {}}
      >
        <div>
          {/* Top Header Bar */}
          <div className="flex items-center gap-2.5 mb-3.5 relative z-10">
            <motion.div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold relative overflow-hidden shrink-0"
              style={{ backgroundColor: `${persona.color}15`, color: persona.color }}
              animate={isSpeaking ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: isSpeaking ? Infinity : 0, duration: 2 }}
            >
              <span className="relative z-10">{PERSONA_ICONS[persona.id]}</span>
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-white leading-none">{persona.name}</span>
                {isSpeaking && (
                  <motion.div className="flex gap-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {[0, 1, 2].map(i => (
                      <motion.span
                        key={i}
                        className="w-1 h-1 rounded-full"
                        style={{ backgroundColor: persona.color }}
                        animate={{ scale: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }}
                      />
                    ))}
                  </motion.div>
                )}
                {done && <span className="text-[10px] text-[#10B981]">✓</span>}
              </div>
              <p className="text-[9px] text-[#64748B] mt-0.5 truncate uppercase tracking-wider">{persona.role}</p>
            </div>

            {round && (
              <span className="text-[9px] font-bold text-[#64748B] bg-white/[0.02] px-2 py-0.5 rounded border border-white/[0.04]">
                R{round}
              </span>
            )}
          </div>

          {/* Interactive Utilities (Bias badge + Mood indicators) */}
          {text && (
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <span className="text-[8px] bg-red-500/10 text-red-400 border border-red-500/10 px-1.5 py-0.5 rounded font-medium">
                {getDetectedBias()}
              </span>
              <span className="text-[8px] bg-white/[0.03] text-[#94A3B8] border border-white/[0.05] px-1.5 py-0.5 rounded font-medium">
                {getSentimentText()}
              </span>
            </div>
          )}

          {/* Main Statement Content */}
          <div className="relative z-10 mb-4 min-h-[50px]">
            <TypewriterText text={activeText} isSpeaking={isSpeaking} />
          </div>

          {/* If Bullshit flag was clicked */}
          {isChallenged && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 p-2.5 rounded bg-red-500/[0.03] border border-red-500/10 text-[10px] text-red-300 leading-normal"
            >
              <div className="font-bold mb-0.5 text-red-400">🛡️ Self-Defense Response:</div>
              {challengeResponse}
            </motion.div>
          )}
        </div>

        {/* Bottom Interactive Toolbar (Visible if text exists) */}
        {text && (
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.03] mt-2 relative z-10">
            {/* Translation Dropdown */}
            <div className="flex items-center gap-1 text-[9px]">
              <Icons.Globe size={11} className="text-[#64748B]" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-[#12121E] border border-white/[0.05] rounded text-[9px] text-[#64748B] hover:text-white px-1 py-0.5 focus:outline-none"
              >
                <option value="en">EN</option>
                <option value="es">ES</option>
                <option value="fr">FR</option>
                <option value="ja">JA</option>
                <option value="hi">HI</option>
              </select>
            </div>

            {/* Audio Reader & Flagger buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleTts}
                title="Read Aloud"
                className={`p-1.5 rounded hover:bg-white/[0.04] transition-all ${
                  isSpeakingTts ? 'text-[#818CF8]' : 'text-[#64748B] hover:text-white'
                }`}
              >
                {isSpeakingTts ? <Icons.VolumeX size={12} /> : <Icons.Volume2 size={12} />}
              </button>

              <button
                onClick={handleChallenge}
                disabled={isChallenged}
                title="Call Bullshit / Pressure Test"
                className={`flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold border transition-all ${
                  isChallenged
                    ? 'bg-red-500/10 border-red-500/20 text-[#EF4444]/60'
                    : 'bg-transparent border-red-500/20 text-[#EF4444] hover:bg-[#EF4444]/10'
                }`}
              >
                🚩 Call Bullshit
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
