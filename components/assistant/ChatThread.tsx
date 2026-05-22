const messages = [
  {
    id: 1,
    from: "ai",
    text: "Good morning! I see you have eggs, spinach, and bread available. Want a quick breakfast idea?"
  },
  {
    id: 2,
    from: "user",
    text: "Yes, suggest something easy. I have around 15 minutes."
  },
  {
    id: 3,
    from: "ai",
    text: "You can make a spinach feta omelette or soft scrambled eggs on toast. Both are quick, filling, and use ingredients you already have."
  }
];

export function ChatThread() {
  return (
    <div className="mx-auto w-full  py-6">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <span className="text-xs font-bold text-[var(--muted)]">Today</span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <div className="space-y-8">
        {messages.map((message) => {
          const isUser = message.from === "user";

          return (
            <div
              key={message.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser ? (
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--secondary)]/70 text-sm font-black text-[var(--foreground)]">
                  AI
                </div>
              ) : null}

              <div className={`max-w-[82%] ${isUser ? "text-right" : ""}`}>
                <p className="mb-2 text-xs font-extrabold text-[var(--muted)]">
                  {isUser ? "You" : "KitchCue AI"}
                </p>

                <div
                  className={`rounded-2xl px-5 py-4 text-sm leading-7 shadow-sm ${
                    isUser
                      ? "bg-[var(--card-soft)] text-[var(--foreground)]"
                      : "bg-transparent text-[var(--foreground)]"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}