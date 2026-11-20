"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { ProjectCategory } from "@/data/projects";

export type PortfolioItem = {
  slug: string;
  category: ProjectCategory;
  categoryLabel: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
};

type Filter = { id: "all" | ProjectCategory; label: string };

/** Technology label colors follow the service identities in the brand guide. */
const categoryStyle: Record<ProjectCategory, { badge: string; hover: string }> = {
  vr: { badge: "bg-primary/15 text-primary ring-primary/30", hover: "hover:border-primary/50" },
  ar: { badge: "bg-secondary/15 text-secondary-soft ring-secondary/30", hover: "hover:border-secondary/50" },
  game: { badge: "bg-orange/15 text-orange ring-orange/30", hover: "hover:border-orange/50" },
  simulation: { badge: "bg-teal/15 text-teal-soft ring-teal/30", hover: "hover:border-teal/50" },
};

export function PortfolioGrid({
  items,
  filters,
  filterLabel,
}: {
  items: PortfolioItem[];
  filters: Filter[];
  filterLabel: string;
}) {
  const [active, setActive] = useState<Filter["id"]>("all");
  const reduce = useReducedMotion();
  const visible = active === "all" ? items : items.filter((i) => i.category === active);

  return (
    <>
      <div role="group" aria-label={filterLabel} className="mt-12 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
            className={`h-11 rounded-[var(--radius-button)] px-5 text-sm font-semibold transition-all duration-200 ${
              active === f.id
                ? "bg-gradient-button text-white shadow-glow-blue"
                : "border border-border bg-surface/40 text-text-secondary hover:border-primary/60 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.ul layout={!reduce} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => {
            const style = categoryStyle[p.category];
            return (
              <motion.li
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <article
                  className={`group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface/60 shadow-card transition-all duration-300 hover:-translate-y-1.5 ${style.hover}`}
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className={`absolute top-4 start-4 rounded-full px-3 py-1 text-xs font-semibold ring-1 backdrop-blur-md ${style.badge}`}
                    >
                      {p.categoryLabel}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-white">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-text-muted">{p.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-lg border border-border bg-bg/60 px-2.5 py-1 text-xs font-medium text-text-secondary"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
