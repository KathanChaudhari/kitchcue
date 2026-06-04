export function LandingFooter() {
  return (
    <footer className="rounded-t-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_92%,black)] px-4 pb-10 pt-10 lg:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-sm text-center lg:max-w-none lg:text-left">
          <h3 className="text-sm font-black text-[var(--foreground)]">
            KitchCue
          </h3>

          <p className="mx-auto mt-4 max-w-xs text-xs leading-5 text-[var(--foreground)]/85 lg:mx-0">
            Empowering culinary precision through atmospheric technology.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8 border-b border-[var(--border)] pb-8 text-center text-xs lg:grid-cols-4 lg:text-left">
          <FooterColumn title="Platform" items={platformLinks} />
          <FooterColumn title="Company" items={companyLinks} />

          <div className="col-span-2 hidden lg:block">
            <h4 className="font-bold text-[var(--foreground)]">Connect</h4>

            <div className="mt-4 space-y-3 text-[var(--foreground)]/75">
              <p>Contact Us</p>
              <p>Cookie Settings</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-center text-[11px] text-[var(--foreground)]/75 lg:flex-row lg:text-left">
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
            <p>Cookie Settings</p>
          </div>

          <p>© 2026 KitchCue Intelligence. Precision in every plate.</p>
        </div>
      </div>
    </footer>
  );
}

const platformLinks = ["Features", "Integrations", "Enterprise"];
const companyLinks = ["About Us", "Careers", "Contact"];

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-bold text-[var(--foreground)]">{title}</h4>

      <div className="mt-4 space-y-3 text-[var(--foreground)]/75">
        {items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}