import { redirect } from 'react-router';

// Former catch-all <Navigate to="/" replace />: redirect unknown paths home.
export function clientLoader() {
  throw redirect('/');
}

export default function CatchAll() {
  return null;
}
