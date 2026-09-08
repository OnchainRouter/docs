---
title: Generate speech
description: Turn text into hosted MP3 audio using a live model and public voice alias.
owner: Developer experience
lastReviewed: 2026-08-31
order: 80
---

# Generate speech

Use `POST /v1/audio/speech`. Discover the `text_to_speech` model in [models](/v1/models) and select a voice from [voices](/v1/audio/voices). The current provider is ElevenLabs Flash v2.5.

## Input and output

Supply `model`, `input`, `voice`, and `response_format: "mp3"`, with optional supported speed. The current input limit is 2,000 characters; consult the live catalog if it changes.

The response is JSON containing a hosted audio asset, not an OpenAI binary audio stream. Read `data[0].url`, `data[0].expires_at`, and `usage.input_characters`. A generic OpenAI SDK binary-audio method is not interchangeable with this JSON route.

## Pricing and privacy

Speech billing uses validated character usage and the published fees. The hosted audio URL expires after 24 hours at the exact returned timestamp. Download it before expiry and keep the full capability URL private.

Text-to-speech uses ElevenLabs Zero Retention Mode. Do not confuse that provider setting with the separate 24-hour hosted output lifetime, or with speech-to-text's retained mode.

See [full speech reference](/docs/api/audio-speech) and [privacy](/docs/privacy).
