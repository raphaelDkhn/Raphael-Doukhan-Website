import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Article, ArticleMeta } from "@/types/article";

const articlesDirectory = path.join(process.cwd(), "articles");

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        meta: data as ArticleMeta,
        content,
      };
    })
    .sort((a, b) => {
      if (a.meta.date < b.meta.date) {
        return 1;
      } else {
        return -1;
      }
    });

  return allArticlesData;
}

export function getArticleBySlug(slug: string): Article | null {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    meta: data as ArticleMeta,
    content,
  };
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

