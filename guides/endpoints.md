---
title: Choose the right endpoint
description: Compare the five paid AI endpoints and four free discovery endpoints in the public Onchain Router contract.
owner: Product and API
lastReviewed: 2026-08-21
order: 15
---

# Choose the right endpoint

Onchain Router currently exposes five paid AI endpoints and four free discovery endpoints. Choose the endpoint for the result you need, then choose a compatible model from `GET /v1/models`.

## Paid AI requests

- `POST /v1/chat/completions` — OpenAI-compatible text, vision, tools, and structured output.
- `POST /v1/messages` — Anthropic-compatible text, vision, and tool requests.
- `POST /v1/images/generations` — Generate one image and receive a hosted URL or Base64 result.
- `POST /v1/audio/speech` — Turn text into an MP3 with a public voice.
- `POST /v1/audio/transcriptions` — Transcribe one MP3 supplied as canonical Base64 JSON or multipart form data.

Every paid endpoint uses the same Base mainnet x402 lifecycle. An unpaid request returns HTTP 402 without calling the model provider. Check the challenge, authorize it locally with an official x402 client, and retry the identical request with the same idempotency key.

## Free discovery

- `GET /v1/models` — Find available capability categories, model aliases, limits, and compatible endpoints.
- `GET /v1/pricing` — Read current model rates, billing units, and the 0% service fee promotion.
- `GET /v1/audio/voices` — Choose from the 20 public text-to-speech voice aliases.
- `GET /v1/balance?address=0x...` — Read a public wallet's Base USDC balance without connecting or signing.

These routes never ask for a payment signature. Agents should read the model catalog before constructing a paid request and should treat it as the availability source of truth.

## Start with the matching guide

- [Chat Completions](/docs/api/chat-completions) for OpenAI-compatible clients.
- [Messages](/docs/api/messages) for Anthropic-compatible clients.
- [Image Generations](/docs/api/image-generations) for image output.
- [Text to Speech](/docs/api/audio-speech) and [Voices](/docs/api/audio-voices) for hosted MP3 audio.
- [Speech to Text](/docs/api/audio-transcriptions) for MP3 transcription.
- [Models](/docs/api/models), [Pricing](/docs/api/pricing), and [Balance](/docs/api/balance) for machine-readable discovery.

Health, x402 protocol discovery, quote, media delivery, and private receipt routes remain operational support surfaces. They are intentionally omitted from the public product list so agents see only the endpoints needed to discover and use the available AI capabilities.
