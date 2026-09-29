import { inputClass, labelClass, buttonClass, arrayToLines, optionStyle } from "@/components/admin/fields";
import type { Insight, Capability } from "@/lib/generated/prisma/client";

const INSIGHT_TYPES = ["Article", "Guide", "Report", "Perspective", "Video", "Whitepaper"];

export default function InsightForm({
  action,
  initial,
  capabilities,
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: Insight;
  capabilities: Capability[];
}) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-xl">
      <div>
        <label className={labelClass}>Slug (URL path)</label>
        <input name="slug" required defaultValue={initial?.slug} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Title</label>
        <input name="title" required defaultValue={initial?.title} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Type</label>
        <select name="type" defaultValue={initial?.type ?? "Article"} className={inputClass}>
          {INSIGHT_TYPES.map((t) => (
            <option key={t} value={t} style={optionStyle}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>Summary</label>
        <textarea name="summary" required rows={2} defaultValue={initial?.summary} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Body paragraphs (one per line)</label>
        <textarea
          name="body"
          rows={8}
          defaultValue={initial ? arrayToLines(initial.body) : ""}
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Author</label>
          <input name="author" required defaultValue={initial?.author} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <input name="date" required defaultValue={initial?.date} className={inputClass} placeholder="Sep 2026" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Reading time</label>
        <input name="readingTime" required defaultValue={initial?.readingTime} className={inputClass} placeholder="5 min read" />
      </div>
      <div>
        <label className={labelClass}>Related capability (optional)</label>
        <select name="capabilityId" defaultValue={initial?.capabilityId ?? ""} className={inputClass}>
          <option value="" style={optionStyle}>— None —</option>
          {capabilities.map((c) => (
            <option key={c.id} value={c.id} style={optionStyle}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>Related industry slug (optional)</label>
        <input name="industrySlug" defaultValue={initial?.industrySlug ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Sort order</label>
        <input name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 0} className={inputClass} />
      </div>
      <button type="submit" className={`${buttonClass} self-start`}>
        {initial ? "Save changes" : "Create insight"}
      </button>
    </form>
  );
}
