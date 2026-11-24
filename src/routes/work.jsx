import { useLocation } from 'react-router';
import Work from '../components/Work';
import PageTransition from '../components/PageTransition';
import { buildMeta } from '../utils/meta';

export function meta() {
  return buildMeta({
    title: 'Work | Simon Amtoft Pedersen',
    description:
      'Selected ML and AI projects Simon Amtoft Pedersen has helped build, described without client or employer names.',
    path: '/work',
  });
}

export default function WorkRoute() {
  const location = useLocation();
  return (
    <PageTransition key={location.key}>
      <main className="main-content page-content" id="main-content">
        <Work />
      </main>
    </PageTransition>
  );
}
