import Header from '../components/Header';
import { buildMeta } from '../utils/meta';

export function meta() {
  return buildMeta({
    title: 'Simon Amtoft Pedersen - ML Engineer & Data Scientist | amtoft.dev',
    path: '/',
  });
}

// Hero page at "/". Rendered bare (no page-content wrapper), as before.
export default function HomeRoute() {
  return <Header />;
}
