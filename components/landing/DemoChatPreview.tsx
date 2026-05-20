export function DemoChatPreview() {
  return (
    <section className="mt-4 rounded-2xl bg-[#f0eadf] p-4">
      <p className="text-sm font-bold">Assistant preview</p>
      <div className="mt-3 space-y-2 text-sm">
        <p className="ml-auto max-w-[85%] rounded-2xl bg-[#606c38] px-4 py-3 text-white">
          What can I cook with rice, tomato, and spinach?
        </p>
        <p className="max-w-[85%] rounded-2xl bg-white px-4 py-3 text-[#20201d]">
          Try a quick spinach tomato rice. I can also add yogurt to your shopping list.
        </p>
      </div>
    </section>
  );
}
