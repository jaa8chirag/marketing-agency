import IndustryForm from "@/components/admin/IndustryForm";
import { createIndustry } from "../actions";

export default function NewIndustryPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">New Industry</h1>
      <IndustryForm action={createIndustry} />
    </div>
  );
}
