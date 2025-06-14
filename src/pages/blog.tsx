
import { useEffect, useState } from "react";
import { fetchBlogList } from "@/utils/fetchBlog";
import { Link } from "react-router-dom";

export default function BlogListPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogList().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="mt-32 text-center text-muted-foreground">Loading…</div>;
  if (!posts.length)
    return <div className="mt-32 text-center text-muted-foreground">No blog posts published yet.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-32 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            to={`/blog/${post.slug}`}
            key={post.id}
            className="block group rounded-xl shadow hover:scale-[1.01] duration-150 border border-border bg-card"
          >
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full rounded-t-xl max-h-[220px] object-cover"
              />
            )}
            <div className="p-5">
              <div className="text-xl font-bold mb-1 group-hover:text-primary">{post.title}</div>
              <div className="line-clamp-2 text-muted-foreground">{post.seo_description}</div>
              <div className="text-xs mt-2">{new Date(post.published_at).toLocaleDateString()}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {post.tags?.map((tag: string) => (
                  <span key={tag} className="bg-accent px-2 py-1 rounded-full text-xs">{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
