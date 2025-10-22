// Legacy book API shim — delegate to the unified marketplace API.
// This file provides the older function names so UI code that imports
// bookApi can keep working while the data actually lives in marketplaceItem.

import { ItemType } from "@prisma/client";
import {
  fetchMarketplaceItems,
  addMarketplaceItem,
  MarketplaceItemResponse,
  CreateMarketplaceItemInput,
} from "./marketplaceApi";

export type BooksAndEtc = MarketplaceItemResponse;

export async function FetchBooks(): Promise<BooksAndEtc[]> {
  // Reuse the unified function and request only BOOK items
  return fetchMarketplaceItems(ItemType.BOOK);
}

export type CreateBookInput = Omit<CreateMarketplaceItemInput, "type"> & {
  // Keep alias for backward compatibility
};

export async function AddBook(input: CreateBookInput) {
  const payload: CreateMarketplaceItemInput = {
    ...input,
    type: ItemType.BOOK,
  } as CreateMarketplaceItemInput;

  return addMarketplaceItem(payload);
}