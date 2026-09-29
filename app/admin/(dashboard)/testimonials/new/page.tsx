import TestimonialForm from "@/components/admin/TestimonialForm";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">New Testimonial</h1>
      <TestimonialForm action={createTestimonial} />
    </div>
  );
}
