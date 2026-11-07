import { useLocation } from 'react-router';
import Events from '../components/Events';
import PageTransition from '../components/PageTransition';
import { buildMeta } from '../utils/meta';

export function meta() {
  return buildMeta({ title: 'Events | Simon Amtoft Pedersen', path: '/events' });
}

export default function EventsRoute() {
  const location = useLocation();
  return (
    <PageTransition key={location.key}>
      <main className="main-content page-content" id="main-content">
        <Events />
      </main>
    </PageTransition>
  );
}
