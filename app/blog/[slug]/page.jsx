import { prisma } from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const posts = await prisma.post.findMany({ select: { slug: true } });
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }) {
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
    });

    if (!post) return notFound();

    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {post.title}
            </h1>
            <p className="text-sm text-gray-500 mb-8">
                Posted on {new Date(post.createdAt).toLocaleDateString()}
            </p>

            {post.imageUrl && (
                <div className="mb-8">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={800}
                        height={400}
                        className="w-full rounded-lg object-cover"
                    />
                </div>
            )}

            <div className="prose dark:prose-invert max-w-none">
                <p>{post.content}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white px-2 py-1 rounded-full"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </main>
    );
}
