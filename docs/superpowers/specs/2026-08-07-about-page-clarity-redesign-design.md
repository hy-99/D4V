# D4V About Page Clarity Redesign

## Goal

Replace the current abstract, overlapping About page with a factual, photo-led page that quickly explains who D4V Bay Area is, why it exists, who it serves, what it plans to provide, and how it approaches online-safety education.

## Scope

- Change only the `/about` route and About-specific CSS.
- Preserve the homepage, shared header, shared footer, navigation, fonts, colors, and global motion behavior.
- Do not add a Team section until real officer information is available.
- Do not add statistics, testimonials, partner logos, completed-workshop claims, nonprofit-status claims, or other unsupported information.

## Approved Content

### Who We Are

**Making online safety easier to understand.**

D4V Bay Area is a student-led community initiative focused on helping older adults better understand online scams and digital fraud. We make online-safety information clear, practical, and approachable.

### Why D4V Exists

**Online fraud keeps changing. Clear guidance should keep up.**

Scams increasingly use familiar technology, urgent messages, impersonation, and new tools such as AI. D4V Bay Area exists to make these risks easier to recognize and the next steps easier to understand.

### Who We Serve

**Designed with older adults and community organizations in mind.**

- Older adults
- Senior-serving organizations
- Bay Area communities

### What We're Building

**Scam-Prevention Workshops**

Interactive education designed around common fraud tactics, warning signs, and safer responses.

**SeniorSafe**

A focused online-safety education program designed with older adults in mind.

**Practical Resources**

Straightforward guides for recognizing suspicious calls, messages, payment requests, and other scams.

### Our Approach

**Clear enough to understand. Practical enough to use.**

- **Plain Language:** No unnecessary technical jargon.
- **Realistic Examples:** Situations people may actually encounter.
- **Respect, Not Fear:** Guidance that informs without blaming or portraying older adults as helpless.
- **Trusted Information:** Educational material grounded in established consumer-protection resources.

## Visual Structure

1. Use a non-overlapping split hero on soft cream. Place the identity copy on the left and one dominant community photograph on the right. Keep the header in its light treatment.
2. Use a pale-blue purpose section with a concise heading and one contained conversation photograph. The photo uses a deliberate asymmetric corner shape but does not overlap text or section boundaries.
3. Use a warm-white audience band with three large typographic labels separated by rules. Do not use cards, icons, or paragraphs beneath the labels.
4. Use a soft-cream offering section with three editorial columns that echo the homepage's three work areas without copying the homepage tiles.
5. End with a deep-navy approach section. Present the four principles in a restrained two-by-two grid with concise copy and thin separators.

## Responsive Behavior

- Desktop uses balanced split grids and controlled line lengths.
- Tablet stacks the hero copy above its photo and keeps the offering section readable without text collisions.
- Mobile uses normal document flow only. It contains no negative margins, floating panels, or overlapping section boundaries.
- All body copy remains at least 17px with comfortable line height.
- Motion remains transform/opacity-only and is removed by the existing reduced-motion rules.

## Acceptance Criteria

- The page directly answers who D4V is, why it exists, who it serves, what it plans to provide, and how it works.
- There is one `h1`, logical heading hierarchy, meaningful image alt text, visible focus states, and no horizontal overflow.
- No About content overlaps at 1440x1000, 1024x768, 768x1024, or 390x844.
- The Team section remains absent.
- The homepage screenshots remain unchanged.
