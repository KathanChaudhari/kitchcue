"use client";

import { deleteAccount } from "@/lib/client/profile";
import { LoaderCircle, Trash2, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function DeleteAccountSection() {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  function openConfirmation() {
    setError("");
    setIsConfirming(true);
  }

  function closeConfirmation() {
    if (isDeleting) return;

    setError("");
    setIsConfirming(false);
  }

  async function handleDeleteAccount() {
    if (isDeleting) return;

    setIsDeleting(true);
    setError("");

    try {
      await deleteAccount();

      await signOut({
        callbackUrl: "/"
      });
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete your account. Please try again."
      );

      setIsDeleting(false);
    }
  }

  return (
    <>
      <section className="border-t border-[var(--border)] pt-4 sm:pt-5">
        <div className="rounded-2xl border border-[color-mix(in_srgb,var(--secondary)_35%,var(--border))] bg-[color-mix(in_srgb,var(--secondary)_6%,var(--card))] p-3.5 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:p-4">
          <div>
            <p className="text-[13px] font-bold text-[var(--foreground)]">
              Delete account
            </p>

            <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted)]">
              Permanently remove your profile, preferences, inventory, chats,
              and saved kitchen data.
            </p>
          </div>

          <button
            type="button"
            onClick={openConfirmation}
            className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[color-mix(in_srgb,var(--secondary)_65%,var(--border))] px-3.5 text-xs font-bold text-[var(--secondary)] transition hover:bg-[color-mix(in_srgb,var(--secondary)_12%,var(--card))] active:scale-95 sm:mt-0 sm:w-auto"
          >
            <Trash2 size={15} aria-hidden="true" />
            Delete account
          </button>
        </div>
      </section>

      {isConfirming ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-3 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-account-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeConfirmation();
            }
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="delete-account-title"
                  className="text-lg font-bold text-[var(--foreground)]"
                >
                  Delete your account?
                </h2>

                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                  This permanently deletes your profile, pantry, preferences,
                  notifications, and chat history. This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={closeConfirmation}
                disabled={isDeleting}
                aria-label="Close delete account confirmation"
                className="grid size-8 shrink-0 place-items-center rounded-lg text-[var(--muted)] transition hover:bg-[var(--card-soft)] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>

            {error ? (
              <p
                role="alert"
                className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400"
              >
                {error}
              </p>
            ) : null}

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeConfirmation}
                disabled={isDeleting}
                className="h-10 rounded-lg border border-[var(--border)] px-4 text-xs font-bold text-[var(--foreground)] transition hover:bg-[var(--card-soft)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
  type="button"
  onClick={handleDeleteAccount}
  disabled={isDeleting}
  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--secondary)] px-4 text-xs font-bold text-[var(--ink)] transition hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
>
  {isDeleting ? (
    <>
      <LoaderCircle
        size={15}
        className="animate-spin"
        aria-hidden="true"
      />
      Deleting...
    </>
  ) : (
    <>
      <Trash2 size={15} aria-hidden="true" />
      Permanently delete
    </>
  )}
</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}