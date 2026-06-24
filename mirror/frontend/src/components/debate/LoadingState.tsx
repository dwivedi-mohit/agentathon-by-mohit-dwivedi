import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const messages = [
  'Analyzing your question from all angles...',
  'Uday is preparing their bullish case...',
  'Kiran is stress-testing the assumptions...',
  'Mohan is mapping the operational reality...',
  'Priya is representing the customer voice...',
];

export function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setMsgIndex(i => Math.min(i + 1, messages.length - 1)), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative w-16 h-16 mb-6">
        {[0, 1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: ['#818CF8', '#7C3AED', '#3B82F6', '#818CF8'][i],
              borderRightColor: ['transparent', 'transparent', 'transparent', '#7C3AED33'][i],
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: [2, 2.5, 3, 2.2][i], ease: 'linear', delay: i * 0.15 }}
          />
        ))}
        <motion.div
          className="absolute inset-3 rounded-full bg-gradient-to-br from-[#818CF8]/20 to-[#7C3AED]/20"
          animate={{ scale: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>
      <AnimatedText text={messages[msgIndex]} />
    </motion.div>
  );
}

function AnimatedText({ text }: { text: string }) {
  return (
    <motion.p
      className="text-sm text-[#64748B]"
      key={text}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={`${text}-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.008 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
}
