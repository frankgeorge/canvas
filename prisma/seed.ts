import { PrismaClient } from "@prisma/client";
import { PLAYBOOKS } from "../lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding safyr database...\n");

  // Clear existing playbooks
  await prisma.playbook.deleteMany();
  console.log("🗑  Cleared existing playbooks");

  // Seed playbooks
  for (const pb of PLAYBOOKS) {
    await prisma.playbook.create({
      data: {
        id: pb.id,
        slug: pb.slug,
        title: pb.title,
        description: pb.description,
        longDescription: pb.longDescription,
        category: pb.category,
        complexity: pb.complexity.toUpperCase() as "STARTER" | "STANDARD" | "ADVANCED",
        authorName: pb.author.name,
        authorOrg: pb.author.org,
        authorVerified: pb.author.verified ?? false,
        tags: pb.tags,
        agentCount: pb.agentCount,
        stepCount: pb.stepCount,
        avgRuntime: pb.avgRuntime,
        timeSaved: pb.timeSaved,
        runCount: pb.runCount,
        starCount: pb.starCount,
        cloneCount: pb.cloneCount,
        nodes: (pb.nodes as object[]) ?? [],
        outcomes: pb.outcomes ?? [],
        requiredIntegrations: pb.requiredIntegrations ?? [],
        featured: pb.featured ?? false,
        isPremium: pb.isPremium ?? false,
        publishedAt: new Date(pb.createdAt),
      },
    });
    console.log(`  ✓ ${pb.title}`);
  }

  console.log(`\n✅ Seeded ${PLAYBOOKS.length} playbooks`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
