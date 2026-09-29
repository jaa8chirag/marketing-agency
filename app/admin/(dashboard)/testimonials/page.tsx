import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteTestimonial } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/fields";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight">Testimonials</h1>
        <Link href="/admin/testimonials/new" className={buttonClass}>
          + New Testimonial
        </Link>
      </div>

      <div className="border border-edge divide-y divide-edge">
        {testimonials.map((t) => (
          <div key={t.id} className="flex items-center justify-between px-5 py-4 gap-4">
            <div className="min-w-0">
              <p className="text-sm truncate max-w-md">&ldquo;{t.quote}&rdquo;</p>
              <span className="text-xs text-fgMuted">
                {t.person}
                {t.role ? `, ${t.role}` : ""} — {t.company}
              </span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/testimonials/${t.id}`} className="text-sm font-medium hover:text-signal">
                Edit
              </Link>
              <DeleteButton action={deleteTestimonial.bind(null, t.id)} />
            </div>
          </div>
        ))}
        {testimonials.length === 0 && <p className="px-5 py-8 text-center text-fgMuted text-sm">No testimonials yet.</p>}
      </div>
    </div>
  );
}
