import { revalidatePath } from "next/cache";
import { prisma } from "./../../../lib/prisma";
import { NextResponse } from "next/server";

// Get all equipment categories

export async function GET() {
  try {
    const equipmentCategories = await prisma.studentEquipment.findMany({});
    return NextResponse.json(equipmentCategories);
  } catch (error) {
    return NextResponse.json(error);
  }
}

// Post equipment category
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

    const postEquipmentCategory = await prisma.studentEquipment.create({
      data: {
        title,
        category,
        brand,
        model,
        faculty,
        condition,
        price,
        description,
        sellerId: sellerId as number,
      },
    });
    revalidatePath("/kategorije/marketplace/student-opreme-i-dodataka");
    return NextResponse.json(postEquipmentCategory);

  } catch (error) {
      console.error("Problem with db.", error);
    return NextResponse.json(error);
  }
}
