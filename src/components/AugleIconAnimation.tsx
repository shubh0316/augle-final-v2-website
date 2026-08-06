"use client";

import Lottie from "lottie-react";
import animationData from "@/app/augle_icon_animation.json";

export function AugleIconAnimation({ className }: { className?: string }) {
  return <Lottie animationData={animationData} loop className={className} />;
}
