import Link from "next/link";

export function SignupForm() {
  return (
    <form className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm sm:p-5">
      <div className="space-y-1">
        <h1 className="text-lg font-extrabold leading-tight text-[var(--foreground)] sm:text-xl">
          Create account
        </h1>

        <p className="text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
          Start setting up your smart kitchen profile.
        </p>
      </div>

      <label className="block">
        <span className="text-xs font-semibold text-[var(--muted)]">
          Name
        </span>

        <input
          type="text"
          placeholder="Your name"
          className="mt-1.5 h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[color-mix(in_srgb,var(--muted)_65%,transparent)] focus:border-[var(--primary)] sm:h-11"
        />
      </label>

      <label className="block">
        <span className="text-xs font-semibold text-[var(--muted)]">
          Email
        </span>

        <input
          type="email"
          placeholder="you@example.com"
          className="mt-1.5 h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[color-mix(in_srgb,var(--muted)_65%,transparent)] focus:border-[var(--primary)] sm:h-11"
        />
      </label>

      <label className="block">
        <span className="text-xs font-semibold text-[var(--muted)]">
          Password
        </span>

        <input
          type="password"
          placeholder="Create a password"
          className="mt-1.5 h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[color-mix(in_srgb,var(--muted)_65%,transparent)] focus:border-[var(--primary)] sm:h-11"
        />
      </label>

      <Link
        href="/onboarding"
        className="block rounded-xl bg-[var(--primary)] px-4 py-2.5 text-center text-sm font-extrabold text-[var(--ink)] transition active:scale-[0.98] sm:py-3"
      >
        Create account
      </Link>

      <p className="text-center text-xs text-[var(--muted)]">
        Already have an account?{" "}
        <Link className="font-bold text-[var(--foreground)]" href="/login">
          Login
        </Link>
      </p>
    </form>
  );
}