import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import WorkshopDeck from '../presentations/claude-code-workshop/App';
import workshopStyles from '../presentations/claude-code-workshop/styles.css?inline';

// The workshop uses Tailwind's reset and utility classes. Rendering it in a
// shadow root keeps those styles entirely within the presentation route.
export default function ClaudeCodeWorkshopPresentation() {
  const hostRef = useRef(null);
  const [mount, setMount] = useState(null);

  useEffect(() => {
    const host = hostRef.current;
    const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    let presentationMount = shadowRoot.querySelector('.workshop-presentation');

    if (!presentationMount) {
      const style = document.createElement('style');
      style.textContent = workshopStyles;
      presentationMount = document.createElement('div');
      presentationMount.className = 'workshop-presentation';
      shadowRoot.append(style, presentationMount);
    }

    setMount(presentationMount);
  }, []);

  return (
    <div className="workshop-presentation-host" ref={hostRef} style={{ minHeight: '100dvh' }}>
      {mount && createPortal(<WorkshopDeck />, mount)}
    </div>
  );
}
