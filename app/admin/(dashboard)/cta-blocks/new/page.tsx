import CtaBlockForm from "@/components/admin/CtaBlockForm";
import { createCtaBlock } from "../actions";

export default function NewCtaBlockPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">New CTA Block</h1>
      <CtaBlockForm action={createCtaBlock} />
    </div>
  );
}
