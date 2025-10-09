import { FetchBooks } from "@/lib/MarketplaceAPI/bookApi";
import React from "react";

export default async function PolovneKnjige() {
  const data = await FetchBooks();
  console.log(
    "FetchBooks result length:",
    Array.isArray(data) ? data.length : typeof data,
    data
  );

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
