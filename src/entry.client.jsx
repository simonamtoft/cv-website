import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';

// Custom client entry (matches the RR7 default, kept as .jsx to fit this
// project's JS/JSX toolchain rather than the framework's .tsx default).
startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
