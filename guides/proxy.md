---
title: Local OpenAI proxy
description: Connect an OpenAI-compatible application to a payment-aware loopback adapter.
owner: Developer experience
lastReviewed: 2026-09-04
order: 40
---

# Local OpenAI proxy

{{client-availability}}

The proxy lets an existing application use a familiar OpenAI base URL while Buyer Runtime handles x402 locally. Merely pointing an ordinary SDK at the public HTTPS API does not add payments.

## Install

After human [CLI setup and unlock](/docs/cli), install and inspect the stable npm release:

```bash
npm install --global @onchainrouter/proxy@0.2.0
onchain-router-proxy --print-config
onchain-router-proxy
```

Use base URL `http://127.0.0.1:8402/v1` and the contents of the generated owner-only proxy-token file as the local API key. The process reports the file path, not its secret contents. Do not expose the port, token, or broker to another user or a browser.

The proxy accepts only loopback requests with its local bearer. It has no arbitrary upstream target, wallet admin route, public listener, or browser CORS permission.

## Compatibility

Chat Completions supports the tested OpenAI-style non-streaming shape. Messages, images, speech, transcription, models, and pricing are also available through the allowlist.

Hosted speech returns JSON containing an MP3 capability URL, not the OpenAI SDK binary audio response. Transcription through the proxy uses Base64 JSON, not multipart. Check the capability guide before reusing a generic SDK method.

## Retries and caching

Disable your application's automatic retries (`maxRetries: 0` for the official OpenAI TypeScript client). Persist one explicit `Idempotency-Key` for requests that need durable recovery. Reuse it only for the identical request.

An explicit key bypasses the local response cache. Eligible text requests without one may reuse an identical answer within the same local session for up to ten minutes. A hit costs no new USDC and returns source-receipt metadata, not a new settlement. Read [caching](/docs/caching).

Unknown provider or settlement outcomes return a non-retryable conflict and require human review. The proxy is not a way to bypass runtime limits.
