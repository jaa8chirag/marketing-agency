import { inputClass, labelClass, buttonClass } from "@/components/admin/fields";
import type { Testimonial } from "@/lib/generated/prisma/client";

export default function TestimonialForm({
  action,
  initial,
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: Testimonial;
}) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-xl">
      <div>
        <label className={labelClass}>Quote</label>
        <textarea name="quote" required rows={4} defaultValue={initial?.quote} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Person</label>
        <input name="person" required defaultValue={initial?.person} className={inputClass} placeholder="VP Marketing" />
      </div>
      <div>
        <label className={labelClass}>Role (optional)</label>
        <input name="role" defaultValue={initial?.role ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Company</label>
        <input name="company" required defaultValue={initial?.company} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Sort order</label>
        <input name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 0} className={inputClass} />
      </div>
      <button type="submit" className={`${buttonClass} self-start`}>
        {initial ? "Save changes" : "Create testimonial"}
      </button>
    </form>
  );
}
