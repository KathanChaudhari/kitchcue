"use client";

import { signIn } from "next-auth/react";

type SocialAuthButtonsProps = {
  callbackUrl?: string;
};

export function SocialAuthButtons({
  callbackUrl = "/onboarding"
}: SocialAuthButtonsProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <button
        className="h-10 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-bold text-[var(--foreground)] shadow-sm transition hover:bg-[var(--card-soft)] active:scale-[0.98]"
        type="button"
        onClick={() => signIn("google", { callbackUrl })}
      >
        Continue with Google
      </button>
    </div>
  );
}