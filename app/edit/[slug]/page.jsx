export default function EditBlogPage({ params }) {
    const { slug } = params;

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-4">Edit Blog: {slug}</h1>
            <form className="space-y-4">
                <input type="text" defaultValue="Existing Title" className="w-full p-2 border rounded" />
                <textarea defaultValue="Existing Content" className="w-full p-2 border rounded h-40" />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
            </form>
        </main>
    )
}
