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
    console.log("🔍 FetchBooks started - typeof window:", typeof window);

    // If running server-side (app router/page SSR), read directly from Prisma to avoid internal HTTP calls
    if (typeof window === "undefined") {
      console.log(
        "🖥️ Server-side execution detected - trying direct Prisma access"
      );
      try {
        const { prisma } = await import("@/lib/prisma");
        const books = await prisma.bookList.findMany({});
        console.log(
          "✅ Prisma direct access SUCCESS - books count:",
          books.length
        );
        return books as BooksAndEtc[];
      } catch (prismaErr) {
        console.error("❌ Prisma direct access FAILED:", prismaErr);
        console.warn(
          "Prisma direct access failed, will fallback to HTTP fetch:",
          prismaErr
        );
      }
    }

    // Client-side or fallback: fetch from internal API
    const baseURL =
      process.env.NEXT_PUBLIC_API_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3000}`);

    console.log("🌐 HTTP Fetch fallback - baseURL:", baseURL);

    const response = await fetch(`${baseURL}/api/books`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    console.log("📡 HTTP Response status:", response.status, response.ok);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    console.log(
      "📦 Raw data received:",
      JSON.stringify(data).substring(0, 200)
    );

    const books: BooksAndEtc[] = Array.isArray(data) ? data : data.value || [];
    console.log("✅ Final books count:", books.length);

    return books;
  } catch (error) {
    console.error("❌❌ CRITICAL ERROR in FetchBooks:", error);
    return [];
  }
}
