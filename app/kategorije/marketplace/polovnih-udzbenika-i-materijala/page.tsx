import { FetchBooks } from "@/lib/MarketplaceAPI/bookApi";
import React from "react";

export default async function PolovneKnjige() {
  const data = await FetchBooks();
  console.log(data);

  return (
    <div>
      {" "}
      {data.map((user, index) => (
        <ul key={index}>
          <li>{user.isSold}</li>
          <li>{user.author}</li>
          <li>{user.subject}</li>
          <li>{user.price}</li>
          <li>{user.createdAt.toLocaleString().slice(0, 10)}</li>
          <li>{user.id}</li>
        </ul>
      ))}
    </div>
  );
}
