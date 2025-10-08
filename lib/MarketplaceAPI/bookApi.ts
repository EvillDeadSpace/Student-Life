export interface BooksAndEtc {
  id: number;
  title: string;
  author: string;
  faculty: string;
  subject: string;
  condition: string;
  price: number;
  description: string;
  isSold: boolean;
  sellerId: number;
  buyerId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

// Fetch all marketplace for books and etc
export async function FetchBooks(): Promise<BooksAndEtc[]> {
  try {
    const routePath = "/api/books";
    const base = process.env.NEXT_PUBLIC_API_URL ?? "";
    const url =
      typeof window === "undefined" ? `${base}${routePath}` : routePath;

    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "default",
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok)
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error("FetchBooks error", err);
    throw err;
  }
}
