const messages = [
  { from: "user", text: "What can I cook today with rice and tomatoes?" },
  { from: "ai", text: "You can make tomato rice. Add spinach if you want to use it before it expires." }
];

export function ChatThread() {
  return (
    <section className="min-h-80 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
      <div className="space-y-3">
        {messages.map((message) => (
          <p
            key={message.text}
            className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${
              message.from === "user"
                ? "ml-auto bg-[var(--primary)] text-[var(--ink)]"
                : "bg-[var(--card-soft)] text-[var(--foreground)]"
            }`}
          >
            {message.text}
          </p>
        ))}
      </div>
    </section>
  );
}
