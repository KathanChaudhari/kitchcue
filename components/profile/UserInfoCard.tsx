"use client";

import { useState } from "react";
import { SectionCard } from "@/components/global/SectionCard";

type UserInfo = {
  name: string;
  age: string;
  city: string;
  kitchenType: string;
};

const initialUserInfo: UserInfo = {
  name: "kiyo",
  age: "24",
  city: "Bengaluru",
  kitchenType: "Indian kitchen"
};

export function UserInfoCard() {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [draft, setDraft] = useState<UserInfo>(initialUserInfo);
  const [isEditing, setIsEditing] = useState(false);

  const initials = userInfo.name.trim().charAt(0).toUpperCase() || "K";

  function handleSave() {
    setUserInfo(draft);
    setIsEditing(false);
  }

  function handleCancel() {
    setDraft(userInfo);
    setIsEditing(false);
  }

  return (
    <SectionCard>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[var(--primary)] text-xl font-bold text-[var(--ink)]">
            {initials}
          </div>

          {!isEditing ? (
            <div>
              <h2 className="font-bold">{userInfo.name}</h2>
              <p className="text-sm text-[var(--muted)]">
                {userInfo.age} · {userInfo.city} · {userInfo.kitchenType}
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              <input
                value={draft.name}
                onChange={(event) =>
                  setDraft({ ...draft, name: event.target.value })
                }
                className="rounded-xl border border-[var(--border)] bg-[var(--card-soft)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
                placeholder="Name"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  value={draft.age}
                  onChange={(event) =>
                    setDraft({ ...draft, age: event.target.value })
                  }
                  className="rounded-xl border border-[var(--border)] bg-[var(--card-soft)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
                  placeholder="Age"
                />

                <input
                  value={draft.city}
                  onChange={(event) =>
                    setDraft({ ...draft, city: event.target.value })
                  }
                  className="rounded-xl border border-[var(--border)] bg-[var(--card-soft)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
                  placeholder="City"
                />
              </div>

              <input
                value={draft.kitchenType}
                onChange={(event) =>
                  setDraft({ ...draft, kitchenType: event.target.value })
                }
                className="rounded-xl border border-[var(--border)] bg-[var(--card-soft)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
                placeholder="Kitchen type"
              />
            </div>
          )}
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-full bg-[var(--card-soft)] px-3 py-1.5 text-xs font-bold text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            Edit
          </button>
        ) : null}
      </div>

      {isEditing ? (
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-bold text-[var(--ink)]"
          >
            Save
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="rounded-full bg-[var(--card-soft)] px-4 py-2 text-sm font-bold text-[var(--muted)]"
          >
            Cancel
          </button>
        </div>
      ) : null}
    </SectionCard>
  );
}
