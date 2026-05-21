import { AppNav } from "@/components/global/AppNav";
import { MobileHeader } from "@/components/global/MobileHeader";
import { PageContainer } from "@/components/global/PageContainer";
import { GreetingCard } from "@/components/home/GreetingCard";
import { LowStockCard } from "@/components/home/LowStockCard";
import { NotesCard } from "@/components/home/NotesCard";
import { RecentActivityList } from "@/components/home/RecentActivityList";
import { ShoppingListCard } from "@/components/home/ShoppingListCard";

export default function HomeTabPage() {
  return (
    <>
      <AppNav active="home" />

      <PageContainer headerTitle="Dashboard" searchPlaceholder="Search pantry, meals, notes">
        <MobileHeader title="Dashboard" />

        <div className="space-y-4 pb-24 lg:pb-8">
          <div>
            <GreetingCard />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <LowStockCard />
            <ShoppingListCard />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <RecentActivityList />
            <NotesCard />
          </div>
        </div>
      </PageContainer>
    </>
  );
}
