import { AppNav } from "@/components/global/AppNav";
import { FloatingAddButton } from "@/components/global/FloatingAddButton";
import { MobileHeader } from "@/components/global/MobileHeader";
import { PageContainer } from "@/components/global/PageContainer";
import { CategoryTabs } from "@/components/stock/CategoryTabs";
import { EssentialSuggestionCard } from "@/components/stock/EssentialSuggestionCard";
import { InventoryList } from "@/components/stock/InventoryList";
import { InventorySearch } from "@/components/stock/InventorySearch";

export default function StockPage() {
  return (
    <>
      <AppNav active="stock" />

      <PageContainer>
        <MobileHeader title="Stock" eyebrow="Kitchen inventory" actionHref="/stock/add" />

        <div className="grid gap-4 pb-24 lg:grid-cols-[20rem_1fr] lg:pb-8">
          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <InventorySearch />
            <CategoryTabs />
            {/* <EssentialSuggestionCard /> */}
          </aside>

          <InventoryList />
        </div>

        <FloatingAddButton href="/stock/add" label="Add stock item" />
      </PageContainer>
    </>
  );
}