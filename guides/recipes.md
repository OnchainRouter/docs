---
title: Agent task recipes
description: Copy complete request shapes for text, images, and speech, then recover the same paid operation safely.
owner: Developer experience
lastReviewed: 2026-09-04
order: 66
---

# Agent task recipes

For a complete runnable workflow rather than individual request bodies, start with [Create a narrated image](/docs/narrated-image): two bounded paid calls, local downloads, verified receipts, and saved request identities.

These recipes use the live catalog and one shared payment lifecycle. First read `GET /v1/models` and `GET /v1/pricing`. Then create and persist one idempotency key, send a valid unsigned request, validate the request-specific HTTP 402 challenge, sign locally through an official x402 `exact` buyer, and retry the identical request. A successful response is released only after its result, settlement, and receipt are durable.

An empty, incomplete, or malformed unsigned JSON request returns a discovery-only inspection challenge. It has `X-Onchain-Router-Challenge-Kind: inspection` and `price.type: inspection`. Do not sign it. Submit one of the valid bodies below to receive the request-specific exact price first.

## Answer a question with Chat Completions

Use `POST /v1/chat/completions` when an application already uses OpenAI-shaped messages and choices.

```json
{
  "model": "{{example-model}}",
  "messages": [{ "role": "user", "content": "Explain x402 in two short sentences." }],
  "max_tokens": 256,
  "stream": false
}
```

Read the answer from `choices[0].message.content`. Pricing uses a conservative input estimate plus 10% of requested output and the published fixed/minimum policy. Set a realistic `max_tokens`. If the provider or settlement outcome is unknown, recover with the same body and idempotency key. Never create a second paid job automatically.

## Use the Anthropic Messages shape

Use `POST /v1/messages` when the caller already expects Anthropic-shaped content blocks. This is a compatibility format, not a claim that the selected provider is Anthropic.

```json
{
  "model": "{{example-model}}",
  "system": "Answer concisely.",
  "messages": [{ "role": "user", "content": "Explain x402 in two short sentences." }],
  "max_tokens": 256,
  "stream": false
}
```

Read text blocks from `content`. The payment and recovery rules are identical to Chat Completions.

## Generate one image

Use `POST /v1/images/generations`. Select a model whose category is `image_generation`; supported sizes and aspect ratios are model-specific.

```json
{
  "model": "gemini-3.1-flash-lite-image",
  "prompt": "A geometric blue bridge on a white background",
  "n": 1,
  "image_size": "1K",
  "aspect_ratio": "1:1",
  "response_format": "url"
}
```

The response contains one hosted URL by default, its expiry, and the settled price. Hosted image URLs are bearer capabilities and expire after seven days. Download the image before expiry without putting the complete URL in logs. Image pricing varies by selected model and image size; refresh `/v1/pricing` before a request.

## Generate speech

Use `POST /v1/audio/speech`. Select a `text_to_speech` model and a public voice alias from `GET /v1/audio/voices`.

```json
{
  "model": "elevenlabs/flash-v2.5",
  "input": "Hello from Onchain Router.",
  "response_format": "mp3",
  "speed": 1
}
```

This example omits `voice` to use the model's current default; to choose another, supply an alias returned by `GET /v1/audio/voices`. The response is JSON with a hosted MP3 capability URL, not an OpenAI binary-audio response. The URL expires after 24 hours. Billing uses the normalized input character count and the published model rate.

## Transcribe speech

Use `POST /v1/audio/transcriptions` with canonical Base64 JSON or multipart form data. For an agent-safe JSON call:

```json
{
  "model": "elevenlabs/scribe-v2",
  "audio_base64": "BASE64_MP3_WITHOUT_A_DATA_URL_PREFIX",
  "file_format": "other",
  "response_format": "json"
}
```

The server validates the audio locally before payment verification and bills by measured duration. The CLI/SDK requires explicit human acknowledgement of provider retention before sending audio. Onchain Router deletes its staging copy after a definite outcome; the provider may retain audio and transcripts independently. Never upload sensitive or third-party audio without permission.

## Change models safely

Do not guess aliases or reuse a model copied from an old example. Read `GET /v1/models`, select a model from the required category, confirm its supported endpoint and options, and ensure the human-owned Buyer Runtime policy permits it. Changing the model changes the effective request: create a new idempotency key and obtain a new 402 challenge.

## Inspect without spending

This command sends no signature and cannot settle USDC:

```bash
curl -i https://onchainrouter.dev/v1/chat/completions \
  -H 'content-type: application/json' \
  --data '{}'
```

Expect HTTP 402, `PAYMENT-REQUIRED`, and the inspection marker. For the full five-route compatibility matrix, run the repository validator against a local or explicitly selected origin:

```bash
GITHUB_SHA="$(git rev-parse HEAD)" pnpm agent:discovery-check \
  --origin https://onchainrouter.dev \
  --profile production
```

The validator never creates or sends a payment signature. It derives the checked-out commit and,
when `GITHUB_SHA` is set, requires it to match that exact `HEAD`, so the report stays bound to
reviewed source. A green result does not prove a paid settlement, provider response, wallet
integration, or external marketplace indexing.

## Recover and verify

On success, retain the original idempotency key, response, `X-Receipt-ID`, actual atomic USDC charge, transaction, and verified receipt in private application state. On an ambiguous outcome, use the Buyer Runtime receipt/recovery method with the same key. Do not blindly retry, change the request, or expose the receipt capability.
