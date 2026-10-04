// Remaining services from the brief's §8 scope and the navigation workbook's
// route directory (Cordinit_Media_Advanced_Navigation_and_User_Flows). The
// original hand-written services live in lib/content.ts; these fill the rest
// of the taxonomy so every route in the workbook resolves. Each service gets
// capability-level approach/outcome framing plus its own definition and
// deliverables. Outcomes are process-based on purpose — no invented numbers
// (brief §9.4: "only verified/defensible claims").
import type { Service } from "../lib/content";

type Row = [slug: string, name: string, hook: string, definition: string, deliverables: string[]];

type Framing = {
  forWhen: (name: string) => string[];
  approach: (name: string) => { title: string; description: string }[];
  outcomes: (name: string) => string[];
};

const framings: Record<string, Framing> = {
  "brand-creative": {
    forWhen: (n) => [`${n} is unclear, inconsistent or missing across the business.`, "Teams are producing creative without a shared point of view."],
    approach: (n) => [
      { title: "Understand", description: `Audit what exists and what the market expects before touching ${n.toLowerCase()}.` },
      { title: "Define", description: "Agree the direction in a form the whole team can test work against." },
      { title: "Create", description: "Develop and refine the work with structured feedback rounds." },
      { title: "Systemise", description: "Package it so it's usable day-to-day, not just at launch." },
    ],
    outcomes: () => ["A clearer, more consistent brand story", "Faster creative decisions with less rework"],
  },
  "content-production": {
    forWhen: (n) => [`You need ${n.toLowerCase()} produced to a premium standard on a real timeline.`, "In-house capacity can't match the volume or craft required."],
    approach: (n) => [
      { title: "Brief & concept", description: `Turn the objective into a ${n.toLowerCase()} concept with a clear audience and channel plan.` },
      { title: "Pre-production", description: "Scripts, boards, casting, locations and schedule locked before anyone rolls." },
      { title: "Production", description: "Shoot or build with a crew sized to the job, with approvals built into the day." },
      { title: "Finish & deliver", description: "Cut-downs, formats and handover assets ready for every platform." },
    ],
    outcomes: () => ["Production-ready assets delivered in every format needed", "A repeatable pipeline for future content"],
  },
  "digital-experiences": {
    forWhen: (n) => [`Your current ${n.toLowerCase()} is slow, dated or doesn't convert.`, "You need something that works for users and is easy for marketing to update."],
    approach: (n) => [
      { title: "Discover", description: `Map users, goals and constraints for the ${n.toLowerCase()} work.` },
      { title: "Design", description: "Wireframes to high-fidelity design, tested with real users where it matters." },
      { title: "Build", description: "Performance-first engineering on a CMS-driven, accessible foundation." },
      { title: "Launch & improve", description: "Release, measure and iterate against agreed conversion and speed targets." },
    ],
    outcomes: () => ["A faster, more accessible experience marketing can run without developers", "A measurable baseline to keep optimising against"],
  },
  "digital-marketing": {
    forWhen: (n) => [`${n} isn't a consistent, planned part of how you grow today.`, "Activity is happening but nobody can say what it's contributing."],
    approach: (n) => [
      { title: "Audit", description: `Review current ${n.toLowerCase()} performance, audience and competitors.` },
      { title: "Plan", description: "A prioritised plan tied to business goals and a realistic cadence." },
      { title: "Execute", description: "Run, publish and manage with a consistent voice and quality bar." },
      { title: "Report & refine", description: "Clear reporting and monthly adjustments, not vanity metrics." },
    ],
    outcomes: () => ["A consistent, accountable programme instead of ad-hoc activity", "Reporting tied to enquiries and revenue, not just reach"],
  },
  media: {
    forWhen: (n) => [`Media spend on ${n.toLowerCase()} lacks clear targeting, measurement or ownership.`, "You want one team accountable for planning through reporting."],
    approach: (n) => [
      { title: "Objectives", description: `Set outcomes and KPIs for ${n.toLowerCase()} before any budget is committed.` },
      { title: "Plan", description: "Audience, channel and budget logic documented and signed off." },
      { title: "Activate", description: "Launch with tracking verified and creative matched to placement." },
      { title: "Optimise", description: "Weekly in-flight optimisation with transparent reporting." },
    ],
    outcomes: () => ["Spend tied to explicit objectives", "Transparent reporting you can audit"],
  },
  "performance-marketing": {
    forWhen: (n) => [`You need ${n.toLowerCase()} improved against a measurable target.`, "Acquisition cost or conversion rate isn't where it needs to be."],
    approach: (n) => [
      { title: "Baseline", description: `Measure where ${n.toLowerCase()} stands today with trustworthy data.` },
      { title: "Hypotheses", description: "Prioritised, testable ideas ranked by expected impact and effort." },
      { title: "Test", description: "Structured experiments with a clear decision rule." },
      { title: "Scale", description: "Roll out what works, retire what doesn't, and document why." },
    ],
    outcomes: () => ["Decisions backed by test data", "A clearer view of cost per lead or acquisition by channel"],
  },
  "automation-ai": {
    forWhen: (n) => [`Manual work around ${n.toLowerCase()} is slowing the team down.`, "You want AI and automation used practically, not as a gimmick."],
    approach: (n) => [
      { title: "Map", description: `Document the current ${n.toLowerCase()} process and where time or leads leak.` },
      { title: "Design", description: "Define the workflow, data flow and human checkpoints." },
      { title: "Build", description: "Implement on your approved stack with logging and fail-safes." },
      { title: "Monitor", description: "Track quality and exceptions, and tune as usage grows." },
    ],
    outcomes: () => ["Less manual effort on repeatable work", "Workflows with clear ownership and human oversight"],
  },
  "commerce-growth": {
    forWhen: (n) => [`Your ${n.toLowerCase()} isn't keeping pace with traffic or ambition.`, "You need commerce decisions grounded in customer and product data."],
    approach: (n) => [
      { title: "Diagnose", description: `Review the funnel, catalogue and customer data behind ${n.toLowerCase()}.` },
      { title: "Prioritise", description: "Rank opportunities by revenue impact and effort." },
      { title: "Implement", description: "Ship changes in controlled releases with tracking in place." },
      { title: "Compound", description: "Feed results into the next round so gains stack." },
    ],
    outcomes: () => ["A prioritised commerce roadmap", "Measured changes to conversion, basket and retention"],
  },
};

