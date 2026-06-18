// src/components/profile/preferences/SpiceLevelSelector.tsx

type SpiceLevelSelectorProps = {
  spiceLevel: number;
  isEditing: boolean;
  onChange: (level: number) => void;
};

const spiceLevels = [1, 2, 3, 4, 5];

export function SpiceLevelSelector({
  spiceLevel,
  isEditing,
  onChange
}: SpiceLevelSelectorProps) {
  return (
    <div className="space-y-2.5">
      <span className="inline-flex items-center rounded-full border border-[var(--secondary)] bg-[color-mix(in_srgb,var(--secondary)_18%,var(--card))] px-2.5 py-1 text-[10px] font-bold text-[var(--secondary)]">
        {getSpiceLabel(spiceLevel)}
      </span>

      {isEditing && (
        <div className="flex gap-1.5">
          {spiceLevels.map((level) => {
            const isActive = level <= spiceLevel;

            return (
              <button
                key={level}
                type="button"
                onClick={() => onChange(level)}
                aria-label={`Set spice level to ${getSpiceLabel(level)}`}
                className={`h-2.5 flex-1 rounded-full transition active:scale-95 ${
                  isActive
                    ? "bg-[var(--secondary)]"
                    : "bg-[color-mix(in_srgb,var(--muted)_22%,var(--card))] hover:bg-[color-mix(in_srgb,var(--secondary)_35%,var(--card))]"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function getSpiceLabel(level: number) {
  if (level === 1) return "Mild";
  if (level === 2) return "Light";
  if (level === 3) return "Medium";
  if (level === 4) return "Hot";
  return "Very hot";
}