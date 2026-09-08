---
title: Portable Agent Skill
description: Reusable agent guidance over the local Buyer CLI, without a second signer.
owner: Developer experience
lastReviewed: 2026-09-04
order: 45
---

# Portable Agent Skill

{{client-availability}}

The [Onchain Router Skill](/skill/onchain-router/SKILL.md) is public MIT source in [OnchainRouter/onchain-router](https://github.com/OnchainRouter/onchain-router). It contains instructions and thin CLI bridge scripts and requires the matching stable Buyer CLI. Downloading the instructions alone does not provide a payment runtime.

## How to use it

Use a host that supports portable Agent Skills and local commands. Read [agent entry points](/docs/agents) first. Have the human complete CLI setup and unlock in a direct terminal, then give the agent only the approved profile and installed executable location.

The skill discovers current models, reads wallet status, sends bounded requests, classifies outcomes, and retrieves receipts. It never implements payment cryptography or accepts a seed phrase, key, passphrase, or broker capability.

## Safe request flow

Read discovery; choose a model allowed by policy; persist one request key; call the CLI-backed helper; follow the retry directive. Prompts and media JSON travel on stdin, not the command line or environment.

Inline media JSON is limited to 1,000,000 bytes. Use the human CLI upload path for larger MP3s. Transcription requires explicit permission for provider-retained audio and transcript processing.

Keep the receipt ID and exact media expiry with the private result. Do not publish capability URLs. The skill does not install itself, unlock a wallet, or widen a budget.
