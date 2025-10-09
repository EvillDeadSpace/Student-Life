import React from "react";
import { prisma } from "@/lib/prisma";

// Force this page to be rendered at request time so internal API routes are available
export const dynamic = "force-dynamic";

export default async function PolovneKnjige() {
  // Read directly from the database in the server component to avoid
  // making an internal HTTP request which can fail during prerender.
  const data = await prisma.bookList.findMany({});

  console.log("PolovneKnjige - db result length:", data.length);

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No books found.</div>;
  }

  return (
    <div>
      {data.map((user, index) => (
        <ul key={index}>
          <li>{String(user.isSold)}</li>
          <li>{user.author}</li>
          <li>{user.subject}</li>
          <li>{user.price}</li>
          <li>{new Date(user.createdAt).toLocaleString().slice(0, 10)}</li>
          <li>{user.id}</li>
        </ul>
      ))}
    </div>
  );
}
