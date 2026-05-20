export function SocialAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button className="rounded-xl bg-white px-4 py-3 text-sm font-bold shadow-sm" type="button">
        Google
      </button>
      <button className="rounded-xl bg-white px-4 py-3 text-sm font-bold shadow-sm" type="button">
        Apple
      </button>
    </div>
  );
}
