import { AIUsageBanner } from "@/components/assistant/AIUsageBanner";
import { ChatInput } from "@/components/assistant/ChatInput";
import { ChatList } from "@/components/assistant/ChatList";
import { ChatThread } from "@/components/assistant/ChatThread";
import { SuggestedPromptChips } from "@/components/assistant/SuggestedPromptChips";
import { AppNav } from "@/components/global/AppNav";
import { MobileHeader } from "@/components/global/MobileHeader";
import { PageContainer } from "@/components/global/PageContainer";

export default function AssistantPage() {
  return (
    <>
      <AppNav active="assistant" />

      <PageContainer>
        <MobileHeader title="Assistant" eyebrow="Cook smarter" />

        <div className="grid gap-4 pb-40 lg:grid-cols-[22rem_1fr] lg:pb-8">
          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <AIUsageBanner />
            <ChatList />
            <SuggestedPromptChips />
          </aside>

          <section className="space-y-4">
            <ChatThread />
            <ChatInput />
          </section>
        </div>
      </PageContainer>
    </>
  );
}
