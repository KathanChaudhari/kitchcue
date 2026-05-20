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
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#606c38] text-xl font-bold text-white">
            {initials}
          </div>

          {!isEditing ? (
            <div>
              <h2 className="font-bold">{userInfo.name}</h2>
              <p className="text-sm text-[#7a6b58]">
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
                className="rounded-xl border border-[#eadfce] bg-white px-3 py-2 text-sm outline-none focus:border-[#606c38]"
                placeholder="Name"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  value={draft.age}
                  onChange={(event) =>
                    setDraft({ ...draft, age: event.target.value })
                  }
                  className="rounded-xl border border-[#eadfce] bg-white px-3 py-2 text-sm outline-none focus:border-[#606c38]"
                  placeholder="Age"
                />

                <input
                  value={draft.city}
                  onChange={(event) =>
                    setDraft({ ...draft, city: event.target.value })
                  }
                  className="rounded-xl border border-[#eadfce] bg-white px-3 py-2 text-sm outline-none focus:border-[#606c38]"
                  placeholder="City"
                />
              </div>

              <input
                value={draft.kitchenType}
                onChange={(event) =>
                  setDraft({ ...draft, kitchenType: event.target.value })
                }
                className="rounded-xl border border-[#eadfce] bg-white px-3 py-2 text-sm outline-none focus:border-[#606c38]"
                placeholder="Kitchen type"
              />
            </div>
          )}
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-full bg-[#f7efe4] px-3 py-1.5 text-xs font-bold text-[#7a6b58] transition hover:bg-[#eadfce]"
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
            className="rounded-full bg-[#20201d] px-4 py-2 text-sm font-bold text-white"
          >
            Save
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="rounded-full bg-[#f7efe4] px-4 py-2 text-sm font-bold text-[#7a6b58]"
          >
            Cancel
          </button>
        </div>
      ) : null}
    </SectionCard>
  );
}