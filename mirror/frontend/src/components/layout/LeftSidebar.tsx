import React, { useState } from 'react';
import { Icons } from '../ui/Icons';

interface LeftSidebarProps {
  savedDebates: any[];
  currentSessionId: string | null;
  onSelectSession: (session: any) => void;
  onDeleteSession: (sessionId: string, e: React.MouseEvent) => void;
  scratchpadText: string;
  setScratchpadText: (text: string) => void;
  onSelectTemplate: (template: string) => void;
  onImportBackup: (data: any) => void;
  onExportBackup: () => void;
}

const DOMAIN_TEMPLATES = [
  { category: 'Hiring & Team', prompt: 'Should I hire a full-time Senior React Developer or outsource to an agency?' },
  { category: 'Hiring & Team', prompt: 'Should I offer equity to my first hire or pay a higher base salary?' },
  { category: 'Funding & Strategy', prompt: 'Is it the right time to raise a $500K Seed round, or should we continue bootstrapping?' },
  { category: 'Funding & Strategy', prompt: 'Should we pivot our pricing from a monthly subscription to usage-based billing?' },
  { category: 'Product & Dev', prompt: 'Should we build a mobile app version first, or focus entirely on our web application?' },
  { category: 'Product & Dev', prompt: 'Should we rewrite our backend code in Go or continue patch-fixing our Python monolith?' },
  { category: 'Marketing & Sales', prompt: 'Should we pivot our sales strategy from direct B2C to enterprise B2B sales?' },
  { category: 'Marketing & Sales', prompt: 'Should we invest 80% of our marketing budget into SEO/Content or paid ads?' },
];

