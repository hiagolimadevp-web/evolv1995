# EVOLV — Build Plan

EVOLV is a large product (onboarding, dashboard, nutrition, water, workout, shopping, pantry, progress, family, economy, AI coach, i18n). Shipping it well means building in phases rather than one massive first pass. This plan covers **Phase 1: Foundation + core daily experience**, then outlines follow-up phases.

## Phase 1 — Foundation (this build)

Goal: a beautiful, navigable premium shell with onboarding, home dashboard, today checklist, water tracker, and settings — using local state only. No backend yet.

### Design system
- Dark mode default, light mode toggle in settings
- OKLCH token palette in `src/styles.css`: deep near-black background, soft elevated cards, single warm accent (encouraging, non-clinical), success/positive semantic tokens (no red "failure" tones)
- Rounded-2xl cards, soft layered shadows, generous spacing
- Typography: distinctive display font + clean body (loaded via `<link>` in `__root.tsx`)
- Motion: subtle fade/scale/progress animations; animated water fill
- Mobile-first max-width container centered on desktop (feels like an app frame)

### Routes (TanStack Start, file-based)
```
/                          → redirects to /onboarding or /home based on localStorage
/onboarding/language
/onboarding/country
/onboarding/profile        (name, birthdate, gender, height, weight, goal weight, activity)
/onboarding/goal           (main goal + "why is this important to you?")
/_app                      → layout with bottom tab bar
  /home                    → dashboard
  /today                   → checklist
  /water                   → water tracker
  /nutrition               → placeholder shell (Phase 2)
  /workout                 → placeholder shell (Phase 2)
  /shopping                → placeholder shell (Phase 2)
  /progress                → placeholder shell (Phase 2)
  /settings                → language, country, units, theme, etc.
```

### Home dashboard cards
Daily progress ring, water, calories, protein, steps, workout, sleep, weight, streak. Progress circles + bars, all visual.

### Today
Checklist: water, breakfast, lunch, dinner, workout, walk, sleep, daily goals. Positive tick animations, streak celebration.

### Water tracker
Auto goal from weight (35 ml/kg default, adjustable). Quick +250/+500/+750/+1000 ml. Animated wave fill.

### Settings
Language (8 options), Country (7+ options), measurement system (metric/imperial), currency (derived from country but overridable), theme (dark/light), notifications toggle placeholder.

### i18n
Lightweight in-app dictionary keyed by language code for the 8 supported languages. Start with EN + PT-PT strings complete, others scaffolded (fall back to EN) so the switcher works end-to-end without shipping broken text.

### Storage
`localStorage` for profile, onboarding state, water log, checklist, streak. No backend in Phase 1.

### AI coach voice
Copy throughout uses supportive language ("Progress, not perfection"). No punishing red states; over-goal shows a gentle balancing suggestion.

## Phase 2 (next)
Nutrition (calories/macros, meal planner, food search), Workout library, Progress (weight/BMI/measurements/photos with charts), Smart Shopping List + Pantry with country-aware categories, Economy tracker with savings goals.

## Phase 3
Enable Lovable Cloud → move user data, family group sharing, real Motivation AI coach via Lovable AI Gateway, barcode scanner, supermarket integrations.

## Technical notes
- TanStack Start file-based routing, TanStack Query for later data phases
- Tailwind v4 tokens in `src/styles.css` (`@theme`, `oklch`, semantic tokens only — no ad-hoc color classes)
- shadcn components with custom variants
- Zod validation on onboarding forms
- All state in a small set of typed hooks reading/writing localStorage
- Real head metadata (title "EVOLV — Progress, not perfection") on `__root.tsx` and per route

Approve to proceed with Phase 1, or tell me what to add/cut/reorder.