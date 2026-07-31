import { useLocation } from 'react-router';
import Talks from '../components/Talks';
import PageTransition from '../components/PageTransition';
import { buildMeta } from '../utils/meta';

export function meta() {
  return buildMeta({ title: 'Talks | Simon Amtoft Pedersen', path: '/talks' });
}

export default function TalksRoute() {
  const location = useLocation();
  return (
    <PageTransition key={location.key}>
      <main className="main-content page-content" id="main-content">
        <Talks />
      </main>
    </PageTransition>
  );
}
