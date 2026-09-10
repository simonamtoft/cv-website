import { SlideLayout } from "../SlideLayout";
import { Reveal } from "../SlideMotion";
import implementLogoNegative from "../../assets/Implement_plain_negativ.svg";
import { BlinkUnderscore } from "./SlideAccent";

/**
 * Hand-maintained: signals how fresh the product claims are (Chat/Cowork/Code
 * capabilities, permission modes). Bump it when those claims are revised, not
 * on every edit to the deck.
 */
const LAST_REVISED = "september 2026";

export function TitleSlide() {
  return (
    <SlideLayout variant="navy">
      {/* Rolig, flad farveblok i Implement-stil, uden effekter. */}
      <div className="absolute top-0 right-0 h-full w-[34%] bg-slide-bg/[0.04]" />
      <div className="absolute top-0 right-[34%] h-full w-px bg-slide-bg/15" />
      <div className="absolute top-0 right-0 h-[16px] w-[34%] bg-slide-pink" />

      <div className="relative flex h-full flex-col justify-between px-[130px] pt-[110px] pb-[90px]">

        <div className="flex items-start justify-between">
          <div>
            <p className="slide-kicker text-slide-pink">Practical workshop</p>
            <p className="slide-caption mt-[16px] font-mono text-slide-bg/80">
              Senest revideret · {LAST_REVISED}
            </p>
          </div>
          <img
            src={implementLogoNegative}
            alt="Implement Consulting Group"
            className="h-[64px] w-auto"
          />
        </div>
        <div>
          <Reveal delay={0.05} y={40}>
            <h1 className="slide-title-lg max-w-[1400px]">
              Claude i praksis
              <BlinkUnderscore />
            </h1>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="slide-subtitle mt-[34px] max-w-[1100px] text-slide-bg/80">
              Chat · Cowork · Code — byg noget i dag, som du kan bruge igen.
            </p>
          </Reveal>
        </div>
      </div>
    </SlideLayout>
  );
}
