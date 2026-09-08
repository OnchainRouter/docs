---
title: Hermes Agent integration
description: Use Onchain Router as a Hermes model provider with media tools, diagnostics, and deliberate recovery over the local Buyer Runtime.
owner: Developer experience
lastReviewed: 2026-09-04
order: 48
---

# Hermes Agent integration

The [Onchain Router Hermes plugin](https://github.com/OnchainRouter/onchain-router-hermes) `0.2.0` is a stable MIT release with an immutable [GitHub release](https://github.com/OnchainRouter/onchain-router-hermes/releases/tag/v0.2.0). It is directly installable through Hermes' native GitHub plugin path. It is not a PyPI release, and PyPI is not required for the native installation; funded host acceptance remains a separate operator check.

## What it adds

- native provider `onchain-router` for chat with one explicit live model;
- free discovery tools and commands for models, prices, and voices;
- bounded paid tools for images, MP3 speech, and MP3 transcription;
- redacted status and diagnostics commands;
- explicit recovery guidance and stable idempotency across host retries;
- human-run setup, update, status, stop, and client-removal commands.

The plugin connects only to the authenticated Buyer Runtime proxy on `127.0.0.1`. Wallet and payment authority remain outside Hermes. The plugin does not create, import, inspect, unlock, fund, or back up a wallet; implement x402; download during a model call; choose a fallback; or blindly retry a paid request.

## Requirements and install

- Python `>=3.11,<3.14`;
- Hermes Agent `0.21.0`;
- Node.js 20.18 or newer and npm;
- macOS or Linux;
- a Buyer Runtime profile created and unlocked by a human.

```bash
hermes plugins install OnchainRouter/onchain-router-hermes --enable
hermes plugins doctor onchain-router --ci
hermes onchain-router setup
```

Hermes records the installed Git commit. For a reproducible install, append `--ref cec74e695fdbcad7212a9d97dc5132b9d3a7ff80` to the first command. The release page also provides the wheel and source distribution for inspection. Repository qualification checks provider/plugin discovery against Hermes `0.21.0`, build/install/update/uninstall behavior, and makes no paid request.

## First-session acceptance checklist

1. Run the plugin setup and doctor commands, then verify the authenticated local proxy is running.
2. Use the plugin's free model/pricing tools before any paid request. Choose an explicitly enabled model, not an automatic fallback.
3. Request one short MP3 narration with a saved idempotency key. Both host permission and the human-owned wallet policy must allow that call.
4. Confirm the receipt, exact USDC charge, and 24-hour hosted URL expiry. Download privately and lock the wallet afterward.

Use [Create a narrated image](/docs/narrated-image) for a terminal-based baseline. A passing plugin doctor is installation evidence, not a funded completion or proof of every native agent loop.

## Local trust boundary

The plugin uses exact pinned versions of the Onchain Router CLI and proxy and keeps the non-wallet proxy bearer in an owner-only local file. Never expose the proxy outside loopback or put its bearer in a prompt, log, screenshot, or source file.

The current stable release pins both `@onchainrouter/cli@0.2.0` and `@onchainrouter/proxy@0.2.0`.

Native chat retries reuse one deterministic idempotency key for the same logical call. Media tools require a caller-supplied stable key. A timeout, disconnect, ambiguous `409`, provider-unknown, settlement-unknown, or receipt-verification failure is not permission for a fresh request.

The complete setup lifecycle, media examples, retention disclosure, tool list, and troubleshooting are in the [public repository](https://github.com/OnchainRouter/onchain-router-hermes). A funded Hermes request remains an explicit operator acceptance step because it spends from the operator's Buyer Runtime wallet.
