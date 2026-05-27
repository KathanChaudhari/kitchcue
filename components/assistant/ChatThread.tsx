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
    <div className="w-full py-3 sm:py-5">
      <div className="mb-4 flex items-center gap-3 sm:mb-5">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <span className="text-[11px] font-bold text-[var(--muted)]">
          Today
        </span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <div className="space-y-5 sm:space-y-7">
        {messages.map((message) => {
          const isUser = message.from === "user";

          return (
            <div
              key={message.id}
              className={`flex gap-2.5 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isUser ? (
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--secondary)]/70 text-[11px] font-black text-[var(--foreground)] sm:h-9 sm:w-9 sm:text-xs">
                  AI
                </div>
              ) : null}

              <div className={`max-w-[84%] sm:max-w-[78%] ${isUser ? "text-right" : ""}`}>
                <p className="mb-1 text-[11px] font-extrabold text-[var(--muted)] sm:mb-1.5">
                  {isUser ? "You" : "KitchCue AI"}
                </p>

                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-6 sm:px-4 sm:py-3 sm:text-sm ${
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