"use client";

import { motion } from "framer-motion";
import {
  nfipStats,
  riskRatingImpact,
  seaLevelRise,
  topFloodRiskCounties,
} from "@/data/florida-stats";

function formatNum(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

export default function DataPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-grid pt-24">
      <div className="gradient-orb absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24">
        <motion.header
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Real data, real risk
          </h1>
          <p className="mt-4 max-w-2xl text-slate-400">
            Numbers from FEMA’s Florida State Profile (2025), NOAA sea level
            projections, and flood hazard data. Use them to understand exposure
            and prioritize action.
          </p>
        </motion.header>

        <section className="mb-16">
          <h2 className="font-display mb-8 text-2xl font-semibold text-cyan-400">
            NFIP in Florida
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                label: "Policies in force",
                value: formatNum(nfipStats.policiesInForce),
              },
              {
                label: "Properties without coverage",
                value: formatNum(nfipStats.propertiesWithoutCoverage),
              },
              { label: "Properties with coverage", value: `${nfipStats.percentCovered}%` },
              {
                label: "Average NFIP claim (10-yr)",
                value: `$${nfipStats.averageClaimPayout.toLocaleString()}`,
              },
              {
                label: "CRS communities",
                value: nfipStats.crsCommunities.toString(),
              },
              {
                label: "CRS avg. annual savings",
                value: `$${nfipStats.crsAverageSavings} (~${nfipStats.crsPercentSavings}%)`,
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="rounded-xl border border-white/10 bg-slate-900/60 p-5 transition-colors hover:border-cyan-500/20"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                data-cursor-hover
              >
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="mt-1 text-sm text-slate-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-display mb-8 text-2xl font-semibold text-cyan-400">
            Risk Rating 2.0 impact (premium changes)
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <motion.div
              className="rounded-xl border border-green-500/20 bg-slate-900/60 p-5"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              data-cursor-hover
            >
              <p className="text-xl font-bold text-green-400">
                {formatNum(riskRatingImpact.policiesDecrease)}
              </p>
              <p className="text-sm text-slate-400">
                Policies with immediate decrease ($0–$10/mo savings)
              </p>
            </motion.div>
            <motion.div
              className="rounded-xl border border-amber-500/20 bg-slate-900/60 p-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              data-cursor-hover
            >
              <p className="text-xl font-bold text-amber-400">
                {formatNum(riskRatingImpact.policiesIncrease10to20)}
              </p>
              <p className="text-sm text-slate-400">
                Policies with +$10–$20/month increase
              </p>
            </motion.div>
            <motion.div
              className="rounded-xl border border-white/10 bg-slate-900/60 p-5"
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              data-cursor-hover
            >
              <p className="text-xl font-bold text-white">
                {riskRatingImpact.percentChangeUnder20}%
              </p>
              <p className="text-sm text-slate-400">
                of policyholders see &lt;$20/month change
              </p>
            </motion.div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-display mb-8 text-2xl font-semibold text-cyan-400">
            Sea level rise (NOAA / Florida context)
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              className="rounded-xl border border-white/10 bg-slate-900/60 p-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              data-cursor-hover
            >
              <p className="text-2xl font-bold text-cyan-400">
                ~{seaLevelRise.by2050Inches}&quot;
              </p>
              <p className="text-sm text-slate-400">By 2050 (U.S. coastline)</p>
            </motion.div>
            <motion.div
              className="rounded-xl border border-white/10 bg-slate-900/60 p-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              data-cursor-hover
            >
              <p className="text-2xl font-bold text-white">
                {seaLevelRise.since1900Inches}&quot;
              </p>
              <p className="text-sm text-slate-400">Global rise since ~1900</p>
            </motion.div>
            <motion.div
              className="rounded-xl border border-white/10 bg-slate-900/60 p-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              data-cursor-hover
            >
              <p className="text-2xl font-bold text-white">
                {seaLevelRise.rateMmPerYear} mm/yr
              </p>
              <p className="text-sm text-slate-400">Current rate (since 1993)</p>
            </motion.div>
            <motion.div
              className="rounded-xl border border-white/10 bg-slate-900/60 p-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              data-cursor-hover
            >
              <p className="text-2xl font-bold text-cyan-400">
                {seaLevelRise.shorelineMiles.toLocaleString()} mi
              </p>
              <p className="text-sm text-slate-400">Florida shoreline</p>
            </motion.div>
          </div>
        </section>

        <section>
          <h2 className="font-display mb-8 text-2xl font-semibold text-cyan-400">
            High-exposure counties (NFIP policies)
          </h2>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 font-medium text-slate-300">County</th>
                  <th className="p-4 font-medium text-slate-300">Policies</th>
                  <th className="p-4 font-medium text-slate-300">Risk tier</th>
                </tr>
              </thead>
              <tbody>
                {topFloodRiskCounties.map((row, i) => (
                  <motion.tr
                    key={row.name}
                    className="border-b border-white/5 transition-colors hover:bg-white/5"
                    initial={{ opacity: 0, x: -5 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    data-cursor-hover
                  >
                    <td className="p-4 font-medium text-white">{row.name}</td>
                    <td className="p-4 text-cyan-400">
                      {row.policies.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          row.risk === "Extreme"
                            ? "bg-red-500/20 text-red-400"
                            : row.risk === "Very High"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-slate-500/20 text-slate-300"
                        }`}
                      >
                        {row.risk}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Risk tiers are illustrative based on policy count and coastal exposure.
            Check FEMA flood maps and NOAA tools for your address.
          </p>
        </section>
      </div>
    </main>
  );
}
