export interface ArticleMeta {
  title: string;
  date: string;
  description?: string;
  bannerImage?: string;
}

export interface Article {
  slug: string;
  meta: ArticleMeta;
  content: string;
}

