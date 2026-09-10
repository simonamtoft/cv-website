import { motion } from "motion/react";
import { SlideLayout, useSlideMotion } from "../SlideLayout";
import { inViewSoft } from "../SlideMotion";
import simonPhoto from "../../assets/siap.jpg";
import jeppePhoto from "../../assets/jere.jpg";
import implementLogo from "../../assets/Implement_plain.svg";

function Host({
  index,
  name,
  role,
  field,
  contact,
  photo,
  tint,
  align = "left",
}: {
  index: number;
  name: string;
  role: string;
  field: string;
  contact: string;
  photo: string;
  tint: string;
  align?: "left" | "right";
}) {
  const animate = useSlideMotion();
  const delay = 0.15 + index * 0.18;
  return (
    <div className="relative h-full overflow-hidden">
      {/* colour block behind the portrait */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{ background: tint }}
        initial={animate ? { height: 0 } : false}
        whileInView={{ height: "100%" }}
        viewport={inViewSoft}
        transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* portrait */}
      <motion.img
        src={photo}
        alt={name}
        className="absolute bottom-0 h-[860px] w-full object-cover object-[50%_18%] contrast-[1.05]"
        initial={animate ? { opacity: 0, y: 60 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewSoft}
        transition={{ delay: delay + 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="portrait-text-scrim absolute inset-x-0 bottom-0 h-[560px]" />

      <div
        className={`absolute inset-x-0 bottom-0 flex flex-col gap-[10px] p-[52px] ${
          align === "right" ? "items-end text-right" : "items-start"
        }`}
      >
        <motion.h3
          className="slide-title font-display uppercase leading-[0.9] text-slide-bg"
          initial={animate ? { opacity: 0, y: 30 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewSoft}
          transition={{ delay: delay + 0.35, duration: 0.6 }}
        >
          {name}
        </motion.h3>
        <motion.div
          initial={animate ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={inViewSoft}
          transition={{ delay: delay + 0.5, duration: 0.6 }}
          className={align === "right" ? "items-end" : "items-start"}
        >
          <p className="slide-body-lg text-slide-bg">{role}</p>
          <a
            href={`mailto:${contact}`}
            className="slide-body mt-[6px] text-slide-bg/85 underline decoration-slide-pink underline-offset-[6px] transition-colors hover:text-slide-pink focus-visible:text-slide-pink focus-visible:outline-none"
          >
            {contact}
          </a>
          <p className="mt-[14px] max-w-[720px] text-[24px] leading-[1.32] text-slide-bg/75">
            {field}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function HostsSlide() {
  const animate = useSlideMotion();
  return (
    <SlideLayout>
      <div className="flex h-full flex-col">
        <div className="flex items-end justify-between px-[80px] pt-[64px]">
          <div>
            <p className="slide-kicker text-slide-accent">Claude i praksis</p>
            <motion.h2
              className="slide-title-lg mt-[16px] font-display uppercase leading-[0.88]"
              initial={animate ? { opacity: 0, y: 30 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewSoft}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Tag fat i os
            </motion.h2>
          </div>
          <div className="pb-[10px] text-right">
            <img
              src={implementLogo}
              alt=""
              className="ml-auto h-[48px] w-auto"
            />
          </div>
        </div>

        <motion.div
          className="mx-[80px] mt-[34px] h-[3px] origin-left bg-slide-accent"
          initial={animate ? { scaleX: 0 } : false}
          whileInView={{ scaleX: 1 }}
          viewport={inViewSoft}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="mt-[30px] grid flex-1 grid-cols-2 gap-[24px] px-[80px] pb-[46px]">
          <Host
            index={0}
            name="Simon"
            role="Generative AI-konsulent, The Tech Collective"
            field="Hjælper virksomheder med at finde, hvor AI faktisk passer ind – og bygge det sammen med dem."
            contact="siap@thetechcollective.eu"
            photo={simonPhoto}
            tint="var(--slide-ink)"
          />
          <Host
            index={1}
            name="Jeppe Rasmussen"
            role="AI Engineer, The Tech Collective"
            field="Udvikler AI-agenter og RAG-applikationer."
            contact="jere@thetechcollective.eu"
            photo={jeppePhoto}
            tint="var(--slide-ink)"
            align="right"
          />
        </div>
      </div>
    </SlideLayout>
  );
}
