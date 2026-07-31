import { useLocation } from 'react-router';
import Writing from '../components/Writing';
import PageTransition from '../components/PageTransition';
import { buildMeta } from '../utils/meta';

export function meta() {
  return buildMeta({ title: 'Writing | Simon Amtoft Pedersen', path: '/writing' });
}

export default function WritingRoute() {
  const location = useLocation();
  return (
    <PageTransition key={location.key}>
      <main className="main-content page-content" id="main-content">
        <Writing />
      </main>
    </PageTransition>
  );
}
