import TeamMemberForm from "@/components/admin/TeamMemberForm";
import { createTeamMember } from "../actions";

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">New Team Member</h1>
      <TeamMemberForm action={createTeamMember} />
    </div>
  );
}
