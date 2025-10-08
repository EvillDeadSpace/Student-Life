import { revalidatePath } from "next/cache";
import { prisma } from "./../../../lib/prisma";
import { NextResponse } from "next/server";

// Get All books
export async function GET() {
  try {
    const books = await prisma.bookList.findMany({});
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(error);
  }
}

// Post book
export async function POST(request: Request) {
  try {
    const {
      title,
      author,
      faculty,
      subject,
      condition,
      price,
      description,
      isSold,
      sellerId,
    } = await request.json();

    const postBooks = await prisma.bookList.create({
      data: {
        title,
        author,
        faculty,
        subject,
        condition,
        price,
        description,
        isSold,
        sellerId,
      },
    });
    revalidatePath("/kategorije/marketplace/polovnih-udzbenika-i-materijala");
    return NextResponse.json(postBooks);
  } catch (error) {
    console.error("Problem with db.", error);
    NextResponse.json(error);
  }
}
