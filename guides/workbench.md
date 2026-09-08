---
title: Browser Workbench
description: Try the request flow with a browser wallet and inspect output, charges, receipts, and expiry.
owner: Developer experience
lastReviewed: 2026-09-02
order: 55
---

# Browser Workbench

{{workbench-availability}}

## What it covers

The Workbench has five paid request choices: Chat Completions, Messages, image generation, text to speech, and speech to text. It also supports free models, pricing, voices, and wallet balance discovery.

Choose the capability and a compatible model, review or edit the request, preview the payment, then approve in your injected browser wallet only when you intend to spend USDC. Network and model options come from the service contract.

## Wallet boundary

The browser uses your injected wallet. It does not import a seed phrase or share the local CLI wallet. Browser wallet approval is not the same as unlocking Buyer Runtime.

Read-only development previews reject paid requests. Connecting a wallet does not make a read-only preview a payment environment.

## Results and recovery

Inspect the actual charge, receipt, transaction, and output. Download images before the seven-day URL expiry and speech audio before its 24-hour expiry. Keep the exact returned timestamp.

Before a signed request is sent, the browser saves one encrypted recovery copy for up to one hour. The ciphertext is stored in browser IndexedDB and its encryption key remains in same-tab session storage. Reloading the same tab restores the exact request, payment header, and request key without opening the wallet again. Verified completion or an authoritative failure without settlement clears it.

Closing the tab discards the browser key, and corrupt, missing, or expired recovery data keeps new payments blocked for operator review. It is not evidence that the request failed. The durable server receipt and PostgreSQL payment state remain authoritative.

HTTP 402 is normal before authorization. After signing, never assume a timeout or 503 means nothing happened. Follow [errors and recovery](/docs/errors-retries), and do not preview a new payment to recover an ambiguous one.

The recovery action always reuses the original signed payload, request body, and key. A settled recovery verifies the durable receipt and standard payment response before showing the result. A still-pending or uncertain reply keeps the attempt locked and shows only a safe HTTP state and trace reference. Only an authoritative `operation_failed_without_settlement` reply releases the attempt for a fresh preview. Use the canonical same-origin `/workbench/` page for real payments; the localhost proxy remains a development tool.

The hosted page sends its signed follow-up through a bounded same-origin Workbench relay so browser
custom-header transport cannot drop the authorization. The relay reconstructs the unchanged
standard x402 request only on the private API hop and does not persist or log the signature. Direct
API clients still use the official `PAYMENT-SIGNATURE` header.
