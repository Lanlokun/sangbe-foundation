
export type ArticleStatus = "draft" | "published";

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: Record<string, unknown>;
  category: string;
  cover_image_url: string | null;
  status: ArticleStatus;
  author_id: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ArticleInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: Record<string, unknown>;
  category: string;
  status: ArticleStatus;
};
