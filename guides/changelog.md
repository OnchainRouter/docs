---
title: Product changes and model retirement policy
description: Review dated changes to the public interface, model catalog, pricing, payments, and documentation.
owner: Release engineering
lastReviewed: 2026-09-09
order: 100
---

# Product changes and model retirement policy

## 2026-09-09 — Venice text catalog expansion

- Released 93 compatible Venice text models alongside seven Gemini text models on Vertex.
  Image and speech offerings are unchanged; the live catalog contains 103 models in total.
- Verified ten randomly selected models with live provider calls, plus unsigned challenges for
  all 93 models on both text endpoints. Sampling does not certify every model or advanced capability.
- Updated provider, privacy and routing documentation to match the deployed release.
  New local automatic-routing aliases remain outside the published 0.2.0 clients.

## 2026-09-08 — Public documentation source and routing status

- Moved authored guides and navigation to the public MIT documentation repository,
  [OnchainRouter/docs](https://github.com/OnchainRouter/docs).
- Prepared the website integration to build HTML, search and agent Markdown from one pinned
  snapshot. Website integration and deployment are separate from publishing the source.
- Documented that new local automatic-routing aliases and Venice candidates are not yet public.
  Existing explicit-model API calls and published package versions remain unchanged.

## 2026-09-06 — OpenClaw 0.2.1

- Updated the public OpenClaw adapter to show only compatible text models in its chat picker.
  Images and speech keep their dedicated tools. The native Git install is pinned to `v0.2.1`;
  other client packages and Hermes retain their existing versions.

## 2026-09-04 — Independent stable client distribution 0.2.0

- Published all six MIT client packages under the independent `@onchainrouter` npm scope at exact
  version `0.2.0`, with npm provenance and a clean anonymous-install verification.
- Published the matching source release at
  [OnchainRouter/onchain-router](https://github.com/OnchainRouter/onchain-router/releases/tag/v0.2.0).
- Released the OpenClaw and Hermes adapters as stable `v0.2.0` GitHub distributions after their
  native host-install qualifications passed on the exact merged commits.
- Moved all current install, support, source, and machine-readable product links to the
  `OnchainRouter` organization and `onchainrouter.dev` identity. Historical entries below remain a
  dated record and are not current installation instructions.
- Kept funded OpenClaw/Hermes host acceptance, ClawHub listing, and PyPI publication as separate
  unverified states. Stable package publication does not widen wallet authority or production API
  payment behavior.

## 2026-09-04 — Landing and documentation fidelity pass

- Rebuilt the landing surface around the measured Aoutive frame, section rhythm, typography,
  pricing, FAQ, CTA, and responsive composition while retaining Onchain Router product content.
- Rebuilt documentation around the measured Docly 280/820/340 desktop shell, mobile navigation,
  article actions, right outline, light code/table treatments, and compact footer.
- Self-hosted Space Grotesk and Inter for the landing surface, Satoshi and Inter for documentation,
  and Fragment Mono for code. No public font CDN or hotlinked reference asset is required.
- Added an original isometric request/payment/receipt illustration and verified paired reference
  and implementation captures at 1440 × 960 and 390 × 844.
- Reconciled the design with the independent `@onchainrouter` stable release and current GitHub
  links. Corrected CLI setup/unlock identity, example token limits, exact-price explanations,
  browser reload recovery, and the speech recipe's default voice.
- Kept the HTML, Markdown, search index, and agent documentation synchronized; reduced the icon
  stylesheet to the glyphs used by the website.

## 2026-09-04 — OpenClaw and Hermes GitHub alphas

- Published immutable MIT `v0.1.0` GitHub releases for the OpenClaw and Hermes adapters after their
  repository CI and release workflows passed.
- Added native host install paths: OpenClaw's pinned external-Git plugin command and Hermes'
  GitHub plugin command, with the exact Hermes release commit available for reproducible installs.
- Published built OpenClaw, Hermes wheel, and Hermes source-distribution assets with recorded
  SHA-256 digests.
- Kept ClawHub listing, PyPI publication, funded host acceptance, and general availability as
  separate unverified states. The adapters still delegate all wallet and payment authority to the
  local Buyer Runtime.
- Corrected the AgentCash no-spend instructions: discovery accepts the API origin, while
  compatibility checks require a complete route URL.

## 2026-09-03 — Branded x402 resource discovery

- Added the stable Onchain Router service name, public mark, and route-specific search tags to the
  x402 v2 ResourceInfo for all five paid endpoints.
- Kept the official Coinbase Bazaar input/output schemas on every route and extended the no-spend
  25-probe validator to fail on missing, incorrect, or cross-route discovery metadata.
- Documented x402scan ownership registration and Coinbase validation/indexing as separate external
  evidence; this release does not create a signature, payment, ranking, or directory claim.
- After protected deployment, registered the canonical origin on x402scan, confirmed its public
  nine-resource server page, verified AgentCash OpenAPI discovery, and observed all five Coinbase
  routes as active with `valid: true` and `simulation.outcome: "accepted"`. Funded per-route refresh
  and independent-buyer search ranking remain separate evidence.

## 2026-09-03 — AgenticFI npm alpha 0.1.2

- Published all six MIT AgenticFI client packages as npm alpha `0.1.2` from the public client
  repository with provenance.
- Verified a clean isolated installation of all six packages, `0.1.2` CLI/MCP/proxy binaries,
  library imports, 78 registry signatures, and 35 attestations.
- Updated the OpenClaw and Hermes source adapters to pin the corrected `0.1.2` proxy and CLI
  dependencies while retaining their independent `0.1.0` source-alpha versions.

## 2026-09-03 — Exact Base USDC payments

- Simplified all five paid routes to one official x402 v2 `exact` EIP-3009 authorization. Ordinary
  requests need Base USDC only—no Base ETH and no token approval.
- Fixed each text request's price from a conservative input estimate plus 10% of requested output,
  the published minimum and fixed fee, and the 0% service-fee promotion. Media keeps its cataloged
  request-specific price.
- Kept provider-reported usage in durable receipts and cost controls while preserving payment-first
  execution, idempotency, recovery, and result-settlement-receipt ordering.
- New Buyer Runtime profiles use exact automatically. Existing `upto` profiles remain readable and
  can migrate only through an authenticated `policy set --scheme exact` action.

## 2026-09-03 — Explicit buyer-funded Permit2 approval

- Removed the unsupported gas-sponsorship declaration from every paid challenge. Coinbase does not
  pay or reimburse the buyer's approval gas.
- Added an explicit canonical Permit2 approval step to the Buyer Runtime, CLI, SDK, and browser
  workbench. The CLI bounds approval to the reviewed daily policy; the workbench bounds it to the
  verified request maximum.
- Added a pre-signing allowance check so a missing approval fails before an x402 payment signature,
  provider call, settlement, or receipt.

## 2026-09-02 — Buyer CLI first-use payment correction

- Gave the short-lived Buyer Runtime signer a read-only Base client so the official x402 `upto`
  implementation can attach the server-advertised EIP-2612 permit for a first-use wallet with zero
  Permit2 allowance. No payment cryptography was reimplemented.
- Added one-command setup flags for models, agent identity, all four USDC budgets, output-token
  limits, confirmation policy, and wallet mode. Private keys, seed phrases, and passphrases remain
  no-echo terminal-only inputs.
- Separated piped request JSON from human authorization by reading confirmations from the
  controlling terminal, and surfaced only safe token-shaped rejection codes from the updated
  official payment header.
- Added first-wallet, payment-error, controlling-terminal, one-command setup, and secret-flag
  regression coverage. This source correction does not publish a package, deploy production, sign
  a production request, or spend USDC.
- A proposed facilitator-sponsored approval path was shipped in source but disproved by funded
  production verification and superseded by the 2026-09-03 correction above.

## 2026-09-01 — strict inspection and independent discovery evidence

- Limited inspection `402` responses to absent, required-root-field-incomplete, or syntactically
  malformed unsigned JSON. Complete unsupported models, options, media, and content types now fail
  with `400/415` before a payment challenge or provider work.
- Bound the no-spend validator to the exact production origin, network, USDC asset, recipient,
  canonical URL, positive nonzero facilitator address, route timeout, inspection header, and
  response-body marker, and reject malformed or noncanonical challenge encoding.
- Labeled client-family funnel data as caller-claimed and carried the same allowlisted dimension
  through every stage from discovery to durable receipt and response release.
- Separated AgentCash discovery, Poncho acceptance, awal acceptance, and Coinbase Bazaar indexing;
  corrected public npm alpha documentation and portable request-key examples.
- Restored the approved static Buyer Runtime hero. This corrective source release does not deploy
  production, use a wallet, spend USDC, or change any marketplace.

## 2026-09-01 — payment-first agent discovery

- Added official x402 inspection challenges for unsigned empty, incomplete, and malformed JSON on
  all five paid routes. Inspection responses are clearly marked and must not be signed; valid bodies
  still receive request-specific maxima.
- Kept signed invalid requests, oversized bodies, and malformed media fail-closed before payment
  verification, provider execution, settlement, or receipt creation.
- Added task recipes, an honest wallet/client compatibility matrix, and a 15-probe no-spend
  validator for Chat, Messages, Images, Text to Speech, and Speech to Text.
- Added privacy-safe aggregate counters from discovery through durable receipt and response release.
  Telemetry stores only allowlisted client families and route/stage labels, never caller identifiers
  or request/payment content.
- Reconciled package READMEs with the recorded public npm alpha while preserving this backend
  monorepo's non-publishable workspace manifests. No deployment, paid canary, or marketplace
  submission is performed by this change.

## 2026-09-01 — public client and platform update

- Added task-oriented guides for Buyer Runtime, CLI, TypeScript/Python, local MCP, local OpenAI
  proxy, Agent Skill, and browser Workbench, with explicit public-alpha availability.
- Reconciled the website with the initial public npm alpha and MIT client, OpenClaw, and Hermes repositories.
- Rebuilt the landing page around controlled agent spending, live capabilities, exact integration status, install commands, and verifiable source links.
- Reorganized text, image, speech, and transcription documentation around what you want to build.
- Replaced outdated payment-wrapper snippets and clarified fees, media expiry, recovery, local
  caching, and speech transport differences.
- Added a product publication manifest and artifact-backed Workbench links. This documentation
  update does not itself publish client packages or deploy a new payment service.

## 2026-08-21

- Published the exact five paid AI endpoints and four free discovery endpoints on the homepage,
  endpoint overview, `llms.txt`, complete agent corpus, sitemap, and portable Agent Skill.
- Deployed and indexed the guarded Flash v2.5/Scribe v2 MP3 speech scope after exact-build dark
  activation, one non-retried provider/storage qualification, and public no-spend parity checks.
  x402scan now resolves all nine public resources; the release automation did not spend USDC.
- Added canonical Base64 JSON input to the existing speech-to-text endpoint while retaining the
  standard multipart upload. Both forms decode and inspect the same bounded MP3 bytes before any
  payment challenge, provider call, or settlement.
- Published the JSON schema and a valid unpaid probe example so JSON-only agent directories can
  verify and list speech to text without adding another public endpoint.

## 2026-08-19

- Prepared the guarded speech catalog with `elevenlabs/flash-v2.5` for MP3 text to speech and
  `elevenlabs/scribe-v2` for MP3 speech to text. Multilingual TTS and every other audio format remain
  unavailable until their qualification gates pass.
- Corrected the generated TTS guide to use the actual `expires_at` response field and added a
  complete multipart STT request example that preserves the body across the unpaid and paid calls.
- Updated OpenAPI, pricing, x402 discovery, the portable Agent Skill, privacy language, and model
  documentation to describe measured speech usage and ElevenLabs' route-specific retention modes.
- Clarified that ambiguous encrypted STT staging becomes inaccessible at its one-hour logical
  expiry, while physical deletion can complete later through Azure storage lifecycle management.

## 2026-08-14

- Matched Gemini 3.1 Flash-Lite Image's fixed-1K Vertex contract by retaining the selected aspect
  ratio but omitting the redundant private provider `imageSize` field. Public requests still select
  and receive a validated 1K image at the same $0.035 promotional total.
- Corrected the private Vertex `generateContent` adapter so image size and aspect ratio use its
  official `generationConfig.imageConfig` fields. The public image endpoint and request format do
  not change.
- Kept the service dark until the corrected immutable build passes one non-retried Flash-Lite
  provider and encrypted-storage qualification. No USDC is used by that qualification.
- Kept text-to-speech in ElevenLabs Zero Retention Mode and changed speech-to-text to the provider's
  standard retained mode after the protected Scribe v2 qualification confirmed that STT ZRM was
  unavailable for the production account. Onchain Router's encrypted STT staging is still deleted
  after a definite result, while ElevenLabs may retain audio and transcripts under its own policy.
- Kept every speech model and voice dark until the revised adapter passes one new non-retried
  qualification and the remaining media, privacy, and release gates are complete.

## 2026-08-13

- Selected `gemini-3.1-flash-lite-image` as the guarded Base-mainnet image model at 1K/1:1 after
  the newer immutable Flash Image builds failed returned-aspect validation. The endpoint remains
  `POST /v1/images/generations`; Flash Image and Pro Image remain dark.
- Set the promotional successful-image total to $0.035: $0.034 catalog-fixed provider image price
  plus the existing $0.001 successful-call fee and 0% service fee.
- Kept the public service dark until this exact Flash-Lite build passes its one-shot provider and
  encrypted-storage qualification. That qualification uses provider credit and no USDC.

## 2026-08-12

- Added provider-neutral `POST /v1/images/generations` with the first Gemini image model, one
  1024×1024 image per request, OpenAI-compatible URL or Base64 delivery, and a fixed $0.068
  successful-call price during the 0% service fee launch promotion.
- Added repository support for model-specific `image_size` and `aspect_ratio`, with 1K/1:1
  defaults and exact integer price tiers. Additional Flash specifications plus Gemini 3.1
  Flash-Lite Image and Gemini 3 Pro Image are enabled only for non-production qualification; the
  Base mainnet catalog remains on its approved Flash 1K/1:1 route until expansion gates pass.
- Added private AES-256-GCM encrypted image storage and capability URLs. Every response reports
  `url_retention_days: 7` and the exact `url_expires_at`; URLs stop serving at expiration and Azure
  lifecycle management deletes the encrypted object after seven days.
- Preserved the financial ordering for images: payment authorization is verified and durable before
  generation, while settlement occurs only after the image and result are durable. Known failed
  generations are not charged.
- Updated the durable product description from an LLM-only router to an AI model router so the brand
  remains stable as image, video, and audio capabilities are added.
- Curated the public agent endpoint showcase to OpenAI-compatible Chat Completions, Anthropic-compatible Messages, categorized Models, detailed Pricing, and a Base USDC Balance lookup. Operational and private support routes remain functional but are no longer presented as separate products.
- Organized `/v1/models` around available capability categories and endpoint compatibility. Text and
  image generation are now available; video, speech-to-text, and text-to-speech categories will
  appear only when those capabilities are released.
- Added a readable unpaid-402 JSON explanation while retaining the official `PAYMENT-REQUIRED` header as the authoritative payment challenge.
- Corrected Bazaar discovery identity so each paid challenge names the canonical public Onchain Router endpoint instead of the private Azure API hostname. This does not change payment amounts or settlement behavior.
- Corrected Base mainnet payment persistence for the official x402 Permit2 `upto` payload emitted by the wallet client. The authorization nonce is now durable before any model request is sent.
- Improved the wallet test page's phase-specific errors for nested wallet rejections, payment-persistence failures, and uncertain settlement. Server traces now include only a safe failure category, never signatures, payment payloads, prompts, or completions.
- Activated a catalog-versioned 0% service fee launch promotion across production billing, pricing pages, endpoint descriptions, OpenAPI, model discovery, quotes, and receipts.
- Corrected discovery's minimum successful price to include both the $0.001 minimum usage charge and the separate $0.001 fixed successful-call fee.
- Simplified the local production buyer so it connects directly to the public endpoint without the retired dark-release canary credential.
- Kept each request's signed spending limit and truthful dynamic discovery range. The final charge still uses measured usage and never exceeds the amount authorized by the buyer.

## 2026-08-11

- Made the durable product identity provider-neutral: Onchain Router is now described as the x402-native LLM router, while Gemini remains clearly identified as the current MVP catalog rather than the brand itself.
- Published the progressive-branch mark through root favicon, manifest, Open Graph, Twitter, and OpenAPI logo metadata so discovery directories and social previews can resolve the intended logo.
- Declared explicit OpenAPI auth modes for public, receipt-protected, and x402-paid operations so x402scan can register supporting resources without treating free endpoints as broken paywalls.
- Simplified every customer-facing payment reference to Base mainnet and USDC, removing internal-network explanations, redundant payment-value wording, and the pre-launch unavailability notice.
- Reworked the website into a wider editorial layout that uses large screens more effectively.
- Reduced heading sizes across the home page, documentation, model catalog, pricing, status, and legal pages.
- Replaced the operating-system font fallbacks with a self-hosted Plus Jakarta Sans variable font and a sharper, more consistent weight system across the public site.
- Applied the same font to the wordmark, navigation, and Base Mainnet label, and refreshed search as a modern command palette.
- Added content-versioned stylesheet and script URLs so a browser cannot combine updated page markup with stale interface styles.
- Replaced the temporary letter tile with the selected progressive-branch logo, representing one interface expanding into multiple onchain capabilities, and added a matching favicon asset.
- Rewrote page titles, descriptions, navigation labels, and introductory copy in clearer language. Technical abbreviations are now explained on first use when the surrounding page is intended for a broad reader.
- Expanded `llms-full.txt` into a one-request package containing the product overview, every guide, generated endpoint references, the model catalog, service status, legal drafts, and portable Agent Skill references. Added HTML discovery links and an XML sitemap so agents can find these surfaces without guessing paths.
- Added local browser checks for wide desktop, laptop, tablet, and mobile layouts. This local review does not publish or activate the paid service.

## 2026-08-10

- Published the first custom single-origin website and documentation build.
- Added HTML, per-page Markdown, `llms.txt`, `llms-full.txt`, OpenAPI, sanitized catalog, and Agent Skill surfaces.
- Set the current paid-inference minimum to `1000` atomic USDC (`0.001000` USDC).
- Qualified the initial Gemini text candidates before selecting the production catalog.
- Added explicit handling for reasoning-token output ceilings, empty visible responses, actual settlement, and durable receipts.
- Published the Base mainnet public-alpha contract using USDC, an authoritative per-request cap, and a global conservative estimated-loss breaker. Hourly and daily payer caps were later removed by ADR-024.
- Removed payer registration and payer allowlisting; every facilitator-verified wallet may purchase under the same limits.
- Kept automated payment conformance fixtures outside the documented production environment.
- Approved seven GA Gemini text aliases for mainnet-alpha routing. The `gemini-3.1-pro-preview` route remains disabled on mainnet.
- Added fail-closed production configuration, a one-origin site/API deployment, public per-receipt
  capabilities, a least-privilege provider federation role, and a separately approved production
  infrastructure workflow. Synthetic reconciliation is now forbidden in production.
- Revalidated the public catalog against current Google model and pricing sources, including the
  65,536-token output limit for `gemini-3.1-flash-lite`.
- Expanded the privacy and service-terms release candidates and added automated checks for stale
  test/private-alpha language, operator-only configuration, enabled-model count, and legal sections.

## Deprecation policy

Model aliases can change only through an immutable catalog version. A retiring model shows its retirement date in `/v1/models` and `/models`. The service does not silently map an alias to a more expensive tier.

Clients should discover models rather than hard-code them indefinitely. Before each deployment and periodically during long-running sessions, refresh the catalog and reject an alias that is unavailable, past retirement, or outside the caller's model allowlist.

The Gemini 2.5 compatibility routes have a conservative operational removal date of 2026-10-16. `gemini-3.1-pro-preview` is a testing-only preview and cannot become a production default without a new approved catalog and provider gate.
