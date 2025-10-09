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
    // Automatska detekcija okruženja
    const baseURL =
      process.env.NEXT_PUBLIC_API_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000");

    const response = await fetch(`${baseURL}/api/books`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Fixing to 2 format
    const books: BooksAndEtc[] = Array.isArray(data) ? data : data.value || [];

    return books;
  } catch (error) {
    console.error("Greška pri učitavanju knjiga:", error);
    return [];
  }
}
