"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { StationWaterData } from "@/app/api/florida-stations/route";

function formatTime(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return iso;
  }
}

export default function FloodMap() {
  const [data, setData] = useState<StationWaterData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [MapComponent, setMapComponent] = useState<React.ComponentType<{
    stations: StationWaterData[];
    onSelectStation?: (s: StationWaterData) => void;
  }> | null>(null);
  const [selected, setSelected] = useState<StationWaterData | null>(null);

  useEffect(() => {
    fetch("/api/florida-stations")
      .then((r) => r.json())
      .then((d) => {
        setData(Array.isArray(d) ? d : []);
        setError(null);
      })
      .catch((e) => setError(e?.message || "Failed to load station data"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    import("./FloodMapLeaflet").then((mod) => setMapComponent(() => mod.default));
  }, []);

  return (
    <div className="flex h-full min-h-[500px] flex-col gap-4 lg:flex-row">
      <div className="h-[400px] w-full shrink-0 rounded-2xl border border-white/10 bg-slate-900/80 overflow-hidden lg:h-[600px] lg:min-w-[60%]">
        {loading && (
          <div className="flex h-full items-center justify-center text-slate-400">
            Loading live water levels…
          </div>
        )}
        {error && (
          <div className="flex h-full items-center justify-center text-amber-400">
            {error}
          </div>
        )}
        {!loading && !error && data && data.length > 0 && MapComponent && (
          <MapComponent
            stations={data}
            onSelectStation={setSelected}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <motion.div
          className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-display text-lg font-semibold text-cyan-400">
            Map legend
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-400">
            <li>
              <span className="inline-block h-3 w-3 rounded-full bg-cyan-500 mr-2" />
              NOAA gauge — click for current level &amp; predictions
            </li>
            <li>Values in feet (ft) relative to MLLW. ~1 ft SLR by 2050 (NOAA).</li>
          </ul>
        </motion.div>

        {data && data.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <h3 className="font-display text-lg font-semibold text-white">
              All stations
            </h3>
            <ul className="mt-2 max-h-[280px] space-y-2 overflow-y-auto pr-1">
              {data.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(s)}
                    className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                      selected?.id === s.id
                        ? "border-cyan-500/50 bg-cyan-500/10 text-white"
                        : "border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/5"
                    }`}
                    data-cursor-hover
                  >
                    <span className="font-medium">{s.name}</span>
                    {s.currentLevelFt != null ? (
                      <span className="ml-2 text-cyan-400">
                        Now: {s.currentLevelFt.toFixed(2)} ft
                      </span>
                    ) : (
                      <span className="ml-2 text-slate-500">—</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selected && (
          <motion.div
            className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-cursor-hover
          >
            <h3 className="font-display text-lg font-semibold text-white">
              {selected.name}
            </h3>
            <dl className="mt-3 space-y-2 text-sm">
              {selected.currentLevelFt != null && (
                <>
                  <div>
                    <dt className="text-slate-500">Current level</dt>
                    <dd className="text-cyan-400 font-mono">
                      {selected.currentLevelFt.toFixed(2)} ft (MLLW)
                    </dd>
                    {selected.currentTime && (
                      <dd className="text-xs text-slate-500">
                        {formatTime(selected.currentTime)}
                      </dd>
                    )}
                  </div>
                </>
              )}
              {selected.nextHigh && (
                <div>
                  <dt className="text-slate-500">Next high tide</dt>
                  <dd className="text-white font-mono">
                    {selected.nextHigh.levelFt.toFixed(2)} ft — {formatTime(selected.nextHigh.time)}
                  </dd>
                </div>
              )}
              {selected.nextLow && (
                <div>
                  <dt className="text-slate-500">Next low tide</dt>
                  <dd className="text-white font-mono">
                    {selected.nextLow.levelFt.toFixed(2)} ft — {formatTime(selected.nextLow.time)}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-slate-500">Predicted (long-term)</dt>
                <dd className="text-slate-300">{selected.pred2050Note}</dd>
              </div>
            </dl>
          </motion.div>
        )}
      </div>
    </div>
  );
}
