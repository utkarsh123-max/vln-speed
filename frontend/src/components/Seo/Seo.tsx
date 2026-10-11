import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  canonicalPath: string; // e.g. "/internet-speed-guide"
  ogImage?: string;
}

const SITE_NAME = "VLN Speed";
const SITE_URL = "https://vln-speed.vercel.app"; // update once you have a custom domain

function setMeta(nameOrProp: "name" | "property", key: string, content: string) {
  let tag = document.querySelector(`meta[${nameOrProp}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(nameOrProp, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

/**
 * Drop this at the top of any page component. It updates the document
 * <title>, meta description, canonical URL, and Open Graph / Twitter tags
 * on mount — no extra dependency needed since this is a single-page app
 * and all pages already share one index.html.
 */
export function Seo({ title, description, canonicalPath, ogImage }: SeoProps) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    setMeta("name", "description", description);
    setCanonical(`${SITE_URL}${canonicalPath}`);

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", `${SITE_URL}${canonicalPath}`);
    setMeta("property", "og:type", "website");
    if (ogImage) setMeta("property", "og:image", ogImage);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
  }, [title, description, canonicalPath, ogImage]);

  return null;
}

/**
 * Injects JSON-LD structured data into <head>. Pass any schema.org object
 * (FAQPage, BreadcrumbList, WebApplication, etc.) — removes itself on
 * unmount so navigating away doesn't leave stale schema behind.
 */
export function JsonLd({ data, id }: { data: Record<string, unknown>; id: string }) {
  useEffect(() => {
    const scriptId = `jsonld-${id}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [data, id]);

  return null;
}