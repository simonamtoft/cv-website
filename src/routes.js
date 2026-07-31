import { index, route } from '@react-router/dev/routes';

// Route table (paths relative to appDirectory = "src").
export default [
  index('routes/home.jsx'),
  route('about', 'routes/about.jsx'),
  route('background', 'routes/background.jsx'),
  route('writing', 'routes/writing.jsx'),
  route('writing/:slug', 'routes/article.jsx'),
  route('writing/:slug/present', 'routes/present.jsx'),
  route('talks', 'routes/talks.jsx'),
  route('contact', 'routes/contact.jsx'),
  // Unknown client-side paths redirect home (former <Navigate to="/" replace />).
  route('*', 'routes/catchall.jsx'),
];
