"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  motion,
} from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
};

export default function Counter({
  to,
  duration = 1.6,
  suffix = "",
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: "easeOut" });
    return controls.stop;
  }, [inView, mv, to, duration]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
