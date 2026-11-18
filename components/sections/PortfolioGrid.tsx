"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { ProjectCategory } from "@/data/projects";

export type PortfolioItem = {
  slug: string;
  category: ProjectCategory;
  image: string;
  title: string;
  description: string;
  tags: string[];
};

type Filter = { id: "all" | ProjectCategory; label: string };

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
      <div role="group" aria-label={filterLabel} className="mt-10 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
            className={`h-10 rounded-full px-5 text-sm font-medium transition ${
              active === f.id
                ? "bg-navy-900 text-white"
                : "border border-navy-900/15 bg-white text-navy-900 hover:border-teal-600"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.ul layout={!reduce} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.li
              key={p.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-navy-900">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-800"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
