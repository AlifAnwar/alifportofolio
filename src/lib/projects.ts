import projectsData from "../../public/assets/contents/projects.json";

export type ProjectItem = {
  category: string;
  challenge: string[];
  client: string;
  description: string;
  highlights: string[];
  imageSrc: string[];
  liveUrl: string;
  name: string;
  outcome: string[];
  overview: string;
  role: string;
  sourceUrl: string;
  slug: string;
  solution: string[];
  stack: string[];
  timeline: string;
  year: string;
};

export const projects = projectsData as ProjectItem[];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: ProjectItem, limit = 3) {
  const scoredProjects = projects
    .filter((candidate) => candidate.slug !== project.slug)
    .map((candidate) => {
      const sharedStackCount = candidate.stack.filter((stackItem) =>
        project.stack.includes(stackItem),
      ).length;
      const categoryScore = candidate.category === project.category ? 2 : 0;

      return {
        project: candidate,
        score: sharedStackCount + categoryScore,
      };
    })
    .sort((a, b) => b.score - a.score);

  return scoredProjects.slice(0, limit).map(({ project }) => project);
}
