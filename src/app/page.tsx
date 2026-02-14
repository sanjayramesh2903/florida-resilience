"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-grid">
      <div className="gradient-orb absolute inset-0" />
      <div className="gradient-orb-bottom absolute inset-0" />

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-20 text-center">
        <motion.p
          className="mb-4 font-mono text-sm uppercase tracking-widest text-cyan-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Florida Flood & Coastal Resilience
        </motion.p>
        <motion.h1
          className="font-display max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Most of Florida isn’t covered.{" "}
          <span className="text-cyan-400">Here’s the data.</span>
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-lg text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          1.73M properties have flood insurance. 5.9M don’t. With sea level rise
          and stronger storms, the gap is a growing risk. We map the numbers so
          you can act.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/data"
            className="rounded-full bg-cyan-500 px-8 py-4 font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:scale-105"
            data-cursor-hover
          >
            Explore the data
          </Link>
          <Link
            href="/solutions"
            className="rounded-full border border-cyan-500/50 px-8 py-4 font-semibold text-cyan-400 transition-all hover:border-cyan-400 hover:bg-cyan-500/10"
            data-cursor-hover
          >
            What you can do
          </Link>
        </motion.div>
      </section>

      <section className="relative border-t border-white/5 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display mb-12 text-center text-3xl font-bold text-white">
            The problem in numbers
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                value: "20%",
                label: "of Florida properties have NFIP flood insurance",
                source: "FEMA State Profile",
              },
              {
                value: "5.9M",
                label: "properties without flood coverage",
                source: "FEMA",
              },
              {
                value: "~1 ft",
                label: "sea level rise projected by 2050 (NOAA)",
                source: "NOAA",
              },
              {
                value: "259",
                label: "communities in CRS with premium discounts",
                source: "FEMA CRS",
              },
            ].map((item, i) => (
              <motion.div
                key={item.value}
                className="group rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm transition-colors hover:border-cyan-500/30 hover:bg-slate-900/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-cursor-hover
              >
                <p className="font-display text-3xl font-bold text-cyan-400">
                  {item.value}
                </p>
                <p className="mt-2 text-slate-300">{item.label}</p>
                <p className="mt-2 text-xs text-slate-500">{item.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.p
            className="text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Data from FEMA, NOAA, and Florida Climate Center. Not official
            guidance.{" "}
            <Link href="/about" className="text-cyan-400 hover:underline" data-cursor-hover>
              Learn more
            </Link>
          </motion.p>
        </div>
      </section>
    </main>
  );
}
