import { inputClass, labelClass, buttonClass, optionStyle } from "@/components/admin/fields";
import type { Capability, Industry } from "@/lib/generated/prisma/client";

type InitialCaseStudy = {
  slug: string;
  client: string;
  title: string;
  year: string;
  summary: string;
  challenge: string;
  objective: string;
  strategy: string;
  creative: string;
  execution: string;
  technology: string;
  media: string;
  industryId: string;
  sortOrder: number;
  results: { metric: string; label: string }[];
  capabilities: { capabilityId: string }[];
};

export default function CaseStudyForm({
  action,
  initial,
  industries,
  capabilities,
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: InitialCaseStudy;
  industries: Industry[];
  capabilities: Capability[];
}) {
  const selectedCapabilityIds = new Set(initial?.capabilities.map((c) => c.capabilityId) ?? []);
  const resultsText = initial ? initial.results.map((r) => `${r.metric} | ${r.label}`).join("\n") : "";

  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Slug (URL path)</label>
          <input name="slug" required defaultValue={initial?.slug} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Year</label>
          <input name="year" required defaultValue={initial?.year} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Client</label>
        <input name="client" required defaultValue={initial?.client} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Title</label>
        <input name="title" required defaultValue={initial?.title} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Summary</label>
        <textarea name="summary" required rows={2} defaultValue={initial?.summary} className={inputClass} />
      </div>

      {(["challenge", "objective", "strategy", "creative", "execution", "technology", "media"] as const).map((field) => (
        <div key={field}>
          <label className={labelClass}>{field}</label>
          <textarea name={field} required rows={3} defaultValue={initial?.[field]} className={inputClass} />
        </div>
      ))}

      <div>
        <label className={labelClass}>Results — one per line, "Metric | Label"</label>
        <textarea
          name="results"
          rows={4}
          defaultValue={resultsText}
          className={inputClass}
          placeholder="3.2x | Organic traffic growth"
        />
      </div>

      <div>
        <label className={labelClass}>Industry</label>
        <select name="industryId" required defaultValue={initial?.industryId} className={inputClass}>
          <option value="" disabled style={optionStyle}>
            Select an industry
          </option>
          {industries.map((ind) => (
            <option key={ind.id} value={ind.id} style={optionStyle}>
              {ind.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Related capabilities</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {capabilities.map((cap) => (
            <label key={cap.id} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                name="capabilityIds"
                value={cap.id}
                defaultChecked={selectedCapabilityIds.has(cap.id)}
                className="accent-ink"
              />
              {cap.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Sort order</label>
        <input name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 0} className={inputClass} />
      </div>

      <button type="submit" className={`${buttonClass} self-start`}>
        {initial ? "Save changes" : "Create case study"}
      </button>
    </form>
  );
}
