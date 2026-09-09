---
title: Make your first paid AI request
description: Choose a text, image, or speech route, check its exact price, send one request on Base mainnet, and save the result and receipt.
owner: Developer experience
lastReviewed: 2026-09-09
order: 40
---

# Make your first paid AI request

This guide uses an official x402 buyer and the Base mainnet payment contract. It spends USDC. Any wallet may pay after successful x402 verification, and no payer registration is required. If you are choosing one of our client tools, check [installation and availability](/docs/installation) first; six npm packages and Hermes are stable `0.2.0` releases, and OpenClaw is `0.2.1`, while Python retains the source boundary documented there. The optional browser workflow and its build availability are described in [Workbench](/docs/workbench).

## Recommended client path

The package is public, but funded Buyer Runtime acceptance on a fresh external host remains
pending. Start with a dedicated low-balance API wallet and review every local policy limit.

Use the Buyer CLI unless an existing application specifically needs the TypeScript SDK, MCP, local proxy, OpenClaw, Hermes, or direct x402 HTTP. Wallet creation/import, funding, unlock, and policy changes remain human-only terminal actions.

```bash
npm install --global @onchainrouter/cli@0.2.0
onchain-router setup
onchain-router funding
```

Pause here and fund the displayed wallet address with a small amount of Base USDC. Then run the
following in your private terminal. If you chose a custom Agent ID during setup, pass that same
value to `unlock --agent YOUR_AGENT_ID` instead of using the default `cli` below.

```bash
onchain-router balance
onchain-router policy show
onchain-router unlock --agent cli
onchain-router models
onchain-router pricing
REQUEST_ID="$(node -p 'require("node:crypto").randomUUID()')"
onchain-router chat "Explain x402 in two sentences." \
  --model {{example-model}} \
  --max-output-tokens 256 \
  --idempotency-key "$REQUEST_ID"
onchain-router lock
```

Persist `REQUEST_ID` privately before the paid call. If the provider or settlement outcome is unknown, inspect `onchain-router receipt "$REQUEST_ID"`; do not generate a new key or automatically repeat the payment. See [task recipes](/docs/recipes) for Messages, images, speech, transcription, and direct no-spend inspection.

## 1. Prepare a dedicated wallet

For tighter wallet isolation, create a separate wallet account and fund it with only the small amount of Base mainnet USDC needed for the next few requests. The public exact flow uses EIP-3009: an ordinary request needs no Base ETH and no token approval. The service does not require a separate wallet, but we strongly recommend one.

Never use a primary or highly funded wallet.

## 2. Choose what to call

The five paid routes are Chat Completions, Messages, Image Generations, Text to Speech, and Speech to Text. The Models, Pricing, Voices, and Balance routes are free. Read the [endpoint overview](/docs/endpoints), then use `GET /v1/models` to select a compatible model and `GET /v1/pricing` to inspect its current billing unit.

Gemini uses Vertex for text and images. Models prefixed with `venice/` use Venice for text.
ElevenLabs Flash v2.5 serves MP3 text to speech, and Scribe v2 serves MP3 speech to text.
Check `/v1/models` for current availability, model IDs and capabilities; the API contract is provider-neutral.

## 3. Use an official x402 buyer

Call the official Hypertext Transfer Protocol Secure (HTTPS) address with an x402 buyer that supports the Base mainnet `exact` EIP-3009 payment scheme. Start with `GET /v1/models`, then send the request below to `POST /v1/chat/completions`. The first unpaid response has HTTP status 402. The buyer checks the payment terms, signs locally, and retries the identical request.

Coinbase Developer Platform and Google Vertex credentials belong only on the server. A buyer never supplies, receives, or stores them. Stop immediately if any website or agent asks you for a Coinbase secret, Google credential, wallet seed phrase, or wallet private key.

## 4. Send production-shaped JSON

Chat Completions is a simple first request. Choose any compatible text model from `GET /v1/models`; the same payment lifecycle also protects the image and speech routes.

```json
{
  "model": "{{example-model}}",
  "messages": [
    {
      "role": "user",
      "content": "Explain in two short sentences why the sky appears blue."
    }
  ],
  "max_tokens": 1024,
  "stream": false
}
```

Preview the payment in your buyer. Confirm that the request uses Base mainnet (`eip155:8453`), official Base USDC (`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`), recipient `0xA7660dea6AadCc87CbB5e79ccd262d391e61dE5d`, the `exact` payment scheme, and an amount no higher than your local spending limit. For text, choose a realistic `max_tokens` value because it affects the fixed price.

## 5. Authorize and read the result

Confirm the request-specific USDC authorization. The signature permits only the advertised exact transfer and never requires you to reveal your private key.

Read the visible answer from:

```text
choices[0].message.content
```

Then record the receipt ID, exact amount, normalized usage, and BaseScan transaction. Do not publish the prompt, completion, receipt access token, or payment payload.

## Common results

- A `finish_reason` value of `"stop"` means the answer completed normally.
- A `finish_reason` value of `"length"` means the model reached the output limit. An intentionally longer answer is a new request: choose a new key and authorize again. Never change the body under the original key.
- HTTP status 402 is the expected response before payment authorization.
- An `empty_provider_response` error is not charged. The model used the available output budget without returning visible text.
- If the provider or payment result is unknown, recover the existing request before starting a new one.
