---
id: CV-2
title: Refresh agentic engineering setup article
status: Done
assignee: []
created_date: '2026-09-02 08:17'
updated_date: '2026-09-02 08:31'
labels: []
dependencies: []
references:
  - src/content/articles/my-agentic-engineering-setup/index.mdx
  - 'https://github.com/simonamtoft/coding-harness'
modified_files:
  - src/content/articles/my-agentic-engineering-setup/index.mdx
type: docs
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Update the practical living article so it accurately reflects the current coding-harness boundaries, Backlog.md-based coordination, Pi package installation, and concise operational safeguards.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The article accurately distinguishes shared AGENTS.md and skills from harness-specific Pi and Claude configuration.
- [x] #2 The article reflects Backlog.md-based durable coordination and current Pi package installation.
- [x] #3 A concise operational section explains clarification, scoped execution, and context-handoff practices without implementation-level detail.
- [x] #4 Article metadata and sources support the revised claims.
- [x] #5 The article compiles, its source URLs are checked, and isolated end-to-end tests pass.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Revise the article metadata and source notes to identify the coding-harness repository as evidence for current configuration and operating practices.
2. Rewrite planning and cross-harness sections around Backlog.md coordination, shared-resource boundaries, and Pi package installation.
3. Add a concise operational-safeguards section covering evidence-first clarification, scoped execution, and focused-session handoff practices.
4. Check declared sources, build the prerendered site, and run isolated Playwright tests.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Updated the living article from the current public coding-harness configuration. Verification: source checker passed (4/4); npm run build passed; targeted isolated article Playwright suite passed (16/16); desktop and 390px mobile screenshots were inspected after reveal animations settled. The full isolated suite had 48/50 pass, with two unrelated Claude Code workshop tests expecting 14 slides while the route now renders 15.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Refreshed the article with Backlog-based coordination, concise execution guardrails, accurate shared-versus-native harness boundaries, and the Pi package manifest. Sources, build, targeted article E2E tests, and desktop/mobile rendering were verified.
<!-- SECTION:FINAL_SUMMARY:END -->
