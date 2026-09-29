import { prisma } from "@/lib/db";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";
import { updateSiteSettings } from "./actions";

export default async function SiteSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-2">Site Settings</h1>
      <p className="text-sm text-fgMuted mb-8">
        Global navigation, footer, social links, contact details and analytics — the Header and Footer on the live
        site read from here instead of hardcoded values.
      </p>
      <SiteSettingsForm action={updateSiteSettings} initial={settings} />
    </div>
  );
}
