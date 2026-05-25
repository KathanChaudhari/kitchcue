import Link from "next/link";

export function LoginForm() {
  return (
    <form className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
      <div className="space-y-1">
        <h1 className="text-lg font-extrabold text-[var(--foreground)]">
          Welcome back
        </h1>
        <p className="text-xs text-[var(--muted)]">
          Login to continue managing your kitchen.
        </p>
      </div>

      <label className="block">
        <span className="text-xs font-semibold text-[var(--muted)]">
          Email
        </span>
        <input
          type="email"
          placeholder="you@example.com"
          className="mt-1.5 h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[color-mix(in_srgb,var(--muted)_65%,transparent)] focus:border-[var(--primary)]"
        />
      </label>

      <label className="block">
        <span className="text-xs font-semibold text-[var(--muted)]">
          Password
        </span>
        <input
          type="password"
          placeholder="••••••••"
          className="mt-1.5 h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[color-mix(in_srgb,var(--muted)_65%,transparent)] focus:border-[var(--primary)]"
        />
      </label>

      <div className="flex items-center justify-end">
        <Link
          href="/forgot-password"
          className="text-xs font-semibold text-[var(--primary)]"
        >
          Forgot password?
        </Link>
      </div>

      <Link
        href="/onboarding"
        className="block rounded-xl bg-[var(--primary)] px-4 py-2.5 text-center text-sm font-extrabold text-[var(--ink)] transition active:scale-[0.98]"
      >
        Login
      </Link>

      <p className="text-center text-xs text-[var(--muted)]">
        New here?{" "}
        <Link
          className="font-bold text-[var(--foreground)]"
          href="/signup"
        >
          Create account
        </Link>
      </p>
    </form>
  );
}