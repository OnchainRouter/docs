---
title: Generate images
description: Select an image model and supported specifications, then retrieve hosted or Base64 output.
owner: Developer experience
lastReviewed: 2026-08-31
order: 75
---

# Generate images

Use `POST /v1/images/generations` with a model from the `image_generation` category. Read [the live catalog](/v1/models) before choosing a size or aspect ratio; only advertised options are accepted.

## Request and price

The JSON includes `model`, `prompt`, `n`, `image_size`, `aspect_ratio`, and `response_format`. One image is supported per request. 1K and 1:1 are the defaults, but do not infer that larger sizes or all Gemini image models are currently enabled.

The selected image tier determines its published price plus the fixed successful-call fee. The 0% service fee promotion does not remove that fixed fee. Confirm live payment terms before signing.

## Output and retention

Default hosted output is a capability URL. The response includes `url_retention_days: 7` and the exact `url_expires_at` timestamp. Download before expiry. The URL is not a permanent public image host, and anyone with the capability URL may access it while valid.

Base64 output is available where the route contract supports it. Do not log image bodies or complete hosted URLs. See [request schema and example](/docs/api/image-generations) for exact fields.

The current scope is image generation, not image editing or video. All adapters still use the same Buyer Runtime payment and recovery rules.
