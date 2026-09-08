---
title: Build with Onchain Router
description: Choose an integration for text, images, and speech, with clear publication status and human-owned payment setup.
owner: Developer experience
lastReviewed: 2026-09-08
order: 10
---

# Build with Onchain Router

Onchain Router gives your agents one provider-neutral API for text, images, text to speech, and speech to text. Pay per successful request with USDC on Base and receive a durable receipt. You do not need payer registration or a provider API key.

## Start here

- **Make your first request:** follow the [quickstart](/docs/quickstart), from installation and wallet funding to a response and receipt.
- **Try a browser interface:** use the [Workbench guide](/docs/workbench) for wallet connection, preview, payment, and recovery.
- **Connect an existing agent:** choose [OpenClaw](/docs/openclaw), [Hermes Agent](/docs/hermes), or [MCP](/docs/mcp).
- **Build an integration:** start with the [direct API guide](/docs/direct-api) and [endpoint reference](/docs/endpoints).

A standard OpenAI client alone cannot pay the public API. Use an x402-capable transport or our local proxy. Buyer Runtime handles wallets, spending policies, payments, recovery, and receipts for our local tools; it is not a separate model endpoint.

## Integration reference

{{integration-table}}

{{client-availability}}

Read [how the runtime works](/docs/buyer-runtime) for the shared wallet and payment lifecycle.

## Before a paid request

Check that your buyer supports x402 v2 `exact` with USDC on Base. Use a dedicated low-balance wallet, review the exact request price before signing, and keep the result and receipt together. Follow the [first-request guide](/docs/quickstart) for the complete flow.

For our client tools, review [installation and availability](/docs/installation), then install the exact npm or host-native GitHub version listed there. OpenClaw and Hermes Agent have dedicated copyable install guides. For a browser walkthrough, see [Workbench](/docs/workbench).

## Choose a capability

- [Text](/docs/text): Chat Completions or Anthropic-style Messages.
- [Images](/docs/images): one generated image with a hosted URL or Base64 output.
- [Text to speech](/docs/speech): hosted MP3 audio with a curated voice.
- [Speech to text](/docs/transcription): an MP3 transcript, with provider-retention disclosure.

The current catalog determines which models and parameters work. The brand stays provider-neutral; supporting a request format does not imply support for that provider's models. Video is not currently available.

## Source of truth

These guides are maintained in [OnchainRouter/docs](https://github.com/OnchainRouter/docs).
The website, search and agent-readable Markdown use the same reviewed documentation snapshot.
See [model selection and routing](/docs/routing) for the distinction between public features
and upcoming Venice and automatic-routing work.

Use [live models](/v1/models), [live pricing](/v1/pricing), and [OpenAPI](/openapi.json). The HTTP 402 challenge determines the exact request price; the receipt confirms payment and normalized usage. See [pricing](/pricing) for the 0% service fee launch promotion and the separate fixed fee.

For agents, [llms.txt](/llms.txt) is the compact index and [llms-full.txt](/llms-full.txt) is the complete Markdown documentation. [products.json](/products.json) records publication and build availability, not live uptime.
