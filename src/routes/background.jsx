import { useLocation } from 'react-router';
import Timeline from '../components/Timeline';
import PageTransition from '../components/PageTransition';
import { buildMeta } from '../utils/meta';

export function meta() {
  return buildMeta({ title: 'Background | Simon Amtoft Pedersen', path: '/background' });
}

export default function BackgroundRoute() {
  const location = useLocation();
  return (
    <PageTransition key={location.key}>
      <main className="main-content page-content" id="main-content">
        <Timeline />
      </main>
    </PageTransition>
  );
}
