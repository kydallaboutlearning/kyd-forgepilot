import { useEffect, useState } from "react";
import { fetchBlogList } from "@/utils/fetchBlog";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/Footer";

export default function BlogListPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogList().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-32 px-4 animate-fade-in pt-16 md:pt-32">
        <Skeleton className="h-10 w-44 mb-8" />
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="block group rounded-xl shadow border border-border bg-card">
              <Skeleton className="w-full rounded-t-xl max-h-[220px] h-[150px] object-cover" />
              <div className="p-5">
                <Skeleton className="h-6 w-8/12 mb-2" />
                <Skeleton className="h-4 w-11/12 mb-3" />
                <Skeleton className="h-3 w-3/12 mb-2" />
                <div className="flex flex-wrap gap-2 mt-2">
                  <Skeleton className="w-12 h-5 rounded-full" />
                  <Skeleton className="w-12 h-5 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!posts.length)
    return <div className="mt-32 text-center text-muted-foreground pt-16 md:pt-32">No blog posts published yet.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-32 px-4 pt-16 md:pt-32">
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
      <Footer />
    </div>
  );
}
