
import ImageGallery from "@/components/ImageGallery";
import RichTextRenderer from "@/components/RichTextRenderer";
import VideoPlayer from "@/components/VideoPlayer";

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
  return (
    <div className="bg-card rounded-2xl shadow-lg border border-border flex flex-col overflow-hidden animate-fade-in p-5">
      <div className="flex flex-row gap-4 items-start mb-2">
        <span className="bg-primary/10 rounded px-3 py-1 text-xs font-semibold mr-2">{project.category}</span>
        <span className="text-xs text-muted-foreground ml-auto">{new Date(project.date).toLocaleDateString()}</span>
      </div>
      <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
      <div className="mb-3">
        <RichTextRenderer html={project.description} />
      </div>
      <ImageGallery images={project.images} />
      {project.video && <div className="mt-4"><VideoPlayer video={project.video} /></div>}
      <div className="flex gap-2 flex-wrap mt-4">
        {project.tags.map(tag => (
          <span key={tag} className="bg-accent/70 px-3 py-1 rounded-full text-xs font-semibold text-accent-foreground">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
