import { DesktopHeader } from "@/components/global/DesktopHeader";
import { MobileHeader } from "@/components/global/MobileHeader";
import { GreetingCard } from "@/components/home/GreetingCard";
import { LowStockCard } from "@/components/home/LowStockCard";
import { NotesCard } from "@/components/home/NotesCard";
import { RecentActivityList } from "@/components/home/RecentActivityList";
import { ShoppingListCard } from "@/components/home/ShoppingListCard";

export default function HomeTabPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 lg:px-5">
      <div className="hidden border-b border-[var(--border)] bg-[var(--background)] lg:block">
        <DesktopHeader
          title="Dashboard"
          searchPlaceholder="Search pantry, meals, notes"
        />
      </div>

      <MobileHeader title="Dashboard" />

      <div className="space-y-3 pb-24 lg:pb-8">
        <GreetingCard />

        <div className="grid gap-3 lg:grid-cols-[0.7fr_0.3fr]">
          <LowStockCard />
          <ShoppingListCard />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <RecentActivityList />
          <NotesCard />
        </div>
      </div>
    </div>
  );
}