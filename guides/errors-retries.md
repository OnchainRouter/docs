---
title: Understand errors and retry safely
description: Learn which failures are safe to retry and how one idempotency key prevents duplicate model requests and charges.
owner: Reliability
lastReviewed: 2026-09-04
order: 80
---

# Understand errors and retry safely

An idempotency key identifies one logical request. When recovery is permitted and the result is still retained, reuse the original body, payment authorization, and key to retrieve the existing result without another model call or charge. Follow the client's returned retry directive; a key alone is not permission to sign a new payment.

## Safe to correct and retry

- Before signing, correct invalid JSON, the model, or the output ceiling and obtain a request-specific challenge.
- An unsigned HTTP 402 is expected. If `X-Onchain-Router-Challenge-Kind` or `price.type` is `inspection`, do not sign it: first submit a complete valid body. For a request-specific challenge, validate every payment term before signing and sending the identical body.
- An expired authorization may be replaced only if it was never sent or the server authoritatively confirms failure without settlement. Expiry alone does not prove that an earlier payment failed.
- A definite `empty_provider_response` is not settled. If you choose to try again, increase `max_tokens` within your policy, use a new request key, and obtain a fresh challenge for the changed body.
- Definite provider rejection before acceptance: correct the cause and retry with a new idempotency key.
- `wallet_request_cap_exceeded`: lower the requested output ceiling and obtain a new quote, or ask the operator to review the policy.

## Do not retry blindly

- `provider_outcome_unknown`
- `settlement_unknown`
- lost connection after wallet authorization
- timeout after the provider or facilitator may have accepted work

Keep the original request identity and inspect its receipt or stored state. Use the client's explicit same-request recovery action only when allowed; it reuses the saved body and payment authorization rather than signing again. `ProviderOutcomeUnknown` and `SettlementOutcomeUnknown` require human review. Do not create a new payment while the outcome is unresolved. An expired response buffer is not proof of nonpayment.

## Idempotency rules

The first-party clients send `x-idempotency-key`, and x402 payment identifiers may provide an additional protocol identity. Repeating an identical authorized request returns the original result or stored state while recovery remains available, without a second model call or charge. Reusing the key with a changed request returns HTTP status 409. See [retention](/docs/privacy) for the result-recovery window.

Redis loss does not weaken these guarantees because PostgreSQL owns the execution lease and authorization fingerprint.
