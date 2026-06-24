import { useState } from 'react';

interface TimelinePlannerProps {
  options: any[];
}

export function TimelinePlanner({ options }: TimelinePlannerProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const schedules = [
    [
      { phase: 'Phase 1: Setup & Kickoff', duration: 'Days 1-15', tasks: 'Secure initial workspace, align stakeholders, publish core specifications.' },
      { phase: 'Phase 2: Alpha Prototyping', duration: 'Days 16-45', tasks: 'Launch functional prototype, perform first-pass tests, secure core assets.' },
      { phase: 'Phase 3: Beta Trial & Review', duration: 'Days 46-75', tasks: 'Onboard 10 initial trial users, review performance feedback, patch bottlenecks.' },
      { phase: 'Phase 4: Launch & Scale', duration: 'Days 76-90', tasks: 'Initiate public launch campaign, audit stability, transition management.' },
    ],
    [
      { phase: 'Phase 1: Core Engineering', duration: 'Days 1-30', tasks: 'Initialize database architecture, build internal API integrations, setup telemetry.' },
      { phase: 'Phase 2: System Validation', duration: 'Days 31-50', tasks: 'Perform high-load stress testing, evaluate compliance rules, deploy dev cluster.' },
      { phase: 'Phase 3: Integration Audit', duration: 'Days 51-70', tasks: 'Audit external webhooks, finalize billing setup, conduct pen testing.' },
      { phase: 'Phase 4: Release Candidate', duration: 'Days 71-90', tasks: 'Prepare deployment bundles, configure DNS, monitor performance run.' },
    ],
    [
      { phase: 'Phase 1: Regulatory Prep', duration: 'Days 1-20', tasks: 'Consult compliance counsel, review licensing policies, file first-pass briefs.' },
      { phase: 'Phase 2: Strategy Drafting', duration: 'Days 21-45', tasks: 'Draft operational procedures, setup emergency fallback trees.' },
      { phase: 'Phase 3: System Hardening', duration: 'Days 46-70', tasks: 'Secure secure vault tokens, audit database access controls, lock configurations.' },
      { phase: 'Phase 4: Compliance Launch', duration: 'Days 71-90', tasks: 'Obtain legal signoff, open workspace portals, start active logging audit.' },
    ],
  ];

  const activeShed = schedules[selectedIdx] || schedules[0];
  const colors = ['border-l-[#818CF8]', 'border-l-[#10B981]', 'border-l-[#3B82F6]'];
  const textColors = ['text-[#818CF8]', 'text-[#10B981]', 'text-[#3B82F6]'];

  return (
    <div className="glass-strong rounded-2xl p-5 border border-white/[0.06]">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] text-[#4A4A6A] font-bold uppercase tracking-wider">
          90-Day Execution Gantt
        </span>
        <div className="flex gap-1">
          {options.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelectedIdx(i)}
              className={`px-2.5 py-0.5 rounded text-[9px] font-semibold transition-all border ${
                selectedIdx === i
                  ? 'bg-white/[0.08] border-[#818CF8] text-white'
                  : 'bg-transparent border-transparent text-[#64748B] hover:text-white'
              }`}
            >
              Option {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {activeShed.map((s, idx) => (
          <div
            key={idx}
            className={`pl-3 border-l-2 ${colors[selectedIdx]} bg-white/[0.01] p-2.5 rounded-r-lg border border-white/[0.02] border-l-none`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${textColors[selectedIdx]}`}>{s.phase}</span>
              <span className="text-[9px] bg-white/[0.04] text-[#64748B] px-1.5 py-0.5 rounded">
                {s.duration}
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8] mt-1 leading-normal">
              {s.tasks}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
