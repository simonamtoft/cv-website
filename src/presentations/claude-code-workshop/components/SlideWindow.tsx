import { cn } from "../utils";

export function WindowChrome({
  label,
  tone,
}: {
  label: string;
  tone: "light" | "dark";
}) {
  const dot = tone === "dark" ? "bg-slide-bg/30" : "bg-slide-ink/20";
  return (
    <div
      className={cn(
        "flex items-center gap-[10px] border-b px-[28px] py-[16px]",
        tone === "dark" ? "border-slide-bg/15" : "border-slide-rule",
      )}
    >
      {[0, 1, 2].map((index) => (
        <span key={index} className={cn("size-[12px] rounded-full", dot)} />
      ))}
      <span
        className={cn(
          "slide-chrome ml-[12px] font-mono",
          tone === "dark" ? "text-slide-bg/60" : "text-slide-ink-soft",
        )}
      >
        {label}
      </span>
    </div>
  );
}
