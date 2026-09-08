---
title: Protect the wallet that pays for requests
description: Use a dedicated wallet with a small balance, set firm spending limits, and check every payment term before signing.
owner: Security
lastReviewed: 2026-09-04
order: 50
---

# Protect the wallet that pays for requests

Your wallet signs the payment authorization on your device. Onchain Router receives the authorization but never receives your seed phrase or wallet private key.

## Local Buyer Runtime setup

{{client-availability}}

After [installing the CLI](/docs/installation), run setup in your own direct terminal. You may pass all non-secret model, agent, and integer-USDC policy choices in one command; wallet import and passphrases remain private no-echo prompts. Never put passphrases or keys in an argument, environment value, agent prompt, standard input, or HTTP request.

Use the CLI's funding instructions to verify the wallet address and Base network before sending USDC. Check balance, then unlock for a bounded session. The SDK, local MCP, proxy, and Skill reuse that profile; the agent cannot widen its policy. Lock when finished. A policy increase requires human authentication and locks the existing broker first.

The optional [browser Workbench](/docs/workbench) uses an injected wallet instead. Connecting a browser wallet does not unlock the local runtime. Its encrypted same-tab recovery record can survive a reload for up to one hour, but it is separate from the CLI ledger; closing the tab loses the browser recovery key.

## Safe mainnet wallet policy

- Create a new account used only for Onchain Router.
- Hold only the USDC needed for the next few requests; ordinary exact payments need no Base ETH
  gas.
- For an old `upto` profile, migrate with `onchain-router policy set --scheme exact`. Legacy
  Permit2 commands remain available only for explicit compatibility and limit any allowance to
  the reviewed daily policy.
- Set a hard limit for each request in atomic USDC units. `1000000` means `1.000000` USDC;
  choose your own appropriate limit. The live server may enforce a lower limit independently.
- Set a separate session cap for autonomous use.
- Allow only Base mainnet (`eip155:8453`), official Base USDC, and the expected recipient.
- No operator registration is required. The server applies a per-request maximum and a global estimated-loss breaker. These server controls protect the service; they do not replace your local wallet limits.
- Disconnect or revoke site access when testing is complete.

## Before every signature

Read the `scheme`, `network`, `asset`, `payTo`, `amount`, EIP-712 domain, and expiry fields from the live Hypertext Transfer Protocol (HTTP) 402 response. Reject the payment if the request body changed, the recipient is unexpected, the network is not Base mainnet, the asset is not official Base USDC, the quote expired, or the exact amount exceeds your local limit.

Do not infer payment terms from this page. Runtime terms and the current public catalog are authoritative.

## Switching wallet accounts

In the repository's optional local acceptance UI, use **Change buyer**, select the new account in the wallet, and verify the complete address. The UI clears the old quote when the exposed account changes. Other x402 buyers must provide an equivalent account-change and quote-invalidation safeguard. Always preview again after switching.
