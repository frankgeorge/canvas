import { NextRequest, NextResponse } from "next/server";
import { PLAYBOOKS } from "@/lib/data";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const pb = PLAYBOOKS.find(p => p.slug === params.slug || p.id === params.slug);
  if (!pb) {
    return NextResponse.json({ error: "Playbook not found" }, { status: 404 });
  }
  return NextResponse.json({ data: pb });
}
