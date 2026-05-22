import { ChatInput } from "@/components/assistant/ChatInput";
import { ChatThread } from "@/components/assistant/ChatThread";
import { AssistantChatHeader } from "@/components/assistant/AssistantChatHeader";
import { SuggestedPromptChips } from "@/components/assistant/SuggestedPromptChips";

export default function AssistantPage() {
  return (
    <section className=" mx-4 flex h-full min-h-0 flex-col overflow-hidden">
      <AssistantChatHeader />

      <div className="min-h-0  flex-1 overflow-y-auto pb-4">
        <ChatThread />
      </div>

      <div className="shrink-0 bg-[var(--background)] px-4 pb-6 pt-2">
        <SuggestedPromptChips />
        <ChatInput />
      </div>
    </section>
  );
}