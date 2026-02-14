"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useCallback } from "react";
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

export default function FloodMapLeaflet({
  stations,
  onSelectStation,
}: {
  stations: StationWaterData[];
  onSelectStation?: (s: StationWaterData) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const initMap = useCallback(async () => {
    if (!mapRef.current || typeof window === "undefined") return;
    const L = (await import("leaflet")).default;

    if (mapInstance.current) {
      mapInstance.current.remove();
      markersRef.current = [];
    }

    const map = L.map(mapRef.current, {
      center: [27.7, -82.8],
      zoom: 6,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap, &copy; CARTO",
    }).addTo(map);

    L.control.zoom({ position: "topright" }).addTo(map);

    const icon = L.divIcon({
      className: "flood-marker",
      html: `<span style="
        width: 14px; height: 14px; border-radius: 50%;
        background: #22d3ee; border: 2px solid rgba(255,255,255,0.8);
        display: block; box-shadow: 0 1px 4px rgba(0,0,0,0.5);
      "></span>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    stations.forEach((s) => {
      const levelStr =
        s.currentLevelFt != null
          ? `Current: <strong>${s.currentLevelFt.toFixed(2)} ft</strong> (MLLW)<br/>`
          : "";
      const nextHighStr = s.nextHigh
        ? `Next high: ${s.nextHigh.levelFt.toFixed(2)} ft at ${formatTime(s.nextHigh.time)}<br/>`
        : "";
      const nextLowStr = s.nextLow
        ? `Next low: ${s.nextLow.levelFt.toFixed(2)} ft at ${formatTime(s.nextLow.time)}<br/>`
        : "";
      const popupContent = `
        <div style="min-width: 180px; font-family: system-ui;">
          <strong style="color: #22d3ee;">${s.name}</strong><br/>
          ${levelStr}${nextHighStr}${nextLowStr}
          <span style="color: #94a3b8; font-size: 11px;">${s.pred2050Note}</span>
        </div>
      `;

      const marker = L.marker([s.lat, s.lng], { icon })
        .addTo(map)
        .bindPopup(popupContent, {
          maxWidth: 260,
          className: "flood-popup",
        });

      marker.on("click", () => {
        onSelectStation?.(s);
      });

      markersRef.current.push(marker);
    });

    mapInstance.current = map;
  }, [stations, onSelectStation]);

  useEffect(() => {
    if (typeof window === "undefined" || !stations.length) return;
    void initMap();
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
      markersRef.current = [];
    };
  }, [stations, initMap]);

  return <div ref={mapRef} className="h-full w-full" />;
}
