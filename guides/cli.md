---
title: Buyer CLI
description: Human-owned wallet setup and a terminal interface for discovery, paid requests, recovery, and receipts.
owner: Developer experience
lastReviewed: 2026-09-04
order: 30
---

# Buyer CLI

{{client-availability}}

Install the stable npm release, then complete setup in a human-controlled terminal:

```bash
npm install --global @onchainrouter/cli@0.2.0
onchain-router setup \
  --origin https://onchainrouter.dev \
  --models {{example-model}} \
  --agent founder-cli \
  --per-call-usdc 0.02 \
  --session-usdc 0.06 \
  --hour-usdc 0.06 \
  --day-usdc 0.10 \
  --max-output-tokens 256 \
  --confirm-each true \
  --wallet-mode create \
  --yes
onchain-router funding
```

Pause here: send Base USDC to the displayed dedicated wallet address. After funding, run:

```bash
onchain-router balance
onchain-router unlock --agent founder-cli
onchain-router models
onchain-router pricing
```

The setup command supplies every non-secret policy choice at once. The CLI still requests the new
wallet passphrase twice through no-echo terminal input. Setup and unlock remain human-only actions.
Fund only the wallet address you verify, on Base, with USDC. The public exact flow requires no Base
ETH or token approval. A passphrase or import key must never
appear in arguments, environment values, agent prompts, shell history, or support bundles.

## Make a request

Save your prompt in a private `request.json` file as `{"prompt":"Say hello in one sentence."}`. Set `REQUEST_ID` to one persisted, unique ID before the first attempt. Read model availability first.

```bash
onchain-router chat \
  --model {{example-model}} --max-output-tokens 256 \
  --idempotency-key "${REQUEST_ID:?Set a persisted request ID}" \
  --json < request.json
```

Paid commands spend USDC after authorization. They are not connectivity tests. Inspect the result in your private terminal; never paste complete output, payment payloads, receipt capabilities, or hosted URLs into public logs.

When request JSON is piped on standard input and confirmation is enabled, the CLI opens the
controlling terminal for the yes/no decision. The JSON and human confirmation therefore cannot
consume the same stream. The normal exact flow signs through official x402 primitives and needs no
approval transaction.

Messages, images, and speech accept JSON on standard input with the `messages`, `image`, and `speak` commands. `transcribe --file` is the human-owned MP3 upload path; it rejects symlinks, special files, changed files, and non-owned files. Read the [capability guides](/docs/endpoints) and command help for required options.

## Recover and finish

```bash
onchain-router receipt "$REQUEST_ID"
onchain-router status
onchain-router lock
```

Keep the same body, payment authorization, and key during allowed recovery. A lost response is not proof that no payment occurred. Unknown provider or settlement outcomes require human review. `doctor --out` creates a redacted, owner-only diagnostic file; review it before sharing.
