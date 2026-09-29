import ClientLogoForm from "@/components/admin/ClientLogoForm";
import { createClientLogo } from "../actions";

export default function NewClientLogoPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">New Client Logo</h1>
      <ClientLogoForm action={createClientLogo} />
    </div>
  );
}
