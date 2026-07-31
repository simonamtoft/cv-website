import { useLocation } from 'react-router';
import Contact from '../components/Contact';
import PageTransition from '../components/PageTransition';
import { buildMeta } from '../utils/meta';

export function meta() {
  return buildMeta({ title: 'Contact | Simon Amtoft Pedersen', path: '/contact' });
}

export default function ContactRoute() {
  const location = useLocation();
  return (
    <PageTransition key={location.key}>
      <main className="main-content page-content" id="main-content">
        <Contact />
      </main>
    </PageTransition>
  );
}
