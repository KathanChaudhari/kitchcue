"use client";

import { useEffect, useState } from "react";
import { HomeDashboardData } from "@/app/types/home";
import { getHomeDashboard } from "@/lib/client/home";

export function useHomeDashboard() {
  const [data, setData] = useState<HomeDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadDashboard() {
    try {
      setIsLoading(true);
      setError(null);

      const dashboard = await getHomeDashboard();
      setData(dashboard);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load dashboard"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    data,
    isLoading,
    error,
    refresh: loadDashboard
  };
}