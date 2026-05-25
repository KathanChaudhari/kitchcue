import {
    Archive,
    BookOpen,
    Bot,
    Brain,
    LayoutDashboard,
    Leaf,
    ReceiptText,
    ShoppingBasket,
    Sparkles,
    Utensils
  } from "lucide-react";
  import type { LucideIcon } from "lucide-react";
  import Link from "next/link";
  
  const stats = [
    { value: "10k+", label: "Home Chefs" },
    { value: "50k+", label: "Recipes" },
    { value: "Zero", label: "Food Waste" }
  ];
  
  const features: {
    title: string;
    description: string;
    icon: LucideIcon;
    tone: "primary" | "secondary" | "tertiary";
  }[] = [
    {
      title: "Smart Assistant",
      description:
        "Advanced AI that knows your pantry better than you do, suggesting meals based on what you already have.",
      icon: Bot,
      tone: "primary"
    },
    {
      title: "Live Inventory",
      description:
        "Real-time tracking of every ingredient. Automatically update your shopping list as you cook through recipes.",
      icon: ReceiptText,
      tone: "secondary"
    },
    {
      title: "Culinary Profile",
      description:
        "Personalized recipes tailored to your metabolic health, dietary goals, and flavor preferences.",
      icon: Brain,
      tone: "tertiary"
    }
  ];
  
  export function LandingSections() {
    return (
      <>
        <section className="border-y border-[var(--border)] bg-[var(--surface)] py-7">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 lg:px-6">
            {stats.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
  
            <div className="flex items-center justify-center gap-5 text-[var(--outline)] sm:justify-end">
              <Leaf size={23} />
              <Utensils size={23} />
              <Archive size={23} />
            </div>
          </div>
        </section>
  
        <section id="features" className="mx-auto max-w-7xl px-4 py-20 lg:px-6">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-[-0.03em] text-[var(--foreground)]">
                Precision in every detail.
              </h2>
  
              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">
                Harness the power of AI to streamline your culinary workflow and
                reduce cognitive load in the kitchen.
              </p>
            </div>
  
            <div className="hidden rounded-sm bg-[var(--card)] p-3 text-[var(--primary)]/45 md:flex">
              <div className="flex gap-2">
                <Sparkles size={15} />
                <Bot size={15} />
                <Brain size={15} />
              </div>
            </div>
          </div>
  
          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>
  
        <section className="border-y border-[var(--border)] bg-[var(--surface)] px-4 py-20 lg:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-[-0.03em]">
                Inside the Dashboard
              </h2>
  
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                A professional-grade interface designed for focus and speed.
                Everything you need, exactly where you expect it.
              </p>
            </div>
  
            <DashboardPreview />
          </div>
        </section>
  
        <section className="px-4 py-24 text-center lg:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-black tracking-[-0.04em]">
              Ready to cook smarter?
            </h2>
  
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[var(--foreground)]/85">
              Join thousands of home chefs using KitchCue to master their kitchen
              efficiency and elevate every meal.
            </p>
  
            <Link
              href="/signup"
              className="mt-8 inline-flex rounded-xl bg-[var(--primary)] px-8 py-4 text-sm font-bold text-[var(--ink)] transition hover:opacity-90"
            >
              Create Your Free Account
            </Link>
          </div>
        </section>
      </>
    );
  }
  
  function Stat({ value, label }: { value: string; label: string }) {
    return (
      <div className="border-r border-[var(--border)] last:border-r-0">
        <p className="text-2xl font-black tracking-[-0.04em] text-[var(--foreground)]">
          {value}
        </p>
  
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
          {label}
        </p>
      </div>
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
      <article className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--primary)_35%,var(--border))]">
        <div
          className={`mb-5 flex size-12 items-center justify-center rounded-lg ${toneClass[tone]}`}
        >
          <Icon size={21} />
        </div>
  
        <h3 className="text-sm font-bold text-[var(--foreground)]">{title}</h3>
  
        <p className="mt-3 text-xs leading-5 text-[var(--foreground)]/85">
          {description}
        </p>
      </article>
    );
  }
  
  function DashboardPreview() {
    return (
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-2xl">
        <div className="flex h-[360px] sm:h-[480px] lg:h-[600px]">
          <aside className="w-20 border-r border-[var(--border)] p-4 md:w-64">
            <div className="mb-7 size-10 rounded-full bg-[color-mix(in_srgb,var(--primary)_22%,transparent)]" />
  
            <div className="space-y-2">
              <PreviewNav active icon={LayoutDashboard} label="Dashboard" />
              <PreviewNav icon={BookOpen} label="Recipes" />
              <PreviewNav icon={ShoppingBasket} label="Pantry" />
            </div>
          </aside>
  
          <div className="flex-1 overflow-hidden bg-[color-mix(in_srgb,var(--background)_88%,black)] p-4 sm:p-8">
            <div className="grid gap-5 lg:grid-cols-[1fr_0.48fr]">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
                <div className="mb-4 h-3 w-32 rounded bg-[var(--surface-container-high)]" />
  
                <div className="mb-5 flex h-44 items-center justify-center rounded-lg bg-[var(--surface-container-high)] sm:h-56">
                  <span className="text-xs italic text-[var(--muted)]/50">
                    Live Cooking Feed Preview
                  </span>
                </div>
  
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 rounded-lg bg-[var(--surface-container)]" />
                  <div className="h-20 rounded-lg bg-[var(--surface-container)]" />
                </div>
              </div>
  
              <div className="hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 lg:block">
                <div className="mb-6 h-3 w-24 rounded bg-[var(--surface-container-high)]" />
  
                <div className="mb-7 flex items-center gap-4">
                  <div className="size-12 rounded-full border-4 border-[var(--primary)] border-t-transparent" />
  
                  <div>
                    <div className="mb-2 h-3 w-20 rounded bg-[color-mix(in_srgb,var(--primary)_28%,transparent)]" />
                    <div className="h-2.5 w-12 rounded bg-[var(--surface-container-high)]" />
                  </div>
                </div>
  
                <div className="space-y-4">
                  <div className="h-12 rounded bg-[var(--surface-container-high)]" />
                  <div className="h-12 rounded bg-[var(--surface-container-high)]" />
                  <div className="h-12 rounded bg-[var(--surface-container-high)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function PreviewNav({
    active,
    icon: Icon,
    label
  }: {
    active?: boolean;
    icon: LucideIcon;
    label: string;
  }) {
    return (
      <div
        className={`flex h-9 items-center gap-3 rounded px-3 text-xs ${
          active
            ? "border-l-4 border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--foreground)]"
            : "text-[var(--foreground)]/85"
        }`}
      >
        <Icon size={15} className={active ? "text-[var(--primary)]" : ""} />
        <span className="hidden font-medium md:block">{label}</span>
      </div>
    );
  }