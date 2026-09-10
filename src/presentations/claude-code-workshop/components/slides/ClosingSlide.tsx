import { SlideLayout } from "../SlideLayout";
import { Reveal } from "../SlideMotion";
import imLogoNegative from "../../assets/IM_-logo_negativ.svg";
import { BlinkUnderscore } from "./SlideAccent";

export function ClosingSlide({ page }: { page: number }) {
  return (
    <SlideLayout variant="navy">
      <div className="absolute top-0 left-0 h-[16px] w-[420px] bg-slide-pink" />
      <img
        src={imLogoNegative}
        alt=""
        className="absolute top-[78px] right-[130px] h-[48px] w-auto"
      />
      <div className="relative flex h-full flex-col justify-center px-[140px]">
        <Reveal delay={0.05}>
          <p className="slide-kicker text-slide-accent-soft">Med hjem</p>
        </Reveal>
        <Reveal delay={0.16} y={40}>
          <h2 className="slide-title-lg mt-[30px] max-w-[1250px]">
            Prøv det igen inden næste fredag
            <BlinkUnderscore />
          </h2>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="slide-subtitle mt-[36px] max-w-[1050px] text-slide-bg/80">
            Ikke et projekt. Bare én opgave, du plejer at lave i hånden.
          </p>
        </Reveal>
        <p className="slide-body mt-[56px] font-mono text-slide-bg/70">Tak for i dag</p>
      </div>
      <span className="slide-page absolute right-[130px] bottom-[70px] font-mono text-slide-bg/60">
        {String(page).padStart(2, "0")}
      </span>
    </SlideLayout>
  );
}
