import { useEffect, useState } from "react";
import { fetchPage } from "@/utils/fetchPage";
import RichTextRenderer from "@/components/RichTextRenderer";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/Footer";

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

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-32 px-4 animate-fade-in pt-16 md:pt-32">
        <Skeleton className="w-full h-44 rounded-xl mb-4" />
        <Skeleton className="h-10 w-7/12 mb-4" />
        <Skeleton className="h-5 w-11/12 mb-3" />
        <Skeleton className="h-5 w-9/12 mb-3" />
        <Skeleton className="h-5 w-10/12 mb-3" />
        <Skeleton className="h-5 w-6/12 mb-3" />
        <div className="flex gap-2 mt-6">
          <Skeleton className="w-16 h-6 rounded-full" />
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!page)
    return <div className="mt-32 text-center text-red-500 pt-16 md:pt-32">Page not found<Footer /></div>;

  return (
    <div className="max-w-2xl mx-auto mt-32 px-4 pt-16 md:pt-32">
      {page.featured_image && (
        <img
          src={page.featured_image}
          alt={page.title}
          className="rounded-xl mb-4 w-full max-h-[300px] object-cover"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
      <RichTextRenderer html={page.body || ""} />
      <Footer />
    </div>
  );
}
