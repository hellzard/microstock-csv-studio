import { PlatformAdapter } from "@/types/platforms";
import { adobeStockAdapter } from "./adobe-stock";
import { shutterstockAdapter } from "./shutterstock";
import { magnificAdapter } from "./magnific";
import { pond5Adapter } from "./pond5";

export const adapters: Record<string, PlatformAdapter> = {
  [adobeStockAdapter.id]: adobeStockAdapter,
  [shutterstockAdapter.id]: shutterstockAdapter,
  [magnificAdapter.id]: magnificAdapter,
  [pond5Adapter.id]: pond5Adapter,
};

export function getAdapter(id: string): PlatformAdapter | undefined {
  return adapters[id];
}
