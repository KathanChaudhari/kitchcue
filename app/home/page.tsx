import { AppNav } from "@/components/global/AppNav";
import { MobileHeader } from "@/components/global/MobileHeader";
import { PageContainer } from "@/components/global/PageContainer";
import { GreetingCard } from "@/components/home/GreetingCard";
import { LowStockCard } from "@/components/home/LowStockCard";
import { NearExpiryCard } from "@/components/home/NearExpiryCard";
import { QuickActionRow } from "@/components/home/QuickActionRow";
import { RecentActivityList } from "@/components/home/RecentActivityList";
import { ReminderCardList } from "@/components/home/ReminderCardList";
import { SuggestedMealCard } from "@/components/home/SuggestedMealCard";

export default function HomeTabPage() {
  return (
    <>
      <AppNav active="home" />

      <PageContainer>
        <MobileHeader title="Home" actionHref="/stock/add" />

        <div className="grid gap-4 pb-24 lg:grid-cols-4 lg:pb-8">
          <div className="space-y-4 lg:col-span-2">
            <GreetingCard />
            <QuickActionRow />
            <ReminderCardList />
          </div>

          <div className="space-y-4 lg:col-span-2">
            <LowStockCard />
            <div className="grid gap-4 sm:grid-cols-2">
              <NearExpiryCard />
              <SuggestedMealCard />
            </div>
            <RecentActivityList />
          </div>
        </div>
      </PageContainer>
    </>
  );
}
