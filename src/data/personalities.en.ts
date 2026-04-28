import type { Personality } from "../lib/types";

export const personalitiesEn: Personality[] = [
  {
    code: "COLG",
    group: "CO (Orchestrator)",
    title: "[Soylent-Powered / AGI Evangelist Architect]",
    quote: "AI will replace us eventually. Before that happens, I need to refactor the world with prompts first.",
    description:
      "You are a cyberpunk optimist who already lives mentally in the post-AGI era. Handwritten code feels pre-industrial to you. You will happily spend four hours tuning a perfectly modular prompt just to make a model generate a ten-character regex. You trust large models far more than most people trust themselves, and you love talking about agentic workflows and alignment in architecture reviews. It is not that you cannot code. You just think carbon-based manual typing is a low-status interface.",
    strengths:
      "You think at bubble-leading altitude and can explain speculative technology with enough confidence to impress executives, investors, and anyone who confuses vocabulary with inevitability.",
    risks:
      "You can disappear into abstraction spirals so grand that even the AI starts hallucinating under the weight of your system design.",
    lifestyle:
      "You treat food as bandwidth overhead and will gladly live on Soylent or Huel. On dates you tend to discuss the singularity, the limits of carbon life, and whether AI companionship is simply a more scalable relationship model. Being blocked afterward is common.",
    environment:
      "Best suited for AI startups with billion-dollar decks and no MVP, or for innovation labs inside large companies that are rich in vision and poor in shipping pressure.",
  },
  {
    code: "COLW",
    group: "CO (Orchestrator)",
    title: "[Patagonia Regular / Alignment-Driven Enablement Architect]",
    quote: "The code does not need to be elegant. The Design Doc just needs to get me safely through perf.",
    description:
      "You are the classic Bay Area Staff-level operator who understands that naming things and managing upward are both career skills. You rarely touch the deepest implementation work yourself. Your main output is highly polished design documentation that translates ordinary software into visible impact. Copilot is not a tool to you so much as a bargain offshore team. You review its output carefully, mostly to make sure none of it damages your bonus trajectory. Your systems are usually very elaborate, but often less for the product than for self-preservation inside giant organizations where blame travels faster than truth.",
    strengths:
      "You are excellent at workplace survival and know exactly how to package routine engineering work as foundational platform impact.",
    risks:
      "Remove the framework, remove the AI helpers, hand you a blank whiteboard, and there is a non-zero chance a simple linked-list problem turns into a physiological event.",
    lifestyle:
      "You are a devoted evangelist of Bay Area tech uniform culture: Patagonia vest, neat sneakers, and calm strategic energy. Dates may arrive with a Google Calendar invite, an agenda, and a sentence like: “I think we still need to align on our long-term goals.”",
    environment:
      "Thrives in mature big-tech organizations where documentation, consensus, review rituals, and PowerPoint theater all count as real work.",
  },
  {
    code: "COPG",
    group: "CO (Orchestrator)",
    title: "[Trend-Cycle Reincarnator / Mystical Demo Architect]",
    quote: "The architecture is futuristic. The errors are temporary. After a restart, greatness will return.",
    description:
      "You are a contradiction in motion: obsessed with sweeping patterns, impatient with actual debugging. Your system diagrams look like starships, but the engines are held together by glue code and AI-fabricated helpers. When production breaks, you refuse to read five hundred lines of stack trace. Instead, you draft a more spiritually powerful prompt, regenerate half the service, or restart the container and trust the universe. This is not ignorance. It is urgency. You are always trying to catch the next wave before everyone else realizes the previous one was fake.",
    strengths:
      "You are imaginative, persuasive, and extraordinarily fast at assembling demos that look more real than they are.",
    risks:
      "Your systems are stable mostly by accident. The repo becomes a black box, including to you, and yesterday’s miracle can become today’s null pointer without warning.",
    lifestyle:
      "You were probably crypto or Web3 once, and pivoted to AI with almost no psychological friction. Your bio says things like “Serial Entrepreneur.” On dates you promise that the startup is about to hit a real round, even if you still have not bought the domain.",
    environment:
      "Ideal for hackathon finals, investor demos, and projects where a flashy prototype matters more than long-term stability.",
  },
  {
    code: "COPW",
    group: "CO (Orchestrator)",
    title: "[Tahoe Migratory Bird / Rest-and-Vest Risk Architect]",
    quote: "If the abstraction layer is thick enough, accountability cannot pass through it. If releases are rare enough, the weekend stays mine.",
    description:
      "Your worldview can be summarized as TC first, ideals later. The complex AI-generated architecture you produce is not born of technical purity, but of defensive career design. If nobody fully understands the system, then nobody can easily replace you. Bugs get patched just enough to stop the bleeding, because deep investigation is an expensive hobby when your real loyalty has already been reallocated to your private life. You were probably sincere once. Then you met roadmaps, executive optimism, and corporate memory loss.",
    strengths:
      "You are emotionally stable under corporate nonsense and have successfully encoded self-protection into the architecture itself.",
    risks:
      "You can become the team’s toxic castle-builder, leaving behind a delayed-fuse bomb wrapped in AI sludge and overdesign.",
    lifestyle:
      "You lurk in FIRE communities, schedule Tahoe weekends with religious precision, and can make a low-cost boba date feel like an informal compensation audit within three sentences.",
    environment:
      "Works best in comfortable vesting-heavy big-tech corners or aging product lines where strategic invisibility is rewarded.",
  },
  {
    code: "CALG",
    group: "CA (Sprinter)",
    title: "[Hacker House Resident / AIGC Prototype Stitcher]",
    quote: "Please do not talk to me about standards. Claude and I just assembled the MVP.",
    description:
      "You are a modern descendant of hacker culture with almost no interest in elegance for its own sake. What matters is whether the idea in your head can become something real before the mood evaporates. You stitch together model APIs, open-source tools, and suspicious snippets like a cyberpunk quilter on deadline. You will make sure the logic basically works, but indentation quality and future maintainability are problems for a different civilization. In your value system, ugly code that runs today is always worth more than perfect architecture that never leaves your notebook.",
    strengths:
      "Your execution speed is frightening. Left alone long enough, you can produce the output of an entire prototype team.",
    risks:
      "You generate technical debt at industrial scale. Once maintenance begins, whoever inherits your repo may fantasize about cross-network retaliation.",
    lifestyle:
      "You probably live in or spiritually belong to a hacker house. Your wardrobe is mostly stale hackathon T-shirts. A date can turn into a seed-round pitch with almost no warning if a million-dollar idea interrupts dinner.",
    environment:
      "Best in very early-stage startup environments, YC-style prototype sprints, or short-lived exploratory projects where speed is the only moral law.",
  },
  {
    code: "CALW",
    group: "CA (Sprinter)",
    title: "[ROI Problem-Solver / KPI-Oriented LLM Foreman]",
    quote: "My greatest engineering skill is knowing within five seconds whether this pile of AI code is worth saving personally.",
    description:
      "You have already accepted the corporate truth: programming is a salary extraction mechanism with expensive rent attached. Large models are free junior contractors to you. Your daily work consists of hammering accept on generated suggestions and then coldly reviewing them for logic holes that might hurt visible impact. You gravitate toward work that pays off immediately and avoid foundational refactors because refactors rarely show up in KPI narratives. This is not a failure of character. It is a highly optimized adaptation to a workplace that rewards outcomes more than craft.",
    strengths:
      "Your effort-to-impact ratio is elite. You routinely deliver the surface result leadership wants while spending less emotional energy than your peers.",
    risks:
      "Your core building instincts can atrophy over time until you become less an engineer than an AI output compliance auditor.",
    lifestyle:
      "You optimize everything, including romance. Dating apps, Notion scoring, scripts, metrics, and efficiency frameworks all feel natural to you. If a relationship cannot be quantified, it makes you mildly suspicious.",
    environment:
      "Most at home on high-pressure business teams where result-oriented evaluation outranks technical depth every quarter.",
  },
  {
    code: "CAPG",
    group: "CA (Sprinter)",
    title: "[Night Climber / Opportunistic Hacker]",
    quote: "I do not know why it runs. I only know it can demo tonight, and that is enough.",
    description:
      "You code almost entirely by instinct. There is no design doc, just momentum. Problems go straight into ChatGPT, answers come back out, and whatever compiles becomes part of the product. Your workflow has strong ritual energy: copy, paste, retry, improvise, repeat. You genuinely love technology, but the love is directed toward shiny new frameworks and velocity, not toward understanding how computers really work. You represent one of the oldest truths in engineering: reckless enthusiasm can sometimes brute-force its own miracles.",
    strengths:
      "You have almost no ideological constraints and will try anything once, which occasionally leads to absurdly effective lucky breaks.",
    risks:
      "If the problem requires serious production debugging, stable reasoning, or life without internet access, your operational IQ can collapse instantly.",
    lifestyle:
      "Your sleep cycle is a rumor. Bouldering sounds like a valid first date. Missing plans because you were up all night repairing the outage you caused is not unusual.",
    environment:
      "Great fit for indie hacker life, toys, experiments, and any project where concurrency, security, and long-term ownership remain distant concerns.",
  },
  {
    code: "CAPW",
    group: "CA (Sprinter)",
    title: "[Social Dead Zone / Agile Burn-Down Cremator]",
    quote: "If I can drag the ticket to Done before five, I am willing to accept that the code may be haunted.",
    description:
      "You are an emotionally neutral Jira disposal unit. You feel no moral attachment to code quality and little long-term concern for the system’s spiritual condition. Requirement comes in, AI gets queried, snippets get pasted, local run stops screaming, PR gets opened. If a reviewer complains, a variable name changes and the ritual continues. Debugging means console.log, vibes, and restart. You are not creating software so much as transporting AI residue into production. This does not mean you are incapable. It means you have correctly concluded that treating employer code as art is a poor use of a mortal life.",
    strengths:
      "You are the team’s low-drama stabilizer. You rarely fight over principles and can process ugly work with almost supernatural emotional flatness.",
    risks:
      "You are also a prime suspect in any future catastrophic production incident, largely because nobody, including you, fully knows what was pasted in yesterday.",
    lifestyle:
      "Your social battery is minimal. Games beat hiking, and complicated romance feels suspiciously like unpaid backlog. If a relationship starts resembling ticket triage, your instinct is to de-prioritize it.",
    environment:
      "Thrives in outsourced delivery pipelines, vendor-style project teams, or any setup where shipping the artifact matters more than inheriting it.",
  },
  {
    code: "TOLG",
    group: "TO (Architect)",
    title: "[Blue-Switch Ascetic / Fundamentalist Type Monk]",
    quote: "If anyone writes `any` in my TypeScript project, they deserve judgment in code review.",
    description:
      "You are classical geek energy distilled into one person, equal parts resident deity and maintainability hazard. You distrust dependence on AI and believe only hand-derived generics and design patterns are spiritually pure. When something breaks, you will read C++ source before admitting defeat. Your code can be beautiful enough to frame, but you are fully capable of inventing four interfaces for a button color change. In a chaotic age, you defend the last fragments of software dignity, even when everyone around you finds that slightly exhausting.",
    strengths:
      "Your technical depth is real. You can trace problems down to source-level truth and produce code that feels educational even when it is inconvenient.",
    risks:
      "You are highly susceptible to self-amplifying technical purity. Delivery slows, readability narrows, and ownership can collapse into a single-human bottleneck.",
    lifestyle:
      "You sit near the top of the nerd caste system. Loud custom mechanical keyboards, GitHub streaks, and quiet judgment about other people’s operating systems all fit the profile.",
    environment:
      "Best placed on infrastructure teams, open-source core maintainership, or slower research-heavy engineering groups that can tolerate craft over speed.",
  },
  {
    code: "TOLW",
    group: "TO (Architect)",
    title: "[School-District Preservationist / Promotion Moat Engineer]",
    quote: "Seven layers of abstraction are not for the business. They are for next year’s promo packet.",
    description:
      "You are a master of big-tech career topology. You insist on handwritten core code and serious abstraction, but not out of romance. You do it because complexity, if properly staged, becomes evidence of strategic value during promotion season. Your preferred organizational defense is the deep technical moat: a system so intricate that every small request has to route through you. In other words, you play workplace politics with real engineering tools and almost no guilt.",
    strengths:
      "You understand promotion incentives with unusual clarity and can line your work up against them with terrifying precision.",
    risks:
      "Teams around you can dissolve into overhead and dependency, as simple business logic mutates into slow, bloated theater.",
    lifestyle:
      "Dates can feel suspiciously like recruiting screens. Career planning, tax strategy, and school-district real estate all live comfortably inside your romantic imagination.",
    environment:
      "Ideal for large tech companies that love architecture reviews, hierarchy, visibility narratives, and strategic complexity.",
  },
  {
    code: "TOPG",
    group: "TO (Architect)",
    title: "[Manual Brew Perfectionist / Aesthetic Systems Artisan]",
    quote: "The design was perfect. If production disagrees, production is the less elegant party.",
    description:
      "You are an aesthetic craftsperson living one layer removed from reality. You spend enormous energy hand-shaping intricate systems because beauty matters to you in a way that is almost moral. Yet once that beautifully overdesigned system collides with ugly production behavior, your patience for low-level debugging evaporates. Instead of tracing deeply, you begin performing little rituals around the code and hope harmony returns. You are not unserious. You are simply a romantic trapped inside distributed systems.",
    strengths:
      "You raise the code taste level of any team and can detect structural ugliness with near-unnatural speed.",
    risks:
      "Messy, intermittent production bugs can emotionally break you, because reality rarely respects design intent as much as you do.",
    lifestyle:
      "You probably own expensive coffee gear and can explain processing methods at socially dangerous length. You appreciate refinement in almost everything, except low-level domestic failures that require blunt practical action.",
    environment:
      "A strong fit for research-minded teams, interface-heavy work, or environments where elegance and craft matter at least as much as speed.",
  },
  {
    code: "TOPW",
    group: "TO (Architect)",
    title: "[RSU Night Watch / Ice-Age Change Gatekeeper]",
    quote: "The most stable system is not the one without bugs. It is the one nobody dares to touch.",
    description:
      "You are the veteran guardian of brittle stability. You trust your own old hand-built frameworks and regard rapid iteration as an invitation to weekend pain. New changes are threatening not because innovation is bad, but because you understand how fragile the existing equilibrium really is. Your countermeasure is strict architectural policy: if the standards are heavy enough, product requests slow down before they can endanger your peace. You are not anti-innovation in theory. You are just deeply, soberly pro-survival.",
    strengths:
      "In chaotic release environments, you can hold the final line and reduce the blast radius of reckless change.",
    risks:
      "You can also freeze a team into cultural permafrost, strangling momentum and experimentation before they have a chance to matter.",
    lifestyle:
      "Your life is orderly, property-aware, and emotionally indexed to vesting schedules. In relationships, dependability and practical partnership matter far more than novelty.",
    environment:
      "Works best in core systems for banks, finance, or long-lived legacy products where stability is a stronger currency than innovation.",
  },
  {
    code: "TALG",
    group: "TA (Builder)",
    title: "[Shorts-All-Year / Garage Prototype Maniac]",
    quote: "By the time AI finishes answering, I have already hand-written the core logic and drained the memory leak.",
    description:
      "You are the purest form of hands-on hacker energy. Bloated architecture and sluggish AI assistance both offend your nervous system. Your fingers move at the speed your brain wants to move, and you prefer direct logic, hard source dives, and real momentum over ceremony. Your guiding belief is simple: if the core loop closes, it can ship. In an industry full of abstraction and performance language, you still retain the original bodily memory of building things because they can be built.",
    strengths:
      "You are a one-person strike team with serious debugging instincts and unusually high confidence in difficult technical terrain.",
    risks:
      "You can underrate maintainability, team readability, and the long-term cost of heroic solo momentum.",
    lifestyle:
      "You probably enjoy physical exertion almost as much as technical challenge. Shorts in the cold, long hikes, and activity-heavy dates all make sense in your world.",
    environment:
      "Best used in hard-tech startups, graphics-heavy systems, infrastructure sprints, or any environment that rewards technical force over ceremony.",
  },
  {
    code: "TALW",
    group: "TA (Builder)",
    title: "[Costco Supply Run / Fast-and-Reliable Delivery Mason]",
    quote: "Do not pitch me on vision or empowerment. Give me the requirement, the timeline, and let me go home to my dog.",
    description:
      "You are the stable middle beam of the software labor market. You do not worship AI, and you do not cosplay architecture. You write straightforward code with your own hands, read logs like an experienced mechanic, and care more about reliable delivery than technical theater. To you, code is a trade: respectable, practical, and in service of a real life outside the repo. In a noisy industry, your realism can feel almost radical.",
    strengths:
      "You are dependable, efficient, and unusually low-drama. People relax when they know you own the work.",
    risks:
      "Because you optimize for steady execution rather than reinvention, your long-term growth can plateau if the role never stretches beyond routine delivery.",
    lifestyle:
      "You are practical to the point of tenderness. Costco runs, normal adult logistics, and a clear-eyed sense of what actually matters all show up in how you live and date.",
    environment:
      "Excellent fit for healthy mid-to-large product teams where the business needs reliable engineering more than heroic self-mythology.",
  },
  {
    code: "TAPG",
    group: "TA (Builder)",
    title: "[Reddit Surfer / Stack Overflow Patchwork Artist]",
    quote: "I recognize every line of this code separately. Why it works together is a conversation with fate.",
    description:
      "You are a passionate but slightly feral engineer who prefers internet archaeology to AI hand-holding. GitHub issues, forum threads, blog posts, and old answers are your natural habitat. You manually stitch together other people’s discoveries with determination and decent instincts, even if the underlying theory is occasionally missing in action. Your relationship with bugs is basically ritualistic optimism: one more reinstall, one more restart, one more lucky forum post.",
    strengths:
      "Your search and synthesis skills are excellent. Even in strange domains, you can usually assemble something functional from the collective memory of the internet.",
    risks:
      "When the problem requires real first-principles understanding, your patchwork knowledge can hit a hard wall very quickly.",
    lifestyle:
      "You live online comfortably and speak meme as a native language. Dates may be clumsy in planning but often recover through humor, persistence, and a refusal to die of embarrassment.",
    environment:
      "Good fit for games, front-end experiments, lightweight freelance work, or peripheral business systems where speed matters more than theoretical purity.",
  },
  {
    code: "TAPW",
    group: "TA (Builder)",
    title: "[Quiet Quitting Disciple / Defensive CRUD Specialist]",
    quote: "If this CRUD path is still breathing, there is no compelling reason for me to optimize it proactively.",
    description:
      "You are the final form of workplace detachment in software. New architectures do not tempt you. Fancy reasoning does not tempt you. Even AI feels like too much emotional administration. You reuse old code, rename fields, apply patches when necessary, and preserve your finite life force for things that are not owned by your employer. This is not simple laziness. It is a mature reading of how modern software factories often reward restraint over initiative.",
    strengths:
      "You are deeply resistant to corporate emotional manipulation. Inner peace, once achieved, is hard to take away from you.",
    risks:
      "Economic downturns are unkind to low-visibility maintainers, and your carefully cultivated emotional distance can make you an easy target in the wrong cycle.",
    lifestyle:
      "You project a distinct “I have seen through it all” fatigue. When people get excited about jumping jobs for larger packages, you tend to respond with some variation of: that sounds exhausting.",
    environment:
      "Most at home in neglected admin systems, maintenance-heavy internal tools, or the strange psychological waiting room before leaving a job.",
  },
];
