"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState("");


    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append("file", image);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        return data.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const imageUrl = image ? await handleImageUpload() : "";
        const tagArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);

        const res = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({ title, content, imageUrl, tags: tagArray }),
            headers: { "Content-Type": "application/json" },
        });

        setLoading(false);

        if (res.ok) router.push("/");
        else alert("Post creation failed.");
    };

    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Post Title"
                    className="w-full p-3 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Post Content"
                    className="w-full p-3 border rounded"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    required
                />

                {/* Tags input */}
                <input
                    type="text"
                    placeholder="Enter tags (comma separated)"
                    className="w-full p-3 border rounded"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />


                {/* Upload image */}
                <input
                    type="file"
                    accept="image/*"
                    className="block w-full border p-2 rounded"
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                        setPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                />

                {/* Image preview */}
                {preview && (
                    <img
                        src={preview}
                        alt="preview"
                        className="mt-2 w-full h-64 object-cover rounded"
                    />
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    {loading ? "Publishing..." : "Publish Post"}
                </button>
            </form>
        </main>
    );
}
