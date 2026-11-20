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
const categoryStyle: Record<ProjectCategory, { badge: string; bar: string; tag: string }> = {
  vr: { badge: "bg-white/95 text-blue-ink", bar: "from-cyan to-primary", tag: "bg-primary/10 text-blue-ink" },
  ar: { badge: "bg-white/95 text-purple-ink", bar: "from-secondary to-teal", tag: "bg-secondary/10 text-purple-ink" },
  game: { badge: "bg-white/95 text-pink-ink", bar: "from-orange to-pink", tag: "bg-pink/10 text-pink-ink" },
  simulation: { badge: "bg-white/95 text-teal-ink", bar: "from-teal to-primary", tag: "bg-teal/10 text-teal-ink" },
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
                : "border border-line bg-white text-ink-secondary shadow-soft hover:-translate-y-0.5 hover:border-primary/50 hover:text-ink"
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
                <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className={`absolute top-4 start-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${style.badge}`}
                    >
                      {p.categoryLabel}
                    </span>
                    <div aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${style.bar}`} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-ink">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-ink-muted">{p.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <li key={tag} className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${style.tag}`}>
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
