import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import CapabilityForm from "@/components/admin/CapabilityForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { updateCapability } from "../actions";
import { deleteService } from "./services/actions";
import { buttonClass } from "@/components/admin/fields";

export default async function EditCapabilityPage({ params }: { params: { id: string } }) {
  const capability = await prisma.capability.findUnique({
    where: { id: params.id },
    include: { services: { orderBy: { sortOrder: "asc" } } },
  });
  if (!capability) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">Edit Capability</h1>
      <CapabilityForm action={updateCapability.bind(null, capability.id)} initial={capability} />

      <div className="mt-12 max-w-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold tracking-tight">Services</h2>
          <Link href={`/admin/capabilities/${capability.id}/services/new`} className={buttonClass}>
            + New Service
          </Link>
        </div>
        <div className="border border-edge divide-y divide-edge rounded-xl overflow-hidden">
          {capability.services.map((svc) => (
            <div key={svc.id} className="flex items-center justify-between px-5 py-4">
              <span>{svc.name}</span>
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/capabilities/${capability.id}/services/${svc.id}`}
                  className="text-sm font-medium hover:text-signal"
                >
                  Edit
                </Link>
                <DeleteButton action={deleteService.bind(null, capability.id, svc.id)} />
              </div>
            </div>
          ))}
          {capability.services.length === 0 && (
            <p className="px-5 py-8 text-center text-fgMuted text-sm">No services yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
