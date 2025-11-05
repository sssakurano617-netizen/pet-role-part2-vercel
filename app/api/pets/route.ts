// app/api/pets/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pets = await prisma.pet.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(pets);
  } catch (err: any) {
    // 本番で原因を掴むためにメッセージを返す（暫定）
    return NextResponse.json(
      { error: "pets GET failed", message: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}
