---
title: Wallet and agent compatibility
description: Understand which x402 buyers fit the current Base exact contract and which integrations still need external proof.
owner: Developer experience
lastReviewed: 2026-09-04
order: 67
---

# Wallet and agent compatibility

Onchain Router's five paid resources use official x402 v2, Base mainnet USDC, the EVM `exact` scheme, EIP-3009 authorization, request-specific fixed prices, stable idempotency keys, and durable receipts with normalized usage. Compatibility depends on that complete contract—not merely on a wallet being able to hold USDC.

## Current matrix

| Buyer or discovery surface                                                                                                                     | Current status                                                                                                                                                                                                                           | What is still required                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Onchain Router Buyer Runtime, CLI, TypeScript SDK, MCP, and proxy                                                                              | Public npm stable `0.2.0`. Implements the complete current contract with local budgets, official x402 signing, recovery, and receipt verification.                                                                                       | Founder-operated funded acceptance remains separate from install and no-spend tests.                                                                                                        |
| Any official x402 v2 EVM buyer with `exact` and EIP-3009                                                                                       | Protocol-compatible in principle. No payer allowlist is used.                                                                                                                                                                            | Validate network, asset, recipient, amount, expiry, identical retry behavior, and ambiguous-outcome recovery in that buyer.                                                                 |
| [AgentCash](https://agentcash.dev/discovery)                                                                                                   | Its public discovery client resolves the canonical OpenAPI document and all nine advertised routes. Paid wallet compatibility is not yet claimed.                                                                                        | Complete one explicitly approved paid call with receipt/recovery verification.                                                                                                              |
| [x402scan](https://www.x402scan.com/resources/register)                                                                                        | The legacy hostname has a listing. Verify that the server page being viewed lists `onchainrouter.dev`; a legacy-domain record does not establish the new origin’s registration or transaction attribution.                               | Confirm the canonical server page and all nine resources. Complete ownership or registration only if still required; assess transaction attribution and search separately.                  |
| Poncho                                                                                                                                         | The prior hostname had a merchant record. The new `onchainrouter.dev` origin is not claimed until Poncho independently refreshes or creates its record. No paid invocation, receipt, or recovery result has been independently verified. | Create or refresh the listing with provider-neutral text, image, text-to-speech, and transcription metadata, then complete one explicitly approved call with receipt and recovery evidence. |
| awal                                                                                                                                           | Candidate Coinbase wallet integration; it is not evidence of marketplace indexing.                                                                                                                                                       | Use the official `awal x402 pay` flow once explicitly authorized and verify the identical request, exact amount, settlement, and receipt.                                                   |
| [Coinbase Bazaar discovery](https://api.cdp.coinbase.com/platform/v2/x402/discovery/merchant?payTo=0xA7660dea6AadCc87CbB5e79ccd262d391e61dE5d) | Verified on 2026-09-04: the merchant record lists all five `https://onchainrouter.dev` paid routes with Onchain Router branding and capability tags. Indexing does not prove search rank or buyer compatibility.                         | Recheck each URL with Coinbase validation (`valid: true`, `simulation.outcome: "accepted"`), and verify search visibility and client acceptance separately.                                 |
| Circle or other compliant EVM exact buyers                                                                                                     | Protocol-compatible in principle when they implement x402 v2 EIP-3009 on Base USDC.                                                                                                                                                      | Run that buyer's own no-spend validation and one explicitly approved paid acceptance test before naming it as verified.                                                                     |
| pay.sh and Solana-only buyers                                                                                                                  | Not supported. Onchain Router currently accepts Base mainnet USDC only.                                                                                                                                                                  | A future Solana release requires an intentional payment, ledger, policy, settlement, and recovery design. No compatibility shim is claimed.                                                 |

This table records verified product boundaries, not endorsements or partnership claims. External client and marketplace behavior can change. Re-run the compatibility matrix against the exact deployed release before publishing a claim.

## What every buyer must validate

1. The first valid unsigned request returns HTTP 402 and an official `PAYMENT-REQUIRED` header.
2. The challenge uses x402 version 2, scheme `exact`, network `eip155:8453`, official Base USDC, the expected recipient, the official USDC EIP-712 domain, a future expiry, and an amount within local policy.
3. The exact request body and stable idempotency key are retained through signing and retry.
4. No provider work occurs before successful payment verification.
5. The final settled amount equals the signed exact amount.
6. A result is released only with durable settlement and receipt evidence.
7. Unknown provider or settlement outcomes enter recovery; they are never blindly retried.

## Inspection versus authorization

Agents and crawlers may send empty, structurally incomplete, or syntactically malformed unsigned JSON to discover that a route is paid. The response carries an inspection marker and a standards-valid x402 challenge, but its amount is not a quote for that invalid body. A complete request with an unsupported model, media type, category, or option returns `400` or `415` before any challenge. Submit a valid body and obtain the request-specific challenge before signing. A signed invalid request also fails before verification, settlement, or provider execution.

## Surface-specific no-spend checks

Use each surface's own check rather than treating the repository validator as universal proof:

```bash
npx -y @agentcash/discovery@latest discover https://onchainrouter.dev
npx -y @agentcash/discovery@latest check https://onchainrouter.dev/v1/chat/completions
npx -y @agentcash/discovery@latest check https://onchainrouter.dev/v1/messages
npx -y @agentcash/discovery@latest check https://onchainrouter.dev/v1/images/generations
npx -y @agentcash/discovery@latest check https://onchainrouter.dev/v1/audio/speech
npx -y @agentcash/discovery@latest check https://onchainrouter.dev/v1/audio/transcriptions

GITHUB_SHA="$(git rev-parse HEAD)" pnpm agent:discovery-check \
  --origin https://onchainrouter.dev \
  --profile production

curl -sS -X POST https://api.cdp.coinbase.com/platform/v2/x402/validate \
  -H 'content-type: application/json' \
  -d '{"resource":"https://onchainrouter.dev/v1/chat/completions","method":"POST"}'
```

AgentCash `discover` accepts the API origin, while `check` requires one complete endpoint URL. The
repository validator derives the checked-out commit and, when `GITHUB_SHA` is set, requires it
to match that exact `HEAD`. This binds the saved report to the source under review. The Coinbase
validation call is read-only and requires no API key. Continue only when its response
contains `valid: true` and `simulation.outcome: "accepted"`; review every preflight failure and
advisory before any funded call. Poncho and awal are buyer acceptance paths, not catalog validators.
Coinbase Bazaar is a separate seller-indexing path: after an authorized CDP-facilitated settlement,
decode and retain the sanitized `EXTENSION-RESPONSES` Bazaar result (`success`, `processing`, or
`rejected`), then check catalog, semantic search, and merchant discovery for every canonical paid
resource. Record validation, settlement-extension evidence, catalog, search, and merchant results
separately.

Each runtime challenge also supplies the x402 v2 ResourceInfo fields used by capable directories:
`serviceName: "Onchain Router"`, an absolute public logo URL, a nonempty route description, JSON
media type, and route-specific tags for chat, image generation, text-to-speech, or transcription.
These hints improve machine classification but do not substitute for genuine independent buyer
usage. The current x402scan registration and Coinbase validation results are external observations,
not permanent guarantees; recheck them against the exact deployed release.

## Honest external validation sequence

Run the no-spend validator first. After the corrected release is deployed, repeat it against `https://onchainrouter.dev`. Only then, with explicit wallet and USDC authorization, run one non-retried paid canary per third-party buyer. Save sanitized evidence: client/version, endpoint, catalog version, outcome class, receipt ID reference, settlement transaction, and recovery result. Never record a seed phrase, private key, payment signature, complete payment payload, prompt, completion, receipt capability, or hosted media URL.

Marketplace listing and search placement are external results. A successful payment does not by itself prove that x402scan or Coinbase Bazaar indexed the resource.
