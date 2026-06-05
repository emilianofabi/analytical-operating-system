export const graphNodeCategories = [
  'system',
  'module',
  'lesson',
  'artifact',
  'review',
  'audit',
  'competency',
  'prompt',
  'runner',
  'rag',
  'frontend',
  'governance',
  'portfolio'
];

export const graphEdgeTypes = [
  'grounds',
  'estimates',
  'measures',
  'enables',
  'produces',
  'feeds',
  'informs',
  'guides',
  'governs',
  'validates',
  'substantiates',
  'translates_into',
  'supports',
  'visualizes',
  'closes',
  'calibrates'
];

export const graphLayers = [
  { id: 'foundations', label: 'Foundations', x: 0 },
  { id: 'methods', label: 'Analytical Methods', x: 360 },
  { id: 'systems', label: 'Systems / Infrastructure', x: 720 },
  { id: 'evidence-loop', label: 'AOS Evidence Loop', x: 1080 },
  { id: 'portfolio', label: 'Portfolio / Career Translation', x: 1440 }
];

export const graphNodes = [
  {
    id: 'probability-statistics',
    type: 'module',
    position: { x: 0, y: 0 },
    data: {
      label: 'Probability and Statistics',
      kind: 'module',
      description: 'The uncertainty foundation for inference, estimation, model evaluation, and evidence quality.',
      path: 'apps/aos-landing/src/data/curriculum.json',
      status: 'foundation'
    }
  },
  {
    id: 'economics',
    type: 'module',
    position: { x: 0, y: 180 },
    data: {
      label: 'Economics',
      kind: 'module',
      description: 'Business value, incentives, labor markets, platform strategy, and ROI reasoning for analytical work.',
      path: 'apps/aos-landing/src/data/curriculum.json',
      status: 'foundation'
    }
  },
  {
    id: 'causal-inference',
    type: 'module',
    position: { x: 0, y: 360 },
    data: {
      label: 'Causal Inference',
      kind: 'module',
      description: 'Identification discipline for separating correlation, confounding, and intervention effects.',
      path: 'apps/aos-landing/src/data/curriculum.json',
      status: 'foundation'
    }
  },
  {
    id: 'experimental-design',
    type: 'module',
    position: { x: 0, y: 540 },
    data: {
      label: 'Experimental Design',
      kind: 'module',
      description: 'Treatment assignment, validity, power, guardrail metrics, and causal measurement discipline.',
      path: 'apps/aos-landing/src/data/curriculum.json',
      status: 'foundation'
    }
  },
  {
    id: 'econometrics-statistical-analysis',
    type: 'module',
    position: { x: 360, y: 90 },
    data: {
      label: 'Econometrics / Statistical Analysis',
      kind: 'module',
      description: 'Estimation, regression, uncertainty quantification, and disciplined interpretation of empirical evidence.',
      path: 'apps/aos-landing/src/data/curriculum.json',
      status: 'method'
    }
  },
  {
    id: 'machine-learning',
    type: 'module',
    position: { x: 360, y: 270 },
    data: {
      label: 'Machine Learning',
      kind: 'module',
      description: 'Prediction, validation, error analysis, interpretability, and model boundary-setting.',
      path: 'apps/aos-landing/src/data/curriculum.json',
      status: 'method'
    }
  },
  {
    id: 'data-analytics-metrics',
    type: 'module',
    position: { x: 360, y: 450 },
    data: {
      label: 'Data Analytics / Metrics',
      kind: 'module',
      description: 'Operational measurement layer where analytical questions become metrics, diagnostics, and decision evidence.',
      path: 'apps/aos-landing/src/data/curriculum.json',
      status: 'method'
    }
  },
  {
    id: 'quant-finance-options',
    type: 'module',
    position: { x: 360, y: 630 },
    data: {
      label: 'Quantitative Finance / Options',
      kind: 'module',
      description: 'Risk, convexity, volatility, backtesting, and regime-awareness as applied analytical judgment.',
      path: 'apps/aos-landing/src/data/curriculum.json',
      status: 'method'
    }
  },
  {
    id: 'data-engineering',
    type: 'governance',
    position: { x: 720, y: 0 },
    data: {
      label: 'Data Engineering',
      kind: 'governance',
      description: 'Schemas, reproducibility, pipelines, and data quality controls that make analysis trustworthy.',
      path: 'apps/aos-landing/src/data/curriculum.json',
      status: 'infrastructure'
    }
  },
  {
    id: 'ai-assisted-workflows',
    type: 'prompt',
    position: { x: 720, y: 160 },
    data: {
      label: 'AI-Assisted Workflows',
      kind: 'prompt',
      description: 'Prompted workflow roles for review, revision, audit, implementation, and bounded AI assistance.',
      path: 'prompts/',
      status: 'governed'
    }
  },
  {
    id: 'rag-source-governance',
    type: 'rag',
    position: { x: 720, y: 320 },
    data: {
      label: 'RAG Source Governance',
      kind: 'rag',
      description: 'Source admission and provenance rules that govern what can support a claim without adding retrieval here.',
      path: 'docs/rag/',
      status: 'referenced only'
    }
  },
  {
    id: 'repo-hygiene-public-release',
    type: 'governance',
    position: { x: 720, y: 480 },
    data: {
      label: 'Repo Hygiene / Public Release',
      kind: 'governance',
      description: 'Clean working trees, scoped changes, and release discipline that create public trust in evidence.',
      path: '.git/',
      status: 'guardrail'
    }
  },
  {
    id: 'frontend-interface',
    type: 'frontend',
    position: { x: 720, y: 640 },
    data: {
      label: 'Frontend / Product Interface',
      kind: 'frontend',
      description: 'The interface layer that makes curriculum, evidence, and system state legible to a human reviewer.',
      path: 'apps/aos-landing/',
      status: 'visualization'
    }
  },
  {
    id: 'lessons',
    type: 'lesson',
    position: { x: 1080, y: -40 },
    data: {
      label: 'Lessons',
      kind: 'lesson',
      description: 'Instructional units that convert domains and methods into concrete artifact assignments.',
      path: 'apps/aos-landing/src/data/curriculum.json',
      status: 'loop start'
    }
  },
  {
    id: 'artifacts',
    type: 'artifact',
    position: { x: 1080, y: 100 },
    data: {
      label: 'Artifacts',
      kind: 'artifact',
      description: 'Memos, notebooks, specs, diagrams, and reports produced as evidence-bearing work.',
      path: 'artifacts/',
      status: 'evidence object'
    }
  },
  {
    id: 'reviews',
    type: 'review',
    position: { x: 1080, y: 240 },
    data: {
      label: 'Reviews',
      kind: 'review',
      description: 'Quality pressure that identifies weak assumptions, unclear claims, missing evidence, and gaps.',
      path: 'reviews/',
      status: 'quality gate'
    }
  },
  {
    id: 'revisions',
    type: 'review',
    position: { x: 1080, y: 380 },
    data: {
      label: 'Revisions',
      kind: 'review',
      description: 'Targeted improvements made after review so the artifact can withstand audit.',
      path: 'revisions/',
      status: 'improvement pass'
    }
  },
  {
    id: 'audits',
    type: 'audit',
    position: { x: 1080, y: 520 },
    data: {
      label: 'Audits',
      kind: 'audit',
      description: 'Final check that an artifact is traceable, defensible, and ready to count as durable evidence.',
      path: 'audits/',
      status: 'quality gate'
    }
  },
  {
    id: 'closure',
    type: 'audit',
    position: { x: 1080, y: 660 },
    data: {
      label: 'Closure',
      kind: 'audit',
      description: 'The state where a learning loop is complete enough to support external claims.',
      path: 'artifacts/closed/',
      status: 'concept only'
    }
  },
  {
    id: 'source-registry',
    type: 'rag',
    position: { x: 1080, y: 800 },
    data: {
      label: 'Source Registry',
      kind: 'rag',
      description: 'Governed source record that lets claims point back to accepted evidence authority.',
      path: 'docs/rag/',
      status: 'referenced only'
    }
  },
  {
    id: 'evidence-authority',
    type: 'governance',
    position: { x: 1440, y: -40 },
    data: {
      label: 'Evidence Authority',
      kind: 'governance',
      description: 'The reason a portfolio claim should be believed: governed sources plus audited artifacts.',
      path: 'docs/rag/',
      status: 'claim support'
    }
  },
  {
    id: 'competencies',
    type: 'competency',
    position: { x: 1440, y: 120 },
    data: {
      label: 'Competencies',
      kind: 'competency',
      description: 'Skill claims earned through evidence rather than declared by course completion alone.',
      path: 'apps/aos-landing/src/data/curriculum.json',
      status: 'evidence backed'
    }
  },
  {
    id: 'portfolio-outputs',
    type: 'portfolio',
    position: { x: 1440, y: 280 },
    data: {
      label: 'Portfolio Outputs',
      kind: 'portfolio',
      description: 'External-facing case studies, technical artifacts, and proof packages produced from closed loops.',
      path: 'portfolio/',
      status: 'career evidence'
    }
  },
  {
    id: 'resume-claims',
    type: 'portfolio',
    position: { x: 1440, y: 440 },
    data: {
      label: 'Resume Claims',
      kind: 'portfolio',
      description: 'High-density claims that should trace back to concrete artifacts, audits, and competencies.',
      path: 'portfolio/',
      status: 'translation'
    }
  },
  {
    id: 'interview-narratives',
    type: 'portfolio',
    position: { x: 1440, y: 600 },
    data: {
      label: 'Interview Narratives',
      kind: 'portfolio',
      description: 'Stories that explain decisions, tradeoffs, failures, and revisions behind the evidence.',
      path: 'portfolio/',
      status: 'translation'
    }
  },
  {
    id: 'technical-gtm-positioning',
    type: 'portfolio',
    position: { x: 1440, y: 760 },
    data: {
      label: 'Technical GTM Positioning',
      kind: 'portfolio',
      description: 'Career positioning that connects analytical systems, business value, and credible product communication.',
      path: 'portfolio/',
      status: 'translation'
    }
  },
  {
    id: 'roi-business-value',
    type: 'portfolio',
    position: { x: 1440, y: 920 },
    data: {
      label: 'ROI / Business Value',
      kind: 'portfolio',
      description: 'The business-facing explanation of why the analytical work matters and what decision it improves.',
      path: 'portfolio/',
      status: 'translation'
    }
  }
];

