import { Send, Share2 } from "lucide-react";

const productLinks = ["Features", "Pricing", "Resources"];
const companyLinks = ["About Us", "Privacy Policy", "Terms of Service"];

export function LandingFooter() {
  return (
    <footer className="rounded-t-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_92%,black)] px-4 py-10 lg:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 text-xs sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-bold text-[var(--foreground)]">KitchCue</h3>

          <p className="mt-4 leading-5 text-[var(--foreground)]/85">
            © 2026
            <br />
            Precision in every plate.
          </p>
        </div>

        <FooterColumn title="Product" items={productLinks} />
        <FooterColumn title="Company" items={companyLinks} />

        <div>
          <h3 className="font-bold text-[var(--foreground)]">Connect</h3>

          <div className="mt-4 space-y-3 text-[var(--foreground)]/85">
            <p>Contact Us</p>
            <p>Cookie Settings</p>

            <div className="flex gap-4 text-[var(--primary)]">
              <Share2 size={16} />
              <Send size={16} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-bold text-[var(--foreground)]">{title}</h3>

      <div className="mt-4 space-y-3 text-[var(--foreground)]/85">
        {items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}