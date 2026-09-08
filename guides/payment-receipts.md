---
title: How authorization, charges, and receipts work
description: Understand the exact price you approve, the amount paid, and the payment evidence saved in the receipt.
owner: Payments
lastReviewed: 2026-09-04
order: 70
---

# How authorization, charges, and receipts work

For text, `max_tokens` sets the largest response the model may return and affects the exact request price. The server prices a conservative input estimate plus 10% of that output limit. Image generation selects one disclosed fixed price from the requested model and `image_size`; `aspect_ratio` does not change the tier. Text to speech prices validated characters; transcription prices validated audio duration using the catalog's duration quantum. Each includes the applicable published fees.

## Pricing terms

- **Exact request price:** the amount in the x402 challenge and EIP-3009 authorization. A successful request pays this amount.
- **Text reserve:** the conservative input estimate plus 10% of requested `max_tokens`; it is priced before signing.
- **Provider cost:** catalog rates multiplied by actual normalized token usage for text; the fixed
  image-output accounting floor plus any reported prompt or residual output usage for images.
- **Service fee:** 0% during the launch promotion, recorded as zero integer basis points.
- **Fixed successful-call fee:** `1000` atomic USDC units, or `0.001000` USDC.
- **Minimum request charge:** `1000` atomic USDC units, or `0.001000` USDC, before the separate fixed successful-call fee. This is not the complete minimum successful charge.
- **Text payment:** the calculated exact request price, including the applicable floor and fixed fee.
- **Image payment:** the selected model/size catalog price plus the fixed successful-call fee. The current Base mainnet Gemini 3.1 Flash-Lite Image 1K/1:1 total is `0.035000` USDC.

Image token counts are optional upstream telemetry and do not affect the fixed image price. A zero
image token count in a receipt means the provider compatibility layer did not report that field; it
does not mean that image generation used no computation.

The server uses integer arithmetic and rounds once when converting to six-decimal USDC. Provider-reported usage is retained for receipts, cost controls, and route health; it does not produce a later refund.

The 0% service fee promotion means no percentage markup; it does not mean that the fixed fee, request-price minimum, wallet costs, or network fees disappear. Always use [live pricing](/v1/pricing) and the current 402 challenge rather than copying prices from a guide.

## Local client recovery

Buyer Runtime retains a durable request ledger. Preserve the original key and use its receipt lookup or an explicitly permitted same-request recovery. If the provider or settlement outcome is unknown, stop and seek human review. The Workbench keeps an encrypted recovery record for up to one hour and restores it on a same-tab reload; closing the tab discards its decryption key. Neither reloading nor closing a tab reverses a payment. See [recovery](/docs/errors-retries) and [Workbench](/docs/workbench).

## Receipt evidence

The successful response includes the `PAYMENT-RESPONSE`, `X-Request-ID`, `X-Receipt-ID`, `X-Receipt-Token`, and `X-Catalog-Version` headers, plus a receipt link. Retrieve the receipt with `GET /v1/receipts/{receipt_id}` and the `X-Receipt-Token` header. Treat the receipt token like a password: store it securely and never log or share it. The server stores only a one-way hash of the token.

The durable receipt contains the public model name, normalized usage, pricing policy, signed exact
amount, settled amount (equal to that signed price for a successful exact payment), payment
network, payment asset, and transaction reference. It never contains the prompt, model answer,
wallet key, provider credential, raw signature, complete payment payload, or receipt token.

The x402 transaction proves that payment occurred. The usage section is an Onchain Router record,
not a separate provider-signed proof. Text usage is normalized from mandatory provider telemetry;
image usage retains optional provider telemetry and uses zero when a field was not reported.