export const graphEdges = [
  { id: 'stats-causal', source: 'probability-statistics', target: 'causal-inference', label: 'grounds', type: 'grounds' },
  { id: 'stats-econometrics', source: 'probability-statistics', target: 'econometrics-statistical-analysis', label: 'grounds', type: 'grounds' },
  { id: 'causal-econometrics', source: 'causal-inference', target: 'econometrics-statistical-analysis', label: 'estimates', type: 'estimates' },
  { id: 'experiments-metrics', source: 'experimental-design', target: 'data-analytics-metrics', label: 'measures', type: 'measures' },
  { id: 'economics-roi', source: 'economics', target: 'roi-business-value', label: 'translates into', type: 'translates_into' },
  { id: 'economics-gtm', source: 'economics', target: 'technical-gtm-positioning', label: 'calibrates', type: 'calibrates' },
  { id: 'econometrics-analytics', source: 'econometrics-statistical-analysis', target: 'data-analytics-metrics', label: 'enables', type: 'enables' },
  { id: 'analytics-data-eng', source: 'data-analytics-metrics', target: 'data-engineering', label: 'informs', type: 'informs' },
  { id: 'ml-ai-workflows', source: 'machine-learning', target: 'ai-assisted-workflows', label: 'calibrates', type: 'calibrates' },
  { id: 'quant-econometrics', source: 'econometrics-statistical-analysis', target: 'quant-finance-options', label: 'supports', type: 'supports' },
  { id: 'methods-lessons', source: 'data-analytics-metrics', target: 'lessons', label: 'translates into', type: 'translates_into' },
  { id: 'quant-lessons', source: 'quant-finance-options', target: 'lessons', label: 'supports', type: 'supports' },
  { id: 'ai-lessons', source: 'ai-assisted-workflows', target: 'lessons', label: 'supports', type: 'supports' },
  { id: 'rag-authority', source: 'rag-source-governance', target: 'evidence-authority', label: 'governs', type: 'governs' },
  { id: 'rag-source-registry', source: 'rag-source-governance', target: 'source-registry', label: 'governs', type: 'governs' },
  { id: 'source-registry-authority', source: 'source-registry', target: 'evidence-authority', label: 'validates', type: 'validates' },
  { id: 'repo-public-trust', source: 'repo-hygiene-public-release', target: 'evidence-authority', label: 'supports', type: 'supports' },
  { id: 'repo-audits', source: 'repo-hygiene-public-release', target: 'audits', label: 'validates', type: 'validates' },
  { id: 'frontend-legibility', source: 'frontend-interface', target: 'portfolio-outputs', label: 'visualizes', type: 'visualizes' },
  { id: 'frontend-lessons', source: 'frontend-interface', target: 'lessons', label: 'visualizes', type: 'visualizes' },
  { id: 'lessons-artifacts', source: 'lessons', target: 'artifacts', label: 'guides', type: 'guides' },
  { id: 'artifacts-reviews', source: 'artifacts', target: 'reviews', label: 'feeds', type: 'feeds' },
  { id: 'reviews-revisions', source: 'reviews', target: 'revisions', label: 'guides', type: 'guides' },
  { id: 'revisions-audits', source: 'revisions', target: 'audits', label: 'feeds', type: 'feeds' },
  { id: 'audits-closure', source: 'audits', target: 'closure', label: 'closes', type: 'closes' },
  { id: 'closure-competencies', source: 'closure', target: 'competencies', label: 'substantiates', type: 'substantiates' },
  { id: 'closure-portfolio', source: 'closure', target: 'portfolio-outputs', label: 'translates into', type: 'translates_into' },
  { id: 'authority-resume', source: 'evidence-authority', target: 'resume-claims', label: 'supports', type: 'supports' },
  { id: 'competencies-portfolio', source: 'competencies', target: 'portfolio-outputs', label: 'supports', type: 'supports' },
  { id: 'portfolio-resume', source: 'portfolio-outputs', target: 'resume-claims', label: 'translates into', type: 'translates_into' },
  { id: 'portfolio-interviews', source: 'portfolio-outputs', target: 'interview-narratives', label: 'translates into', type: 'translates_into' },
  { id: 'technical-communication-interviews', source: 'frontend-interface', target: 'interview-narratives', label: 'supports', type: 'supports' },
  { id: 'gtm-portfolio', source: 'technical-gtm-positioning', target: 'portfolio-outputs', label: 'calibrates', type: 'calibrates' },
  { id: 'roi-resume', source: 'roi-business-value', target: 'resume-claims', label: 'supports', type: 'supports' }
];

export const fallbackGraph = {
  nodes: [
    {
      id: 'graph-fallback',
      type: 'system',
      position: { x: 0, y: 0 },
      data: {
        label: 'Knowledge graph unavailable',
        kind: 'system',
        description: 'The static concept atlas could not be loaded. The AOS app can still render without backend services.',
        path: 'apps/aos-landing/src/graph/graphData.js',
        status: 'fallback'
      }
    }
  ],
  edges: []
};
