"use client";

import { useCallback, useEffect, useState } from "react";
import { HomeDashboardData } from "@/app/types/home";
import { getHomeDashboard } from "@/lib/client/home";

export function useHomeDashboard() {
  const [data, setData] = useState<HomeDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async (showFullLoading = true) => {
    try {
      if (showFullLoading) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }

      setError(null);

      const dashboard = await getHomeDashboard();
      setData(dashboard);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load dashboard",
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard(true);
  }, [loadDashboard]);

  async function refresh() {
    await loadDashboard(false);
  }

  return {
    data,
    isLoading,
    isRefreshing,
    error,

    refresh,
    refetch: refresh,
  };
}
