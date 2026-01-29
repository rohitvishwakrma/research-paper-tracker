import { useMemo } from 'react';
import { usePapers } from '../context/PaperContext';
import { RESEARCH_DOMAINS, IMPACT_SCORES } from '../utils/constants';

export const usePaperAnalytics = () => {
  const { papers } = usePapers();

  const analytics = useMemo(() => {
    const totalPapers = papers.length;

    const fullyRead = papers.filter(
      p => p.readingStage === 'Fully Read'
    ).length;

    const completionRate =
      totalPapers > 0
        ? Number(((fullyRead / totalPapers) * 100).toFixed(1))
        : 0;

    const totalCitations = papers.reduce(
      (sum, paper) => sum + (paper.citationCount || 0),
      0
    );

    const avgCitations =
      totalPapers > 0 ? Math.round(totalCitations / totalPapers) : 0;

    // Papers by domain
    const papersByDomain = RESEARCH_DOMAINS.reduce((acc, domain) => {
      acc[domain] = papers.filter(
        p => p.researchDomain === domain
      ).length;
      return acc;
    }, {});

    // Papers by impact score
    const papersByImpact = IMPACT_SCORES.reduce((acc, impact) => {
      acc[impact] = papers.filter(
        p => p.impactScore === impact
      ).length;
      return acc;
    }, {});

    // Average citations by domain
    const avgCitationsByDomain = RESEARCH_DOMAINS.reduce((acc, domain) => {
      const domainPapers = papers.filter(
        p => p.researchDomain === domain
      );

      acc[domain] =
        domainPapers.length > 0
          ? Math.round(
              domainPapers.reduce(
                (sum, p) => sum + (p.citationCount || 0),
                0
              ) / domainPapers.length
            )
          : 0;

      return acc;
    }, {});

    return {
      totalPapers,
      fullyRead,
      completionRate,
      avgCitations,
      papersByDomain,
      papersByImpact,
      avgCitationsByDomain,
    };
  }, [papers]);

  return analytics;
};
 