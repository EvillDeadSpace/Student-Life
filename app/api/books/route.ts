import { revalidatePath } from "next/cache";
import { prisma } from "./../../../lib/prisma";
import { NextResponse } from "next/server";

// Get All books
export async function GET() {
  try {
    const books = await prisma.marketplaceItem.findMany({});
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(error);
  }
}

// Post book
export async function POST(request: Request) {
  try {
    // Parse incoming body but ignore client-provided isSold and buyerId
    const body = await request.json();
    const {
      title,
      author,
      faculty,
      subject,
      condition,
      price,
      description,
      sellerId: sellerIdFromBody,
      type,
    } = body;

    // Prefer server-side sellerId (derived from auth/session). As a safe
    // fallback for local/dev, accept an `x-user-id` header or the optional
    // sellerId in the body. Replace this with real auth extraction in prod.
    const headerUserId = request.headers.get("x-user-id");
    const sellerId = headerUserId ? Number(headerUserId) : sellerIdFromBody;

    const postBooks = await prisma.marketplaceItem.create({
      data: {
        title,
        author,
        faculty,
        subject,
        condition,
        price,
        description,
        type: type ?? "UNKNOWN",
        // do NOT accept buyerId or isSold from client; let DB default isSold=false
        // and buyerId remain null until a purchase occurs
        sellerId: sellerId as number,
      },
    });
    revalidatePath("/kategorije/marketplace/polovnih-udzbenika-i-materijala");
    return NextResponse.json(postBooks);
  } catch (error) {
    console.error("Problem with db.", error);
    return NextResponse.json(error);
  }
}
