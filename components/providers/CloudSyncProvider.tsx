"use client";

import { useEffect, useRef } from "react";
import { useProjectStore } from "@/lib/store/useProjectStore";

export function CloudSyncProvider({ children }: { children: React.ReactNode }) {
  const syncFromCloud = useProjectStore(state => state.syncFromCloud);
  const syncedRef = useRef(false);

  useEffect(() => {
    if (!syncedRef.current) {
      syncedRef.current = true;
      syncFromCloud().catch(err => console.error("Cloud sync failed:", err));
    }
  }, [syncFromCloud]);

  return <>{children}</>;
}
