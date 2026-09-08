---
title: Local MCP integration
description: Nine focused tools for agents, with wallet setup and authority kept outside the model.
owner: Developer experience
lastReviewed: 2026-09-04
order: 35
---

# Local MCP integration

For a host-specific walkthrough, use [Claude Code with MCP](/docs/claude-code). For a complete terminal workflow, use [Create a narrated image](/docs/narrated-image).

{{client-availability}}

Use MCP when your host supports a local stdio server. This is not a hosted ChatGPT connector or an HTTP MCP endpoint.

## What the agent can do

Nine tools cover discovery, Chat Completions, Messages, images, speech, transcriptions, voices, wallet status, and receipts. Wallet status is read-only; tools cannot import a wallet, unlock it, fund it, or increase a budget.

The human sets up and unlocks Buyer Runtime first. If policy requires a per-request human confirmation that the MCP channel cannot provide, a paid call fails closed.

## Install

After human [CLI setup and unlock](/docs/cli), install the stable npm release and print its configuration:

```bash
npm install --global @onchainrouter/mcp@0.2.0
onchain-router-mcp --print-config
```

Use the generated absolute command and arguments in your host's local stdio configuration. Do not add wallet secrets to that configuration.

## Requests and limits

Choose live models that the local policy allows. Each paid tool call needs a stable `idempotency_key`. Never change it just because a tool call timed out or was cancelled after financial handoff.

Transcriptions accept at most 1,048,576 Base64 characters, about 768 KiB decoded MP3, and require explicit human permission for retained provider processing. Arbitrary URLs and file paths are not accepted. Use the CLI for larger uploads. See [speech-to-text guidance](/docs/transcription).

Return the output and verified receipt privately, with any media expiry. Treat all complete media and receipt capability URLs as secrets. See [agent contracts](/docs/agents) for outcomes and tool boundaries.
