import type { MDXComponents } from "@/components/mdx-components";
import { useMDXComponents as useCustomMDXComponents } from "@/components/mdx-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return useCustomMDXComponents(components);
}

