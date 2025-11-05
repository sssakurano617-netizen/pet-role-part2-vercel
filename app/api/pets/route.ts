// app/api/pets/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pets = await prisma.pet.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(pets);
  } catch (e) {
    console.error("GET /api/pets error:", e);
    return NextResponse.json({ error: "failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { species, name, role, comment, emoji } = await req.json();

    if (!species || !name || !role || !comment) {
      return NextResponse.json(
        { error: "species, name, role, comment は必須です" },
        { status: 400 }
      );
    }

    const pet = await prisma.pet.create({
      data: { species, name, role, comment, emoji },
    });

    return NextResponse.json(pet, { status: 201 });
  } catch (e) {
    console.error("POST /api/pets error:", e);
    return NextResponse.json({ error: "failed to create" }, { status: 500 });
  }
}
