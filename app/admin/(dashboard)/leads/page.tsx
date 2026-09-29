import { prisma } from "@/lib/db";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">Leads ({leads.length})</h1>

      <div className="border border-edge divide-y divide-edge">
        {leads.map((lead) => (
          <div key={lead.id} className="px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">
                {lead.firstName} {lead.lastName} — {lead.company}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 border border-edge">
                {lead.mode === "BOOK_A_CALL" ? "Book a Call" : "Enquiry"}
              </span>
            </div>
            <p className="text-sm text-fgMuted mb-2">
              {lead.email} · Interest: {lead.interest}
              {lead.jobTitle ? ` · ${lead.jobTitle}` : ""}
            </p>
            <p className="text-sm">{lead.message}</p>
            {lead.bookingDate && (
              <p className="text-xs text-fgMuted mt-2">
                Requested: {new Date(lead.bookingDate).toLocaleDateString()} at {lead.bookingTime}
              </p>
            )}
            <p className="text-xs text-fgMuted mt-2">
              {lead.createdAt.toLocaleString()}
              {lead.sourcePath ? ` · from ${lead.sourcePath}` : ""}
              {lead.utmSource ? ` · utm_source=${lead.utmSource}` : ""}
            </p>
          </div>
        ))}
        {leads.length === 0 && <p className="px-5 py-8 text-center text-fgMuted text-sm">No leads yet.</p>}
      </div>
    </div>
  );
}
