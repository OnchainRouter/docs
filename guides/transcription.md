---
title: Transcribe speech
description: Send one bounded MP3 with an explicit understanding of provider retention.
owner: Developer experience
lastReviewed: 2026-08-31
order: 85
---

# Transcribe speech

Use `POST /v1/audio/transcriptions` with the `speech_to_text` model from [discovery](/v1/models). The current provider is ElevenLabs Scribe v2.

> ElevenLabs processes uploaded audio and transcript output in standard retained mode. It may retain both independently of Onchain Router's local staging cleanup. Only upload audio you have the right and permission to process.

## Choose a transport

The public HTTP API accepts MP3 via canonical Base64 JSON or multipart form data. The local proxy accepts JSON only. MCP and Agent Skill have smaller inline payload limits than the public upload route.

The current server limit is 25 MiB, with duration from 250 ms to 30 minutes. MCP accepts 1,048,576 Base64 characters (about 768 KiB MP3); Skill JSON is bounded to 1,000,000 bytes. Use human CLI file upload for larger files. Never hand an agent an arbitrary URL to fetch or a private filesystem path through a media tool.

Our local clients require `acknowledge_provider_retention: true` after human permission. This local flag is removed before the API call. It does not turn retention off.

## Billing and output

The response contains transcript text and validated `usage.input_audio_ms`. Published duration pricing uses a billing quantum; inspect [live pricing](/v1/pricing), not a guess from the filename. See [API reference](/docs/api/audio-transcriptions).

Local encrypted staging is deleted after definite outcomes where possible. Ambiguous outcomes and physical storage deletion have separate expiry behavior described in [privacy](/docs/privacy). Local deletion does not delete the provider's copy.
