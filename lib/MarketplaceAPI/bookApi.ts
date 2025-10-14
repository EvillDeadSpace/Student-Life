import toast from "react-hot-toast";

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

// Payload shape expected from the client when creating a book
export type CreateBookInput = {
  title: string;
  author: string;
  faculty: string;
  subject: string;
  condition: string;
  price: number;
  description?: string;
  sellerId?: number;
};

// Fetch all marketplace for books and etc
export async function FetchBooks(): Promise<BooksAndEtc[]> {
  try {
    // Server-side: access DB directly using Prisma to avoid internal HTTP calls
    if (typeof window === "undefined") {
      try {
        const { prisma } = await import("@/lib/prisma");
        const books = await prisma.bookList.findMany({});
        return books as BooksAndEtc[];
      } catch (prismaErr) {
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

    const response = await fetch(`${baseURL}/api/books`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const books: BooksAndEtc[] = Array.isArray(data) ? data : data.value || [];

    return books;
  } catch (error) {
    console.error("❌❌ CRITICAL ERROR in FetchBooks:", error);
    return [];
  }
}

//


// http://localhost:3000/api/books
export async function AddBook(book: CreateBookInput) {
  const response = await fetch('/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(`Greška: ${response.status} - ${response.statusText}`);
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return data;
}