---
title: Model selection and automatic routing
description: Understand explicit model selection, experimental routing and which features are available today.
owner: Developer experience
lastReviewed: 2026-09-08
order: 86
---

# Model selection and automatic routing

## Use an explicit model today

The public API requires an enabled, concrete model ID from [live models](/v1/models).
Both [Chat Completions](/docs/api/chat-completions) and [Messages](/docs/api/messages)
use the model you specify. They do not silently choose a different model.

Check the model's capability category and pricing before sending a request. Image and speech
models belong to their respective endpoints, not either chat format.

## Automatic routing is experimental

The published routing library is experimental. New local `auto`, `eco` and `premium`
planning work has been implemented but is not part of the published 0.2.0 CLI/SDK release.
Do not send these aliases to the public API or assume a current host adapter supports them.
Updated installation instructions will accompany a separately verified release.

The new planner filters models by capabilities, context/output limits, the owner's allowed models,
health and budget, then compares bounded request-specific quotes. It selects one concrete model
before the ordinary x402 payment flow. It does not widen wallet authority, automatically retry an
uncertain payment, or guarantee a quality or cost advantage for every task.

## Provider expansion

The live catalog currently contains Gemini text and image models plus ElevenLabs speech models.
Additional non-Google text models through Venice are under qualification and are not yet public.
An implementation or a provider's model list is not evidence of Onchain Router availability:
only use IDs returned by the live catalog.

## Caching is a different feature

[Local response caching](/docs/caching) reuses an eligible identical answer inside the same
authorized local session. A cache hit performs no new paid request. Provider prompt-prefix caching,
when supported and accounted for, instead reduces provider work on repeated input; it does not
reuse the completed answer or imply a lower already-signed exact payment.

Current OpenClaw and Hermes turns retain explicit recovery keys and bypass response caching.
