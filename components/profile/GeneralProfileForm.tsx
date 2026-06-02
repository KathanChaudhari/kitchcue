"use client";

import { FormEvent, useEffect, useState } from "react";
import { useProfile } from "@/hooks/useProfile";

import { getInputClass } from "@/components/profile/general/styles";
import { GeneralProfileHeader } from "./general/GeneralProfileHeader";
import { ReadOnlyNotice } from "./general/ReadOnlyNotice";
import { ProfileField } from "./general/ProfileField";
import { HouseholdSizeControl } from "./general/HouseholdSizeControl";
import { CookingSkillSelector } from "./general/CookingSkillSelector";
import { FormActions } from "./general/FormActions";

export function GeneralProfileForm() {
  const {
    profile,
    isLoading,
    isSaving,
    error,
    saveProfile,
    savePreferences
  } = useProfile();

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [liveIn, setLiveIn] = useState("");
  const [from, setFrom] = useState("");

  const [peopleCount, setPeopleCount] = useState(1);
  const [cookingSkill, setCookingSkill] = useState("Beginner");

  useEffect(() => {
    if (!profile) return;

    setName(profile.name || "");
    setImage(profile.image || "");
    setLiveIn(profile.liveIn || "");
    setFrom(profile.from || "");
    setPeopleCount(profile.preferences?.householdSize || 1);
    setCookingSkill(profile.preferences?.cookingSkill || "Beginner");
  }, [profile]);

  function resetForm() {
    if (!profile) return;

    setName(profile.name || "");
    setImage(profile.image || "");
    setLiveIn(profile.liveIn || "");
    setFrom(profile.from || "");
    setPeopleCount(profile.preferences?.householdSize || 1);
    setCookingSkill(profile.preferences?.cookingSkill || "Beginner");
  }

  function handleCancel() {
    resetForm();
    setIsEditing(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await saveProfile({
      name: name.trim() || null,
      image: image.trim() || null,
      liveIn: liveIn.trim() || null,
      from: from.trim() || null
    });

    await savePreferences({
      householdSize: peopleCount,
      cookingSkill
    });

    setIsEditing(false);
  }

  if (isLoading) {
    return (
      <section className="min-h-[calc(100dvh-7rem)] bg-[var(--card)] p-3.5 shadow-sm sm:p-4 lg:min-h-0 lg:rounded-2xl lg:border lg:border-[var(--border)]">
        <p className="text-sm text-[var(--muted)]">Loading profile...</p>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="min-h-[calc(100dvh-7rem)] bg-[var(--card)] p-3.5 shadow-sm sm:p-4 lg:min-h-0 lg:rounded-2xl lg:border lg:border-[var(--border)]">
        <p className="text-sm text-red-300">
          {error || "Profile not found"}
        </p>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-[calc(100dvh-7rem)] bg-[var(--card)] p-3.5 shadow-sm sm:p-4 lg:min-h-0 lg:rounded-2xl lg:border lg:border-[var(--border)]"
    >
      <GeneralProfileHeader
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onCancel={handleCancel}
      />

      {!isEditing && <ReadOnlyNotice />}

      {error ? (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2">
          <p className="text-[11px] font-medium text-red-300">{error}</p>
        </div>
      ) : null}

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <ProfileField label="Full name">
            <input
              value={name}
              disabled={!isEditing}
              onChange={(event) => setName(event.target.value)}
              className={getInputClass(isEditing)}
              placeholder="Enter your name"
            />
          </ProfileField>

          <ProfileField label="Email">
            <input
              value={profile.email}
              disabled
              className={getInputClass(false)}
              placeholder="Email"
            />
          </ProfileField>

          <ProfileField label="Where do you live?">
            <input
              value={liveIn}
              disabled={!isEditing}
              onChange={(event) => setLiveIn(event.target.value)}
              className={getInputClass(isEditing)}
              placeholder="Ahmedabad, India"
            />
          </ProfileField>

          <ProfileField label="Where are you from?">
            <input
              value={from}
              disabled={!isEditing}
              onChange={(event) => setFrom(event.target.value)}
              className={getInputClass(isEditing)}
              placeholder="Gujarat, India"
            />
          </ProfileField>

          <ProfileField label="Profile image URL">
            <input
              value={image}
              disabled={!isEditing}
              onChange={(event) => setImage(event.target.value)}
              className={getInputClass(isEditing)}
              placeholder="https://example.com/profile.jpg"
            />
          </ProfileField>

          <ProfileField label="Account created">
            <input
              value={new Date(profile.createdAt).toLocaleDateString()}
              disabled
              className={getInputClass(false)}
            />
          </ProfileField>
        </div>

        <HouseholdSizeControl
          isEditing={isEditing}
          peopleCount={peopleCount}
          onDecrease={() => setPeopleCount((value) => Math.max(1, value - 1))}
          onIncrease={() => setPeopleCount((value) => value + 1)}
        />

        <CookingSkillSelector
          isEditing={isEditing}
          cookingSkill={cookingSkill}
          onChange={setCookingSkill}
        />

        {isEditing && (
          <FormActions isSaving={isSaving} onCancel={handleCancel} />
        )}
      </div>
    </form>
  );
}