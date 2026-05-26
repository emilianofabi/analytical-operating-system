import React, { useState, useRef } from 'react';
import {
  CheckCircle2,
  Circle,
  AlertCircle,
  PlayCircle,
  GitCommit,
  Layers,
  Shield,
  Activity,
  Cpu,
  ArrowRight,
  Network,
  FileCheck,
  Terminal,
  Settings,
  RefreshCw,
  Github
} from 'lucide-react';

import curriculumData from './data/curriculum.json';
import * as metrics from './utils/curriculumMetrics';

const {
  systemStatus,
  modules,
  artifacts,
  competencies,
  agents
} = curriculumData;

const LoopIcon = ({ status }) => {
  switch (status) {
    case 'draft': return <Circle className="text-ivory/30" size={16} />;
    case 'reviewed': return <AlertCircle className="text-champagne/70" size={16} />;
    case 'revised': return <RefreshCw className="text-ivory/70" size={16} />;
    case 'audited': return <CheckCircle2 className="text-champagne" size={16} />;
    case 'committed': return <GitCommit className="text-emerald-500" size={16} />;
    default: return <Circle className="text-ivory/30" size={16} />;
  }
};

const ProgressBadge = ({ level }) => {
  const styles = {
    not_started: "bg-white/5 text-ivory/40 border-white/10",
    emerging: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    developing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    proficient: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    advanced: "bg-champagne/10 text-champagne border-champagne/30"
  };
  
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-mono border ${styles[level] || styles.not_started}`}>
      {level.replace('_', ' ')}
    </span>
  );
};

export default function AOSCommandCenter() {
  const [activeTab, setActiveTab] = useState('curriculum');
  const [activeTrack, setActiveTrack] = useState('All');
  const [selectedModule, setSelectedModule] = useState(modules.find(m => m.title === "Causal Inference") || modules[0]);
  const curriculumRef = useRef(null);

  const completedStages = ['audited', 'committed', 'portfolio-ready'];
  const nextLesson = selectedModule?.lessons?.find(l => !completedStages.includes(l.loopStage));

  const filteredModules = activeTrack === 'All' 
    ? modules 
    : modules.filter(m => m.track === activeTrack);

  return (
    <div className="min-h-screen bg-obsidian text-ivory pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 md:px-12 selection:bg-champagne/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header / System Status */}
        <header className="relative mb-16">
          <div className="absolute top-0 right-10 w-96 h-96 bg-champagne/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] text-champagne uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse"></span>
                Demo snapshot
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans tracking-tighter leading-[0.9] text-ivory mb-6">
                Evidence, <br/><span className="text-ivory/40 font-serif italic pr-4">not vibes.</span>
              </h1>
              <p className="text-xl text-ivory/60 font-light leading-relaxed max-w-xl mb-8 text-balance">
                AOS converts curriculum into reviewed, revised, auditable portfolio evidence.
              </p>
              
              <div className="flex flex-wrap gap-4 font-mono text-sm">
                <div className="flex items-center gap-3 bg-black/40 px-4 py-2.5 rounded-xl border border-white/5">
                  <Activity size={18} className="text-champagne" />
                  <div className="flex flex-col">
                    <span className="text-ivory/40 text-[10px] uppercase">Closed Loops</span>
                    <span className="text-ivory leading-none">{systemStatus.closedLoops}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-black/40 px-4 py-2.5 rounded-xl border border-white/5">
                  <Layers size={18} className="text-champagne" />
                  <div className="flex flex-col">
                    <span className="text-ivory/40 text-[10px] uppercase">Active Modules</span>
                    <span className="text-ivory leading-none">{systemStatus.activeModules}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-emerald-500/10 px-4 py-2.5 rounded-xl border border-emerald-500/20">
                  <Shield size={18} className="text-emerald-500" />
                  <div className="flex flex-col">
                    <span className="text-emerald-500/60 text-[10px] uppercase">Example Repo State</span>
                    <span className="text-emerald-500 leading-none">{systemStatus.workingTree}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Panel */}
            <div className="glass-panel p-5 md:p-6 rounded-2xl border border-champagne/20 bg-gradient-to-b from-champagne/10 to-transparent lg:w-96 w-full shrink-0 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <Terminal size={18} className="text-champagne" />
                <h3 className="font-mono text-xs text-champagne uppercase tracking-widest">Protocol Recommendation</h3>
              </div>
              <div className="bg-black/50 rounded-xl p-5 font-mono text-xs text-ivory/70 border border-white/5 mb-6 space-y-4 flex-1">
                <div className="flex flex-col gap-1 border-b border-white/10 pb-3">
                  <span className="text-ivory/40 uppercase tracking-widest text-[9px]">Current Module</span>
                  <span className="text-ivory font-medium text-sm">{selectedModule?.title || 'None Selected'}</span>
                </div>
                
                {nextLesson ? (
                  <>
                    <div className="flex flex-col gap-1 border-b border-white/10 pb-3">
                      <span className="text-ivory/40 uppercase tracking-widest text-[9px]">Next Lesson</span>
                      <span className="text-champagne text-sm font-medium">{nextLesson.title}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span className="text-ivory/40 uppercase tracking-widest text-[9px]">Target Artifact</span>
                      <span className="text-ivory text-xs">{nextLesson.artifactType}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span className="text-ivory/40 uppercase tracking-widest text-[9px]">Loop Stage</span>
                      <span className="text-ivory text-xs capitalize">{nextLesson.loopStage}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-1 border-b border-white/10 pb-3">
                    <span className="text-emerald-400 text-sm font-medium">All lessons completed</span>
                    <span className="text-ivory/60 text-[10px]">Ready for extraction or portfolio translation.</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-1">
                  <span className="text-ivory/40 uppercase tracking-widest text-[9px]">Evidence</span>
                  <span className="text-emerald-400">{selectedModule?.completedEvidence?.length || 0} committed item(s)</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setActiveTab('curriculum');
                  curriculumRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-full flex items-center justify-between px-4 py-3 bg-champagne/10 text-champagne border border-champagne/20 rounded-xl text-sm font-bold hover:bg-champagne hover:text-obsidian transition-all shadow-[0_0_15px_rgba(201,168,76,0.1)] mt-auto"
              >
                <span>View Current Module</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* The Core Loop Vis */}
        <div className="mb-12">
          <div className="flex flex-row items-center justify-start md:justify-between gap-2 bg-black/20 p-2 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {[
              { label: 'Artifact', Icon: FileCheck },
              { label: 'Review', Icon: Settings },
              { label: 'Revision', Icon: RefreshCw },
              { label: 'Audit', Icon: CheckCircle2 },
              { label: 'Commit', Icon: GitCommit },
              { label: 'Clean Tree', Icon: Shield }
            ].map((step, i, arr) => {
              const Icon = step.Icon || Circle;
              return (
                <React.Fragment key={step.label}>
                  <div className="flex items-center justify-center gap-3 px-4 py-2 rounded-xl text-sm font-mono text-ivory/70 hover:bg-white/5 transition-colors w-full md:w-auto shrink-0 md:shrink">
                    <Icon
                      size={16}
                      className={
                        i === arr.length - 1
                          ? "text-emerald-500"
                          : i > 2
                          ? "text-champagne"
                          : "text-ivory/40"
                      }
                    />
                    <span className="whitespace-nowrap">{step.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight size={14} className="text-white/10 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
          {['curriculum', 'evidence', 'agents', 'repo'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-mono text-sm capitalize transition-colors whitespace-nowrap ${
                activeTab === tab ? 'text-champagne border-b-2 border-champagne' : 'text-ivory/40 hover:text-ivory/80'
              }`}
            >
              {tab === 'curriculum' ? 'Curriculum Map' : tab === 'evidence' ? 'Portfolio Evidence' : tab === 'agents' ? 'Agent Ecology' : 'Repo'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in duration-500">
          
          {activeTab === 'curriculum' && (
            <div className="space-y-8 animate-in fade-in duration-500" ref={curriculumRef}>
              <div className="max-w-3xl">
                <p className="text-lg text-ivory/60 font-light">Browse modules, inspect lessons, and see the artifacts each lesson is designed to produce.</p>
              </div>
              {/* Curriculum Intelligence Panel */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl mb-8">
                <div className="flex flex-col">
                  <span className="text-ivory/40 uppercase tracking-widest text-[9px] mb-1">Total Modules</span>
                  <span className="text-ivory text-xl font-medium">{metrics.getTotalModules(curriculumData)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-ivory/40 uppercase tracking-widest text-[9px] mb-1">Total Lessons</span>
                  <span className="text-ivory text-xl font-medium">{metrics.getTotalLessons(curriculumData)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-ivory/40 uppercase tracking-widest text-[9px] mb-1">Completed Evidence</span>
                  <span className="text-emerald-400 text-xl font-medium">{metrics.getCompletedEvidenceCount(curriculumData)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-ivory/40 uppercase tracking-widest text-[9px] mb-1">Active Lessons</span>
                  <span className="text-champagne text-xl font-medium">
                    {metrics.getLessonsByLoopStage(curriculumData)['draft'] || 0} / {metrics.getLessonsByLoopStage(curriculumData)['revised'] || 0}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-ivory/40 uppercase tracking-widest text-[9px] mb-1">Competencies</span>
                  <span className="text-ivory text-xl font-medium">
                    {metrics.getCompetencyEvidenceSummary(curriculumData).withEvidence} <span className="text-ivory/40 text-sm">/ {metrics.getCompetencyEvidenceSummary(curriculumData).total}</span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-ivory/40 uppercase tracking-widest text-[9px] mb-1">Next Artifacts</span>
                  <span className="text-champagne text-xl font-medium">{metrics.getNextArtifactQueue(curriculumData).length}</span>
                </div>
              </div>
              
              {/* Track Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                {['All', 'Foundational', 'Methods and Systems', 'Integration and Judgment'].map(track => (
                  <button 
                    key={track}
                    onClick={() => {
                      setActiveTrack(track);
                      const filtered = track === 'All' ? modules : modules.filter(m => m.track === track);
                      if (!filtered.some(m => m.title === selectedModule.title)) {
                        setSelectedModule(filtered[0] || modules[0]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest transition-colors ${
                      activeTrack === track ? 'bg-champagne text-obsidian font-bold' : 'bg-white/5 text-ivory/60 hover:bg-white/10 hover:text-ivory'
                    }`}
                  >
                    {track}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Module List */}
                <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-3 h-auto lg:h-[calc(100vh-200px)] lg:overflow-y-auto no-scrollbar pr-2 pb-10">
                  <h2 className="font-mono text-sm text-champagne uppercase tracking-widest mb-2 lg:sticky top-0 bg-obsidian py-2 z-10 border-b border-white/5">Modules</h2>
                {(filteredModules || []).map((mod, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedModule(mod)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col gap-2 ${
                      selectedModule?.title === mod.title 
                        ? 'bg-champagne/10 border-champagne/30 shadow-[0_0_15px_rgba(240,220,180,0.05)]' 
                        : 'bg-white/5 border-white/5 hover:border-champagne/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-champagne/70 px-1.5 py-0.5 bg-champagne/5 rounded border border-champagne/10">
                        {mod.track}
                      </span>
                      <ProgressBadge level={mod.progress} />
                    </div>
                    <h3 className={`font-medium tracking-tight leading-tight ${selectedModule?.title === mod.title ? 'text-champagne' : 'text-ivory'}`}>
                      {mod.title}
                    </h3>
                    <div className="font-mono text-[10px] text-ivory/50">
                      {mod.lessons ? mod.lessons.length : 0} lessons
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Column: Selected Module Details */}
              <div className="lg:col-span-8 xl:col-span-9 h-auto lg:h-[calc(100vh-200px)] lg:overflow-y-auto no-scrollbar pb-20 lg:pr-4">
                {selectedModule && (
                  <div className="space-y-10">
                    <div className="border-b border-white/10 pb-6">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-champagne/70 px-2 py-1 bg-champagne/5 rounded border border-champagne/10">
                          {selectedModule.track}
                        </span>
                        <ProgressBadge level={selectedModule.progress} />
                        <span className="flex items-center gap-1.5 font-mono text-[10px] text-ivory/50 uppercase tracking-widest">
                          <Network size={12} className="text-champagne" /> {selectedModule.competency}
                        </span>
                      </div>
                      <h2 className="text-3xl font-semibold tracking-tight text-ivory mb-4">{selectedModule.title}</h2>
                      <p className="text-lg text-ivory/70 font-light leading-relaxed max-w-3xl">
                        {selectedModule.overview}
                      </p>
                      
                      {selectedModule.aosPrinciples && selectedModule.aosPrinciples.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-3">
                          {selectedModule.aosPrinciples.map((principle, idx) => (
                            <span key={idx} className="flex items-center gap-1.5 text-xs text-ivory/60 font-mono bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                              <span className="text-champagne opacity-50">#</span> {principle}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-4 mt-8 bg-white/5 border border-white/5 rounded-xl p-5">
                        <div className="flex-1 min-w-[120px]">
                          <div className="text-[10px] text-ivory/40 font-mono uppercase tracking-widest mb-1">Lessons</div>
                          <div className="text-xl font-medium text-ivory">{selectedModule.lessons?.length || 0}</div>
                        </div>
                        <div className="flex-1 min-w-[120px] border-l border-white/10 pl-5">
                          <div className="text-[10px] text-ivory/40 font-mono uppercase tracking-widest mb-1">Expected Artifacts</div>
                          <div className="text-xl font-medium text-ivory">{selectedModule.lessons?.length || 0}</div>
                        </div>
                        <div className="flex-1 min-w-[120px] border-l border-white/10 pl-5">
                          <div className="text-[10px] text-ivory/40 font-mono uppercase tracking-widest mb-1">Completed Evidence</div>
                          <div className="text-xl font-medium text-emerald-400">{selectedModule.completedEvidence?.length || 0}</div>
                        </div>
                        <div className="flex-1 min-w-[150px] border-l border-white/10 pl-5">
                          <div className="text-[10px] text-ivory/40 font-mono uppercase tracking-widest mb-1">Next Artifact</div>
                          <div className="text-sm font-medium text-champagne truncate">{selectedModule.nextArtifact}</div>
                        </div>
                      </div>
                    </div>

                    {/* Lesson Sequence */}
                    <div className="space-y-6">
                      <h3 className="font-mono text-sm text-champagne uppercase tracking-widest flex items-center gap-2">
                        <Layers size={16} /> Lesson Sequence
                      </h3>
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {(selectedModule.lessons || []).map((lesson, idx) => (
                          <div key={idx} className="glass-panel p-5 xl:p-6 rounded-xl border border-white/5 flex flex-col h-full hover:border-champagne/20 transition-colors">
                            <div className="flex justify-between items-start mb-2 gap-4">
                              <h4 className="text-base font-medium tracking-tight text-ivory">{idx + 1}. {lesson.title}</h4>
                              <span className="font-mono text-[9px] text-ivory/50 uppercase bg-black/40 px-2 py-0.5 rounded border border-white/5 whitespace-nowrap shrink-0">
                                {lesson.focus}
                              </span>
                            </div>
                            
                            <p className="text-sm text-ivory/70 font-light mb-4 leading-snug">
                              {lesson.purpose}
                            </p>
                            
                            <div className="flex flex-wrap gap-1.5 mb-6 mt-auto pt-2">
                              {(lesson.concepts || []).map((concept, cIdx) => (
                                <span key={cIdx} className="px-2 py-0.5 bg-white/5 rounded text-[10px] font-mono text-ivory/40 border border-white/5">{concept}</span>
                              ))}
                            </div>
                            
                            <div className="pt-4 border-t border-white/10 space-y-4">
                              <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                <div className="text-[10px] font-mono text-ivory/40 uppercase mb-1.5">Expected Artifact</div>
                                <div className="text-sm text-champagne font-medium mb-2">{lesson.artifact}</div>
                                <div className="flex items-center gap-3 mt-3">
                                  <span className="font-mono text-[9px] text-ivory/50 bg-white/5 px-2 py-1 rounded border border-white/5">{lesson.artifactType}</span>
                                  <div className="flex items-center gap-1.5 capitalize font-mono text-[9px] text-ivory/60">
                                    <LoopIcon status={lesson.loopStage} />
                                    <span>{lesson.loopStage.replace('-', ' ')}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-xs text-ivory/50 italic border-l-2 border-white/10 pl-3">
                                <span className="text-ivory/30 font-mono text-[9px] uppercase not-italic block mb-1">Why it matters</span>
                                {lesson.whyItMatters}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Evidence & Next Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                      {/* Completed Evidence */}
                      <div className="space-y-4">
                        <h3 className="font-mono text-sm text-champagne uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 size={16} /> Evidence Produced
                        </h3>
                        {selectedModule.completedEvidence && selectedModule.completedEvidence.length > 0 ? (
                          <div className="space-y-3">
                            {selectedModule.completedEvidence.map((ev, idx) => (
                              <div key={idx} className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl">
                                <div className="flex justify-between items-start gap-3 mb-2">
                                  <h4 className="font-medium text-emerald-400 text-sm">{ev.title}</h4>
                                  <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded shrink-0">
                                    {ev.status}
                                  </span>
                                </div>
                                <div className="text-xs text-ivory/70 font-light mb-3">
                                  "{ev.proves}"
                                </div>
                                <span className="inline-block px-2 py-0.5 bg-black/40 rounded text-[9px] font-mono text-ivory/50 border border-white/5">
                                  {ev.type}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-ivory/40 font-mono italic p-5 bg-black/20 border border-white/5 rounded-xl border-dashed">
                            No committed evidence yet. This module is ready for its first artifact loop.
                          </div>
                        )}
                      </div>

                      {/* Next Recommended */}
                      <div className="space-y-4">
                        <h3 className="font-mono text-sm text-champagne uppercase tracking-widest flex items-center gap-2">
                          <Terminal size={16} /> Recommended Next Artifact
                        </h3>
                        <div className="bg-champagne/5 border border-champagne/20 rounded-xl p-5">
                          <p className="text-xs text-ivory/60 mb-2 font-mono uppercase">Targeting:</p>
                          <p className="text-base font-medium text-champagne mb-5">{selectedModule.nextArtifact}</p>
                          <div className="flex items-center justify-center gap-2 w-full py-2.5 bg-black/40 text-ivory/50 border border-white/5 rounded-lg text-sm font-mono cursor-default">
                            <span>Ready for loop initialization</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Completed Artifacts */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="font-mono text-sm text-champagne uppercase tracking-widest mb-2">Portfolio Evidence</h2>
                  <p className="text-sm text-ivory/50 mb-6">These artifacts have successfully passed through the entire AOS loop, providing auditable proof of analytical judgment.</p>
                </div>
                
                {(artifacts || []).map((art, i) => (
                  <div key={i} className="glass-panel p-5 sm:p-6 rounded-2xl border border-champagne/10 hover:border-champagne/40 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-champagne/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                        <h3 className="font-medium text-xl text-ivory tracking-tight">{art.title}</h3>
                        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                          <LoopIcon status={art.loopStatus} />
                          <span>{art.loopStatus}</span>
                        </div>
                      </div>
                      
                      <div className="bg-black/30 rounded-xl p-4 mb-5 border border-white/5">
                        <p className="text-sm text-ivory/80 font-serif italic">"{art.coreIdea}"</p>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {(art.modules || []).map(m => (
                            <span key={m} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-ivory/60">{m}</span>
                          ))}
                        </div>
                        <span className="px-3 py-1 bg-champagne text-obsidian rounded-md text-[10px] font-bold font-mono tracking-wide">
                          {art.evidenceType}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Competencies */}
              <div className="space-y-4">
                <div>
                  <h2 className="font-mono text-sm text-champagne uppercase tracking-widest mb-2">Competency State</h2>
                  <p className="text-sm text-ivory/50 mb-6">Competency state is earned through linked evidence.</p>
                </div>
                <div className="glass-panel rounded-xl p-5 space-y-3">
                  {(competencies || []).slice(0, 7).map((comp, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-sm font-medium text-ivory/80 truncate" title={comp.name}>{comp.name}</span>
                      <ProgressBadge level={comp.level} />
                    </div>
                  ))}
                  <div className="pt-2 mt-2 text-center">
                    <button className="text-xs font-mono text-champagne/70 hover:text-champagne">View All 10 Competencies →</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'agents' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-mono text-sm text-champagne uppercase tracking-widest mb-2">Agent Ecology</h2>
                <p className="text-sm text-ivory/50">One agent, one job. Workflow roles in a distributed intelligence network enforcing the curriculum loop.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(agents || []).map((agent, i) => (
                  <div key={i} className="glass-panel p-5 md:p-6 rounded-2xl relative overflow-hidden group border border-white/5 hover:border-champagne/20 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-br from-champagne/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-slate flex items-center justify-center border border-white/10 shrink-0 group-hover:border-champagne/30 transition-colors">
                        <Cpu size={20} className="text-ivory group-hover:text-champagne transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1 tracking-tight">{agent.name}</h3>
                        <p className="text-sm text-champagne/80 mb-3 font-light">{agent.role}</p>
                        <div className="inline-flex px-2.5 py-1 bg-black/40 rounded-md border border-white/5 font-mono text-[10px] text-ivory/50 uppercase tracking-wide">
                          Task: {agent.job}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'repo' && (
            <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                  <h2 className="font-mono text-sm text-champagne uppercase tracking-widest mb-2">Repo Intelligence</h2>
                  <p className="text-sm text-ivory/50">The repo is the memory of the loop. Git commits turn learning cycles into durable infrastructure.</p>
                </div>
                <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-mono text-ivory transition-colors group">
                  <Github size={16} className="text-ivory/60 group-hover:text-ivory" />
                  <span>Add GitHub URL</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Repo Overview Card */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 mb-6">
                    <Github size={18} className="text-champagne" />
                    <h3 className="font-mono text-xs text-champagne uppercase tracking-widest">Project Overview</h3>
                  </div>
                  <div className="space-y-4 text-sm font-light text-ivory/70">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-ivory/40">Project</span>
                      <span className="font-mono text-ivory">analytical-operating-system</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-ivory/40">App</span>
                      <span className="font-mono text-ivory">apps/aos-landing</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-ivory/40">Stack</span>
                      <span className="font-mono text-ivory text-right max-w-[180px]">React + Vite + Tailwind CSS</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-ivory/40">Status</span>
                      <span className="font-mono text-emerald-400">Local prototype</span>
                    </div>
                  </div>
                </div>

                {/* Build Evidence Panel */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <Terminal size={18} className="text-champagne" />
                    <h3 className="font-mono text-xs text-champagne uppercase tracking-widest">Build Status</h3>
                  </div>
                  <ul className="space-y-4 text-sm font-mono text-ivory/70 border-l-2 border-white/10 pl-4 ml-2 mt-6">
                    <li className="relative">
                      <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-champagne"></span>
                      <span className="text-ivory">Curriculum loaded</span>
                    </li>
                    <li className="relative">
                      <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-champagne"></span>
                      <span className="text-ivory">Defensive fallbacks active</span>
                    </li>
                    <li className="relative mt-8">
                      <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                      <span className="text-emerald-400">Build command available (<code className="bg-emerald-500/10 px-1 rounded">npm run build</code>)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
