
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogPost } from "@/utils/fetchBlog";
import RichTextRenderer from "@/components/RichTextRenderer";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchBlogPost(slug as string).then((data) => {
      setPost(data);
      setLoading(false);
      if (data?.seo_title) document.title = data.seo_title;
      if (data?.seo_description) {
        const m = document.querySelector("meta[name='description']");
        if (m) m.setAttribute("content", data.seo_description);
      }
    });
  }, [slug]);

  if (loading) return <div className="mt-32 text-center text-muted-foreground">Loading…</div>;
  if (!post)
    return <div className="mt-32 text-center text-red-500">Post not found</div>;

  return (
    <div className="max-w-2xl mx-auto mt-32 px-4">
      {post.featured_image && (
        <img
          src={post.featured_image}
          alt={post.title}
          className="rounded-xl mb-4 w-full max-h-[300px] object-cover"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="mb-4 text-muted-foreground text-sm">
        {post.author} • {new Date(post.published_at).toLocaleDateString()}
      </div>
      <RichTextRenderer html={post.body || ""} />
      <div className="flex gap-2 flex-wrap mt-8">
        {post.tags?.map((tag: string) => (
          <span key={tag} className="bg-accent px-2 py-1 rounded-full text-xs">{tag}</span>
        ))}
      </div>
    </div>
  );
}
