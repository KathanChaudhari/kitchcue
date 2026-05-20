const chats = ["Dinner ideas", "Weekly grocery", "Breakfast plan"];

export function ChatList() {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <select className="h-11 flex-1 rounded-xl border border-[#eadfce] bg-[#fffaf4] px-3 text-sm font-bold outline-none">
          {chats.map((chat) => (
            <option key={chat}>{chat}</option>
          ))}
        </select>
        <button className="h-11 rounded-xl bg-[#20201d] px-3 text-sm font-bold text-white" type="button">
          New
        </button>
      </div>
      <button className="text-sm font-bold text-[#9d4f3b]" type="button">
        Delete selected chat
      </button>
    </section>
  );
}
