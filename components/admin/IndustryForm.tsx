import { inputClass, labelClass, buttonClass, arrayToLines } from "@/components/admin/fields";
import type { Industry } from "@/lib/generated/prisma/client";

export default function IndustryForm({
  action,
  initial,
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: Industry;
}) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-xl">
      <div>
        <label className={labelClass}>Slug (URL path)</label>
        <input name="slug" required defaultValue={initial?.slug} className={inputClass} placeholder="ecommerce-retail" />
      </div>
      <div>
        <label className={labelClass}>Name</label>
        <input name="name" required defaultValue={initial?.name} className={inputClass} placeholder="E-commerce & Retail" />
      </div>
      <div>
        <label className={labelClass}>Eyebrow</label>
        <input name="eyebrow" required defaultValue={initial?.eyebrow} className={inputClass} placeholder="Industry" />
      </div>
      <div>
        <label className={labelClass}>Summary</label>
        <textarea name="summary" required rows={3} defaultValue={initial?.summary} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Image URL (shown on the homepage industries teaser)</label>
        <input name="imageUrl" defaultValue={initial?.imageUrl ?? ""} className={inputClass} placeholder="https://..." />
      </div>
      <div>
        <label className={labelClass}>Challenges (one per line)</label>
        <textarea
          name="challenges"
          rows={4}
          defaultValue={initial ? arrayToLines(initial.challenges) : ""}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Related capability slugs (one per line)</label>
        <textarea
          name="capabilitySlugs"
          rows={3}
          defaultValue={initial ? arrayToLines(initial.capabilitySlugs) : ""}
          className={inputClass}
          placeholder="brand-creative"
        />
      </div>
      <div>
        <label className={labelClass}>Sort order</label>
        <input name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 0} className={inputClass} />
      </div>

      <button type="submit" className={`${buttonClass} self-start`}>
        {initial ? "Save changes" : "Create industry"}
      </button>
    </form>
  );
}
