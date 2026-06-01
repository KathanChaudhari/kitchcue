// src/components/profile/preferences/SpiceLevelSelector.tsx

type SpiceLevelSelectorProps = {
    spiceLevel: number;
    isEditing: boolean;
    onChange: (level: number) => void;
  };
  
  export function SpiceLevelSelector({
    spiceLevel,
    isEditing,
    onChange
  }: SpiceLevelSelectorProps) {
    return (
      <>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[13px] font-bold text-[var(--foreground)]">
              Level {spiceLevel} / 5
            </p>
  
            <p className="mt-0.5 text-[11px] text-[var(--muted)]">
              {getSpiceDescription(spiceLevel)}
            </p>
          </div>
  
          <span className="rounded-md bg-[color-mix(in_srgb,var(--secondary)_30%,var(--card))] px-2 py-1 text-[11px] font-bold text-[var(--secondary)]">
            {getSpiceLabel(spiceLevel)}
          </span>
        </div>
  
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              type="button"
              disabled={!isEditing}
              onClick={() => onChange(level)}
              className={`h-9 rounded-lg border text-xs font-bold transition ${
                level <= spiceLevel
                  ? "border-[var(--secondary)] bg-[color-mix(in_srgb,var(--secondary)_62%,var(--card))] text-[var(--ink)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]"
              } ${
                isEditing
                  ? "hover:border-[var(--secondary)] hover:text-[var(--foreground)] active:scale-95"
                  : "cursor-default"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </>
    );
  }
  
  function getSpiceLabel(level: number) {
    if (level === 1) return "Mild";
    if (level === 2) return "Light";
    if (level === 3) return "Medium";
    if (level === 4) return "Hot";
    return "Very hot";
  }
  
  function getSpiceDescription(level: number) {
    if (level === 1) return "Almost no heat.";
    if (level === 2) return "A little warmth.";
    if (level === 3) return "Balanced home-style spice.";
    if (level === 4) return "Strong but enjoyable heat.";
    return "Very spicy and bold.";
  }