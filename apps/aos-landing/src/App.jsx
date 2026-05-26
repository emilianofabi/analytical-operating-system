import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, FileCheck, RefreshCw, GitCommit, Settings, Terminal, CalendarDays, CheckCircle2 } from 'lucide-react';
import AOSCommandCenter from './AOSCommandCenter';

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const FloatingNav = ({ onViewCommandCenter }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-[power2.inOut] ${
      isScrolled ? 'w-[90%] md:w-auto px-6 py-3 glass-panel rounded-full shadow-2xl' : 'w-full px-8 py-4 bg-transparent'
    }`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto gap-8">
        <div className="text-ivory font-mono font-bold tracking-tight text-lg">AOS</div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ivory/70">
          <a href="#philosophy" className="hover:text-champagne transition-colors">Philosophy</a>
          <a href="#protocol" className="hover:text-champagne transition-colors">Protocol</a>
          <a href="#proof" className="hover:text-champagne transition-colors">Proof</a>
        </div>

        <button onClick={onViewCommandCenter} className="group relative px-5 py-2 rounded-full bg-champagne text-obsidian font-semibold text-sm overflow-hidden flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
          <span className="relative z-10">Command Center</span>
          <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ onViewCommandCenter }) => {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.fromTo('.hero-label', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
      )
      .fromTo('.hero-title-part',
        { y: 40, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.15 },
        "-=0.4"
      )
      .fromTo('.hero-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo('.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      gsap.to('.hero-glow-bg', {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center'
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="relative min-h-[100dvh] flex items-end pb-32 pt-40 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-hero-glow rounded-full blur-[120px] opacity-20 hero-glow-bg pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/10 via-obsidian/50 to-obsidian pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl grid gap-8">
        <div className="hero-label inline-flex items-center gap-3 text-champagne font-mono text-sm uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-champagne animate-pulse"></span>
          Analytical Operating System
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans tracking-tighter leading-[0.9] text-ivory">
          <div className="hero-title-part overflow-hidden pb-2">The loop</div>
          <div className="hero-title-part overflow-hidden pb-2 text-ivory/40 font-serif italic pr-4">is the product.</div>
        </h1>
        
        <p className="hero-desc text-xl md:text-2xl text-ivory/60 max-w-2xl font-light leading-relaxed">
          A local AI-powered curriculum system for turning learning into reviewed, revised, audited portfolio artifacts.
        </p>

        <div className="hero-cta flex flex-wrap items-center gap-6 mt-4">
          <button onClick={onViewCommandCenter} className="px-8 py-4 rounded-full bg-ivory text-obsidian font-semibold text-lg hover:bg-champagne transition-colors duration-300">
            Open Command Center
          </button>
          <span className="font-mono text-sm text-ivory/40">v1.0.0-beta // Local First</span>
        </div>
      </div>
    </section>
  );
};

const CoreLoop = () => {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const steps = gsap.utils.toArray('.loop-step');
      const arrows = gsap.utils.toArray('.loop-arrow');

      gsap.from(steps, {
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      gsap.from(arrows, {
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 60%',
        },
        scaleX: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        transformOrigin: 'left center'
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  const steps = [
    { icon: FileCheck, label: 'Artifact', color: 'text-ivory' },
    { icon: Settings, label: 'Review', color: 'text-champagne' },
    { icon: RefreshCw, label: 'Revision', color: 'text-ivory' },
    { icon: CheckCircle2, label: 'Audit', color: 'text-champagne' },
    { icon: GitCommit, label: 'Commit', color: 'text-ivory' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 relative border-t border-white/5" ref={comp}>
      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono text-sm text-champagne uppercase tracking-widest mb-16 text-center">The Proven Loop</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-10 right-10 h-px bg-white/10 -translate-y-1/2 z-0"></div>

          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className="loop-step relative z-10 flex flex-col items-center gap-4 bg-obsidian p-6 rounded-2xl glass-panel glass-panel-hover w-full md:w-auto">
                <div className={`p-4 rounded-xl bg-slate/50 ${step.color}`}>
                  <step.icon size={24} />
                </div>
                <span className="font-mono text-sm tracking-wider">{step.label}</span>
              </div>
              
              {i < steps.length - 1 && (
                <div className="loop-arrow hidden md:flex items-center text-white/20 z-10 bg-obsidian px-2">
                  <ArrowRight size={20} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCards = () => {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-6 md:px-12" ref={comp}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Diagnostic Shuffler */}
        <div className="feature-card glass-panel rounded-3xl p-8 flex flex-col min-h-[400px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-champagne/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex-1">
            <div className="w-12 h-12 rounded-full bg-slate flex items-center justify-center mb-8 border border-white/10">
              <Settings className="text-ivory" size={20} />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Diagnostic Shuffler</h3>
            <p className="text-ivory/60 font-light leading-relaxed">
              Review and revise work through explicit rubrics. Apply rigorous pressure testing to structural assumptions.
            </p>
          </div>
          
          {/* Micro-interface mockup */}
          <div className="mt-8 bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-xs text-ivory/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-champagne"></div>
              <span>Rubric: Analytical Rigor</span>
            </div>
            <div className="h-2 bg-slate rounded-full w-full overflow-hidden">
              <div className="h-full bg-champagne w-3/4"></div>
            </div>
            <div className="flex justify-between mt-2 opacity-60">
              <span>Applying pressure...</span>
              <span>75%</span>
            </div>
          </div>
        </div>

        {/* Telemetry Typewriter */}
        <div className="feature-card glass-panel rounded-3xl p-8 flex flex-col min-h-[400px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex-1">
            <div className="w-12 h-12 rounded-full bg-slate flex items-center justify-center mb-8 border border-white/10">
              <Terminal className="text-ivory" size={20} />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Telemetry Typewriter</h3>
            <p className="text-ivory/60 font-light leading-relaxed">
              Turn learning into evidence-bearing artifacts. Document the process, not just the outcome.
            </p>
          </div>

          {/* Micro-interface mockup */}
          <div className="mt-8 bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-xs overflow-hidden">
            <div className="text-champagne mb-1">$ write --artifact type="proof"</div>
            <div className="text-ivory/40 opacity-70">
              {'>'} Compiling logic graph...<br/>
              {'>'} Extracting assumptions...<br/>
              <span className="text-ivory mt-1 inline-block animate-pulse">_</span>
            </div>
          </div>
        </div>

        {/* Protocol Scheduler */}
        <div className="feature-card glass-panel rounded-3xl p-8 flex flex-col min-h-[400px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-champagne/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex-1">
            <div className="w-12 h-12 rounded-full bg-slate flex items-center justify-center mb-8 border border-white/10">
              <CalendarDays className="text-ivory" size={20} />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Protocol Scheduler</h3>
            <p className="text-ivory/60 font-light leading-relaxed">
              Convert analytical judgment into portfolio-ready proof through structured, disciplined iteration.
            </p>
          </div>

          {/* Micro-interface mockup */}
          <div className="mt-8 grid gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`bg-black/40 rounded-lg p-3 border ${i === 1 ? 'border-champagne/30' : 'border-white/5'} flex items-center gap-3`}>
                <div className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-champagne' : 'border border-white/20'}`}></div>
                <div className="flex-1">
                  <div className={`h-2 rounded-full ${i === 1 ? 'bg-champagne/80 w-full' : 'bg-white/10 w-2/3'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const Philosophy = () => {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.phil-text', {
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 60%',
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" className="py-40 px-6 md:px-12 bg-slate/10 border-y border-white/5" ref={comp}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="phil-text text-4xl md:text-6xl font-serif italic text-ivory/50 mb-8">
          Most systems generate drafts.
        </h2>
        <p className="phil-text text-5xl md:text-7xl font-sans font-medium text-ivory tracking-tight mb-12">
          AOS <span className="text-champagne">closes loops.</span>
        </p>
        <p className="phil-text text-xl text-ivory/60 max-w-2xl mx-auto font-light leading-relaxed text-balance">
          We reject the premise that learning is passive consumption. True understanding is forged in the crucible of review, revision, and cryptographic commitment to evidence.
        </p>
      </div>
    </section>
  );
};

const Protocol = () => {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.protocol-card', {
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 70%',
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  const protocols = [
    { num: "01", title: "Generate Artifact", desc: "Construct a tangible representation of your current understanding. Do not hide behind abstraction." },
    { num: "02", title: "Apply Review Pressure", desc: "Subject the artifact to explicit, unforgiving rubrics. Identify structural weaknesses and analytical flaws." },
    { num: "03", title: "Commit Evidence", desc: "Solidify the revised artifact into your local repository. Build an undeniable portfolio of judgment." }
  ];

  return (
    <section id="protocol" className="py-32 px-6 md:px-12 relative" ref={comp}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">The Protocol</h2>
          <p className="text-xl text-ivory/50 max-w-2xl">A deterministic methodology for transforming raw information into structural knowledge.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {protocols.map((p, i) => (
            <div key={i} className="protocol-card glass-panel rounded-[2rem] p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-8xl font-serif italic text-white/[0.02] font-bold select-none group-hover:text-champagne/5 transition-colors duration-500">
                {p.num}
              </div>
              <div className="relative z-10">
                <div className="font-mono text-champagne mb-6 border border-champagne/20 rounded-full px-4 py-1 inline-block text-sm">Phase {p.num}</div>
                <h3 className="text-3xl font-medium mb-4">{p.title}</h3>
                <p className="text-ivory/60 text-lg leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Proof = () => {
  const comp = useRef(null);
  const svgRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.proof-item', {
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 70%',
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    let ctx = gsap.context(() => {
      // Base ambient state
      gsap.to('.dag-node', { fill: '#2A2A35', stroke: '#FAF8F5', opacity: 0.4, scale: 1, duration: 0.4, transformOrigin: 'center' });
      gsap.to('.dag-edge', { stroke: '#FAF8F5', opacity: 0.15, duration: 0.4, strokeWidth: 2 });
      gsap.to('.dag-label', { fill: 'rgba(250, 248, 245, 0.3)', duration: 0.4 });

      if (activeIndex !== null) {
        const scenarios = [
          // 0: Full DAG (AI Writing)
          { nodes: ['#n-gen', '#n-rev', '#n-revi', '#n-aud'], edges: ['#e-g-r', '#e-g-ri', '#e-r-a', '#e-ri-a'] },
          // 1: Generation & Review (Quant/options)
          { nodes: ['#n-gen', '#n-rev'], edges: ['#e-g-r'] },
          // 2: The Loop (AOS Pattern #1)
          { nodes: ['#n-rev', '#n-revi'], edges: ['#e-r-ri-1', '#e-ri-r-2'] },
          // 3: Audit & Commit (Public release)
          { nodes: ['#n-aud', '#n-com'], edges: ['#e-a-c'] }
        ];
        
        const active = scenarios[activeIndex];
        
        gsap.to(active.nodes, { 
          fill: '#C9A84C', 
          stroke: '#C9A84C', 
          opacity: 1, 
          scale: 1.1, 
          duration: 0.4, 
          stagger: 0.05 
        });
        
        gsap.to(active.edges, { 
          stroke: '#C9A84C', 
          opacity: 0.8, 
          strokeWidth: 3,
          duration: 0.4, 
          stagger: 0.05 
        });
        
        // Also highlight labels corresponding to active nodes
        const activeLabels = active.nodes.map(n => n.replace('n-', 'l-'));
        gsap.to(activeLabels, { fill: '#C9A84C', opacity: 1, duration: 0.4 });
      } else {
        // Subtle breathing animation when idle
        gsap.to('.dag-node', {
          opacity: 0.6,
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          stagger: { each: 0.2, from: 'random' }
        });
      }
    }, svgRef);
    return () => ctx.revert();
  }, [activeIndex]);

  const proofs = [
    "AI Writing Assistance DAG / Statistical Analysis Plan",
    "Quant/options Lesson 1",
    "AOS Proven Loop Pattern #1",
    "Public-release cleanup"
  ];

  return (
    <section id="proof" className="py-32 px-6 md:px-12 bg-obsidian border-y border-white/5" ref={comp}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-8">Proven Loops</h2>
          <p className="text-xl text-ivory/50 mb-12 text-balance">
            The output of the Analytical Operating System is not temporary knowledge, but persistent, inspectable artifacts.
            Hover over the artifacts to inspect their cryptographic DAG traces.
          </p>
          <div className="space-y-4 relative z-20">
            {proofs.map((proof, i) => (
              <div 
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`proof-item flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer border ${
                  activeIndex === i ? 'bg-white/[0.05] border-champagne/30' : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5'
                }`}
              >
                <FileCheck className={activeIndex === i ? 'text-champagne' : 'text-ivory/40'} size={20} />
                <span className={`font-mono text-sm transition-colors ${activeIndex === i ? 'text-champagne' : 'text-ivory'}`}>{proof}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Interactive DAG */}
        <div className="relative aspect-square md:aspect-[4/3] bg-slate/10 rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center p-8 group">
           <div className="absolute inset-0 bg-gradient-radial from-champagne/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
           
           <svg ref={svgRef} viewBox="0 0 400 300" className="w-full h-full relative z-10 drop-shadow-2xl">
              {/* Edges */}
              <path id="e-g-r" className="dag-edge" d="M 60 150 C 100 150, 120 80, 180 80" fill="none" strokeDasharray="4 4" />
              <path id="e-g-ri" className="dag-edge" d="M 60 150 C 100 150, 120 220, 180 220" fill="none" strokeDasharray="4 4" />
              
              {/* Loop Edges */}
              <path id="e-r-ri-1" className="dag-edge" d="M 170 95 Q 140 150 170 205" fill="none" strokeDasharray="4 4" />
              <path id="e-ri-r-2" className="dag-edge" d="M 190 205 Q 220 150 190 95" fill="none" strokeDasharray="4 4" />
              
              <path id="e-r-a" className="dag-edge" d="M 180 80 C 240 80, 260 150, 300 150" fill="none" strokeDasharray="4 4" />
              <path id="e-ri-a" className="dag-edge" d="M 180 220 C 240 220, 260 150, 300 150" fill="none" strokeDasharray="4 4" />
              <path id="e-a-c" className="dag-edge" d="M 300 150 L 360 150" fill="none" strokeDasharray="4 4" />

              {/* Nodes */}
              <circle id="n-gen" className="dag-node" cx="60" cy="150" r="14" strokeWidth="2" />
              <circle id="n-rev" className="dag-node" cx="180" cy="80" r="14" strokeWidth="2" />
              <circle id="n-revi" className="dag-node" cx="180" cy="220" r="14" strokeWidth="2" />
              <circle id="n-aud" className="dag-node" cx="300" cy="150" r="14" strokeWidth="2" />
              <circle id="n-com" className="dag-node" cx="360" cy="150" r="14" strokeWidth="2" />

              {/* Labels */}
              <text id="l-gen" className="dag-label font-mono text-[10px]" x="60" y="180" textAnchor="middle">GENERATE</text>
              <text id="l-rev" className="dag-label font-mono text-[10px]" x="180" y="55" textAnchor="middle">REVIEW</text>
              <text id="l-revi" className="dag-label font-mono text-[10px]" x="180" y="250" textAnchor="middle">REVISE</text>
              <text id="l-aud" className="dag-label font-mono text-[10px]" x="300" y="180" textAnchor="middle">AUDIT</text>
              <text id="l-com" className="dag-label font-mono text-[10px]" x="360" y="180" textAnchor="middle">COMMIT</text>
           </svg>
        </div>
      </div>
    </section>
  );
};

const CTA = ({ onViewCommandCenter }) => {
  return (
    <section className="py-40 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-champagne/10 to-transparent opacity-50"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10 glass-panel p-16 rounded-[3rem]">
        <h2 className="text-5xl md:text-7xl font-semibold mb-6">Initialize AOS</h2>
        <p className="text-xl text-ivory/60 mb-10 max-w-2xl mx-auto">
          Begin transforming your analytical capabilities into verifiable proof. Ideal for self-directed learners, technical reviewers, and AI workflow designers.
        </p>
        <button onClick={onViewCommandCenter} className="px-10 py-5 rounded-full bg-champagne text-obsidian font-bold text-lg hover:bg-ivory transition-colors duration-300 shadow-[0_0_40px_rgba(201,168,76,0.3)] hover:shadow-[0_0_60px_rgba(250,248,245,0.4)]">
          Initialize Command Center
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-8 px-6 md:px-12 border-t border-white/10 bg-obsidian text-sm font-mono flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-ivory/40">© 2026 Analytical Operating System</div>
      <div className="text-champagne italic font-serif text-lg">The loop is the product.</div>
      <div className="flex items-center gap-2 text-ivory/60">
        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
        System Operational
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen font-sans bg-obsidian flex flex-col">
      <div className="flex-1">
        <AOSCommandCenter />
      </div>
      <Footer />
    </div>
  );
}

export default App;
