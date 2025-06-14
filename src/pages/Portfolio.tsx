
import Header from "@/components/Header";
import PortfolioCard from "@/components/PortfolioCard";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

type Project = {
  id: string;
  title: string;
  description: string; // HTML string
  images: string[]; // URLs
  video?: string; // YouTube link or file url
  date: string;
  category: string;
  tags: string[];
};

const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "AI Rental Chatbot for Real Estate",
    description: "<p>Intelligent agent for handling rental inquiries. Integrates with <b>CRM</b>, books tours, and answers complex questions 24/7.</p>",
    images: ["/photo-1488590528505-98d2b5aba04b", "/photo-1486312338219-ce68d2c6f44d"],
    video: "https://www.youtube.com/embed/ysz5S6PUM-U",
    date: "2024-06-01",
    category: "Real Estate",
    tags: ["AI", "Chatbot"],
  },
  {
    id: "2",
    title: "Medical Transcription Agent",
    description: "<p>HIPAA-compliant voice-to-text agent, using fine-tuned LLMs for medical practices.</p>",
    images: ["/photo-1581091226825-a6a2a5aee158"],
    video: "",
    date: "2024-03-15",
    category: "Healthcare",
    tags: ["AI", "Healthcare"],
  }
];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    // TODO: replace with API call (`/api/portfolio/`)
    setProjects(MOCK_PROJECTS);
  }, []);

  const filtered = projects.filter(
    p =>
      (!filter || p.category === filter) &&
      (search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  );

  const categories = Array.from(new Set(projects.map(p => p.category)));
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="pt-28 px-8 max-w-7xl mx-auto w-full flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Portfolio</h1>
            <p className="text-lg text-muted-foreground">Explore our latest AI projects for real estate and healthcare clients.</p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects…" className="w-48" />
            <select value={filter || ""} onChange={e => setFilter(e.target.value || null)}
              className="bg-accent/30 border border-border rounded-md px-3 py-2 text-base"
            >
              <option value="">All</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {filtered.map(p => (
            <PortfolioCard key={p.id} project={p} />
          ))}
        </div>
        {/* TODO: Pagination controls if > X projects */}
        <div className="mt-20 text-center text-muted-foreground">More projects coming soon…</div>
      </main>
    </div>
  );
}
