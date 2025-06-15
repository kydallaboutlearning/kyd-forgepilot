
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
  // All cards the same min height for grid uniformity.
  return (
    <div className="bg-neutral-950 rounded-2xl shadow-lg border-2 border-[#FFB74A] flex flex-col overflow-hidden p-0 min-h-[455px] max-w-full transition-all duration-200 hover:shadow-2xl hover:border-primary/70">
      {/* Category & Date */}
      <div className="flex flex-row gap-4 items-start px-6 pt-6 pb-1">
        <span className="bg-primary/90 rounded px-3 py-1 text-xs font-bold text-primary-foreground tracking-wide uppercase">
          {project.category}
        </span>
        <span className="text-xs text-neutral-400 ml-auto font-mono">{new Date(project.date).toLocaleDateString()}</span>
      </div>
      {/* Title */}
      <h2 className="text-xl md:text-2xl leading-snug font-bold mb-2 px-6 text-white">{project.title}</h2>
      {/* Description */}
      <div className="mb-3 min-h-[38px] px-6">
        <RichTextRenderer html={project.description} />
      </div>
      {/* Full-width image/placeholder */}
      <div className="w-full aspect-[16/9] bg-neutral-900 flex items-center justify-center rounded-none overflow-hidden relative border-y border-[#FFB74A]">
        <ImageGallery images={project.images} cardMode />
      </div>
      {/* Video (if present) */}
      {project.video && (
        <div className="px-6 pt-4">
          <VideoPlayer video={project.video} />
        </div>
      )}
      {/* Tags */}
      <div className="flex gap-2 flex-wrap mt-4 px-6 pb-6">
        {project.tags.map(tag => (
          <span key={tag} className="bg-primary/80 px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
