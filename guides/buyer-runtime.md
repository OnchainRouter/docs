---
title: Buyer Runtime
description: The shared local foundation for wallet custody, budgets, x402 payments, recovery, and receipts.
owner: Developer experience
lastReviewed: 2026-09-04
order: 20
---

# Buyer Runtime

{{client-availability}}

Buyer Runtime powers the CLI, SDKs, MCP, proxy, and CLI-backed Skill. You configure one dedicated wallet and policy; the adapters reuse the same payment implementation.

## Wallet and authority

Wallet material is encrypted locally. A short-lived local broker signs within the human-approved policy. Setup, import, passphrases, unlock, and budget increases belong in a direct human terminal. Agents do not receive the key or the broker capability.

Use a small dedicated Base USDC wallet, not a treasury, deployer, governance, or personal wallet. This runtime is designed for a trusted single-user macOS or Linux account, not shared or remote custody.

## Budgets

The policy limits recipients, models, per-request authorization, session, hourly, and daily spending. Money is tracked in integer atomic USDC units: 1 USDC is 1,000,000 atomic units. Pending and ambiguous requests retain the necessary reservation; do not work around a limit with another profile.

For a successful exact request, the signed amount is the final charge; actual output usage does not produce a later adjustment or refund. The runtime refuses a challenge outside the configured policy. Only the human can widen authority.

## Recovery and receipts

A local SQLite ledger records the stable request key and payment state. Preserve that key before the first request. `Completed` and `RecoveredSuccess` include verified receipts. A known failure, an unresolved provider result, and an unresolved settlement are different outcomes.

Follow the returned retry directive. `ProviderOutcomeUnknown` and `SettlementOutcomeUnknown` require human review, not a new payment. See [errors and recovery](/docs/errors-retries).

## What the runtime is not

It is not a hosted wallet, a generic signing tool, or a replacement for the provider API. The browser Workbench uses an injected wallet and a separate encrypted same-tab recovery record, not the CLI ledger. See [Workbench recovery](/docs/workbench) for its one-hour lifetime and what happens when the tab closes. Runtime administration APIs include backup/restore primitives, but do not assume a complete CLI restore/rotation workflow exists.

Continue with [wallet setup](/docs/wallet-security), [CLI](/docs/cli), or [SDK examples](/docs/sdk-examples).
