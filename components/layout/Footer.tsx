import { getSiteSettings } from "@/lib/queries";
import FooterClient from "./FooterClient";

// Server wrapper: fetches site settings from Postgres, then hands off to the
// client component that owns the interactive clock/kinetic-brand behavior.
// Same split pattern as Header.tsx/HeaderClient.tsx.
export default async function Footer() {
  const siteSettings = await getSiteSettings();
  return <FooterClient siteSettings={siteSettings} />;
}
