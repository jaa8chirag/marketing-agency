import { getNavCapabilities } from "@/lib/queries";
import HeaderClient from "./HeaderClient";

// Server wrapper: fetches nav capabilities from Postgres, then hands off to
// the client component that owns all the interactive/animated behavior.
// Kept as a separate file (not just an async HeaderClient) because
// HeaderClient needs "use client" for its hooks/motion/gsap usage, and a
// client component can't itself be async.
export default async function Header() {
  const navCapabilities = await getNavCapabilities();
  return <HeaderClient navCapabilities={navCapabilities} />;
}
