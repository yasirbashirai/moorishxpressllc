import s from "./editorial.module.css";

const words = ["OTR Box Truck Freight", "Box Truck Dispatch", "Last Mile", "First Mile", "Hotshot Dispatch", "Liftgate Delivery", "24/7"];

function Band({ tone, reverse }: { tone: "red" | "gold"; reverse?: boolean }) {
  const list = [...words, ...words];
  return (
    <div className={`border-y-4 border-ink py-3 sm:py-4 ${tone === "red" ? "bg-red-gradient text-white" : "bg-gold-gradient text-ink"}`}>
      <div className={reverse ? s.trackReverse : s.track}>
        {list.map((w, i) => (
          <span key={i} className="flex shrink-0 items-center gap-6 px-6 font-display text-3xl font-bold uppercase tracking-wide sm:text-5xl">
            {w}
            <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true"><path d="M12 2 22 12 12 22 2 12z" fill="currentColor" /></svg>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two crossing caution-tape marquees, tilted like tape across a dock door. */
export default function CautionBands() {
  return (
    <section aria-hidden="true" className="relative h-[230px] overflow-hidden bg-ink sm:h-[320px]">
      <div className="absolute left-1/2 top-1/2 w-[140%] -translate-x-1/2 -translate-y-1/2 -rotate-[5deg] opacity-95">
        <Band tone="gold" reverse />
      </div>
      <div className="absolute left-1/2 top-1/2 w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-[4deg] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <Band tone="red" />
      </div>
    </section>
  );
}
