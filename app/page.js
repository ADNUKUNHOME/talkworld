async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}


export default async function HomePage() {

  const posts = await getPosts();

  return (
    <main className="container mx-auto px-4 py-10">
      {/* Intro Section */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          Welcome to My Dev Blog 🚀
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Insights, tutorials, and ideas on web development, AI, and software engineering.
        </p>
      </section>

      {/* Search + Tags */}
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search blog posts..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
        />
        <div className="flex flex-wrap gap-2">
          {["Next.js", "React", "AI", "CSS", "MongoDB"].map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200 rounded-full cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-700"
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
          {posts.map((post) => (
            <div
              key={post.id}
              className="border rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-4"
            >
              {/* Dummy Image */}
              <img
                src={`https://source.unsplash.com/600x400/?technology,code,${post.id}`}
                alt="Post Cover"
                className="h-40 w-full md:w-60 object-cover rounded-lg"
              />

              {/* Actual Post Content */}
              <div className="flex flex-col justify-between flex-1">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-3">
                  {post.content}
                </p>
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  Posted on {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
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

          {/* Popular Posts */}
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
