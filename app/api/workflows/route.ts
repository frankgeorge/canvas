import { NextRequest, NextResponse } from "next/server";
import { WORKFLOWS } from "@/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  let list = [...WORKFLOWS];
  if (status) list = list.filter(w => w.status === status);

  return NextResponse.json({ data: list, total: list.length });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newWorkflow = {
      id: `wf_${Date.now()}`,
      ...body,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      runCount: 0,
      nodes: body.nodes || [],
      edges: body.edges || [],
    };
    // In production: await prisma.workflow.create({ data: newWorkflow })
    return NextResponse.json({ data: newWorkflow }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
