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
    const serverBase =
      base ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
      (process.env.NODE_ENV === "development"
        ? `http://localhost:${process.env.PORT || 3000}`
        : "");
    const url =
      typeof window === "undefined" ? `${serverBase}${routePath}` : routePath;

    // If server-side and we couldn't construct a server base, bail out — fetching an internal route during prerender can return HTML (error page)
    if (typeof window === "undefined" && !serverBase) {
      console.warn(
        "FetchBooks: no server base available during SSR — returning [] to avoid prerender failure."
      );
      return [];
    }

    // Debug: log serverBase and url so we can inspect build-time behavior on Vercel
    try {
      console.warn("FetchBooks debug - serverBase:", serverBase, "url:", url);
    } catch {
      /* ignore logging errors */
    }

    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "default",
      next: {
        revalidate: 3600,
      },
    });

    // Log response metadata for debugging
    const contentType = res.headers.get("content-type") || "";
    console.warn(
      `FetchBooks response - url: ${url} status: ${res.status} ok: ${res.ok} content-type: ${contentType}`
    );

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(
          `FetchBooks: ${url} returned 404 — returning [] to avoid prerender failure.`
        );
        return [];
      }
      const text = await res.text().catch(() => "");
      console.error(
        `FetchBooks unexpected response body start: ${text.slice(0, 200)}`
      );
      throw new Error(
        `Fetch failed: ${res.status} ${res.statusText}. Body: ${text.slice(
          0,
          200
        )}`
      );
    }

    // If it's not JSON, log a preview and return [] so we don't throw parsing errors during runtime
    if (!contentType.includes("application/json")) {
      const text = await res.text().catch(() => "");
      console.warn(
        `FetchBooks: ${url} returned non-JSON response (content-type: ${contentType}). Returning []. Response start: ${text.slice(
          0,
          200
        )}`
      );
      return [];
    }

    // Safely parse JSON and log any parse errors
    try {
      const json = await res.json();
      return json;
    } catch (parseErr) {
      const text = await res.text().catch(() => "");
      console.error(
        `FetchBooks JSON parse error. Response start: ${text.slice(0, 200)}`,
        parseErr
      );
      return [];
    }
  } catch (err) {
    console.error("FetchBooks error", err);
    throw err;
  }
}