const rows: Record<string, Row[]> = {
  "brand-creative": [
    ["brand-positioning", "Brand Positioning", "A position competitors can't borrow.", "Defining the specific space a brand owns in the customer's mind, built from audience insight and competitive reality.", ["Positioning statement", "Competitive map", "Proof points", "Messaging hierarchy"]],
    ["naming-identity", "Naming & Identity", "A name and identity built to travel.", "Name development and the identity system around it — verbal and visual — checked for availability and fit.", ["Name shortlist & rationale", "Logo & wordmark", "Colour & type system", "Usage guidelines"]],
    ["brand-architecture", "Brand Architecture", "How every brand and offer fits together.", "The structure that governs how a master brand, sub-brands, products and acquired businesses relate and are named.", ["Architecture model", "Naming conventions", "Endorsement rules", "Rollout plan"]],
    ["creative-strategy", "Creative Strategy", "The idea behind the idea.", "Translating business goals and audience insight into the creative territory every execution will draw on.", ["Creative brief", "Audience insight pack", "Territory options", "Channel principles"]],
    ["campaign-concepts", "Campaign Concepts", "Ideas with a reason to exist.", "Developing campaign platforms that are distinctive, flexible across channels and tied to a measurable objective.", ["Concept routes", "Key visuals & scripts", "Channel adaptations", "Measurement plan"]],
    ["creative-direction", "Creative Direction", "One hand guiding the whole look and feel.", "Senior creative leadership that keeps concept, craft and consistency intact across teams and suppliers.", ["Creative vision document", "Review & feedback rounds", "Craft standards", "Supplier briefs"]],
    ["art-direction", "Art Direction", "Visual language with intent.", "Defining and applying the photographic, illustrative and layout language that makes work instantly recognisable.", ["Visual language guide", "Moodboards & references", "Shoot & layout direction", "Asset review"]],
    ["copywriting", "Copywriting", "Words that sound like you and sell.", "Brand and performance copy across campaigns, web, social and sales — written to a defined voice.", ["Voice & tone guide", "Campaign & web copy", "Headline & CTA variants", "Editing pass"]],
    ["advertising-creative", "Advertising Creative", "Ads people don't scroll past.", "Concept and execution of advertising across video, static, audio and out-of-home, built for the media plan.", ["Ad concepts", "Master & cut-down assets", "Platform adaptations", "Testing variants"]],
    ["communication-strategy", "Communication Strategy", "The right message, to the right people, in the right order.", "Planning what to say, to whom and through which channels so messages reinforce rather than compete.", ["Audience & message matrix", "Channel roles", "Communications calendar", "Measurement framework"]],
  ],
  "content-production": [
    ["corporate-brand-films", "Corporate / Brand Films", "Your story, shot like it matters.", "Brand and corporate films that explain who you are, built with cinematic craft and a clear audience purpose.", ["Script & storyboard", "Full production", "Hero film & cut-downs", "Captioned versions"]],
    ["product-videos", "Product Videos", "Show it working.", "Product films and demos that explain features, build desire and support conversion on product and landing pages.", ["Shot list & script", "Studio or location shoot", "Hero & short-form edits", "Platform exports"]],
    ["social-video-reels", "Social Video / Reels", "Made for the feed, not repurposed.", "Short-form video designed natively for Reels, Shorts and TikTok with pacing, hooks and formats that fit each platform.", ["Content series concept", "Batch production", "Native-format edits", "Hook testing"]],
    ["creator-campaigns", "Creator Campaigns", "Creators who actually fit the brand.", "End-to-end creator campaign management from selection and briefing to production, approvals and reporting.", ["Creator shortlist", "Briefs & contracts support", "Content approvals", "Campaign report"]],
    ["influencer-content", "Influencer Content", "Content that looks native because it is.", "Producing and licensing influencer-led content for organic and paid use, with clear usage rights.", ["Content briefs", "Usage-rights tracking", "Paid-ready cuts", "Performance notes"]],
    ["animation", "Animation", "Motion that explains and delights.", "2D and 3D animation for explainers, brand moments and product storytelling.", ["Style frames", "Storyboard & animatic", "Full animation", "Delivery in all formats"]],
    ["motion-graphics", "Motion Graphics", "Graphics that move with purpose.", "Animated graphics, titles, data visuals and social templates built to a consistent motion language.", ["Motion style guide", "Templates & lower thirds", "Social motion packs", "Source files"]],
    ["vfx", "VFX", "Seamless effects, invisible seams.", "Visual effects, compositing and cleanup that extend what can be shot practically.", ["VFX breakdown", "Compositing & cleanup", "CG elements", "Final conformed shots"]],
    ["editing", "Editing", "Rhythm, clarity and story.", "Editorial for films, ads and social, shaped around story, pacing and the platform it will run on.", ["Assembly & rough cut", "Fine cut", "Review rounds", "Master & versions"]],
    ["color-grading", "Color Grading", "A consistent look from first frame to last.", "Colour correction and grading to give footage a cohesive, on-brand look across every deliverable.", ["Look development", "Shot matching", "Final grade", "Delivery-spec exports"]],
    ["sound-design", "Sound Design", "Half the picture is the sound.", "Sound design, mixing and music selection that give video emotional weight and broadcast-ready polish.", ["Sound design pass", "Mix & master", "Music licensing support", "Platform loudness delivery"]],
  ],
  "digital-experiences": [
    ["corporate-websites", "Corporate Websites", "A flagship that holds up under scrutiny.", "Corporate sites that communicate credibility, scale and clarity for investors, customers and talent alike.", ["Information architecture", "Design system & templates", "CMS build", "Accessibility & performance QA"]],
    ["marketing-websites", "Marketing Websites", "Built to generate pipeline.", "Marketing sites structured around audience journeys and conversion, editable by the marketing team.", ["Journey-based IA", "Page templates", "CMS & forms", "Analytics setup"]],
    ["campaign-websites", "Campaign Websites", "Launch-day ready, campaign-shaped.", "Standalone campaign and microsites built fast, with the creative ambition the campaign deserves.", ["Concept-led design", "Rapid build", "Tracking & consent", "Post-campaign handover"]],
    ["landing-pages", "Landing Pages", "One page, one job.", "High-converting landing pages built for a single audience and action, ready for paid and email traffic.", ["Page design & copy", "Form & CRM wiring", "Variant setup for tests", "Speed optimisation"]],
    ["ecommerce-websites", "E-commerce Websites", "Stores that sell on mobile first.", "Storefront design and build on your chosen platform, tuned for speed, merchandising and checkout conversion.", ["Storefront design", "Platform build", "Checkout optimisation", "Integrations"]],
    ["design-systems", "Design Systems", "Consistency that scales with the team.", "Token-based component libraries with documentation so design and engineering ship consistently.", ["Design tokens", "Component library", "Documentation site", "Governance model"]],
    ["web-applications", "Web Applications", "Real software, built properly.", "Custom web applications — portals, dashboards and tools — engineered for security and maintainability.", ["Technical architecture", "UI/UX design", "Engineering & QA", "Deployment pipeline"]],
    ["digital-platforms", "Digital Platforms", "Platforms that grow with the business.", "Multi-audience digital platforms that connect content, data and workflows in one maintainable system.", ["Platform architecture", "Integration plan", "Phased build", "Operations runbook"]],
    ["cms-development", "CMS Development", "Content your team can actually edit.", "Headless and traditional CMS implementation with structured content models and editor-friendly workflows.", ["Content model", "CMS configuration", "Editor training", "Migration support"]],
    ["api-integrations", "API Integrations", "Systems that talk to each other.", "Connecting websites and apps to CRMs, payment, analytics and internal systems with reliable, monitored integrations.", ["Integration design", "Secure implementation", "Error handling & logging", "Documentation"]],
    ["conversion-focused-experiences", "Conversion-focused Experiences", "Every screen earning its place.", "Experience design led by behaviour data — removing friction and clarifying the next step at every stage.", ["Behaviour & funnel review", "UX recommendations", "Prototype & test", "Implementation"]],
  ],
  "digital-marketing": [
    ["social-strategy", "Social Strategy", "A reason to show up on each platform.", "Platform-by-platform strategy defining role, audience, content pillars and success measures.", ["Platform roles", "Content pillars", "Posting cadence", "KPI framework"]],
    ["community-management", "Community Management", "Real conversations, handled well.", "Moderating and nurturing communities with a consistent brand voice and clear escalation paths.", ["Community guidelines", "Response playbook", "Daily moderation", "Insight reporting"]],
    ["technical-seo", "Technical SEO", "A site search engines can actually read.", "Crawlability, indexation, performance and structured-data work that removes technical barriers to ranking.", ["Technical audit", "Prioritised fix list", "Structured data", "Core Web Vitals plan"]],
    ["blogs", "Blogs", "Content that earns its traffic.", "Editorial planning and writing for blogs built around real search intent and audience questions.", ["Topic & keyword plan", "Briefs & articles", "On-page SEO", "Refresh schedule"]],
    ["thought-leadership", "Thought Leadership", "A point of view worth following.", "Developing and distributing expert-led content that builds authority with senior decision-makers.", ["POV development", "Long-form content", "Executive ghostwriting", "Distribution plan"]],
    ["creator-marketing", "Creator Marketing", "Partnerships, not one-off posts.", "Building ongoing relationships with creators who genuinely align with the brand and audience.", ["Creator strategy", "Selection & vetting", "Programme management", "Results report"]],
    ["email-newsletter-marketing", "Email / Newsletter Marketing", "The channel you actually own.", "Email programmes and newsletters designed for engagement, deliverability and measurable conversion.", ["List & segmentation plan", "Templates & copy", "Send schedule", "Deliverability monitoring"]],
  ],
  media: [
    ["audience-planning", "Audience Planning", "Know who you're buying before you buy.", "Defining and sizing audiences using first-party data and platform insight to direct media precisely.", ["Audience definitions", "Sizing & overlap", "Targeting recommendations", "Test plan"]],
    ["media-planning", "Media Planning", "Every pound with a job.", "Channel mix, budget allocation and flighting built around objectives and audience behaviour.", ["Channel strategy", "Budget model", "Flighting plan", "Forecasts"]],
    ["media-buying", "Media Buying", "Negotiated, verified, accountable.", "Executing the plan across platforms and publishers with transparent costs and brand-safety controls.", ["Trading & booking", "Brand-safety setup", "Billing transparency", "Delivery reports"]],
    ["paid-search", "Paid Search", "Be there at the moment of intent.", "Search campaign build, management and optimisation focused on qualified demand rather than clicks.", ["Account structure", "Keyword & ad strategy", "Bid optimisation", "Search term reviews"]],
    ["paid-social", "Paid Social", "Creative-led social advertising.", "Paid social campaigns across major platforms with creative testing and audience refinement built in.", ["Campaign architecture", "Creative test matrix", "Audience layering", "Weekly optimisation"]],
    ["display", "Display", "Visibility that pulls its weight.", "Display advertising strategy, creative and buying aimed at consideration and retargeting goals.", ["Placement strategy", "Display creative sets", "Retargeting layers", "Viewability reporting"]],
    ["youtube-video-media", "YouTube / Video Media", "Video where attention already is.", "Planning and buying video media on YouTube and connected platforms with creative built for each format.", ["Format strategy", "Creative cut-downs", "Audience targeting", "Brand-lift measurement"]],
    ["retail-media", "Retail Media", "Win at the digital shelf.", "Planning and managing retail media networks to support visibility and sales where shoppers buy.", ["Network selection", "Sponsored-product setup", "Catalogue alignment", "Incrementality reporting"]],
    ["campaign-measurement", "Campaign Measurement", "Proof, not just reports.", "Measurement frameworks that connect media activity to business outcomes using the right mix of methods.", ["KPI framework", "Tracking audit", "Dashboards", "Post-campaign analysis"]],
  ],
  "performance-marketing": [
    ["conversion-optimization", "Conversion Optimization", "More from the traffic you already have.", "Research-led testing across pages and flows to lift conversion systematically.", ["Funnel analysis", "Test roadmap", "Experiments & results", "Learnings library"]],
    ["retargeting", "Retargeting", "Bring the right people back.", "Segmented retargeting sequences tuned to intent, recency and creative fatigue.", ["Audience segments", "Sequenced creative", "Frequency caps", "Incremental lift checks"]],
    ["funnel-optimization", "Funnel Optimization", "Fix the leaks, not the symptoms.", "End-to-end funnel review from first touch to conversion to locate and fix the biggest drop-offs.", ["Funnel map", "Drop-off analysis", "Prioritised fixes", "Re-measurement"]],
    ["landing-page-optimization", "Landing Page Optimization", "Message match that converts.", "Improving landing page relevance, clarity and speed against the ads and audiences driving traffic.", ["Page audit", "Copy & layout tests", "Speed fixes", "Variant reporting"]],
    ["roas-roi-optimization", "ROAS / ROI Optimization", "Efficiency you can defend.", "Optimising spend allocation and creative against return targets with clear measurement rules.", ["Return-target model", "Spend reallocation", "Creative performance review", "Monthly ROI report"]],
    ["performance-analytics", "Performance Analytics", "One trusted view of what's working.", "Dashboards and analysis combining ad, site and CRM data into decisions teams can act on.", ["Data source audit", "Unified dashboards", "Insight reports", "Alerting"]],
    ["attribution", "Attribution", "Credit where it's actually due.", "Attribution models and measurement design that reflect how customers really move between channels.", ["Attribution audit", "Model selection", "Implementation", "Cross-channel reporting"]],
  ],
  "automation-ai": [
    ["crm-setup-integration", "CRM Setup / Integration", "A CRM people actually use.", "Configuring and integrating your CRM so leads, deals and activity flow in cleanly from every source.", ["Data model & fields", "Integrations", "Pipelines & automation", "Team onboarding"]],
    ["lead-nurturing", "Lead Nurturing", "Stay useful until they're ready.", "Automated, personalised sequences that move leads towards a conversation without pressure.", ["Nurture journeys", "Content mapping", "Scoring rules", "Sales hand-off criteria"]],
    ["customer-journeys", "Customer Journeys", "Design the whole relationship.", "Mapping and automating customer journeys across channels from first touch through loyalty.", ["Journey maps", "Trigger & rule design", "Cross-channel build", "Journey analytics"]],
    ["lifecycle-marketing", "Lifecycle Marketing", "The right message for every stage.", "Programmes for onboarding, activation, retention and win-back driven by behaviour and data.", ["Lifecycle model", "Programme build", "Message library", "Cohort reporting"]],
    ["ai-content-workflows", "AI Content Workflows", "Faster production, human judgement kept.", "Governed workflows using AI to speed content production while keeping brand quality and review in place.", ["Workflow design", "Prompt & style libraries", "Review checkpoints", "Usage guidelines"]],
    ["ai-chatbots", "AI Chatbots", "Helpful, honest and on-brand.", "Conversational assistants for support and lead capture with clear scope, hand-off and monitoring.", ["Use-case scoping", "Knowledge-base setup", "Conversation design", "Quality monitoring"]],
    ["lead-qualification", "Lead Qualification", "Sales time spent on the right leads.", "Automated qualification and routing so teams focus on the enquiries most likely to become work.", ["Qualification criteria", "Scoring & routing", "Form & chat logic", "SLA reporting"]],
    ["marketing-operations", "Marketing Operations", "The engine room, run properly.", "Process, tooling and data governance that keep marketing running efficiently and measurably.", ["Process documentation", "Stack review", "Data hygiene rules", "Reporting cadence"]],
  ],
  "commerce-growth": [
    ["ecommerce-strategy", "E-commerce Strategy", "A clear plan before the platform.", "Commercial and customer strategy for online selling — channels, range, pricing approach and operating model.", ["Opportunity assessment", "Channel & platform strategy", "Roadmap", "KPI framework"]],
    ["marketplace-strategy", "Marketplace Strategy", "Sell where customers already shop.", "Entering and growing on marketplaces with listing, pricing and fulfilment decisions made deliberately.", ["Marketplace selection", "Listing optimisation", "Pricing & promo rules", "Performance tracking"]],
    ["product-page-optimization", "Product Page Optimization", "Pages that answer the last objection.", "Improving product detail pages — content, imagery, trust signals and layout — to lift add-to-basket.", ["PDP audit", "Content & imagery guidance", "Layout tests", "Result analysis"]],
    ["social-commerce", "Social Commerce", "Shoppable, not just visible.", "Selling directly through social platforms with shoppable content, catalogues and creator support.", ["Platform set-up", "Shoppable content plan", "Creator integration", "Sales reporting"]],
    ["retail-media", "Retail Media", "Visibility where purchase happens.", "Managing retail media investment to support commerce growth alongside organic marketplace performance.", ["Retailer plan", "Campaign management", "Catalogue health checks", "ROAS reporting"]],
    ["customer-acquisition", "Customer Acquisition", "Profitable new customers.", "Acquisition programmes for commerce brands balancing growth with customer lifetime value.", ["Channel mix plan", "Creative & offer testing", "CAC / LTV model", "Cohort tracking"]],
    ["loyalty", "Loyalty", "Give customers a reason to come back.", "Loyalty and rewards design and activation that increases repeat purchase and advocacy.", ["Programme design", "Reward mechanics", "Platform integration", "Engagement reporting"]],
  ],
};

export const extraServicesByCapability: Record<string, Service[]> = Object.fromEntries(
  Object.entries(rows).map(([cap, list]) => {
    const f = framings[cap];
    return [
      cap,
      list.map(([slug, name, hook, definition, deliverables]): Service => ({
        slug,
        name,
        hook,
        definition,
        forWhen: f.forWhen(name),
        approach: f.approach(name),
        deliverables,
        outcomes: f.outcomes(name),
      })),
    ];
  }),
);
