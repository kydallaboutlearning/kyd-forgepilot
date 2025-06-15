
import { useParams, Link, useNavigate } from "react-router-dom";
import { MOCK_PROJECTS } from "../Portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import { Calendar, BarChart } from "lucide-react";

const PLACEHOLDER = "/placeholder.svg";

export default function ProjectCaseStudy() {
  const { projectId } = useParams();
  const project = MOCK_PROJECTS.find((p) => p.id === projectId);

  const navigate = useNavigate();

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center ">
        <div className="text-3xl font-bold mb-4">Project not found.</div>
        <Button onClick={() => navigate("/portfolio")}>← Back to Projects</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* 1. Hero Banner */}
      <div className="relative w-full h-[340px] md:h-[420px] flex items-center justify-center overflow-hidden">
        <img
          src={project.images?.[0] || PLACEHOLDER}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div className="relative z-10 px-7 md:px-16 text-center w-full">
          <h1 className="text-[2.2rem] md:text-[2.8rem] font-extrabold text-white drop-shadow-lg mb-4">
            {project.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {project.tags?.map((tag) =>
              <Badge key={tag} className="bg-primary/80 text-primary-foreground font-medium">
                #{tag}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* 2. Project Overview */}
      <section className="max-w-2xl mx-auto px-5 py-12 border-b border-neutral-800">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="text-primary/80" size={18} />
          <span className="text-neutral-300 text-sm">{new Date(project.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags?.map(tag =>
            <Badge key={tag} className="bg-primary/10 text-primary px-3 font-medium rounded-full">
              #{tag}
            </Badge>
          )}
        </div>
        <div className="text-xl md:text-2xl font-bold mb-2 text-accent">{project.title}</div>
        <div className="text-neutral-300 text-base">{project.summary}</div>
      </section>

      {/* 3. Problem or Need */}
      <section className="max-w-2xl mx-auto px-5 py-14 border-b border-neutral-800">
        <h2 className="text-xl font-black text-primary uppercase mb-4">The Problem</h2>
        {project.problem?.map((pr, i) =>
          <p key={i} className="mb-3 text-neutral-300">{pr}</p>
        )}
      </section>

      {/* 4. Solution (two-column on desktop) */}
      <section className="max-w-5xl mx-auto px-5 py-16 border-b border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-xl font-black text-primary uppercase mb-4">What I Built</h2>
          {project.solution?.map((s, i) =>
            <p key={i} className="mb-2 text-neutral-300">{s}</p>
          )}
          <div className="mt-4">
            <div className="font-bold text-neutral-100 mb-2">Tech Stack Used:</div>
            <div className="flex flex-wrap gap-2">
              {(project.techStack || []).map(t =>
                <Badge
                  key={t}
                  className="bg-accent/70 text-[0.95em] text-accent-foreground px-3 py-1 rounded-full font-semibold tracking-wider shadow"
                >
                  {t}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <img
            src={project.images?.[0] || PLACEHOLDER}
            alt="System UI/Screenshot"
            className="max-w-full max-h-[340px] rounded-xl border border-neutral-800 shadow-lg bg-neutral-950 object-cover"
            onError={e => (e.currentTarget.src = PLACEHOLDER)}
          />
        </div>
      </section>

      {/* 5. Results with stat boxes */}
      <section className="max-w-5xl mx-auto px-5 py-14 border-b border-neutral-800">
        <h2 className="text-xl font-black text-primary uppercase mb-7">Results</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {project.results?.map((r, i) =>
            <div
              key={i}
              className="flex flex-col items-center justify-center py-4 rounded-xl bg-neutral-950 border border-accent/30 shadow"
            >
              <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{r.kpi}</div>
              <div className="text-base text-neutral-300">{r.desc}</div>
            </div>
          )}
        </div>
      </section>

      {/* 6. Explainer Video */}
      {project.video && (
        <section className="max-w-3xl mx-auto px-5 py-14 border-b border-neutral-800 flex flex-col items-center">
          <h2 className="text-xl font-black text-primary uppercase mb-6">See It In Action</h2>
          <div className="w-full rounded-lg overflow-hidden shadow-xl mb-5 border-2 border-neutral-800">
            <VideoPlayer video={project.video} />
          </div>
          <div className="text-sm text-neutral-400 mb-5">“See the AI Rental Bot in Action” • 1 min 24 sec</div>
          <Button size="lg" className="bg-primary text-primary-foreground font-bold shadow px-8 rounded-lg">
            Want this kind of automation? → Let’s Talk
          </Button>
        </section>
      )}

      {/* 7. Testimonial */}
      {project.testimonial && (
        <section className="max-w-3xl mx-auto px-5 py-14 border-b border-neutral-800 flex flex-col items-center">
          <div className="italic font-serif text-lg text-neutral-100 border-l-4 border-primary pl-7 pr-5 py-7 rounded-xl bg-neutral-950 shadow mb-3 relative">
            <BarChart className="absolute left-0 top-8 text-primary/80" size={32} />
            “{project.testimonial.quote}”
            <div className="block mt-4 font-bold not-italic text-accent text-right">— {project.testimonial.name}</div>
          </div>
        </section>
      )}

      {/* 8. Final CTA */}
      <section className="max-w-2xl mx-auto px-5 py-20">
        <div className="border border-accent rounded-2xl bg-neutral-950 shadow-lg p-7 flex flex-col items-center text-center">
          <div className="text-xl font-extrabold text-accent mb-5">Want a system like this for your business?</div>
          <Button variant="default" size="lg" className="mb-2 w-full max-w-xs font-semibold">
            👉 Book a Free Consultation
          </Button>
          <div className="text-sm text-neutral-400">
            or email: <a href={`mailto:${project.contact.email}`} className="text-primary underline">{project.contact.email}</a>
          </div>
        </div>
        <div className="flex mt-16 justify-between">
          <Link to="/portfolio" className="text-primary hover:underline text-base flex items-center gap-2">
            ← Back to Projects
          </Link>
          {/* NEXT/HINT: For multi-project navigation, add ‘Next’ link if possible */}
        </div>
      </section>
    </div>
  );
}
