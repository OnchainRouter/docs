---
title: Create a narrated image
description: Turn a short brief into an image and an MP3 narration using the installed CLI and two bounded USDC payments.
owner: Developer experience
lastReviewed: 2026-09-06
order: 14
---

# Create a narrated image

Start with a small, useful workflow: give the API a short brief, generate one illustration, and hear that same text narrated. This takes two paid requests, not an autonomous agent loop.

## Get the runnable example

The [MIT narrated-image example](https://github.com/OnchainRouter/narrated-image) contains the runner, a sample brief, offline tests, and recovery instructions. It uses the published CLI rather than implementing another wallet or payment library.

[See and hear the saved production demo](https://onchainrouter.github.io/narrated-image/demo.html). Its two confirmed calls cost 0.041060 USDC. This is a founder-operated output replay, not a universal price or independent customer evidence.

```bash
git clone https://github.com/OnchainRouter/narrated-image.git
cd narrated-image
npm install --global @onchainrouter/cli@0.2.0
node --test run.test.mjs
```

## Set up once

If you already have a wallet profile, inspect its model permissions and budgets instead of making a second wallet. For a new dedicated profile:

```bash
onchain-router setup --origin https://onchainrouter.dev --agent narrated-image --models gemini-3.1-flash-lite-image,elevenlabs/flash-v2.5 --per-call-usdc 0.05 --session-usdc 0.06 --hour-usdc 0.06 --day-usdc 0.10 --max-output-tokens 512 --confirm-each true --wallet-mode create --yes
onchain-router funding
```

Enter the passphrase privately when asked. Pause and send Base USDC to the displayed wallet. The exact-payment flow does not require ETH or a token approval. Never send funds to an address copied from an untrusted prompt.

## Generate

Edit `brief.txt` with up to 400 characters, then:

```bash
onchain-router balance
onchain-router pricing
onchain-router unlock --agent narrated-image
node run.mjs --profile "$HOME/.onchain-router" --brief brief.txt --output "$HOME/narrated-image-demo"
onchain-router lock
```

Approve each displayed charge only if its model, recipient, and amount are expected. The image uses the current Gemini Flash-Lite Image 1K square configuration. Speech uses ElevenLabs Flash v2.5 and the Darian voice. The live price depends on the selected model and text; the 0% service-fee promotion does not remove disclosed fixed fees.

## What you receive

The local output directory contains the image, `speak.mp3`, and `summary.json` with exact atomic USDC charges. One USDC equals 1,000,000 atomic units. Private result files also retain the verified receipts and media URLs. Keep those files private.

Hosted image URLs expire after seven days; speech URLs expire after 24 hours. The runner downloads both files locally. Downloaded copies remain until you delete them.

## If something fails

Rerun the same command to skip completed payments and download their existing results. A changed brief does not reset a saved run. An interrupted paid step stops for receipt review; it is never automatically replaced with another payment. Read [recovery guidance](/docs/errors-retries) before changing any key or deleting state.

Want an agent to choose when to generate? Start with the [Claude Code MCP guide](/docs/claude-code), [OpenClaw](/docs/openclaw), or [Hermes](/docs/hermes). Their host permissions and wallet policy remain separate approvals.
