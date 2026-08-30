import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../utils";
import imLogo from "../assets/IM_-logo.svg";

/* ------------------------------------------------------------------ */
/* Motion context: thumbnails and print render still                  */
/* ------------------------------------------------------------------ */

const SlideMotionContext = createContext(true);

export function useSlideMotion() {
  return useContext(SlideMotionContext);
}

/** Renders children with all slide animations in their final, static state. */
export function StillSlides({ children }: { children: ReactNode }) {
  return (
    <SlideMotionContext.Provider value={false}>
      {children}
    </SlideMotionContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Scaling shell                                                       */
/* ------------------------------------------------------------------ */

export function ScaledSlide({
  children,
  className,
  fixedScale,
  still,
}: {
  children: ReactNode;
  className?: string;
  fixedScale?: number;
  still?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(fixedScale ?? 0.3);

  useEffect(() => {
    if (fixedScale) return;
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      setScale(Math.min(width / 1920, height / 1080));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fixedScale]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
    >
      <div
        className="slide-wrapper"
        style={{ ["--scale" as string]: String(scale) }}
      >
        <SlideMotionContext.Provider value={!still}>
          {children}
        </SlideMotionContext.Provider>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Slide frame + primitives                                            */
/* ------------------------------------------------------------------ */

export function SlideLayout({
  children,
  variant = "light",
  className,
}: {
  children: ReactNode;
  variant?: "light" | "navy";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "slide-content",
        variant === "navy"
          ? "bg-slide-navy text-slide-bg"
          : "bg-slide-bg text-slide-ink",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SlideFrame({
  kicker,
  title,
  lead,
  children,
  page,
  footer,
}: {
  kicker?: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
  page?: number;
  footer?: string;
}) {
  return (
    <SlideLayout>
      <div className="flex h-full flex-col px-[120px] pt-[86px] pb-[64px]">
        <header className="shrink-0">
          <div className="flex items-start justify-between">
            {kicker ? (
              <p className="slide-kicker text-slide-accent">{kicker}</p>
            ) : (
              <span />
            )}
            <span className="relative h-[24px] w-[100px] shrink-0">
              <img
                src={imLogo}
                alt=""
                className="absolute top-0 right-0 h-[42px] w-auto"
              />
            </span>
          </div>
          <h2 className="slide-title mt-[18px] max-w-[1500px]">{title}</h2>
          {lead && (
            <p className="slide-body-lg mt-[22px] max-w-[1250px] text-slide-ink-soft">
              {lead}
            </p>
          )}
        </header>
        <div className="mt-[52px] min-h-0 flex-1">{children}</div>
        <footer className="mt-[28px] flex shrink-0 items-end justify-between border-t border-slide-rule pt-[20px]">
          <span className="slide-footer text-slide-ink-soft">
            {footer ?? "Claude Code · Practical workshop"}
          </span>
          {page != null && (
            <span className="slide-page font-mono text-slide-ink-soft">
              {String(page).padStart(2, "0")}
            </span>
          )}
        </footer>
      </div>
    </SlideLayout>
  );
}
