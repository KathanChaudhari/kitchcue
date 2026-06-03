"use client";

import { DesktopHeader } from "@/components/global/DesktopHeader";
import { MobileHeader } from "@/components/global/MobileHeader";
import { GreetingCard } from "@/components/home/GreetingCard";
import { LowStockCard } from "@/components/home/LowStockCard";
import { NotesCard } from "@/components/home/NotesCard";
import { RecentActivityList } from "@/components/home/RecentActivityList";
import { ShoppingListCard } from "@/components/home/ShoppingListCard";
import { useHomeDashboard } from "@/hooks/useHomeDashboard";
import { updateStockItem } from "@/lib/client/stock";

export default function HomeTabPage() {
  const { data, isLoading, error, refetch } = useHomeDashboard();

  async function handleAddToShoppingList(itemId: string) {
    await updateStockItem(itemId, {
      isShoppingList: true,
      isPurchased: false
    });

    refetch();
  }

  async function handleUpdateQuantity(itemId: string, quantity: number) {
    await updateStockItem(itemId, {
      quantity,
      isShoppingList: false,
      isPurchased: true
    });

    refetch();
  }

  async function handleRemoveFromShoppingList(itemId: string) {
    await updateStockItem(itemId, {
      isShoppingList: false,
      isPurchased: false
    });

    refetch();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 lg:px-5">
      <div className="hidden border-b border-[var(--border)] bg-[var(--background)] lg:block">
        <DesktopHeader
          title="Dashboard"
          searchPlaceholder="Search pantry, meals, notes"
        />
      </div>

      <MobileHeader title="KitchCue" />

      {isLoading ? (
        <div className="space-y-7 pb-24 pt-4 lg:space-y-3 lg:pb-8 lg:pt-0">
          <div className="h-52 animate-pulse rounded-3xl bg-[var(--card)] lg:h-56" />

          <div className="grid gap-7 lg:grid-cols-[0.7fr_0.3fr] lg:gap-3">
            <div className="h-72 animate-pulse rounded-2xl bg-[var(--card)]" />
            <div className="h-72 animate-pulse rounded-2xl bg-[var(--card)]" />
          </div>

          <div className="grid gap-7 lg:grid-cols-2 lg:gap-4">
            <div className="h-72 animate-pulse rounded-2xl bg-[var(--card)]" />
            <div className="h-72 animate-pulse rounded-2xl bg-[var(--card)]" />
          </div>
        </div>
      ) : error ? (
        <div className="pb-24 pt-4 lg:pb-8 lg:pt-0">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm font-medium text-[var(--muted)]">
            {error}
          </div>
        </div>
      ) : (
        <div className="space-y-7 pb-24 pt-4 lg:space-y-3 lg:pb-8 lg:pt-0">
          <GreetingCard
            name={data?.user?.name}
            totalItems={data?.summary.totalInventoryItems || 0}
            lowStockCount={data?.summary.lowStockCount || 0}
          />

          <div className="grid gap-7 lg:grid-cols-[0.7fr_0.3fr] lg:gap-3">
            <LowStockCard
              items={data?.lowStockItems || []}
              onAddToShoppingList={handleAddToShoppingList}
              onUpdateQuantity={handleUpdateQuantity}
            />

<ShoppingListCard
  items={data?.shoppingItems || []}
  onRemoveFromShoppingList={handleRemoveFromShoppingList}
  onUpdateQuantity={handleUpdateQuantity}
/>
          </div>

          <div className="grid gap-7 lg:grid-cols-2 lg:gap-4">
            <RecentActivityList items={data?.recentActivity || []} />
            <NotesCard notes={data?.notes || []} />
          </div>
        </div>
      )}
    </div>
  );
}