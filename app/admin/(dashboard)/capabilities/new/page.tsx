import CapabilityForm from "@/components/admin/CapabilityForm";
import { createCapability } from "../actions";

export default function NewCapabilityPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">New Capability</h1>
      <CapabilityForm action={createCapability} />
      <p className="text-sm text-fgMuted mt-4 max-w-xl">
        You&apos;ll be able to add services once the capability is created.
      </p>
    </div>
  );
}
