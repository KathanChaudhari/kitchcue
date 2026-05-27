import {
    Archive,
    Bot,
    Brain,
    ChefHat,
    ClipboardList,
    Flame,
    HeartPulse,
    Leaf,
    PackageCheck,
    ScanLine,
    Sparkles,
    Trophy,
    Utensils
  } from "lucide-react";
  import type { LucideIcon } from "lucide-react";
  import Link from "next/link";
  
  const workflowFeatures: {
    title: string;
    description: string;
    icon: LucideIcon;
    tone: "primary" | "secondary" | "tertiary";
  }[] = [
    {
      title: "Kitchen AI Assistant",
      description:
        "Real-time guidance tailored to your equipment and skill level. It’s like having a sous-chef by your side.",
      icon: Bot,
      tone: "primary"
    },
    {
      title: "Precision Stock",
      description:
        "Automated pantry tracking that alerts you before essentials run low. Never miss an ingredient again.",
      icon: ClipboardList,
      tone: "secondary"
    },
    {
      title: "Culinary Profiles",
      description:
        "Personalized nutrition and flavor mapping. Recipes that adapt to your palate and dietary goals.",
      icon: HeartPulse,
      tone: "tertiary"
    }
  ];
  
  export function LandingSections() {
    return (
      <>
        <section id="features" className="px-4 py-16 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-xl lg:mb-12">
              <p className="text-xs font-bold text-[var(--primary)]">
                Intelligent Workflow
              </p>
  
              <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--foreground)] sm:text-3xl lg:text-4xl">
                Tools professional chefs use, redesigned for your home.
              </h2>
            </div>
  
            <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
              {workflowFeatures.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>
  
        <section className="px-4 py-10 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-sm rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-xl lg:max-w-xl lg:p-10">
              <div className="mx-auto mb-6 flex justify-center gap-4 text-[var(--primary)]/55">
                <ChefHat size={26} />
                <PackageCheck size={26} />
                <Sparkles size={26} />
              </div>
  
              <h2 className="text-lg font-black tracking-[-0.03em] lg:text-2xl">
                Minimalist by Design
              </h2>
  
              <p className="mx-auto mt-3 max-w-sm text-xs leading-5 text-[var(--foreground)]/80 lg:text-sm lg:leading-6">
                A clean, distraction-free interface that lets the ingredient take
                center stage.
              </p>
            </div>
          </div>
        </section>
  
        <section className="px-4 py-12 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-8 max-w-sm text-center">
              <h2 className="text-xl font-black tracking-[-0.04em] lg:text-3xl">
                Your Command Center
              </h2>
  
              <p className="mt-2 text-xs leading-5 text-[var(--muted)] lg:text-sm">
                Everything you need, organized with surgical precision.
              </p>
            </div>
  
            <div className="mx-auto grid max-w-sm gap-4 lg:max-w-5xl lg:grid-cols-[1fr_0.8fr] lg:items-stretch">
              <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]">
                <div
                  className="relative h-44 bg-cover bg-center lg:h-full lg:min-h-[360px]"
                  style={{
                    backgroundImage: "url('/images/kitchcue-hero.png')"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-transparent" />
  
                  <div className="absolute right-3 top-3 rounded-full bg-[var(--primary)] px-3 py-1 text-[10px] font-black text-[var(--ink)]">
                    ACTIVE
                  </div>
                </div>
  
                <div className="p-4 lg:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-bold lg:text-lg">
                      Truffle Risotto
                    </h3>
  
                    <div className="flex items-center gap-1 text-[10px] text-[var(--foreground)]/85">
                      <Sparkles size={12} className="text-[var(--primary)]" />
                      4.9
                    </div>
                  </div>
  
                  <div className="mt-3 flex items-center gap-4 text-[10px] text-[var(--muted)] lg:text-xs">
                    <span className="inline-flex items-center gap-1">
                      <Flame size={13} />
                      45m
                    </span>
  
                    <span className="inline-flex items-center gap-1">
                      <Utensils size={13} />
                      Medium
                    </span>
                  </div>
  
                  <button className="mt-4 h-11 w-full rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container)] text-xs font-bold text-[var(--foreground)] transition hover:bg-[var(--surface-container-high)]">
                    Resume Cooking
                  </button>
                </div>
              </div>
  
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                <MiniMetric icon={Archive} label="Saved" value="124" />
                <MiniMetric icon={Trophy} label="Streak" value="12d" />
              </div>
            </div>
          </div>
        </section>
  
        <section className="px-4 py-16 text-center lg:px-6 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="mx-auto max-w-sm text-3xl font-black leading-tight tracking-[-0.05em] lg:max-w-none lg:text-5xl">
              Ready to master your kitchen?
            </h2>
  
            <p className="mx-auto mt-5 max-w-sm text-xs leading-5 text-[var(--foreground)]/85 lg:max-w-2xl lg:text-base lg:leading-7">
              Join 50,000+ home chefs already elevating their craft with KitchCue
              Intelligence.
            </p>
  
            <Link
              href="/signup"
              className="mt-8 inline-flex h-12 w-full max-w-sm items-center justify-center rounded-xl bg-[var(--primary)] px-8 text-xs font-bold text-[var(--ink)] shadow-[0_0_30px_color-mix(in_srgb,var(--primary)_25%,transparent)] transition hover:opacity-90 sm:w-auto lg:text-sm"
            >
              Get Started for Free
            </Link>
          </div>
        </section>
      </>
    );
  }
  
  function FeatureCard({
    title,
    description,
    icon: Icon,
    tone
  }: {
    title: string;
    description: string;
    icon: LucideIcon;
    tone: "primary" | "secondary" | "tertiary";
  }) {
    const toneClass = {
      primary:
        "text-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]",
      secondary:
        "text-[var(--secondary)] bg-[color-mix(in_srgb,var(--secondary)_12%,transparent)]",
      tertiary:
        "text-[var(--tertiary)] bg-[color-mix(in_srgb,var(--tertiary)_12%,transparent)]"
    };
  
    return (
      <article className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--primary)_35%,var(--border))] lg:p-7">
        <div
          className={`mb-5 flex size-11 items-center justify-center rounded-lg lg:size-12 ${toneClass[tone]}`}
        >
          <Icon size={20} />
        </div>
  
        <h3 className="text-sm font-bold text-[var(--foreground)] lg:text-base">
          {title}
        </h3>
  
        <p className="mt-3 text-xs leading-5 text-[var(--foreground)]/85 lg:text-sm lg:leading-6">
          {description}
        </p>
      </article>
    );
  }
  
  function MiniMetric({
    icon: Icon,
    label,
    value
  }: {
    icon: LucideIcon;
    label: string;
    value: string;
  }) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 text-center lg:flex lg:items-center lg:gap-4 lg:text-left">
        <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)] lg:mx-0 lg:mb-0">
          <Icon size={18} />
        </div>
  
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--foreground)]">
            {label}
          </p>
  
          <p className="mt-1 text-sm font-black text-[var(--primary)]">
            {value}
          </p>
        </div>
      </div>
    );
  }