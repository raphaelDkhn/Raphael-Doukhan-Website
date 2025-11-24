import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getArticleBySlug, getArticleSlugs } from "@/lib/mdx";
import { useMDXComponents } from "@/components/mdx-components";
import { ArticleHeader } from "@/components/article-header";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const ogImage = article.meta.bannerImage
    ? `${baseUrl}${article.meta.bannerImage}`
    : `${baseUrl}/og-default.png`;

  return {
    title: article.meta.title,
    description: article.meta.description || article.meta.title,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description || article.meta.title,
      type: "article",
      url: `${baseUrl}/articles/${resolvedParams.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.meta.title,
      description: article.meta.description || article.meta.title,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  const article = getArticleBySlug(slug);

  if (!article) {
    console.error(`Article not found for slug: ${slug}`);
    notFound();
  }

  const components = useMDXComponents({}) as any;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="max-w-4xl mx-auto px-8 py-16 sm:px-16">
        <div className="max-w-2xl">
          <ArticleHeader />
          {article.meta.bannerImage && (
            <div className="mb-8">
              <Image
                src={article.meta.bannerImage}
                alt={article.meta.title}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}
          <h1 className="text-[var(--foreground)] text-5xl font-bold leading-tight mb-4">
            {article.meta.title}
          </h1>
          {article.meta.date && (
            <p className="text-[var(--foreground)] text-xs mb-8 opacity-70">
              {new Date(article.meta.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          <div className="prose prose-sm max-w-none">
            <MDXRemote
              source={article.content}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkBreaks, remarkGfm, remarkMath],
                  rehypePlugins: [rehypeKatex],
                },
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

