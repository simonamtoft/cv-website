import { redirect } from 'react-router';

// /talks was renamed to /events; keep old links working.
export function clientLoader() {
  throw redirect('/events');
}

export default function TalksRedirect() {
  return null;
}
