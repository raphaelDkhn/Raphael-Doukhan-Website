import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Header } from "@/components/header";

export default function Home() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="max-w-4xl mx-auto px-8 py-16 sm:px-16">
        <div className="max-w-xl">
          <Header>
            <h1 className="text-[var(--foreground)] text-3xl font-bold leading-7">
              Raphael Doukhan's Blog
            </h1>
          </Header>

          <div className="flex gap-4 items-center">
            <a
              href="https://github.com/raphaelDkhn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--foreground)] hover:opacity-80"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://x.com/raphael_dkhn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--foreground)] hover:opacity-80"
              aria-label="X (Twitter)"
            >
              <FaXTwitter size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/raphaeldoukhan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--foreground)] hover:opacity-80"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
          <br />
          <p className="text-[var(--foreground)] text-sm leading-7">
            Hi, I’m Raphael, a software engineer at{" "}
            <a
              href="https://www.gizatech.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--foreground)] hover:opacity-80"
            >
              Giza
            </a>
            .
            <br />
            This website is where I share everything that interests me. I'm not
            really a writer, so the articles will be short and raw, just a place
            where I can think out loud and explore ideas.
          </p>

          <br />
          {articles.length > 0 && (
            <>
              <div className="mt-2">
                <h2 className="text-[var(--foreground)] text-xl font-bold leading-7 mb-6">
                  Articles
                </h2>
                <div className="space-y-6">
                  {articles.map((article) => (
                    <article key={article.slug}>
                      <Link
                        href={`/articles/${article.slug}`}
                        className="block hover:opacity-80"
                      >
                        <h3 className="text-[var(--foreground)] text-lg font-bold leading-7 mb-1">
                          {article.meta.title}
                        </h3>
                        {article.meta.date && (
                          <p className="text-[var(--foreground)] text-xs mb-2 opacity-70">
                            {new Date(article.meta.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        )}
                        {article.meta.description && (
                          <p className="text-[var(--foreground)] text-sm leading-7">
                            {article.meta.description}
                          </p>
                        )}
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
