import { MobileHeader } from "@/components/global/MobileHeader";
import { GreetingCard } from "@/components/home/GreetingCard";
import { LowStockCard } from "@/components/home/LowStockCard";
import { NotesCard } from "@/components/home/NotesCard";
import { RecentActivityList } from "@/components/home/RecentActivityList";
import { ShoppingListCard } from "@/components/home/ShoppingListCard";

export default function HomeTabPage() {
  return (
    <>
      <MobileHeader title="Dashboard" />

      <div className="space-y-4 pb-24 lg:pb-8">
        <div>
          <GreetingCard />
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.7fr_0.3fr]">
  <LowStockCard />
  <ShoppingListCard />
</div>

        <div className="grid gap-4 lg:grid-cols-2">
          <RecentActivityList />
          <NotesCard />
        </div>
      </div>
    </>
  );
}
