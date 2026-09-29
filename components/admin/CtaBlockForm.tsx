import { inputClass, labelClass, buttonClass } from "@/components/admin/fields";
import type { CtaBlock } from "@/lib/generated/prisma/client";

export default function CtaBlockForm({
  action,
  initial,
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: CtaBlock;
}) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-xl">
      <div>
        <label className={labelClass}>Key (used in code to look this block up — don&apos;t change casually)</label>
        <input
          name="key"
          required
          defaultValue={initial?.key}
          className={`${inputClass} font-mono text-sm`}
          placeholder="default"
        />
      </div>
      <div>
        <label className={labelClass}>Eyebrow</label>
        <input name="eyebrow" required defaultValue={initial?.eyebrow} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Title</label>
        <textarea name="title" required rows={2} defaultValue={initial?.title} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Description (optional)</label>
        <textarea name="description" rows={2} defaultValue={initial?.description ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Primary button label</label>
        <input name="primaryLabel" required defaultValue={initial?.primaryLabel} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Primary button link</label>
        <input name="primaryHref" required defaultValue={initial?.primaryHref} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Secondary button label (optional)</label>
        <input name="secondaryLabel" defaultValue={initial?.secondaryLabel ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Secondary button link (optional)</label>
        <input name="secondaryHref" defaultValue={initial?.secondaryHref ?? ""} className={inputClass} />
      </div>
      <button type="submit" className={`${buttonClass} self-start`}>
        {initial ? "Save changes" : "Create CTA block"}
      </button>
    </form>
  );
}
