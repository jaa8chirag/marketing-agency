import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ClientLogoForm from "@/components/admin/ClientLogoForm";
import { updateClientLogo } from "../actions";

export default async function EditClientLogoPage({ params }: { params: { id: string } }) {
  const logo = await prisma.clientLogo.findUnique({ where: { id: params.id } });
  if (!logo) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">Edit Client Logo</h1>
      <ClientLogoForm action={updateClientLogo.bind(null, logo.id)} initial={logo} />
    </div>
  );
}
