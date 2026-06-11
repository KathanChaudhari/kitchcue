"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    setError("");
    setIsSubmitting(true);
  
    const trimmedName = name.trim();
    const trimmedEmail = email.toLowerCase().trim();
  
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password
        })
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        setError(result?.error?.message || "Signup failed");
        return;
      }
  
      const loginResult = await signIn("credentials", {
        email: trimmedEmail,
        password,
        redirect: false
      });
  
      if (loginResult?.error) {
        setError("Account created, but login failed. Please login manually.");
        return;
      }
  
      // router.push("/onboarding");
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
          Create account
        </h1>

        <p className="text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
          Start setting up your smart kitchen profile.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300">
          {error}
        </div>
      ) : null}

      <label className="block">
        <span className="text-xs font-semibold text-[var(--muted)]">
          Name
        </span>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
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
          placeholder="Create a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={8}
          className="mt-1.5 h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[color-mix(in_srgb,var(--muted)_65%,transparent)] focus:border-[var(--primary)] sm:h-11"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="block w-full rounded-xl bg-[var(--primary)] px-4 py-2.5 text-center text-sm font-extrabold text-[var(--ink)] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:py-3"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-xs text-[var(--muted)]">
        Already have an account?{" "}
        <Link className="font-bold text-[var(--foreground)]" href="/login">
          Login
        </Link>
      </p>
    </form>
  );
}