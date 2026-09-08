---
title: Direct x402 API
description: Use the public HTTPS API with an official Base USDC payment-aware buyer.
owner: Developer experience
lastReviewed: 2026-08-31
order: 50
---

# Direct x402 API

The public origin is `https://onchainrouter.dev`. No payer registration is needed. The client must support the live Base USDC `exact` EIP-3009 flow; an ordinary OpenAI API key or transport alone is not sufficient.

## Discover first

```bash
curl https://onchainrouter.dev/v1/models
curl https://onchainrouter.dev/v1/pricing
curl https://onchainrouter.dev/openapi.json
```

These GET requests do not sign or spend USDC. Use [voices](/v1/audio/voices) before speech generation. [Balance](/docs/api/balance) is a public address query, not wallet authentication.

## Request, authorize, recover

1. Select a live model and save one stable idempotency key.
2. Send the exact request without payment to receive HTTP 402.
3. Validate network, official USDC asset, expected recipient, scheme, expiry, and exact amount against your local policy.
4. Use official x402 verification/signing primitives to authorize locally. Retry the identical effective body and key.
5. Save the result and verified receipt. A transport error after signing may require recovery, not a new payment.

See [complete examples](/docs/sdk-examples) for an unpaid challenge and [first request](/docs/quickstart) for the payment checklist. The website never needs a private key.

## Payment and support surfaces

Five paid AI routes share the payment lifecycle; four free discovery routes help you select inputs. Supporting quote, receipt, x402 discovery, and health routes still serve integration and operations but are not extra paid products.

The internal quote preview does not run a model or pay. The buyer can obtain payment terms directly from the initial 402 response. A receipt lookup requires its appropriate access capability and is not a public browsing endpoint.

For exact fields and status codes, use [OpenAPI](/openapi.json) and [endpoint reference](/docs/endpoints).
