import SeoFields from "@/components/admin/SeoFields";
import { inputClass, labelClass, buttonClass, arrayToLines } from "@/components/admin/fields";
import type { Service, ServiceApproachStep } from "@/lib/generated/prisma/client";

type InitialService = Service & { approachSteps: ServiceApproachStep[] };

export default function ServiceForm({
  action,
  initial,
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: InitialService;
}) {
  const approachText = initial
    ? initial.approachSteps.map((s) => `${s.title} | ${s.description}`).join("\n")
    : "";

  return (
    <form action={action} className="flex flex-col gap-5 max-w-xl">
      <div>
        <label className={labelClass}>Slug (URL path)</label>
        <input name="slug" required defaultValue={initial?.slug} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Name</label>
        <input name="name" required defaultValue={initial?.name} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Hook (short one-liner shown on cards)</label>
        <input name="hook" required defaultValue={initial?.hook} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Definition</label>
        <textarea name="definition" required rows={3} defaultValue={initial?.definition} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Right for you if... (one per line)</label>
        <textarea
          name="forWhen"
          rows={4}
          defaultValue={initial ? arrayToLines(initial.forWhen) : ""}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Approach steps — one per line, "Title | Description"</label>
        <textarea
          name="approach"
          rows={5}
          defaultValue={approachText}
          className={inputClass}
          placeholder="Discover | We start by understanding your audience and goals."
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
        <label className={labelClass}>Outcomes (one per line)</label>
        <textarea
          name="outcomes"
          rows={4}
          defaultValue={initial ? arrayToLines(initial.outcomes) : ""}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Sort order</label>
        <input name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 0} className={inputClass} />
      </div>
      <SeoFields initial={initial} />
      <button type="submit" className={`${buttonClass} self-start`}>
        {initial ? "Save changes" : "Create service"}
      </button>
    </form>
  );
}
