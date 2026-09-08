---
title: Production environment and funding
description: Understand the Base mainnet payment environment and how to fund a wallet with USDC.
owner: Release engineering
lastReviewed: 2026-08-21
order: 30
---

# Production environment and funding

## Base mainnet

- Network: `eip155:8453`
- Payment asset: United States Dollar Coin (USDC) on Base, contract `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- Scheme: x402 v2 `exact` with EIP-3009
- Capabilities: enabled Gemini text and image models plus the available ElevenLabs MP3 speech models in `GET /v1/models`
- Recipient: `0xA7660dea6AadCc87CbB5e79ccd262d391e61dE5d`

Any wallet may pay after successful x402 verification. The service does not require registration or a pre-approved wallet list. We still recommend a dedicated wallet with the smallest practical balance and local limits for each request and each session. Check the payment recipient shown by the live endpoint before every signature.

## Funding and wallet safety

Fund the buyer wallet with only the USDC required for the next few requests. Ordinary public payments need no Base ETH or token approval. Validate the network, USDC contract, recipient, expiry, scheme, EIP-712 domain, and exact amount in every live HTTP 402 response before signing; another buyer or payment scheme may differ.
