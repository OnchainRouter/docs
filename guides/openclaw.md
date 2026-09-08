---
title: OpenClaw integration
description: Use Onchain Router as an OpenClaw model provider with policy-filtered models, bounded media tools, and local payment authority.
owner: Developer experience
lastReviewed: 2026-09-06
order: 47
---

# OpenClaw integration

The [Onchain Router OpenClaw extension](https://github.com/OnchainRouter/onchain-router-openclaw) `0.2.1` is a stable MIT release with an immutable [GitHub release](https://github.com/OnchainRouter/onchain-router-openclaw/releases/tag/v0.2.1). It is directly installable through OpenClaw's native Git plugin path. It is not yet a ClawHub listing, and funded host acceptance remains a separate operator check.

## What it adds

- a native `onchain-router` provider with live policy-filtered chat models;
- read-only tools for models, pricing, and voices;
- bounded paid tools for images, MP3 speech, and MP3 transcription;
- an authenticated `/onchain-router` command for redacted status, diagnostics, and recovery guidance;
- one deterministic Buyer Runtime idempotency key across host retries of the same transport turn;
- optional lifecycle management for the exact installed `@onchainrouter/proxy@0.2.0` dependency.

It does not create, import, inspect, unlock, fund, or back up a wallet. It does not implement x402, choose a paid fallback, download packages at runtime, or connect OpenClaw directly to the public payment service.

## Requirements and install

- Node.js `>=24.15.0 <25`;
- OpenClaw `2026.8.1`;
- macOS or Linux;
- a Buyer Runtime profile created and unlocked by a human;
- the exact proxy version declared by the extension.

```bash
openclaw plugins install git:github.com/OnchainRouter/onchain-router-openclaw@v0.2.1 --force
openclaw plugins enable onchain-router --accept-capabilities
openclaw plugins inspect onchain-router --runtime --json
```

`--force` acknowledges the external GitHub source; it does not bypass host policy or capability consent. The version tag prevents a later branch update from silently replacing the reviewed release. Review the declared local-file and process capabilities, then choose an `onchain-router/<model-id>` returned by the live picker.

## First-session acceptance checklist

1. Complete the public repository's setup and verify the loopback proxy is running before selecting the provider.
2. Ask the host to call the free model/pricing tools. Confirm it actually used a tool and returned the policy-filtered catalog.
3. For an initial bounded media task, request one square image with one saved idempotency key. The host permission and human-configured wallet spending policy must both allow it.
4. Inspect the verified receipt and image expiry privately, then lock the wallet. Do not count native installation as a paid-call success.

If you prefer a directly testable terminal example first, use [Create a narrated image](/docs/narrated-image). Streaming and native tool-loop acceptance are separate from the media tools; a successful basic response does not establish them.

## Local trust boundary

The extension connects only to the authenticated proxy on exact loopback `http://127.0.0.1:8402`. Its bearer must be a regular owner-only file at mode `0600`. Never expose the proxy through a tunnel, reverse proxy, LAN bind, or container host port.

Native chat retries preserve the same financial identity for one transport turn. Do not configure model fallbacks for this provider: an ambiguous paid result requires receipt inspection and deliberate same-key recovery, not a new request or model.

The release workflow builds and tests the adapter, runs OpenClaw archive and native-Git lifecycle qualification, and publishes the packed artifact. The complete setup, build, tool, configuration, and troubleshooting instructions are in the [public repository](https://github.com/OnchainRouter/onchain-router-openclaw). A funded OpenClaw request remains an explicit operator acceptance step because it spends from the operator's Buyer Runtime wallet.
