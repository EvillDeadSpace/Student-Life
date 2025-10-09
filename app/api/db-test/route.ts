import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.bookList.count();
    return NextResponse.json({ ok: true, count });
  } catch (error) {
    console.error("/api/db-test error", error);
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}
