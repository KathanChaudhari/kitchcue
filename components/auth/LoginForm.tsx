"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    const trimmedEmail = email.toLowerCase().trim();

    try {
      const result = await signIn("credentials", {
        email: trimmedEmail,
        password,
        redirect: false
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/home");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm sm:p-5"
    >
      <div className="space-y-1">
        <h1 className="text-lg font-extrabold leading-tight text-[var(--foreground)] sm:text-xl">
          Welcome back
        </h1>

        <p className="text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
          Login to continue managing your kitchen.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300">
          {error}
        </div>
      ) : null}

      <label className="block">
        <span className="text-xs font-semibold text-[var(--muted)]">
          Email
        </span>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="mt-1.5 h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[color-mix(in_srgb,var(--muted)_65%,transparent)] focus:border-[var(--primary)] sm:h-11"
        />
      </label>

      <label className="block">
        <span className="text-xs font-semibold text-[var(--muted)]">
          Password
        </span>

        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="mt-1.5 h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[color-mix(in_srgb,var(--muted)_65%,transparent)] focus:border-[var(--primary)] sm:h-11"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="block w-full rounded-xl bg-[var(--primary)] px-4 py-2.5 text-center text-sm font-extrabold text-[var(--ink)] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:py-3"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-xs text-[var(--muted)]">
        New here?{" "}
        <Link className="font-bold text-[var(--foreground)]" href="/signup">
          Create account
        </Link>
      </p>
    </form>
  );
}
