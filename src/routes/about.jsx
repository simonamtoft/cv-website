import { useLocation } from 'react-router';
import About from '../components/About';
import PageTransition from '../components/PageTransition';
import { buildMeta } from '../utils/meta';

export function meta() {
  return buildMeta({ title: 'About | Simon Amtoft Pedersen', path: '/about' });
}

export default function AboutRoute() {
  const location = useLocation();
  return (
    <PageTransition key={location.key}>
      <main className="main-content page-content" id="main-content">
        <About />
      </main>
    </PageTransition>
  );
}
