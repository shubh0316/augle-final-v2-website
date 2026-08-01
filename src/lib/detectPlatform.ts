import { useSyncExternalStore } from "react";

export type Platform = "mac" | "windows" | "linux" | "ios" | "android";

export const PLATFORM_LABELS: Record<Platform, string> = {
  mac: "Download for Mac",
  windows: "Download for Windows",
  linux: "Download for Linux",
  ios: "Download on the App Store",
  android: "Get it on Google Play",
};

export const PLATFORM_LINKS: Record<Platform, string> = {
  mac: "/downloads/Augle-1.2.0-mac.dmg",
  windows: "/downloads/Augle-1.2.0-win.exe",
  linux: "/downloads/Augle-1.2.0.AppImage",
  ios: "https://apps.apple.com",
  android: "https://play.google.com",
};

/** Best-effort client-side OS/device sniff, ported from the source mockup's inline script. */
export function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "mac";
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";
  if (/iPhone|iPad|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  if (/Mac/.test(platform) && !/iPhone|iPad/.test(ua)) return "mac";
  if (/Win/.test(platform)) return "windows";
  if (/Linux/.test(platform)) return "linux";
  return "mac";
}

const noopSubscribe = () => () => {};
const getServerSnapshot = () => null;

/**
 * Detected platform, or null until the client has mounted. Uses
 * useSyncExternalStore (rather than a mount effect + setState) so the
 * one-time browser-only read doesn't trigger cascading renders and matches
 * server output during hydration.
 */
export function usePlatform(): Platform | null {
  return useSyncExternalStore(noopSubscribe, detectPlatform, getServerSnapshot);
}
