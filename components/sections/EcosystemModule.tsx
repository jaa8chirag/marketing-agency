import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

const nodes = [
  { name: "Cordinit", role: "Parent ecosystem", desc: "The group that brings technology, capital and operating infrastructure to every business inside it." },
  { name: "Cordinit Technology", role: "Technology · Transformation · Engineering", desc: "The engineering and transformation partner powering platforms across the ecosystem." },
  { name: "Cordinit Media", role: "Creative · Media · Production · Growth", desc: "The creative, media and growth company you're on right now — and the reason this site exists." },
];

export default function EcosystemModule() {
  return (
    <section className="py-24 md:py-32 border-b border-edge">
      <Container>
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <Eyebrow index="06">The Cordinit ecosystem</Eyebrow>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tightest text-balance max-w-2xl">
                Independent brand. Shared infrastructure.
              </h2>
            </div>
            <p className="max-w-sm text-fgMuted leading-relaxed">
              Cordinit Media is a distinct brand within Cordinit &mdash; built to gain access to
              technology, talent and infrastructure without losing its own identity.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-edge">
          {nodes.map((node, idx) => (
            <Reveal key={node.name} delay={idx * 60}>
              <div
                className={`border-r border-b border-edge p-8 min-h-[240px] flex flex-col justify-between ${
                  node.name === "Cordinit Media" ? "bg-ink text-paper" : ""
                }`}
              >
                <span className={`font-mono text-[11px] uppercase tracking-wider ${node.name === "Cordinit Media" ? "text-signal" : "text-fgMuted"}`}>
                  {node.role}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight mt-6">{node.name}</h3>
                <p className={`text-sm leading-relaxed mt-3 ${node.name === "Cordinit Media" ? "text-mutedOnInk" : "text-fgMuted"}`}>
                  {node.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Button href="/ecosystem" variant="outline">Explore the ecosystem</Button>
        </Reveal>
      </Container>
    </section>
  );
}
