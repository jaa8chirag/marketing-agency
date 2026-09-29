import { inputClass, labelClass, buttonClass } from "@/components/admin/fields";
import type { TeamMember } from "@/lib/generated/prisma/client";

export default function TeamMemberForm({
  action,
  initial,
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: TeamMember;
}) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-xl">
      <div>
        <label className={labelClass}>Name</label>
        <input name="name" required defaultValue={initial?.name} className={inputClass} placeholder="Jane Doe" />
      </div>
      <div>
        <label className={labelClass}>Role</label>
        <input
          name="role"
          required
          defaultValue={initial?.role}
          className={inputClass}
          placeholder="Founding Partner, Strategy & Client Partnerships"
        />
      </div>
      <div>
        <label className={labelClass}>Bio (optional)</label>
        <textarea name="bio" rows={3} defaultValue={initial?.bio ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Photo URL (optional)</label>
        <input name="photoUrl" defaultValue={initial?.photoUrl ?? ""} className={inputClass} placeholder="https://..." />
      </div>
      <div>
        <label className={labelClass}>LinkedIn URL (optional)</label>
        <input name="linkedinUrl" defaultValue={initial?.linkedinUrl ?? ""} className={inputClass} placeholder="https://linkedin.com/in/..." />
      </div>
      <div>
        <label className={labelClass}>Sort order</label>
        <input name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 0} className={inputClass} />
      </div>
      <button type="submit" className={`${buttonClass} self-start`}>
        {initial ? "Save changes" : "Create team member"}
      </button>
    </form>
  );
}
