---
title: What happens during a paid request
description: See when payment is checked, when the model is called, how the final charge is calculated, and when the answer is released.
owner: Payments
lastReviewed: 2026-08-21
order: 20
---

# What happens during a paid request

The request follows a strict order. An invalid payment can never start a model request, and an answer cannot reach the caller before its payment and receipt are safely stored.

The same lifecycle applies to all five paid routes: Chat Completions, Messages, Image Generations, Text to Speech, and Speech to Text. Their inputs, output validation, and billing units differ, but their payment ordering does not.

## Lifecycle

1. Send a non-streaming request without payment.
2. Receive Hypertext Transfer Protocol (HTTP) status 402 with an x402 `exact` payment requirement that is tied to the request.
3. Check the Base network, United States Dollar Coin (USDC) contract, payment recipient, expiry time, and exact amount.
4. Sign the payment authorization locally with an official x402 client.
5. Retry the identical body with the same idempotency key, which prevents duplicate work and charges.
6. Onchain Router verifies the payment and reserves exactly one execution record in PostgreSQL.
7. The verified prompt is screened, redacted where required, encrypted, and retained for seven days.
8. The private gateway calls the selected model deployment and validates reported usage plus any returned image or audio bytes.
9. Generated image or TTS media enters encrypted private storage before settlement. STT input is encrypted while staged and deleted after a definite outcome.
10. The service calculates text tokens, TTS characters, STT audio duration, or the selected model/size image tier with integer arithmetic and the catalog version attached to the request.
11. The result, settlement, ledger entries, and receipt become durable before text, media URLs, or transcripts are released.

Every HTTP response includes an `X-Trace-ID`. Keep it when reporting a problem. Onchain Router logs
the trace ID, normalized route, method, status and safe error code, duration, content type and size,
and catalog version. The normal `402 Payment Required` challenge is tracked separately from endpoint
errors. Completed model requests also record non-content routing signals such as model,
message and tool counts, request size, requested output limit, capability flags, provider duration,
token usage, charge, and provider cost. Request and response text is never copied into these logs.

## Safety boundaries

- PostgreSQL is the authoritative record for preventing payment replay and duplicate requests.
- Redis can improve speed, but it is never the only system protecting financial correctness.
- Known provider failures are not settled.
- Provider-unknown or settlement-unknown outcomes are frozen for inspection, not blindly retried.
- Settlement equals the signed exact amount.
- Prompts, completions, raw payment payloads, private keys, and provider credentials are excluded from telemetry and receipts.
