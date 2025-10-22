import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ItemType } from "@prisma/client";

// GET all marketplace items (optional ?type= query param)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const typeParam = searchParams.get("type");
    
    const where = typeParam && Object.values(ItemType).includes(typeParam as ItemType)
      ? { type: typeParam as ItemType }
      : {};

    const items = await prisma.marketplaceItem.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        seller: {
          select: { id: true, ime: true, prezime: true, email: true }
        }
      }
    });
    
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET /api/marketplace error:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

// POST new marketplace item
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      type,
      title,
      author,
      subject,
      brand,
      model,
      faculty,
      category,
      condition,
      price,
      description,
      images,
      metadata,
      sellerId: sellerIdFromBody,
    } = body;

    // Validate type
    if (!type || !Object.values(ItemType).includes(type)) {
      return NextResponse.json(
        { error: "Invalid or missing type field" },
        { status: 400 }
      );
    }

    const headerUserId = request.headers.get("x-user-id");
    const sellerId = headerUserId ? Number(headerUserId) : sellerIdFromBody;

    if (!sellerId || isNaN(sellerId)) {
      return NextResponse.json(
        { error: "sellerId is required" },
        { status: 400 }
      );
    }

    const newItem = await prisma.marketplaceItem.create({
      data: {
        type,
        title,
        author: author || null,
        subject: subject || null,
        brand: brand || null,
        model: model || null,
        faculty: faculty || null,
        category: category || null,
        condition: condition || null,
        price: parseFloat(price),
        description: description || null,
        images: images || [],
        metadata: metadata || null,
        sellerId,
      },
    });

    // Revalidate relevant paths
    revalidatePath("/kategorije/marketplace");
    
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("POST /api/marketplace error:", error);
    return NextResponse.json(
      { error: "Failed to create item", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
