"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Check,
  ClipboardList,
  LoaderCircle
} from "lucide-react";
import { joinWaitlist } from "@/lib/client/waitlist";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setMessage("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const data = await joinWaitlist(normalizedEmail);

      setIsJoined(true);
      setEmail("");
      setMessage(data.message);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="waitlist"
      className="scroll-mt-16 px-4 py-16 lg:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-5xl">
        {/* Waitlist */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 lg:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--primary)] lg:text-xs">
              Early Access
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--foreground)] lg:text-5xl">
              Interested in trying KitchCue early?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-xs leading-5 text-[var(--muted)] lg:text-base lg:leading-7">
              Join the waitlist to test new features, share feedback, and help
              shape a kitchen assistant built around real cooking habits.
            </p>

            {isJoined ? (
              <div
                role="status"
                className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 p-4 text-left"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--ink)]">
                  <Check size={17} strokeWidth={3} />
                </div>

                <div>
                  <p className="text-sm font-bold text-[var(--foreground)]">
                    You&apos;re on the list!
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[var(--muted)] lg:text-sm">
                    {message}
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="waitlist-email" className="sr-only">
                  Email address
                </label>

                <input
                  id="waitlist-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);

                    if (message) {
                      setMessage("");
                    }
                  }}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  disabled={isSubmitting}
                  required
                  className="h-12 min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-7 text-xs font-bold text-[var(--ink)] shadow-[0_0_30px_color-mix(in_srgb,var(--primary)_25%,transparent)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 lg:text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle
                        size={16}
                        className="animate-spin"
                        aria-hidden="true"
                      />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join the Waitlist
                      <ArrowRight size={16} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}

            {!isJoined && message && (
              <p
                role="alert"
                className="mx-auto mt-3 max-w-xl text-left text-xs font-medium text-red-400"
              >
                {message}
              </p>
            )}

            {!isJoined && (
              <p className="mt-3 text-[10px] leading-4 text-[var(--muted)] lg:text-xs">
                No spam. We&apos;ll only contact you about KitchCue early
                access.
              </p>
            )}
          </div>
        </div>

        {/* Survey */}
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] p-7 lg:mt-10 lg:p-12">
          <div className="grid gap-7 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--secondary)_14%,transparent)] text-[var(--secondary)]">
              <ClipboardList size={22} aria-hidden="true" />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--secondary)] lg:text-xs">
                Help Us Learn
              </p>

              <h3 className="mt-2 text-xl font-black tracking-[-0.04em] text-[var(--foreground)] lg:text-3xl">
                Better suggestions start with real food habits.
              </h3>

              <p className="mt-3 max-w-2xl text-xs leading-5 text-[var(--muted)] lg:text-sm lg:leading-6">
                Tell us what you cooked and ate this week. Your answers will
                help us understand local dishes, everyday ingredients, routines,
                and meal patterns.
              </p>

              <p className="mt-3 max-w-2xl text-xs leading-5 text-[var(--foreground)]/85 lg:text-sm lg:leading-6">
                You&apos;ll help shape KitchCue&apos;s recommendations and get a
                direct say in what we build next.
              </p>
            </div>

            <Link
              href="/survey"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 text-xs font-bold text-[var(--foreground)] transition hover:border-[var(--secondary)] hover:bg-[var(--surface-container-high)] lg:w-auto"
            >
              Take the Food Survey
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}