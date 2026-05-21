import Link from "next/link";

type FloatingAddButtonProps = {
  href: string;
  label: string;
};

export function FloatingAddButton({ href, label }: FloatingAddButtonProps) {
  return (
    <Link
      className="fixed bottom-24 right-[calc(50%-11.5rem)] grid h-14 w-14 place-items-center rounded-full bg-[var(--primary)] text-2xl font-bold text-[var(--ink)] shadow-lg lg:right-8"
      href={href}
      aria-label={label}
    >
      +
    </Link>
  );
}
