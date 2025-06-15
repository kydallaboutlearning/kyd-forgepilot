export type Page = {
  id: string;
  slug: string;
  title: string;
  body?: string;
  featured_image?: string;
  seo_title?: string;
  seo_description?: string;
  last_updated?: string;
};

export type Blog = {
  id: string;
  slug: string;
  title: string;
  body?: string;
  author?: string;
  featured_image?: string;
  tags?: string[];
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  last_updated?: string;
};

export type BenefitItemIcon = "Brain" | "LayoutDashboard" | "Users";

export type BenefitItem = {
  title: string;
  desc: string;
  icon: BenefitItemIcon;
};
