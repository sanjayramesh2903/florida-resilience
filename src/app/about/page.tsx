"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-grid pt-24">
      <div className="gradient-orb absolute inset-0" />
      <div className="gradient-orb-bottom absolute inset-0" />

      <div className="relative mx-auto max-w-3xl px-6 pb-24">
        <motion.header
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            About this project
          </h1>
          <p className="mt-4 text-slate-400">
            FL Resilience is a data-focused site and toolset for Florida flood
            and coastal risk. The main tool is the <strong className="text-cyan-400">Flood Tracker</strong>—an
            interactive map of live NOAA water levels and tide predictions at
            gauges across the state, plus long-term sea level rise context. The
            rest of the site surfaces real numbers on the insurance gap and
            exposure so residents and communities can act.
          </p>
        </motion.header>

        <motion.section
          className="space-y-6 text-slate-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="font-display mb-2 text-xl font-semibold text-cyan-400">
              Mission
            </h2>
            <p>
              We pull publicly available data from FEMA (e.g. Florida State
              Profile, NFIP statistics, CRS), NOAA (sea level rise, flood
              tools), and Florida climate sources and present it in one place.
              The goal is to make the scale of exposure and the insurance gap
              easier to grasp—not to replace official flood maps, insurance
              advice, or emergency guidance.
            </p>
          </div>

          <div>
            <h2 className="font-display mb-2 text-xl font-semibold text-cyan-400">
              Data sources
            </h2>
            <ul className="list-inside list-disc space-y-1 text-slate-400">
              <li>
                FEMA Florida State Profile (April 2025) — NFIP policies,
                claims, Risk Rating 2.0 impact, CRS
              </li>
              <li>
                NOAA — U.S. sea level rise projections (e.g. ~1 ft by 2050),
                Sea Level Rise Viewer
              </li>
              <li>
                Florida Climate Center — Relative sea level rise, shoreline,
                historical context
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display mb-2 text-xl font-semibold text-cyan-400">
              Disclaimer
            </h2>
            <p>
              This site is for general awareness only. It is not affiliated with
              FEMA, NOAA, or any government agency. Flood zone determination,
              insurance decisions, and building choices should be based on
              official FEMA flood maps, licensed insurers, and qualified
              professionals.
            </p>
          </div>
        </motion.section>

        <motion.div
          className="mt-16 flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/data"
            className="rounded-full bg-cyan-500/20 px-6 py-3 font-medium text-cyan-400 transition-colors hover:bg-cyan-500/30"
            data-cursor-hover
          >
            View data
          </Link>
          <Link
            href="/solutions"
            className="rounded-full border border-white/20 px-6 py-3 font-medium text-slate-300 transition-colors hover:border-cyan-500/50 hover:text-white"
            data-cursor-hover
          >
            See solutions
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
