import { inputClass, labelClass } from "@/components/admin/fields";

type SeoInitial = { seoTitle?: string | null; seoDescription?: string | null; ogImageUrl?: string | null };

/** Per-entity SEO overrides (brief §13). Blank = fall back to the entity's own name/summary. */
export default function SeoFields({ initial }: { initial?: SeoInitial }) {
  return (
    <fieldset className="flex flex-col gap-4 border border-edge rounded-lg p-4">
      <legend className="font-mono text-[11px] uppercase tracking-wider text-fgMuted px-2">SEO (optional)</legend>
      <div>
        <label className={labelClass}>SEO title</label>
        <input name="seoTitle" defaultValue={initial?.seoTitle ?? ""} maxLength={70} className={inputClass} placeholder="Defaults to the page name" />
      </div>
      <div>
        <label className={labelClass}>Meta description</label>
        <textarea name="seoDescription" rows={2} defaultValue={initial?.seoDescription ?? ""} maxLength={170} className={inputClass} placeholder="Defaults to the summary" />
      </div>
      <div>
        <label className={labelClass}>Social share (OG) image URL</label>
        <input name="ogImageUrl" defaultValue={initial?.ogImageUrl ?? ""} className={inputClass} placeholder="https://…" />
      </div>
    </fieldset>
  );
}
