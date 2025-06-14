import Header from "@/components/Header";
import { useState, useEffect } from "react";
import AdminLogin from "@/components/AdminLogin";
import AdminProjectForm from "@/components/AdminProjectForm";
import AdminProjectTable from "@/components/AdminProjectTable";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Page, Blog } from "@/types/cms";

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

// In memory for now. TODO: replace with API or Supabase connection
const INIT_PROJECTS: Project[] = [
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

type Tab = "projects" | "pages" | "blog";

export default function Dashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>(INIT_PROJECTS);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [tab, setTab] = useState<Tab>("projects");
  const [pages, setPages] = useState<Page[]>([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(false);

  // Load pages from Supabase
  async function loadPages() {
    setPagesLoading(true);
    const { data } = await supabase.from("pages").select("*").order("last_updated", { ascending: false });
    setPages(data ?? []);
    setPagesLoading(false);
  }
  // Load blogs from Supabase
  async function loadBlogs() {
    setBlogsLoading(true);
    const { data } = await supabase.from("blog").select("*").order("published_at", { ascending: false });
    setBlogs(data ?? []);
    setBlogsLoading(false);
  }

  function handleSave(p: Project) {
    setProjects(ps =>
      p.id
        ? ps.map(j => (j.id === p.id ? p : j))
        : [{ ...p, id: Date.now().toString() }, ...ps]
    );
    setShowForm(false);
    setEditing(null);
  }
  function handleEdit(p: Project) {
    setEditing(p);
    setShowForm(true);
  }
  function handleDelete(id: string) {
    setProjects(ps => ps.filter(x => x.id !== id));
  }

  useEffect(() => {
    if (tab === "pages") loadPages();
    if (tab === "blog") loadBlogs();
  }, [tab]);

  if (!loggedIn) return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="pt-28 flex-1">
        <AdminLogin onLogin={() => setLoggedIn(true)} />
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="pt-28 px-8 max-w-4xl mx-auto w-full">
        {/* Tab selector */}
        <section className="flex gap-4 mb-8">
          <Button variant={tab === "projects" ? "default" : "ghost"} onClick={() => setTab("projects")}>Projects</Button>
          <Button variant={tab === "pages" ? "default" : "ghost"} onClick={() => setTab("pages")}>Pages</Button>
          <Button variant={tab === "blog" ? "default" : "ghost"} onClick={() => setTab("blog")}>Blog</Button>
        </section>
        {tab === "projects" && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <Button onClick={() => setShowForm(true)}>+ Add Project</Button>
            </div>
            {showForm && (
              <AdminProjectForm
                initial={editing || undefined}
                onSave={handleSave}
                onCancel={() => { setShowForm(false); setEditing(null); }}
              />
            )}
            <AdminProjectTable
              projects={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </section>
        )}
        {tab === "pages" && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Pages</h2>
              {/* Add page button placeholder */}
              <Button onClick={() => alert("Add/Edit Page Editor coming soon!")}>+ Add Page</Button>
            </div>
            {pagesLoading ? (
              <div>Loading…</div>
            ) : pages.length === 0 ? (
              <div>No pages found.</div>
            ) : (
              <table className="w-full border rounded-lg overflow-hidden">
                <thead className="bg-muted"><tr>
                  <th className="py-2 px-3 text-left">Title</th>
                  <th className="py-2 px-3 text-left">Slug</th>
                  <th className="py-2 px-3 text-left">SEO Title</th>
                  <th className="py-2 px-3 text-left">Last Updated</th>
                  <th className="py-2 px-3 text-left">Actions</th>
                </tr></thead>
                <tbody>
                  {pages.map(p => (
                    <tr key={p.id} className="border-b last:border-b-0">
                      <td className="py-2 px-3">{p.title}</td>
                      <td className="py-2 px-3">{p.slug}</td>
                      <td className="py-2 px-3">{p.seo_title}</td>
                      <td className="py-2 px-3">{new Date(p.last_updated ?? "").toLocaleString()}</td>
                      <td className="py-2 px-3 flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => alert("Edit Page coming soon!")}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => alert("Delete coming soon!")}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}
        {tab === "blog" && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Blog</h2>
              <Button onClick={() => alert("Add/Edit Blog Post coming soon!")}>+ New Post</Button>
            </div>
            {blogsLoading ? (
              <div>Loading…</div>
            ) : blogs.length === 0 ? (
              <div>No blog posts found.</div>
            ) : (
              <table className="w-full border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="py-2 px-3 text-left">Title</th>
                    <th className="py-2 px-3 text-left">Slug</th>
                    <th className="py-2 px-3">Author</th>
                    <th className="py-2 px-3">Published</th>
                    <th className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((b) => (
                    <tr key={b.id} className="border-b">
                      <td className="py-2 px-3">{b.title}</td>
                      <td className="py-2 px-3">{b.slug}</td>
                      <td className="py-2 px-3">{b.author}</td>
                      <td className="py-2 px-3">{new Date(b.published_at ?? "").toLocaleDateString()}</td>
                      <td className="py-2 px-3 flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => alert("Edit Post coming soon!")}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => alert("Delete coming soon!")}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        <div className="mt-20 flex flex-wrap gap-8 opacity-60">
          <div className="flex-1 min-w-[220px] p-6 bg-muted/60 rounded-xl shadow-inner">
            <h3 className="font-bold mb-2 text-primary">Testimonials Management</h3>
            <div className="text-sm text-muted-foreground">Coming soon: Add and edit testimonials here.</div>
          </div>
          <div className="flex-1 min-w-[220px] p-6 bg-muted/60 rounded-xl shadow-inner">
            <h3 className="font-bold mb-2 text-primary">Metrics & Tracking</h3>
            <div className="text-sm text-muted-foreground">Coming soon: See app usage and customer metrics.</div>
          </div>
        </div>

        <Button className="mt-10" variant="ghost" onClick={() => setLoggedIn(false)}>
          Log out
        </Button>
      </main>
    </div>
  );
}
