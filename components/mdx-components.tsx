import type { ReactNode } from "react";
import React from "react";

export type MDXComponents = {
  [key: string]: React.ComponentType<any> | undefined;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-[var(--foreground)] text-2xl sm:text-3xl font-bold leading-7 mt-6 sm:mt-8 mb-3 sm:mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-[var(--foreground)] text-xl sm:text-2xl font-bold leading-7 mt-5 sm:mt-6 mb-2 sm:mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[var(--foreground)] text-lg sm:text-xl font-bold leading-7 mt-4 mb-2">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-[var(--foreground)] text-sm leading-7 mb-4 sm:text-justify">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--foreground)] underline hover:opacity-80"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-[var(--foreground)] text-sm leading-7 mb-4 ml-2 sm:ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-[var(--foreground)] text-sm leading-7 mb-4 ml-2 sm:ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-[var(--foreground)] text-sm leading-7 mb-1">{children}</li>
    ),
    code: ({ children, className, ...props }: any) => {
      // If className includes 'hljs', it's inside a highlighted code block
      const isInCodeBlock = className?.includes('hljs');
      if (isInCodeBlock) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
      // Otherwise, it's inline code
      return (
        <code className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-[var(--foreground)] px-1.5 py-0.5 rounded text-xs font-mono font-medium" {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children, className, ...props }: any) => {
      // Check if children contain a highlighted code element
      const hasHighlightedCode = React.isValidElement(children) && 
        (children as any)?.props?.className?.includes('hljs');
      return (
        <pre 
          className={`${hasHighlightedCode ? 'hljs-wrapper' : 'bg-gray-100 dark:bg-gray-800'} p-3 sm:p-4 rounded overflow-x-auto mb-4 text-xs font-mono`}
          {...props}
        >
          {children}
        </pre>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--foreground)] pl-4 italic text-[var(--foreground)] text-sm mb-4">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-[var(--foreground)]">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-[var(--foreground)]">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-[var(--foreground)] border-opacity-20">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="border border-[var(--foreground)] px-4 py-2 text-left text-white dark:text-[var(--background)] text-sm font-bold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-[var(--foreground)] px-4 py-2 text-[var(--foreground)] text-sm">
        {children}
      </td>
    ),
    ...components,
  };
}

