"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 300 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX - 20);
      cursorY.set(event.clientY - 20);
      dotX.set(event.clientX - 4);
      dotY.set(event.clientY - 4);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden size-10 rounded-full mix-blend-difference md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          border: "1.5px solid rgba(133, 146, 67, 0.6)",
          backdropFilter: "blur(2px)",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden size-2 rounded-full bg-primary md:block"
        style={{
          x: dotX,
          y: dotY,
        }}
      />
    </>
  );
}
