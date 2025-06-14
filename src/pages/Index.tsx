
// Beautiful modern landing page for AI agency
import Header from "@/components/Header";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center pt-36 px-4">
        <h1 className="text-5xl font-bold tracking-tight max-w-3xl text-center animate-fade-in mb-6">We Build <span className="text-primary">AI Agents</span> for Real Estate and Healthcare</h1>
        <p className="text-xl text-muted-foreground max-w-2xl text-center mb-8">
          Transforming businesses with custom AI automation and smart agents. Unlock insights, streamline operations, and create unmatched customer experiences.
        </p>
        <Link to="/dashboard" className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-transform">
          Get a Demo
        </Link>

        {/* Service details */}
        <div className="bg-card/80 backdrop-blur-md mt-16 rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full border border-muted animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold mb-3">What We Do</h2>
            <ul className="space-y-3 text-lg">
              <li>✓ Custom AI Chatbots for Real Estate Listings</li>
              <li>✓ Automated Appointment Scheduling</li>
              <li>✓ Generative AI for Medical Transcription</li>
              <li>✓ Lead Qualification and Routing</li>
              <li>✓ Custom Analytics Dashboards</li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <img src="/photo-1488590528505-98d2b5aba04b" alt="AI Workspace" className="rounded-xl shadow-2xl w-full max-w-md" />
          </div>
        </div>

        {/* Testimonials placeholder */}
        <div className="max-w-5xl w-full mt-24">
          <div className="text-center text-lg font-semibold text-muted-foreground mb-2">Testimonials Coming Soon…</div>
          <div className="flex justify-center gap-8 opacity-30 pointer-events-none">
            <div className="w-80 h-32 bg-muted rounded-xl" />
            <div className="w-80 h-32 bg-muted rounded-xl" />
          </div>
        </div>
      </main>
    </div>
  );
}