export function LeftSidebar({
  savedDebates,
  currentSessionId,
  onSelectSession,
  onDeleteSession,
  scratchpadText,
  setScratchpadText,
  onSelectTemplate,
  onImportBackup,
  onExportBackup,
}: LeftSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'history' | 'templates' | 'notes'>('history');
  const [searchQuery, setSearchQuery] = useState('');

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        onImportBackup(parsed);
      } catch (err) {
        alert('Invalid backup file structure.');
      }
    };
    reader.readAsText(file);
  };

  const filteredDebates = savedDebates.filter((d) =>
    d.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`h-full flex shrink-0 transition-all duration-300 relative border-r border-[#1E1E35] bg-[#09090F] ${
        isOpen ? 'w-80' : 'w-14'
      }`}
    >
      {/* Collapsed view indicator */}
      {!isOpen && (
        <div className="flex flex-col items-center py-6 gap-6 w-full text-[#64748B]">
          <button onClick={() => setIsOpen(true)} className="p-2 rounded-lg hover:bg-white/[0.04] text-white">
            <Icons.ChevronRight size={18} />
          </button>
          <button onClick={() => { setIsOpen(true); setActiveTab('history'); }} className="p-2 rounded-lg hover:bg-white/[0.04]">
            <Icons.History size={18} />
          </button>
          <button onClick={() => { setIsOpen(true); setActiveTab('templates'); }} className="p-2 rounded-lg hover:bg-white/[0.04]">
            <Icons.BookOpen size={18} />
          </button>
          <button onClick={() => { setIsOpen(true); setActiveTab('notes'); }} className="p-2 rounded-lg hover:bg-white/[0.04]">
            <Icons.Edit3 size={18} />
          </button>
        </div>
      )}

      {/* Expanded view */}
      {isOpen && (
        <div className="flex-1 flex flex-col min-w-0 h-full">
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-[#1E1E35]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] animate-pulse" />
              <h3 className="font-bold text-xs text-white tracking-wider uppercase">Workspace</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-white/[0.04] text-[#64748B] hover:text-white">
              <Icons.ChevronLeft size={16} />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-[#1E1E35] text-xs">
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 text-center border-b font-medium transition-all ${
                activeTab === 'history'
                  ? 'border-[#7C3AED] text-white bg-white/[0.01]'
                  : 'border-transparent text-[#64748B] hover:text-white'
              }`}
            >
              Debates ({savedDebates.length})
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 py-3 text-center border-b font-medium transition-all ${
                activeTab === 'templates'
                  ? 'border-[#7C3AED] text-white bg-white/[0.01]'
                  : 'border-transparent text-[#64748B] hover:text-white'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-3 text-center border-b font-medium transition-all ${
                activeTab === 'notes'
                  ? 'border-[#7C3AED] text-white bg-white/[0.01]'
                  : 'border-transparent text-[#64748B] hover:text-white'
              }`}
            >
              Scratchpad
            </button>
          </div>

          {/* Tab Content (Structured Flex layout to prevent collapsing) */}
          <div className="flex-1 flex flex-col min-h-0 p-4">
            {activeTab === 'history' && (
              <div className="flex-1 flex flex-col min-h-0 space-y-3">
                <input
                  type="text"
                  placeholder="Search decisions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#12121E] border border-[#1E1E35] rounded-lg px-3 py-2 text-xs text-white placeholder-[#3A3A5A] focus:outline-none focus:border-[#7C3AED]"
                />

                <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-0">
                  {filteredDebates.length === 0 ? (
                    <div className="text-center py-8 text-[#4A4A6A] text-xs">
                      No decisions saved yet. Start a debate to store it!
                    </div>
                  ) : (
                    filteredDebates.map((d) => (
                      <div
                        key={d.sessionId}
                        onClick={() => onSelectSession(d)}
                        className={`group relative flex items-start gap-2.5 p-3 rounded-lg border transition-all cursor-pointer ${
                          currentSessionId === d.sessionId
                            ? 'bg-[#1E1E35]/40 border-[#7C3AED] text-white'
                            : 'bg-[#12121E]/60 border-white/[0.03] text-[#94A3B8] hover:bg-[#12121E] hover:border-white/[0.08]'
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-1.5 shrink-0" />
                        <div className="flex-1 min-w-0 pr-6">
                          <p className="text-xs font-semibold leading-relaxed truncate">{d.question}</p>
                          <span className="text-[10px] text-[#4A4A6A]">
                            {new Date(d.savedAt || Date.now()).toLocaleDateString()}
                          </span>
                        </div>
                        <button
                          onClick={(e) => onDeleteSession(d.sessionId, e)}
                          className="absolute right-2 top-3 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/[0.05] text-[#EF4444] transition-opacity"
                        >
                          <Icons.Trash size={12} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'templates' && (
              <div className="flex-1 flex flex-col min-h-0 space-y-2">
                <p className="text-[9px] text-[#4A4A6A] uppercase font-bold tracking-wider shrink-0">
                  Double click to pre-fill prompt
                </p>
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-0">
                  {DOMAIN_TEMPLATES.map((t, idx) => (
                    <div
                      key={idx}
                      onDoubleClick={() => onSelectTemplate(t.prompt)}
                      className="p-2.5 rounded-lg bg-[#12121E]/60 border border-white/[0.03] hover:border-[#7C3AED]/40 hover:bg-[#12121E] cursor-pointer transition-all"
                    >
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-[#818CF8]">
                        {t.category}
                      </span>
                      <p className="text-[11px] text-[#94A3B8] mt-1 leading-normal group-hover:text-white">
                        {t.prompt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="flex-1 flex flex-col min-h-0 space-y-2">
                <p className="text-[10px] text-[#4A4A6A] uppercase font-bold tracking-wider shrink-0">
                  Scratchpad Notepad
                </p>
                <textarea
                  value={scratchpadText}
                  onChange={(e) => setScratchpadText(e.target.value)}
                  placeholder="Paste statements or scribble notes here to construct your strategic response..."
                  className="flex-1 w-full bg-[#12121E] border border-[#1E1E35] rounded-lg p-3 text-xs text-[#C8CFD8] placeholder-[#3A3A5A] resize-none focus:outline-none focus:border-[#7C3AED] leading-relaxed min-h-0"
                />
              </div>
            )}

            {/* Import/Export Backup (Pinned at the bottom of the entire sidebar) */}
            <div className="pt-3 border-t border-[#1E1E35] grid grid-cols-2 gap-2 shrink-0 mt-3">
              <button
                onClick={onExportBackup}
                className="flex items-center justify-center gap-1.5 py-1.5 rounded bg-white/[0.02] border border-white/[0.05] text-[10px] font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-all"
              >
                <Icons.Download size={12} /> Export JSON
              </button>
              <label className="flex items-center justify-center gap-1.5 py-1.5 rounded bg-white/[0.02] border border-white/[0.05] text-[10px] font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.05] cursor-pointer transition-all">
                <Icons.Upload size={12} /> Import JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
