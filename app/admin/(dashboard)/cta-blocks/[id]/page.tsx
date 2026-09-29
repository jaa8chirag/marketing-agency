import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import CtaBlockForm from "@/components/admin/CtaBlockForm";
import { updateCtaBlock } from "../actions";

export default async function EditCtaBlockPage({ params }: { params: { id: string } }) {
  const block = await prisma.ctaBlock.findUnique({ where: { id: params.id } });
  if (!block) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">Edit CTA Block</h1>
      <CtaBlockForm action={updateCtaBlock.bind(null, block.id)} initial={block} />
    </div>
  );
}
