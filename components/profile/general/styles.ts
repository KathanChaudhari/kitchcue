export function getInputClass(isEditing: boolean) {
    const baseClass =
      "h-11 w-full rounded-xl px-3 text-sm outline-none transition";
  
    if (isEditing) {
      return `${baseClass} border border-[var(--primary-muted)] bg-[var(--surface)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:bg-[var(--card-soft)]`;
    }
  
    return `${baseClass} cursor-default border border-transparent bg-[var(--card-soft)] text-[var(--foreground-soft)] placeholder:text-[var(--muted)] opacity-80`;
  }