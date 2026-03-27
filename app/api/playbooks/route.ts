import { NextRequest, NextResponse } from "next/server";
import { PLAYBOOKS } from "@/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const complexity = searchParams.get("complexity");
  const q = searchParams.get("q");
  const featured = searchParams.get("featured");
  const limit = parseInt(searchParams.get("limit") || "50");

  let list = [...PLAYBOOKS];

  if (category) list = list.filter(p => p.category === category);
  if (complexity) list = list.filter(p => p.complexity === complexity);
  if (featured === "true") list = list.filter(p => p.featured);
  if (q) {
    const query = q.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query))
    );
  }

  return NextResponse.json({
    data: list.slice(0, limit),
    total: list.length,
    page: 1,
  });
}
