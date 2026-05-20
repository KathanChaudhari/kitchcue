const actions = ["Add item", "Scan bill", "Ask AI"];

export function QuickActionRow() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {actions.map((action) => (
        <button key={action} className="rounded-2xl bg-white px-3 py-4 text-sm font-bold shadow-sm" type="button">
          {action}
        </button>
      ))}
    </div>
  );
}
