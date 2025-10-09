import { NextResponse } from "next/server";

export async function GET() {
  try {
    const debug = {
      ok: true,
      now: new Date().toISOString(),
      message: "debug-books endpoint reachable",
    };
    return NextResponse.json(debug);
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
