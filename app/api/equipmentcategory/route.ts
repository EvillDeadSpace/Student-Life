import { revalidatePath } from "next/cache";
import { prisma } from "./../../../lib/prisma";
import { NextResponse } from "next/server";
import { ItemType, Prisma } from "@prisma/client";

// GET: return distinct equipment categories (for UI selects)
export async function GET() {
  try {
    // find distinct non-null category values for EQUIPMENT items
    const categories = await prisma.marketplaceItem.findMany({
      where: { type: ItemType.EQUIPMENT, category: { not: null } },
      select: { category: true },
      distinct: ["category"],
    });

    const values = categories.map((c) => c.category).filter(Boolean) as string[];
    return NextResponse.json({ categories: values });
  } catch (error) {
    console.error("GET /api/equipmentcategory error:", error);
    return NextResponse.json({ error: "Failed to load equipment categories" }, { status: 500 });
  }
}

// POST: create a new marketplace item of type EQUIPMENT
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      category,
      brand,
      model,
      faculty,
      condition,
      price,
      description,
      sellerId: sellerIdFromBody,
    } = body;

    const headerUserId = request.headers.get("x-user-id");
    const sellerId = headerUserId ? Number(headerUserId) : sellerIdFromBody;

    // basic validation
    if (!title || price === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice)) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    // Require sellerId (who posts the item)
    if (!sellerId) {
      return NextResponse.json({ error: "Missing sellerId header or body" }, { status: 400 });
    }

    const baseData: Prisma.MarketplaceItemCreateInput = {
      title: String(title),
      type: ItemType.EQUIPMENT,
      category: category ?? null,
      brand: brand ?? null,
      model: model ?? null,
      faculty: faculty ?? null,
      condition: condition ?? null,
      // cast number to Prisma.Decimal-compatible type
      price: numericPrice as unknown as Prisma.Decimal,
      description: description ?? null,
      seller: { connect: { id: Number(sellerId) } },
    };

    const created = await prisma.marketplaceItem.create({ data: baseData });

    // revalidate equipment listing page (adjust path if you use a different route)
    try {
      revalidatePath("/kategorije/marketplace/studentske-opreme");
    } catch (err) {
      // ignore revalidation errors but log them
      console.warn("revalidatePath failed:", err);
    }

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/equipmentcategory error:", error);
    return NextResponse.json({ error: "Failed to create equipment item" }, { status: 500 });
  }
}
