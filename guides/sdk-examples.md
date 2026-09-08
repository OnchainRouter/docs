---
title: TypeScript, CLI, MCP & HTTP examples
description: Stable client examples over Buyer Runtime, plus a public unpaid HTTP challenge.
owner: Developer experience
lastReviewed: 2026-09-04
order: 65
---

# TypeScript, CLI, MCP & HTTP examples

{{client-availability}}

## Before you run a client example

Follow [installation](/docs/installation), then complete [human CLI setup and unlock](/docs/cli). Choose a dedicated funded wallet and a policy that allows the model. Paid SDK and CLI calls spend USDC; the HTTP example below only inspects the unpaid challenge.

The TypeScript SDK, CLI, and MCP server are public npm `0.2.0` stable releases. The Python SDK remains a source-only bounded subprocess bridge to the matching CLI; it has no independent wallet or signer.

For a task-first request and response guide, including images and both speech directions, use [Agent task recipes](/docs/recipes). For third-party wallet and discovery status, use [Wallet and agent compatibility](/docs/wallet-compatibility).

Set `REQUEST_ID` to a stable application job identifier before a paid example. Save it privately with the exact body. Do not create a different key because the original call timed out.

{{connection-examples}}

## Read the result and recover

TypeScript returns a discriminated result: `ok`, `outcome`, `idempotencyKey`, and either a result body, payment and verified receipt, or a safe retry directive.

`ProviderOutcomeUnknown` and `SettlementOutcomeUnknown` need human review. A retry directive permitting the same key requires the identical request. Do not wrap paid calls in a general-purpose retry loop.

The examples display result bodies in your private terminal or application. Those bodies may contain completions, transcripts, or hosted media capability URLs. Do not forward them to public logs or diagnostics, and never log signatures or receipt access tokens.

## Other capabilities

The same buyer exposes `messages`, `images`, `speech`, and `transcriptions`. Use each capability's documented request shape.

- [Text formats](/docs/text): OpenAI Chat Completions or Anthropic Messages.
- [Images](/docs/images): hosted URL or Base64 delivery; hosted URL expires after seven days.
- [Speech](/docs/speech): hosted MP3 JSON, not an OpenAI binary audio response.
- [Transcription](/docs/transcription): bounded MP3 and explicit retained-provider consent.

Do not implement EIP-712, Permit2, payment signing, or settlement in application code. Buyer Runtime uses official x402 primitives.
