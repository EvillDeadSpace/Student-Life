import { FetchBooks } from "@/lib/MarketplaceAPI/bookApi";
import React from "react";

export default async function PolovneKnjige() {
  const data = await FetchBooks();
  console.log(data);

  return <div>page</div>;
}
