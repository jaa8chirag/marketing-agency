import { inputClass, labelClass, buttonClass, arrayToLines } from "@/components/admin/fields";
import type { SiteSettings } from "@/lib/generated/prisma/client";

export default function SiteSettingsForm({
  action,
  initial,
}: {
  action: (formData: FormData) => Promise<void>;
  initial: SiteSettings | null;
}) {
  return (
    <form action={action} className="flex flex-col gap-10 max-w-2xl">
      <section className="flex flex-col gap-5">
        <h2 className="font-mono text-[11px] uppercase tracking-superwide text-fgMuted">Navigation</h2>
        <div>
          <label className={labelClass}>Primary nav links (one per line, "Label | /href")</label>
          <textarea
            name="primaryNavLinks"
            required
            rows={4}
            defaultValue={arrayToLines(initial?.primaryNavLinks ?? [])}
            className={`${inputClass} font-mono text-sm`}
            placeholder="Industries | /industries"
          />
        </div>
        <div>
          <label className={labelClass}>Footer nav links (one per line, "Label | /href")</label>
          <textarea
            name="footerNavLinks"
            required
            rows={5}
            defaultValue={arrayToLines(initial?.footerNavLinks ?? [])}
            className={`${inputClass} font-mono text-sm`}
            placeholder="About | /about"
          />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="font-mono text-[11px] uppercase tracking-superwide text-fgMuted">Primary CTA</h2>
        <div>
          <label className={labelClass}>Button label</label>
          <input name="primaryCtaLabel" required defaultValue={initial?.primaryCtaLabel} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Button link</label>
          <input name="primaryCtaHref" required defaultValue={initial?.primaryCtaHref} className={inputClass} />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="font-mono text-[11px] uppercase tracking-superwide text-fgMuted">
          Announcement bar (leave text empty to hide it)
        </h2>
        <div>
          <label className={labelClass}>Text</label>
          <input name="announcementText" defaultValue={initial?.announcementText ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Link</label>
          <input name="announcementHref" defaultValue={initial?.announcementHref ?? ""} className={inputClass} />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="font-mono text-[11px] uppercase tracking-superwide text-fgMuted">Social links</h2>
        <div>
          <label className={labelClass}>LinkedIn</label>
          <input name="socialLinkedin" defaultValue={initial?.socialLinkedin ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Instagram</label>
          <input name="socialInstagram" defaultValue={initial?.socialInstagram ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>YouTube</label>
          <input name="socialYoutube" defaultValue={initial?.socialYoutube ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>X / Twitter</label>
          <input name="socialX" defaultValue={initial?.socialX ?? ""} className={inputClass} />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="font-mono text-[11px] uppercase tracking-superwide text-fgMuted">Contact</h2>
        <div>
          <label className={labelClass}>Contact email</label>
          <input name="contactEmail" type="email" defaultValue={initial?.contactEmail ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Contact phone</label>
          <input name="contactPhone" defaultValue={initial?.contactPhone ?? ""} className={inputClass} />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="font-mono text-[11px] uppercase tracking-superwide text-fgMuted">Footer copyright</h2>
        <div>
          <label className={labelClass}>Line 1</label>
          <input name="copyrightLine1" defaultValue={initial?.copyrightLine1 ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Line 2</label>
          <input name="copyrightLine2" defaultValue={initial?.copyrightLine2 ?? ""} className={inputClass} />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="font-mono text-[11px] uppercase tracking-superwide text-fgMuted">Analytics</h2>
        <div>
          <label className={labelClass}>GA4 measurement ID (overrides env var; leave empty to use env var / disable)</label>
          <input
            name="gaMeasurementId"
            defaultValue={initial?.gaMeasurementId ?? ""}
            className={inputClass}
            placeholder="G-XXXXXXXXXX"
          />
        </div>
      </section>

      <button type="submit" className={`${buttonClass} self-start`}>
        Save settings
      </button>
    </form>
  );
}
