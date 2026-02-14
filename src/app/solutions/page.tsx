"use client";

import { motion } from "framer-motion";
import { solutionsData } from "@/data/florida-stats";

export default function SolutionsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-grid pt-24">
      <div className="gradient-orb absolute inset-0" />
      <div className="gradient-orb-bottom absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24">
        <motion.header
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            What you can do
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-400">
            Practical steps grounded in FEMA and NOAA guidance. Not a substitute
            for official advice—use them to start the conversation with
            insurers, builders, and local government.
          </p>
        </motion.header>

        <div className="grid gap-8 md:grid-cols-2">
          {solutionsData.map((card, i) => (
            <motion.article
              key={card.title}
              className="group rounded-2xl border border-white/10 bg-slate-900/60 p-8 transition-all hover:border-cyan-500/30 hover:bg-slate-900/80"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-cursor-hover
            >
              <span className="text-4xl" aria-hidden>
                {card.icon}
              </span>
              <h2 className="font-display mt-4 text-xl font-semibold text-white">
                {card.title}
              </h2>
              <p className="mt-2 text-sm font-medium text-cyan-400">
                {card.stat}
              </p>
              <p className="mt-4 text-slate-400">{card.action}</p>
            </motion.article>
          ))}
        </div>

        <motion.section
          className="mt-20 rounded-2xl border border-cyan-500/20 bg-slate-900/80 p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          data-cursor-hover
        >
          <h2 className="font-display text-2xl font-semibold text-cyan-400">
            Official resources
          </h2>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li>
              <a
                href="https://www.fema.gov/flood-maps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                FEMA Flood Maps
              </a>{" "}
              — Check your flood zone
            </li>
            <li>
              <a
                href="https://www.floodsmart.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                FloodSmart.gov
              </a>{" "}
              — NFIP and insurance info
            </li>
            <li>
              <a
                href="https://coast.noaa.gov/digitalcoast/tools/slr.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                NOAA Sea Level Rise Viewer
              </a>{" "}
              — Visualize future water levels
            </li>
            <li>
              <a
                href="https://climatecenter.fsu.edu/topics/sea-level-rise"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                Florida Climate Center — Sea level rise
              </a>
            </li>
          </ul>
        </motion.section>
      </div>
    </main>
  );
}
