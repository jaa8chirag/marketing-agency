import { inputClass, labelClass, buttonClass } from "@/components/admin/fields";
import type { ClientLogo } from "@/lib/generated/prisma/client";

export default function ClientLogoForm({
  action,
  initial,
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: ClientLogo;
}) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-xl">
      <div>
        <label className={labelClass}>Client name</label>
        <input name="name" required defaultValue={initial?.name} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Logo URL (optional — falls back to a generated pattern when unset)</label>
        <input name="logoUrl" defaultValue={initial?.logoUrl ?? ""} className={inputClass} placeholder="https://..." />
      </div>
      <div>
        <label className={labelClass}>Industry (optional)</label>
        <input name="industry" defaultValue={initial?.industry ?? ""} className={inputClass} />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" name="approved" defaultChecked={initial?.approved ?? true} className="accent-ink" />
        <span className="text-sm">Approved for display</span>
      </label>
      <div>
        <label className={labelClass}>Sort order</label>
        <input name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 0} className={inputClass} />
      </div>
      <button type="submit" className={`${buttonClass} self-start`}>
        {initial ? "Save changes" : "Create client logo"}
      </button>
    </form>
  );
}
