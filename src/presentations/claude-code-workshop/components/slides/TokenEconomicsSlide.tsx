import { SlideFrame } from "../SlideLayout";

function FocusedTasksIllustration() {
  return (
    <svg
      viewBox="0 0 760 340"
      className="block h-[280px] w-full"
      role="img"
      aria-label="En stor opgave med blandet kontekst deles i tre afgrænsede opgaver, hver med mindre og kun relevant kontekst."
    >
      <g fill="currentColor" className="text-slide-ink-soft" fontSize="26">
        <text x="128" y="30" textAnchor="middle">Alt på én gang</text>
        <text x="548" y="30" textAnchor="middle">Én opgave ad gangen</text>
      </g>

      <g stroke="var(--slide-rule)" strokeWidth="2" fill="var(--slide-surface)">
        <rect x="48" y="66" width="190" height="228" transform="rotate(5 143 180)" />
        <rect x="28" y="74" width="190" height="228" transform="rotate(-5 123 188)" />
        <rect x="32" y="78" width="190" height="228" />
      </g>
      {[0, 1, 2].map((group) => (
        <g key={group} transform={`translate(56 ${104 + group * 62})`}>
          <path d="M0 0H112 M0 16H140 M0 32H82" fill="none" stroke="var(--slide-ink-soft)" strokeOpacity="0.35" strokeWidth="7" />
          <path d={group === 1 ? "M92 32H140" : "M122 0H140"} stroke="var(--slide-accent)" strokeWidth="7" />
        </g>
      ))}

      <path d="M264 190H326 M314 178L326 190L314 202" fill="none" stroke="var(--slide-accent)" strokeWidth="3" />
      {[0, 1, 2].map((task) => (
        <g key={task} transform={`translate(${362 + task * 128} 112)`}>
          <rect width="112" height="146" fill="var(--slide-pink)" fillOpacity="0.25" stroke="var(--slide-accent)" strokeOpacity="0.45" strokeWidth="2" />
          <text x="18" y="36" fill="var(--slide-accent)" fontSize="24" className="font-mono">0{task + 1}</text>
          <path d="M18 66H94 M18 84H94 M18 102H66" stroke="var(--slide-accent)" strokeWidth="6" fill="none" />
        </g>
      ))}
      <text x="546" y="304" textAnchor="middle" fill="var(--slide-accent)" fontSize="26">Kun relevant kontekst</text>
    </svg>
  );
}

function CacheTimelineIllustration() {
  return (
    <svg
      viewBox="0 0 760 340"
      className="block h-[280px] w-full"
      role="img"
      aria-label="Tre ture i samme samtale: Konteksten vokser med tidligere input, svar og værktøjsresultater. Første tur opretter cache; de næste ture genbruger den voksende historik billigere. Nyt input tilføjes hver gang."
    >
      <path d="M112 62H648" stroke="var(--slide-green)" strokeOpacity="0.35" strokeWidth="2" />
      {[0, 1, 2].map((turn) => {
        const contextHeight = 58 + turn * 42;
        const contextBottom = 88 + contextHeight;
        const bubbleBottom = contextBottom + 50;

        return (
          <g key={turn} transform={`translate(${12 + turn * 268} 0)`}>
            <text x="100" y="28" textAnchor="middle" fill="var(--slide-ink-soft)" fontSize="26">Tur {turn + 1}</text>
            <circle cx="100" cy="62" r="8" fill={turn === 0 ? "var(--slide-bg)" : "var(--slide-green)"} stroke="var(--slide-green)" strokeWidth="2" />
            <path d="M100 72V88" stroke="var(--slide-green)" strokeOpacity="0.35" strokeWidth="2" />
            <path d={`M0 88H200V${bubbleBottom}H40L18 ${bubbleBottom + 22}V${bubbleBottom}H0Z`} fill="var(--slide-surface)" stroke="var(--slide-rule)" strokeWidth="2" />
            <rect x="1" y="89" width="198" height={contextHeight - 1} fill="var(--slide-sage)" fillOpacity={turn === 0 ? "0.2" : "0.65"} />
            <text x="100" y="124" textAnchor="middle" fill="var(--slide-green)" fontSize="25" fontWeight="600">Kontekst</text>
            {Array.from({ length: turn }, (_, previousTurn) => (
              <g key={previousTurn} transform={`translate(0 ${146 + previousTurn * 42})`}>
                <path d="M18 0H182" stroke="var(--slide-green)" strokeOpacity="0.25" />
                <text x="100" y="29" textAnchor="middle" fill="var(--slide-green)" fontSize="24">+ tur {previousTurn + 1}</text>
              </g>
            ))}
            <rect x="122" y={contextBottom + 12} width="66" height="28" fill="var(--slide-pink)" fillOpacity="0.55" />
            <text x="155" y={contextBottom + 33} textAnchor="middle" fill="var(--slide-accent)" fontSize="22">+ nyt</text>
            <text x="100" y="330" textAnchor="middle" fill={turn === 0 ? "var(--slide-ink-soft)" : "var(--slide-green)"} fontSize="26" fontWeight={turn === 0 ? "400" : "600"}>
              {turn === 0 ? "Gem i cache" : "↳ Genbrug"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function TokenEconomicsSlide({ page }: { page: number }) {
  return (
    <SlideFrame
      kicker="Tokens og genbrug"
      title="Små opgaver. Mindre spild."
      page={page}
      footer="Kilde: code.claude.com/docs/en/prompt-caching · *Cachetid afhænger af abonnement og opsætning"
    >
      <div className="flex h-full flex-col gap-[36px]">
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-[64px]">
          <section className="flex flex-col">
            <h3 className="flex items-center gap-[20px]">
              <span className="font-mono text-[26px] text-slide-accent">01</span>
              <span className="slide-subtitle font-display uppercase">Mindre kontekst</span>
            </h3>
            <div className="mt-[26px]">
              <FocusedTasksIllustration />
            </div>
            <p className="mt-auto pt-[16px] slide-body-lg font-semibold leading-[1.2]">
              Lettere at løse.<br />
              <span className="text-slide-accent">Mindre input at betale for.</span>
            </p>
          </section>

          <section className="flex flex-col border-l border-solid border-slide-rule pl-[48px]">
            <h3 className="flex items-center gap-[20px]">
              <span className="font-mono text-[26px] text-slide-green">02</span>
              <span className="slide-subtitle font-display uppercase">Genbrug kontekst</span>
            </h3>
            <div className="mt-[26px]">
              <CacheTimelineIllustration />
            </div>
            <p className="mt-[8px] text-[24px] text-slide-ink-soft">
              <span className="font-mono text-slide-green">5 min. / 1 time*</span>
              <span className="px-[12px]">·</span>Fornyes ved cache-hit
            </p>
            <p className="mt-auto pt-[16px] slide-body-lg font-semibold leading-[1.2]">
              Genbrugt input<br />
              <span className="text-slide-green">er billigere.</span>
            </p>
          </section>
        </div>

        <div className="shrink-0 border-t border-solid border-slide-rule pt-[26px]">
          <div className="grid grid-cols-2 gap-[32px] text-[34px] font-semibold">
            <p>Samme opgave <span className="px-[10px] text-slide-accent">→</span> fortsæt chatten</p>
            <p>Nyt scope <span className="px-[10px] text-slide-accent">→</span> ny chat</p>
          </div>
          <p className="mt-[20px] text-[28px] text-slide-ink-soft">Vælg model og effort fra start.</p>
        </div>
      </div>
    </SlideFrame>
  );
}
