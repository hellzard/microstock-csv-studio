import { adobeAdapter } from "./adobe";
import { shutterstockAdapter } from "./shutterstock";
import { freepikAdapter } from "./freepik";
import { vecteezyAdapter } from "./vecteezy";
import { PlatformAdapter } from "@/types/platforms";

export const ALL_ADAPTERS: Record<string, PlatformAdapter> = {
  adobe: adobeAdapter,
  shutterstock: shutterstockAdapter,
  freepik: freepikAdapter,
  vecteezy: vecteezyAdapter,
};

export const getAdapter = (id: string): PlatformAdapter | undefined => {
  return ALL_ADAPTERS[id];
};

export const getAdaptersForProject = (platformIds: string[]): PlatformAdapter[] => {
  return platformIds.map(id => getAdapter(id)).filter((a): a is PlatformAdapter => a !== undefined);
};
