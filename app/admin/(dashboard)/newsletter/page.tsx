import { prisma } from "@/lib/db";

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight mb-8">
        <span className="material-symbols-outlined text-signal text-[22px]">mail</span>
        Newsletter Subscribers ({subscribers.length})
      </h1>

      <div className="border border-edge divide-y divide-edge rounded-xl overflow-hidden">
        {subscribers.map((s) => (
          <div key={s.id} className="flex items-center justify-between px-5 py-4">
            <span>{s.email}</span>
            <span className="text-xs text-fgMuted">{s.createdAt.toLocaleDateString()}</span>
          </div>
        ))}
        {subscribers.length === 0 && (
          <p className="px-5 py-8 text-center text-fgMuted text-sm">No subscribers yet.</p>
        )}
      </div>
    </div>
  );
}
