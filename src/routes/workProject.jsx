import { useLocation, useParams } from 'react-router';
import WorkDetailView from '../components/work/WorkDetailView';
import PageTransition from '../components/PageTransition';
import { getProjectBySlug } from '../data/work';
import { buildMeta } from '../utils/meta';

export function meta({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return buildMeta({ title: 'Work | Simon Amtoft Pedersen', path: '/work' });
  }
  const { title, summary, slug } = project.frontmatter;
  return buildMeta({
    title: `${title} | Simon Amtoft Pedersen`,
    description: summary,
    path: `/work/${slug}`,
    imagePath: `/og/work/${slug}.png`,
    type: 'article',
  });
}

export default function WorkProjectRoute() {
  const location = useLocation();
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  return (
    <PageTransition key={location.key}>
      <main className="main-content page-content" id="main-content">
        {project ? (
          <WorkDetailView project={project} />
        ) : (
          <p className="article-not-found">Project not found.</p>
        )}
      </main>
    </PageTransition>
  );
}
