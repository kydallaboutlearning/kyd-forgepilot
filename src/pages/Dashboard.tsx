
import Header from "@/components/Header";
import { useState } from "react";
import AdminLogin from "@/components/AdminLogin";
import AdminProjectForm from "@/components/AdminProjectForm";
import AdminProjectTable from "@/components/AdminProjectTable";
import { Button } from "@/components/ui/button";

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

export default function Dashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>(INIT_PROJECTS);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

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
        <section className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={() => setShowForm(true)}>+ Add Project</Button>
        </section>
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
