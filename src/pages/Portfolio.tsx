
import Header from "@/components/Header";
import PortfolioCard from "@/components/PortfolioCard";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

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
  },
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
    (p) =>
      (!filter || p.category === filter) &&
      (search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()))
  );

  const categories = Array.from(new Set(projects.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="pt-28 px-4 md:px-8 max-w-8xl mx-auto w-full flex-1 flex flex-col">
        <div className="w-full mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-primary font-sans">Portfolio</h1>
            <p className="text-lg text-muted-foreground max-w-xl">Explore our AI-driven projects, crafted for excellence in real estate, healthcare, and more.</p>
          </div>
          <div className="flex gap-4 flex-wrap items-center md:justify-end">
            <div className="relative w-52">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects…"
                className="w-52 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-400 rounded-lg focus-visible:ring-primary"
                style={{ paddingLeft: "2.3rem" }}
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            </div>
            <Tabs value={filter || ""} onValueChange={(val) => setFilter(val || null)} className="min-w-[160px]">
              <TabsList className="bg-neutral-900 border border-neutral-800 rounded-md p-0">
                <TabsTrigger value="">All</TabsTrigger>
                {categories.map((c) => (
                  <TabsTrigger key={c} value={c}>
                    {c}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 md:gap-10">
          {filtered.length === 0 && (
            <div className="col-span-full py-24 text-xl text-center text-muted-foreground font-semibold opacity-70">
              No projects found.
            </div>
          )}
          {filtered.map((p) => (
            <div key={p.id} className="transition-transform duration-150 hover:scale-[1.02]">
              <PortfolioCard project={p} />
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <span className="text-muted-foreground text-base">More projects coming soon…</span>
        </div>
      </main>
    </div>
  );
}
