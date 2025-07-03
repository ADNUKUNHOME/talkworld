// app/blog/[slug]/page.jsx
import { useParams } from 'next/navigation'

export default function BlogDetailPage({ params }) {
    const { slug } = params;

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Blog Title - {slug}</h1>
            <p className="text-gray-700">Full blog content will be displayed here.</p>
        </main>
    );
}
