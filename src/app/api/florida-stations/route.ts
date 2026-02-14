import { FLORIDA_NOAA_STATIONS } from "@/data/noaa-stations";
import { NextResponse } from "next/server";

const NOAA_BASE = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter";
const APP = "application=FLResilience";

export interface StationWaterData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  currentLevelFt: number | null;
  currentTime: string | null;
  nextHigh: { time: string; levelFt: number } | null;
  nextLow: { time: string; levelFt: number } | null;
  predictionsToday: { time: string; levelFt: number }[];
  pred2050Note: string;
}

async function fetchWaterLevel(stationId: string): Promise<{
  levelFt: number | null;
  time: string | null;
}> {
  try {
    const url = `${NOAA_BASE}?station=${stationId}&product=water_level&datum=MLLW&date=latest&units=english&format=json&${APP}`;
    const res = await fetch(url, { next: { revalidate: 10 } });
    const data = await res.json();
    if (data.error) return { levelFt: null, time: null };
    const points = data.data;
    if (!points || !Array.isArray(points) || points.length === 0)
      return { levelFt: null, time: null };
    const latest = points[points.length - 1];
    const v = parseFloat(latest.v);
    const t = latest.t ?? null;
    return { levelFt: Number.isFinite(v) ? v : null, time: t };
  } catch {
    return { levelFt: null, time: null };
  }
}

async function fetchPredictions(
  stationId: string,
  days: number = 1
): Promise<{ highLow: { time: string; levelFt: number; type: string }[] }> {
  try {
    const end = new Date();
    end.setDate(end.getDate() + days);
    const begin = new Date();
    const beginStr = begin.toISOString().slice(0, 10).replace(/-/g, "");
    const endStr = end.toISOString().slice(0, 10).replace(/-/g, "");
    const url = `${NOAA_BASE}?station=${stationId}&product=predictions&datum=MLLW&begin_date=${beginStr}&end_date=${endStr}&interval=hilo&units=english&format=json&${APP}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.error) return { highLow: [] };
    const points = data.predictions ?? [];
    const highLow = points.map((p: { t: string; v: string; type?: string }, i: number) => {
      const levelFt = parseFloat(p.v) || 0;
      let type = p.type ?? "";
      if (!type && points.length > i + 1) {
        type = levelFt >= (parseFloat(points[i + 1]?.v) ?? 0) ? "H" : "L";
      } else if (!type) type = "H";
      return { time: p.t, levelFt, type };
    });
    return { highLow };
  } catch {
    return { highLow: [] };
  }
}

export async function GET() {
  const results: StationWaterData[] = [];
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  for (const station of FLORIDA_NOAA_STATIONS) {
    const [level, preds] = await Promise.all([
      fetchWaterLevel(station.id),
      fetchPredictions(station.id, 2),
    ]);

    const highLow = preds.highLow || [];
    const nowStr = now.toISOString().replace(/\.\d{3}Z$/, "").slice(0, 16);
    const future = highLow.filter((p) => String(p.time).slice(0, 16) >= nowStr);
    const nextHigh = future.find((p) => p.type === "H") ?? future.find((_, i) => i % 2 === 0) ?? null;
    const nextLow = future.find((p) => p.type === "L") ?? future.find((_, i) => i % 2 === 1) ?? null;

    const predictionsToday = highLow.filter((p) => String(p.time).startsWith(todayStr));

    results.push({
      id: station.id,
      name: station.name,
      lat: station.lat,
      lng: station.lng,
      currentLevelFt: level.levelFt,
      currentTime: level.time,
      nextHigh: nextHigh ? { time: nextHigh.time, levelFt: nextHigh.levelFt } : null,
      nextLow: nextLow ? { time: nextLow.time, levelFt: nextLow.levelFt } : null,
      predictionsToday: predictionsToday.map((p) => ({ time: p.time, levelFt: p.levelFt })),
      pred2050Note: "NOAA: ~1 ft SLR by 2050",
    });

    await new Promise((r) => setTimeout(r, 150));
  }

  return NextResponse.json(results);
}
