"use client";

import { useState } from "react";
import { HomeNoteItem } from "@/app/types/home";
import { SectionCard } from "@/components/global/SectionCard";
import { AlertTriangle, NotebookText, Sparkles } from "lucide-react";

type NotesCardProps = {
  notes: HomeNoteItem[];
};

function getNoticeIcon(index: number) {
  if (index === 0) return AlertTriangle;
  if (index === 1) return Sparkles;

  return NotebookText;
}

function getNoticeTone(index: number) {
  if (index === 0) return "warning";
  if (index === 1) return "success";

  return "default";
}

export function NotesCard({ notes }: NotesCardProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleNotes = showAll ? notes : notes.slice(0, 3);
  const hasMoreNotes = notes.length > 3;

  return (
    <SectionCard>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[var(--primary)]">Notices</h2>

        {hasMoreNotes ? (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="text-xs font-bold text-[var(--primary)] transition hover:opacity-80"
          >
            {showAll ? "Show less" : "View more"}
          </button>
        ) : null}
      </div>

      {notes.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] p-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-muted)]">
              <NotebookText className="h-5 w-5 text-[var(--primary)]" />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-bold text-[var(--primary)]">
                No notices yet
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
                Expiry alerts, chef suggestions, and kitchen notes will appear
                here once they are available.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleNotes.map((note, index) => {
            const Icon = getNoticeIcon(index);
            const tone = getNoticeTone(index);

            return (
              <div
                key={note.id}
                className={`
                  rounded-2xl border p-4
                  ${
                    tone === "warning"
                      ? "border-[var(--secondary-container)] bg-[var(--surface-muted)]"
                      : "border-[var(--border)] bg-[var(--card-soft)]"
                  }
                `}
              >
                <div className="flex gap-3">
                  <div
                    className={`
                      flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                      ${
                        tone === "warning"
                          ? "bg-[var(--secondary-container)]"
                          : "bg-[var(--surface-high)]"
                      }
                    `}
                  >
                    <Icon
                      className={`
                        h-5 w-5
                        ${
                          tone === "warning"
                            ? "text-[var(--secondary)]"
                            : "text-[var(--primary)]"
                        }
                      `}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      className={`
                        truncate text-sm font-bold
                        ${
                          tone === "warning"
                            ? "text-[var(--secondary)]"
                            : "text-[var(--primary)]"
                        }
                      `}
                    >
                      {note.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--foreground-soft)]">
                      {note.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SectionCard>
  );
}