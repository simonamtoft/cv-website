import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Grid2X2, Maximize, Printer, X } from "lucide-react";
import { ScaledSlide, StillSlides } from "./components/SlideLayout";
import { slides } from "./components/deck";

const requestedSlide = () => {
  const value = Number(new URLSearchParams(window.location.search).get("slide"));
  return Number.isInteger(value) ? Math.min(Math.max(value - 1, 0), slides.length - 1) : 0;
};

export default function App() {
  if (new URLSearchParams(window.location.search).has("print")) {
    return <PrintView />;
  }

  return <Deck />;
}

function Deck() {
  const scrollRef = useRef(null);
  const sectionsRef = useRef([]);
  const initialSlide = useRef(requestedSlide());
  const [active, setActive] = useState(initialSlide.current);
  const [overview, setOverview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(() => Boolean(document.fullscreenElement));
  const [chromeVisible, setChromeVisible] = useState(true);
  const [entered, setEntered] = useState(() =>
    [initialSlide.current, initialSlide.current + 1].filter((index) => index < slides.length),
  );
  const hideTimer = useRef(null);

  const goTo = useCallback((index) => {
    const element = scrollRef.current;
    if (!element) return;
    const clamped = Math.min(Math.max(index, 0), slides.length - 1);
    element.scrollTo({ top: clamped * element.clientHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (element && initialSlide.current > 0) {
      element.scrollTop = initialSlide.current * element.clientHeight;
    }
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return undefined;

    const preload = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => Number(entry.target.dataset.index));
      if (visible.length) {
        setEntered((current) => [...new Set([...current, ...visible])]);
      }
    }, { root: element, rootMargin: "60% 0px", threshold: 0 });

    const activeObserver = new IntersectionObserver((entries) => {
      const best = entries.reduce((candidate, entry) =>
        entry.intersectionRatio > candidate.intersectionRatio ? entry : candidate,
      entries[0]);
      if (best?.intersectionRatio >= 0.6) setActive(Number(best.target.dataset.index));
    }, { root: element, threshold: [0, 0.25, 0.6, 0.9, 1] });

    sectionsRef.current.forEach((node) => {
      if (!node) return;
      preload.observe(node);
      activeObserver.observe(node);
    });

    return () => {
      preload.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.search = active ? `?slide=${active + 1}` : "";
    window.history.replaceState({}, "", url);
    document.title = `${active + 1}/${slides.length} · ${slides[active]?.title ?? "Claude Code workshop"}`;
  }, [active]);

  useEffect(() => {
    const updateFullscreenState = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", updateFullscreenState);
    return () => document.removeEventListener("fullscreenchange", updateFullscreenState);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (["ArrowRight", "ArrowDown", " "].includes(event.key)) {
        event.preventDefault();
        goTo(active + 1);
      } else if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        goTo(active - 1);
      } else if (["g", "G"].includes(event.key)) {
        setOverview((current) => !current);
      } else if (event.key === "Escape") {
        setOverview(false);
      } else if (["F5", "f", "F"].includes(event.key)) {
        event.preventDefault();
        void document.documentElement.requestFullscreen().catch(() => {});
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, goTo]);

  const wake = useCallback(() => {
    setChromeVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setChromeVisible(false), 2600);
  }, []);

  useEffect(() => {
    wake();
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, [wake]);

  return (
    <div className="relative h-screen overflow-hidden bg-background" onMouseMove={wake} onTouchStart={wake}>
      <div ref={scrollRef} onScroll={wake} className="no-scrollbar h-full snap-y snap-mandatory overflow-y-scroll scroll-smooth">
        {slides.map((slide, index) => (
          <section
            key={slide.id}
            id={slide.id}
            data-index={index}
            ref={(element) => { sectionsRef.current[index] = element; }}
            className="relative h-screen w-full snap-start"
          >
            {entered.includes(index) ? <ScaledSlide>{slide.render()}</ScaledSlide> : <div className="h-full w-full" />}
          </section>
        ))}
      </div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-30 h-[3px] bg-accent"
        animate={{ width: `${((active + 1) / slides.length) * 100}%` }}
        transition={{ duration: 0.45, ease: [0.22, 0.9, 0.24, 1] }}
      />

      <motion.nav
        aria-label="Slides"
        className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex"
        animate={{ opacity: chromeVisible ? 1 : 0.25 }}
      >
        {slides.map((slide, index) => (
          <button key={slide.id} onClick={() => goTo(index)} title={`${index + 1} · ${slide.title}`} aria-label={slide.title} className="group flex items-center justify-end gap-2">
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs text-muted-foreground opacity-0 transition-all duration-300 group-hover:max-w-[220px] group-hover:opacity-100">{slide.title}</span>
            <span className={`block transition-all duration-300 ${index === active ? "h-6 w-[3px] bg-accent" : "h-[3px] w-[3px] bg-foreground/30 group-hover:bg-accent"}`} />
          </button>
        ))}
      </motion.nav>

      {!isFullscreen && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 border border-border bg-card/85 px-2 py-1 backdrop-blur"
          animate={{ opacity: chromeVisible ? 1 : 0, y: chromeVisible ? 0 : 12 }}
          transition={{ duration: 0.25 }}
        >
          <span className="whitespace-nowrap px-2 font-mono text-xs text-muted-foreground">{String(active + 1).padStart(2, "0")} / {slides.length}</span>
          <Chip label="Overview (G)" onClick={() => setOverview(true)}><Grid2X2 className="size-4" /></Chip>
          <Chip label="Present (F)" onClick={() => void document.documentElement.requestFullscreen().catch(() => {})}><Maximize className="size-4" /></Chip>
          <a href="?print" target="_blank" rel="noreferrer" title="Print / PDF" aria-label="Print / PDF" className="inline-flex size-9 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"><Printer className="size-4" /></a>
          <a href="/talks" title="Back to Talks" aria-label="Back to Talks" className="inline-flex size-9 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"><ExternalLink className="size-4" /></a>
        </motion.div>
      )}

      <AnimatePresence>
        {overview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 overflow-y-auto bg-background/97 backdrop-blur">
            <div className="flex items-center justify-between px-6 py-4">
              <p className="font-display text-lg uppercase tracking-tight">All slides</p>
              <button onClick={() => setOverview(false)} aria-label="Close overview" className="inline-flex size-9 items-center justify-center text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-5 px-6 pb-10 lg:grid-cols-3 xl:grid-cols-4">
              {slides.map((slide, index) => (
                <button key={slide.id} onClick={() => { setOverview(false); requestAnimationFrame(() => goTo(index)); }} className="group text-left">
                  <div className={`aspect-video overflow-hidden border transition-colors ${index === active ? "border-accent" : "border-border group-hover:border-accent/60"}`}>
                    <StillSlides><ScaledSlide still>{slide.render()}</ScaledSlide></StillSlides>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")} · {slide.title}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chip({ children, label, onClick }) {
  return <button onClick={onClick} title={label} aria-label={label} className="inline-flex size-9 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">{children}</button>;
}

function PrintView() {
  useEffect(() => { document.title = "Print · Claude Code workshop"; }, []);
  return (
    <main className="bg-secondary">
      <div className="print-hide mx-auto max-w-[1100px] px-6 py-8">
        <h1 className="font-display text-2xl tracking-tight">Print edition · Claude Code workshop</h1>
        <p className="mt-2 text-sm text-muted-foreground">Press Cmd/Ctrl + P and choose “Save as PDF”. Each slide prints on its own landscape page.</p>
      </div>
      <div className="flex flex-col items-center gap-6 pb-10">
        {slides.map((slide) => <div key={slide.id} className="print-slide origin-top-left" style={{ width: 1920, height: 1080, zoom: 0.5 }}><StillSlides>{slide.render()}</StillSlides></div>)}
      </div>
    </main>
  );
}
