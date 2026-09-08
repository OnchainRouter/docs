# Contributing

Edit guides here, not the generated website snapshot. Keep examples copyable and distinguish
publicly available features from implementation previews. Never imply that a successful free check
proves a paid request, settlement, recovery or native-host integration.

## Guide format

Use a lowercase hyphenated filename under `guides/`, one page per file:

```markdown
---
title: A clear page title
description: One sentence describing what this guide helps the reader do.
owner: Developer experience
lastReviewed: 2026-09-08
order: 50
---

# A clear page title

Explain the task, show an example, and describe the result.
```

Use ordinary Markdown headings, lists, tables, fenced code and links. Raw HTML and executable
content are not supported. Website-relative links such as `/docs/quickstart` refer to
https://onchainrouter.dev, not to a directory in this repository.

The build expands these placeholders from released product metadata:
`{{example-model}}`, `{{client-availability}}`, `{{integration-table}}`,
`{{connection-examples}}` and `{{workbench-availability}}`.
Keep them intact: they prevent stale model IDs, package versions and availability claims.

## Navigation and generated references

`navigation.json` is an array of groups with a `label` and `items`, each item being
`["Link label", "/docs/page"]`. Only existing guide routes and the website's generated reference
routes are allowed. `guides/agents.md` is reserved for an application-generated contract and must
not be added here. API reference, model/pricing and agent-contract corrections belong in the
application contract change; use an issue here to report discrepancies.

## Before requesting review

```sh
node scripts/check.mjs
git diff --check
```

Check the instructions against the exact released package and live API contract. Do not run paid
examples without separate wallet-owner approval. Do not add secrets, personal wallet profiles,
private infrastructure identifiers, unreleased installation commands or automatic payment retries.
Historical changelog entries retain their dated context; new instructions must use current identities.

A website release uses a pinned documentation commit and separate validation. Reverting the
website snapshot is possible without rewriting this repository's history.
