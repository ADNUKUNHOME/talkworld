import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { title, content } = await req.json();
        if (!title || !content) {
            return new Response(JSON.stringify({ error: 'Title and content are required' }))
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
            }
        })

        return Response.json({ message: 'Post created successfully', post: newPost }, { status: 201 });

    }
    catch (error) {
        console.error('Error in POST /api/posts:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }, { status: 500 }));
    }
}

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        });
        return Response.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return new Response("Failed to fetch posts", { status: 500 });
    }
}