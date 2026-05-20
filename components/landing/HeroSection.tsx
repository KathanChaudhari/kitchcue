import Link from "next/link";

export function HeroSection() {
  return (
    <section className="pb-8 pt-6">
      <div className="rounded-[2rem] bg-[#20201d] p-6 text-white shadow-sm">
        <p className="text-sm font-semibold text-[#dce8bf]">Smart kitchen companion</p>
        <h1 className="mt-4 text-4xl font-black leading-tight">KitchCue</h1>
        <p className="mt-4 text-base leading-7 text-[#f4eadc]">
          Plan meals, track kitchen stock, and get useful reminders before something runs out.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            className="flex-1 rounded-2xl bg-[#dda15e] px-4 py-3 text-center text-sm font-bold text-[#20201d]"
            href="/signup"
          >
            Get started
          </Link>
          <Link
            className="flex-1 rounded-2xl border border-white/20 px-4 py-3 text-center text-sm font-bold"
            href="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
