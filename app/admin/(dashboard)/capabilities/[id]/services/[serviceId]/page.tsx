import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ServiceForm from "@/components/admin/ServiceForm";
import { updateService } from "../actions";

export default async function EditServicePage({ params }: { params: { id: string; serviceId: string } }) {
  const service = await prisma.service.findUnique({
    where: { id: params.serviceId },
    include: { approachSteps: { orderBy: { sortOrder: "asc" } } },
  });
  if (!service) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">Edit Service</h1>
      <ServiceForm action={updateService.bind(null, params.id, service.id)} initial={service} />
    </div>
  );
}
