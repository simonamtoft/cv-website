import React from 'react';
import { Outlet, Meta, Links, ScrollRestoration, Scripts } from 'react-router';
import Nav from './components/Nav';
import BackToTop from './components/BackToTop';
import ReadingProgress from './components/ReadingProgress';
import ErrorBoundaryClass from './components/ErrorBoundary';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import { useSwipeNav } from './hooks/useSwipeNav';
import './styles/App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Simon Amtoft Pedersen',
  url: 'https://amtoft.dev',
  jobTitle: 'ML Engineer & Data Scientist',
  sameAs: [
    'https://www.linkedin.com/in/simonamtoft/',
    'https://github.com/SimonAmtoft',
  ],
  email: 'simon@amtoft.dev',
};

// The document shell. Ported from the former root index.html so the prerendered
// static HTML keeps the same <head> (SEO/OG/JSON-LD, fonts, favicon).
export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

        {/* Title, description, and OG/Twitter tags come from each route's
            meta() export via <Meta /> below (see src/utils/meta.js). Kept out
            of the shell so per-route/per-article tags are not duplicated. */}
        <meta name="author" content="Simon Amtoft Pedersen" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Per-route meta and links exports render here. */}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// The persistent app shell around the routed page (was App.js / AppContent).
export default function App() {
  useKeyboardNav();
  useSwipeNav();
  return (
    <ErrorBoundaryClass>
      <ReadingProgress />
      <Nav />
      <div className="app-routes">
        <Outlet />
      </div>
      <BackToTop />
    </ErrorBoundaryClass>
  );
}
