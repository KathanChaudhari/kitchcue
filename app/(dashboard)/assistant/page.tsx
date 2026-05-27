import { ChatInput } from "@/components/assistant/ChatInput";
import { ChatThread } from "@/components/assistant/ChatThread";
import { AssistantChatHeader } from "@/components/assistant/AssistantChatHeader";
import { SuggestedPromptChips } from "@/components/assistant/SuggestedPromptChips";

export default function AssistantPage() {
  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden bg-[var(--background)] px-3 sm:px-4 lg:px-6">
      <AssistantChatHeader />

      <div className="min-h-0 flex-1 overflow-y-auto pb-3 scrollbar-hide">
        <ChatThread />
      </div>

      <div className="shrink-0  bg-[var(--background)] pb-24 pt-2 sm:pb-4 lg:pb-4">
        <div className="hidden sm:block">
          <SuggestedPromptChips />
        </div>

        <ChatInput />
      </div>
    </section>
  );
}