import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import IndustryForm from "@/components/admin/IndustryForm";
import { updateIndustry } from "../actions";

export default async function EditIndustryPage({ params }: { params: { id: string } }) {
  const industry = await prisma.industry.findUnique({ where: { id: params.id } });
  if (!industry) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">Edit Industry</h1>
      <IndustryForm action={updateIndustry.bind(null, industry.id)} initial={industry} />
    </div>
  );
}
