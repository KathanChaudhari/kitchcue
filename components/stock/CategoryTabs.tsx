import { FilterChips } from "@/components/global/FilterChips";

export function CategoryTabs() {
  return <FilterChips active="All" options={["All", "Food", "Masala", "Cutlery", "Cleaning"]} />;
}
