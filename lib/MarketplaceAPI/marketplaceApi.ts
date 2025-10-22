import { ItemType } from "@prisma/client";

export interface MarketplaceItemResponse {
  id: number;
  type: ItemType;
  title: string;
  author?: string | null;
  subject?: string | null;
  brand?: string | null;
  model?: string | null;
  faculty?: string | null;
  category?: string | null;
  condition?: string | null;
  price: number;
  description?: string | null;
  images: string[];
  metadata?: Record<string, unknown>;
  isSold: boolean;
  isArchived: boolean;
  slug?: string | null;
  sellerId: number;
  buyerId?: number | null;
  createdAt: string;
  updatedAt: string;
  seller?: {
    id: number;
    ime: string;
    prezime: string;
    email: string;
  };
}

export type CreateMarketplaceItemInput = {
  type: ItemType;
  title: string;
  author?: string;
  subject?: string;
  brand?: string;
  model?: string;
  faculty?: string;
  category?: string;
  condition?: string;
  price: number;
  description?: string;
  images?: string[];
  metadata?: Record<string, unknown>;
  sellerId?: number;
};

// Fetch marketplace items with optional type filter
export async function fetchMarketplaceItems(
  type?: ItemType
): Promise<MarketplaceItemResponse[]> {
  try {
    // Server-side: access DB directly using Prisma
    if (typeof window === "undefined") {
      try {
        const { prisma } = await import("@/lib/prisma");
        const where = type ? { type } : {};
        const items = await prisma.marketplaceItem.findMany({
          where,
          orderBy: { createdAt: "desc" },
          include: {
            seller: {
              select: { id: true, ime: true, prezime: true, email: true }
            }
          }
        });
        return items.map(item => ({
          ...item,
          price: Number(item.price),
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString(),
          images: [],
          metadata: item.metadata as Record<string, unknown> | undefined,
        }));
      } catch (prismaErr) {
        console.warn("Prisma direct access failed, will fallback to HTTP fetch:", prismaErr);
      }
    }

    // Client-side or fallback: fetch from API
    const baseURL =
      process.env.NEXT_PUBLIC_API_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3000}`);

    const url = type
      ? `${baseURL}/api/marketplace?type=${type}`
      : `${baseURL}/api/marketplace`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("❌ Error in fetchMarketplaceItems:", error);
    return [];
  }
}

// Add new marketplace item
export async function addMarketplaceItem(item: CreateMarketplaceItemInput) {
  const response = await fetch("/api/marketplace", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Error: ${response.status}`);
  }

  return data;
}
