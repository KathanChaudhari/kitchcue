import { roadmapItems } from "./data";
import { RoadmapCard } from "./RoadmapCard";

export function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="scroll-mt-16 px-4 py-12 lg:px-6 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--primary)] lg:text-xs">
            The Road Ahead
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--foreground)] lg:text-4xl">
            What We&apos;re Building
          </h2>

          <p className="mt-3 text-xs leading-5 text-[var(--muted)] lg:text-sm lg:leading-6">
            KitchCue is growing into a complete kitchen companion. Here&apos;s
            what&apos;s ready and what we&apos;re working on next.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {roadmapItems.map((item) => (
            <RoadmapCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}