export function ChatInput() {
  return (
    <form className="fixed inset-x-0 bottom-20 z-10 mx-auto flex max-w-md gap-2 bg-[#fffaf4] px-5 py-3 lg:static lg:max-w-none lg:bg-transparent lg:px-0 lg:py-0">
      <input
        className="h-12 flex-1 rounded-2xl border border-[#eadfce] bg-white px-4 text-sm outline-none focus:border-[#606c38]"
        placeholder="Ask what to cook..."
      />
      <button className="h-12 rounded-2xl bg-[#606c38] px-4 text-sm font-bold text-white" type="button">
        Send
      </button>
    </form>
  );
}
