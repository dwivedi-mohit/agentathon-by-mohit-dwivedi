import { useState } from 'react';

interface RiskRadarProps {
  options: any[];
}

export function RiskRadar({ options }: RiskRadarProps) {
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(0);

  // Dynamic risk profiles mapped to option indexes
  const riskProfiles = [
    { name: 'Option 1', Financial: 75, Market: 60, Technical: 30, Operational: 45, Legal: 20 },
    { name: 'Option 2', Financial: 40, Market: 35, Technical: 70, Operational: 60, Legal: 15 },
    { name: 'Option 3', Financial: 15, Market: 10, Technical: 15, Operational: 20, Legal: 85 },
  ];

  const categories = ['Financial', 'Market', 'Technical', 'Operational', 'Legal'];
  const colors = ['#818CF8', '#10B981', '#3B82F6'];

  const getCoordinates = () => {
    const active = riskProfiles[selectedOptionIdx] || riskProfiles[0];
    const center = 100;
    const r = 70;
    return categories.map((cat, i) => {
      const value = (active as any)[cat] / 100;
      const angle = (i * 2 * Math.PI) / categories.length - Math.PI / 2;
      return {
        x: center + r * value * Math.cos(angle),
        y: center + r * value * Math.sin(angle),
        label: cat,
      };
    });
  };

  const coords = getCoordinates();
  const pointsStr = coords.map((c) => `${c.x},${c.y}`).join(' ');

  // Standard rings
  const rings = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="glass-strong rounded-2xl p-5 border border-white/[0.06] flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <span className="text-[10px] text-[#4A4A6A] font-bold uppercase tracking-wider">Risk Radar Index</span>
        <div className="flex gap-1">
          {options.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelectedOptionIdx(i)}
              className={`px-2 py-0.5 rounded text-[9px] font-semibold transition-all border ${
                selectedOptionIdx === i
                  ? 'bg-white/[0.08] border-[#818CF8] text-white'
                  : 'bg-transparent border-transparent text-[#64748B] hover:text-white'
              }`}
            >
              Option {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full max-w-[200px] aspect-square flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          {/* Radar Background Rings */}
          {rings.map((ring, idx) => (
            <circle
              key={idx}
              cx="100"
              cy="100"
              r={70 * ring}
              fill="none"
              stroke="#1E1E35"
              strokeWidth="0.5"
              strokeDasharray={idx === 3 ? 'none' : '2 2'}
            />
          ))}

          {/* Web Axes */}
          {categories.map((_, i) => {
            const angle = (i * 2 * Math.PI) / categories.length - Math.PI / 2;
            const x2 = 100 + 70 * Math.cos(angle);
            const y2 = 100 + 70 * Math.sin(angle);
            return <line key={i} x1="100" y1="100" x2={x2} y2={y2} stroke="#1E1E35" strokeWidth="0.5" />;
          })}

          {/* Radar Area Polygon */}
          <polygon
            points={pointsStr}
            fill={`${colors[selectedOptionIdx]}22`}
            stroke={colors[selectedOptionIdx]}
            strokeWidth="1.5"
          />

          {/* Radar Dots */}
          {coords.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r="3.5" fill={colors[selectedOptionIdx]} stroke="#12121E" strokeWidth="1" />
          ))}

          {/* Text Labels */}
          {categories.map((cat, i) => {
            const angle = (i * 2 * Math.PI) / categories.length - Math.PI / 2;
            const labelDist = 88;
            const x = 100 + labelDist * Math.cos(angle);
            const y = 100 + labelDist * Math.sin(angle);
            return (
              <text
                key={i}
                x={x}
                y={y + 3}
                textAnchor="middle"
                fill="#64748B"
                fontSize="8"
                fontWeight="bold"
                className="select-none"
              >
                {cat}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="w-full mt-4 text-[10px] text-[#94A3B8] text-center border-t border-white/[0.04] pt-3 leading-relaxed">
        {selectedOptionIdx === 0 && 'High financial investment offset by low technical complexities.'}
        {selectedOptionIdx === 1 && 'Heavy engineering setup required, low market entrance risks.'}
        {selectedOptionIdx === 2 && 'Compliance & regulatory considerations dominate (low financial cost).'}
      </div>
    </div>
  );
}
