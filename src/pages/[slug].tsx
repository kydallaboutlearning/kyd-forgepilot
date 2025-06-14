
import { useEffect, useState } from "react";
import { fetchPage } from "@/utils/fetchPage";
import RichTextRenderer from "@/components/RichTextRenderer";
import { useParams } from "react-router-dom";

export default function DynamicPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;
    fetchPage(slug as string).then((data) => {
      setPage(data);
      setLoading(false);
      if (data?.seo_title) document.title = data.seo_title;
      if (data?.seo_description) {
        const m = document.querySelector("meta[name='description']");
        if (m) m.setAttribute("content", data.seo_description);
      }
    });
  }, [slug]);

  if (loading) return <div className="mt-32 text-center text-muted-foreground">Loading…</div>;
  if (!page)
    return <div className="mt-32 text-center text-red-500">Page not found</div>;

  return (
    <div className="max-w-2xl mx-auto mt-32 px-4">
      {page.featured_image && (
        <img
          src={page.featured_image}
          alt={page.title}
          className="rounded-xl mb-4 w-full max-h-[300px] object-cover"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
      <RichTextRenderer html={page.body || ""} />
    </div>
  );
}
