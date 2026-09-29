import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import TeamMemberForm from "@/components/admin/TeamMemberForm";
import { updateTeamMember } from "../actions";

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const member = await prisma.teamMember.findUnique({ where: { id: params.id } });
  if (!member) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">Edit Team Member</h1>
      <TeamMemberForm action={updateTeamMember.bind(null, member.id)} initial={member} />
    </div>
  );
}
