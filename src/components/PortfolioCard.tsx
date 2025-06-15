
import ImageGallery from "@/components/ImageGallery";
import RichTextRenderer from "@/components/RichTextRenderer";
import VideoPlayer from "@/components/VideoPlayer";
import { Image as ImageIcon } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  images: string[];
  video?: string;
  date: string;
  category: string;
  tags: string[];
};

export default function PortfolioCard({ project }: { project: Project }) {
  // Use placeholder if images is empty or broken
  return (
    <div className="bg-neutral-950 rounded-2xl shadow-lg border border-neutral-800 flex flex-col overflow-hidden animate-fade-in p-6 transition-all duration-200 hover:shadow-2xl hover:border-primary/40">
      <div className="flex flex-row gap-4 items-start mb-1">
        <span className="bg-primary/10 rounded px-3 py-1 text-xs font-bold text-primary tracking-wide uppercase">
          {project.category}
        </span>
        <span className="text-xs text-neutral-400 ml-auto font-mono">{new Date(project.date).toLocaleDateString()}</span>
      </div>
      <h2 className="text-xl md:text-2xl leading-snug font-bold mb-2 text-white">{project.title}</h2>
      <div className="mb-3 min-h-[40px]">
        <RichTextRenderer html={project.description} />
      </div>
      {project.images.length > 0 ? (
        <ImageGallery images={project.images} />
      ) : (
        <div
          className="w-full aspect-video bg-neutral-900 flex items-center justify-center rounded-lg my-2 border border-neutral-800"
          style={{ minHeight: 90 }}
        >
          <ImageIcon size={40} className="text-muted-foreground opacity-40" />
        </div>
      )}
      {project.video && <div className="mt-4"><VideoPlayer video={project.video} /></div>}
      <div className="flex gap-2 flex-wrap mt-4">
        {project.tags.map(tag => (
          <span key={tag} className="bg-primary/20 px-3 py-1 rounded-full text-xs font-semibold text-primary">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
