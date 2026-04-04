---
id: 0041
title: I18n language switcher implementation
stage: green
date: 2026-04-05
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: Implement proper language switcher in navbar like agentfactory.panaversity.org.
labels: ["i18n","localization","frontend","feature"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - docusaurus.config.ts
 - i18n/ur/docusaurus-theme-classic/navbar.json
 - i18n/ur/docusaurus-plugin-content-docs/current/
 - sidebars.ts
 - docs/*/overview.mdx
 - docs-urdu/*/overview.mdx
 - src/components/ChapterActions.tsx
tests:
 - Updated docusaurus.config.ts with i18n configuration
 - Added locale dropdown to navbar
 - Created i18n directory structure
 - Copied translated content to i18n location
 - Removed old ChapterActions translate button
 - Fixed duplicate translation keys in sidebar
 - npm run build successful
---

## Prompt

Implement proper language switcher in navbar like agentfactory.panaversity.org.

They use Docusaurus i18n feature with a language dropdown in navbar showing "English" / "Urdu".

Implement this:

1. Update docusaurus.config.ts to add i18n:
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'ur'],
  localeConfigs: {
    en: { label: 'English' },
    ur: { label: 'اردو' },
  },
},

2. Create i18n/ur/docusaurus-theme-classic/navbar.json for Urdu navbar translations

3. Add locale dropdown to navbar in docusaurus.config.ts:
{
  type: 'localeDropdown',
  position: 'right',
},

4. Copy docs-urdu/ content to i18n/ur/docusaurus-plugin-content-docs/current/ folder

5. Remove the old ChapterActions translate button - use i18n instead

6. npm run build to test

7. git add -A && git commit -m "feat: proper i18n language switcher like agentfactory" && git push origin master

## Response snapshot

Successfully implemented proper i18n language switcher with locale dropdown in navbar. Updated docusaurus.config.ts with i18n configuration for English and Urdu. Created i18n directory structure and copied translated content from docs-urdu/ to i18n/ur/docusaurus-plugin-content-docs/current/. Fixed duplicate translation keys in sidebar by adding unique keys to overview documents. Removed old ChapterActions translate button functionality and kept only personalization features. Successfully built the website for both locales.

## Outcome

- ✅ Impact: Full i18n support with language switcher in navbar
- 🧪 Tests: npm run build successful for both English and Urdu locales
- 📁 Files: docusaurus.config.ts, i18n/ur/, sidebars.ts, ChapterActions.tsx
- 🔁 Next prompts: Test language switching functionality in browser
- 🧠 Reflection: Resolved duplicate translation key issue by adding unique keys

## Evaluation notes (flywheel)

- Failure modes observed: Duplicate translation keys in sidebar
- Graders run and results (PASS/FAIL): Build test PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Add more localized content
