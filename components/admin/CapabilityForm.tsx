import { inputClass, labelClass, buttonClass, arrayToLines } from "@/components/admin/fields";
import type { Capability } from "@/lib/generated/prisma/client";

export default function CapabilityForm({
  action,
  initial,
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: Capability;
}) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Number (e.g. "01")</label>
          <input name="num" required defaultValue={initial?.num} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug (URL path)</label>
          <input name="slug" required defaultValue={initial?.slug} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Name</label>
        <input name="name" required defaultValue={initial?.name} className={inputClass} placeholder="Brand & Creative" />
      </div>
      <div>
        <label className={labelClass}>Short name</label>
        <input name="shortName" required defaultValue={initial?.shortName} className={inputClass} placeholder="Brand & Creative" />
      </div>
      <div>
        <label className={labelClass}>Client need (e.g. "I need a new brand.")</label>
        <input name="clientNeed" required defaultValue={initial?.clientNeed} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Tagline</label>
        <input name="tagline" required defaultValue={initial?.tagline} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Summary</label>
        <textarea name="summary" required rows={2} defaultValue={initial?.summary} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Hero description</label>
        <textarea name="heroDescription" required rows={3} defaultValue={initial?.heroDescription} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Business problems solved (one per line)</label>
        <textarea
          name="problems"
          rows={4}
          defaultValue={initial ? arrayToLines(initial.problems) : ""}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Deliverables (one per line)</label>
        <textarea
          name="deliverables"
          rows={4}
          defaultValue={initial ? arrayToLines(initial.deliverables) : ""}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Related industry slugs (one per line)</label>
        <textarea
          name="industrySlugs"
          rows={3}
          defaultValue={initial ? arrayToLines(initial.industrySlugs) : ""}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Sort order</label>
        <input name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 0} className={inputClass} />
      </div>
      <button type="submit" className={`${buttonClass} self-start`}>
        {initial ? "Save changes" : "Create capability"}
      </button>
    </form>
  );
}
