import { PrismaClient } from "@/lib/generated/prisma";
import slugify from "slugify";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { title, content, imageUrl, tags } = body;

        const slug = slugify(title, { lower: true, strict: true });

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                imageUrl,
                tags,
            },
        });

        return Response.json(post);
    } catch (error) {
        console.error(error);
        return new Response("Failed to create post", { status: 500 });
    }
}



export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("q");
    const tag = searchParams.get("tag");

    const where = {
        AND: [
            search
                ? {
                    OR: [
                        { title: { contains: search, mode: "insensitive" } },
                        { content: { contains: search, mode: "insensitive" } },
                        { tags: { has: search.toLowerCase() } }, // ✅ Match tags too
                    ],
                }
                : undefined,
            tag ? { tags: { has: tag.toLowerCase() } } : undefined,
        ].filter(Boolean),
    };

    const posts = await prisma.post.findMany({
        where,
        orderBy: { createdAt: "desc" },
    });

    return Response.json(posts);
}
