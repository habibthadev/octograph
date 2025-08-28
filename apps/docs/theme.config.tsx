import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { useConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span className="font-bold text-xl">🐙 Octograph</span>,
  project: {
    link: "https://github.com/habibthadev/octograph",
  },
  chat: {
    link: "https://discord.gg/octograph",
  },
  docsRepositoryBase:
    "https://github.com/habibthadev/octograph/tree/main/apps/docs",
  footer: {
    text: "Octograph - GitHub Activity Graph Component",
  },
  head: () => {
    const { frontMatter } = useConfig();
    return (
      <>
        <meta property="og:title" content={frontMatter.title || "Octograph"} />
        <meta
          property="og:description"
          content={
            frontMatter.description ||
            "GitHub-style activity graph React component library"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </>
    );
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Octograph",
    };
  },
  darkMode: true,
  nextThemes: {
    defaultTheme: "system",
  },
  primaryHue: 142,
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  editLink: {
    text: "Edit this page on GitHub →",
  },
  feedback: {
    content: "Question? Give us feedback →",
    labels: "feedback",
  },
  search: {
    placeholder: "Search documentation...",
  },
  gitTimestamp: "Last updated on",
};

export default config;
