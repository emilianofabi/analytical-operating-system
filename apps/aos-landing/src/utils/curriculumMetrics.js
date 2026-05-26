export const getTotalModules = (data) => {
  if (!data || !data.modules) return 0;
  return data.modules.length;
};

export const getTotalLessons = (data) => {
  if (!data || !data.modules) return 0;
  return data.modules.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0);
};

export const getModulesByTrack = (data) => {
  if (!data || !data.modules) return {};
  return data.modules.reduce((acc, mod) => {
    const track = mod.track || 'Unknown';
    acc[track] = (acc[track] || 0) + 1;
    return acc;
  }, {});
};

export const getLessonsByLoopStage = (data) => {
  if (!data || !data.modules) return {};
  return data.modules.reduce((acc, mod) => {
    (mod.lessons || []).forEach(lesson => {
      const stage = lesson.loopStage || 'unknown';
      acc[stage] = (acc[stage] || 0) + 1;
    });
    return acc;
  }, {});
};

export const getCompletedEvidenceCount = (data) => {
  if (!data || !data.modules) return 0;
  return data.modules.reduce((acc, mod) => acc + (mod.completedEvidence?.length || 0), 0);
};

export const getCompetencyEvidenceSummary = (data) => {
  if (!data || !data.competencies) return { withEvidence: 0, total: 0 };
  const total = data.competencies.length;
  const withEvidence = data.competencies.filter(c => c.evidence && c.evidence !== '-').length;
  return { withEvidence, total };
};

export const getNextArtifactQueue = (data) => {
  if (!data || !data.modules) return [];
  return data.modules
    .filter(mod => mod.nextArtifact)
    .map(mod => ({
      module: mod.title,
      artifact: mod.nextArtifact
    }));
};
