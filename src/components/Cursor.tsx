"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };
    const handleLeave = () => setHidden(true);
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]");
      setHovering(!!interactive);
    };
    const handleOut = () => setHovering(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mouseover", handleOver as EventListener);
    window.addEventListener("mouseout", handleOut);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mouseover", handleOver as EventListener);
      window.removeEventListener("mouseout", handleOut);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        animate={{
          x: mouse.x,
          y: mouse.y,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <motion.div
          className="h-3 w-3 rounded-full bg-white"
          animate={{
            scale: hovering ? 2.2 : 1,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        animate={{
          x: mouse.x,
          y: mouse.y,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 250,
        }}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <motion.div
          className="h-8 w-8 rounded-full border-2 border-cyan-400/60"
          animate={{
            scale: hovering ? 1.8 : 1,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        />
      </motion.div>
    </>
  );
}
