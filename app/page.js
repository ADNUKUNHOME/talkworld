"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");

  const fetchPosts = async () => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (activeTag) params.set("tag", activeTag);

    const res = await fetch(`/api/posts?${params.toString()}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    } else {
      console.error("Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search, activeTag]);

  return (
    <main className="container mx-auto px-4 py-10">
      {/* Intro Section */}
      <section className="mb-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Welcome to My Dev Blog 🚀
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Insights, tutorials, and ideas on web development, AI, and software engineering.
          </p>
        </div>
        <div>
          <Link href="/blog/create" className="inline-block">
            <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700">
              Create New Post
            </Button>
          </Link>
        </div>
      </section>

      {/* Search + Tags + Clear Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blog posts..."
            className="flex-1 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-white"
          />
          {(search || activeTag) && (
            <button
              onClick={() => {
                setSearch("");
                setActiveTag("");
              }}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {["Next.js", "React", "AI", "CSS", "MongoDB"].map((tag) => (
            <span
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? "" : tag)}
              className={`text-sm px-3 py-1 rounded-full cursor-pointer transition ${tag === activeTag
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700"
                }`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Main content + sidebar */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Blog Posts */}
        <section className="lg:w-2/3 space-y-6">
          {posts.length === 0 && (
            <p className="text-gray-600 dark:text-gray-400">No posts found.</p>
          )}
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block">
              <div className="border rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <img
                  src={post.imageUrl || "https://source.unsplash.com/600x400/?technology"}
                  alt="Post image"
                  className="h-40 w-full md:w-60 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-3">
                    {post.content}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Sidebar */}
        <aside className="lg:w-1/3 space-y-8">
          {/* Categories */}
          <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">📂 Categories</h2>
            <ul className="space-y-2">
              {["Web Dev", "AI", "Career", "Design"].map((cat) => (
                <li key={cat}>
                  <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Posts (placeholder) */}
          <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">🔥 Popular Posts</h2>
            <ul className="space-y-4">
              {[1, 2].map((item) => (
                <li key={item} className="flex gap-3 items-center animate-pulse">
                  <div className="bg-gray-300 dark:bg-gray-700 h-12 w-12 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
                    <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
              📬 Join the Newsletter
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get the latest posts delivered straight to your inbox.
            </p>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mb-2 px-3 py-2 border rounded dark:bg-gray-900 dark:text-white"
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
