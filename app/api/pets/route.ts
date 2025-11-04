export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma"; // "@/lib/prisma" でもOK

// --- GET: 図鑑一覧 ---
// DBで失敗しても空配列を返してページが落ちない暫定対応
export async function GET() {
  try {
    // 並び替えは一旦なし（createdAtが無い環境でも動かすため）
    const pets = await prisma.pet.findMany();
    return NextResponse.json(pets);
  } catch (e) {
    console.error("[/api/pets GET] DB error:", e);
    // とりあえず表示させるために200で空配列を返す
    return NextResponse.json([]);
  }
}

// --- POST: 追加（そのまま利用可） ---
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
    console.error("[/api/pets POST] error:", e);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
