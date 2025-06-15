import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import Dashboard from "./pages/Dashboard";
import DynamicPage from "./pages/[slug]";
import BlogListPage from "./pages/blog";
import BlogPostPage from "./pages/blog/[slug]";
import ProjectCaseStudy from "./pages/portfolio/[projectId]";
import Header from "@/components/Header";
import AdminLogin from "@/pages/AdminLogin";

const queryClient = new QueryClient();

const HEADER_HEIGHT = 80; // px, adjust if header size changes

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <div style={{ paddingTop: HEADER_HEIGHT }}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:projectId" element={<ProjectCaseStudy />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Dynamic CMS Pages */}
            <Route path="/about" element={<DynamicPage />} />
            <Route path="/services" element={<DynamicPage />} />
            <Route path="/contact" element={<DynamicPage />} />
            <Route path="/case-studies" element={<DynamicPage />} />
            <Route path="/faq" element={<DynamicPage />} />
            {/* Blog */}
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            {/* Catch-all: Any custom pages */}
            <Route path="/:slug" element={<DynamicPage />} />
            {/* Add ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
