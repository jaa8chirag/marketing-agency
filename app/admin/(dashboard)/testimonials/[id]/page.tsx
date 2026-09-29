import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { updateTestimonial } from "../actions";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const testimonial = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">Edit Testimonial</h1>
      <TestimonialForm action={updateTestimonial.bind(null, testimonial.id)} initial={testimonial} />
    </div>
  );
}
