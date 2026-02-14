"use client";

import { motion } from "framer-motion";
import FloodMap from "@/components/FloodMap";
import Link from "next/link";

export default function TrackerPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-grid pt-24 pb-16">
      <div className="gradient-orb absolute inset-0" />
      <div className="gradient-orb-bottom absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Flood Tracker
          </h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Live water levels and tide predictions at NOAA gauges across Florida.
            Click a station on the map or in the list for current level, next high/low tide,
            and long-term sea level rise context (NOAA: ~1 ft by 2050).
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Data: NOAA CO-OPS. Levels in feet relative to MLLW. Updates every 10–60 sec.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FloodMap />
        </motion.section>

        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/data"
            className="text-cyan-400 hover:underline"
            data-cursor-hover
          >
            View statewide flood &amp; NFIP data →
          </Link>
          <Link
            href="/solutions"
            className="text-cyan-400 hover:underline"
            data-cursor-hover
          >
            What you can do →
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
