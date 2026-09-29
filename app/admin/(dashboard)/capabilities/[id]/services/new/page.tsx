import ServiceForm from "@/components/admin/ServiceForm";
import { createService } from "../actions";

export default function NewServicePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">New Service</h1>
      <ServiceForm action={createService.bind(null, params.id)} />
    </div>
  );
}
