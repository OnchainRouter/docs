---
title: How request content is stored and deleted
description: See which request content is stored, why it is needed, when it is deleted, and which sensitive values never enter logs or receipts.
owner: Privacy and security
lastReviewed: 2026-09-04
order: 90
---

# How request content is stored and deleted

After payment verification and before calling the model provider, Onchain Router screens the verified request text and stores an encrypted review copy for seven days. This short retention period supports abuse review, compliance with model-provider policies, security investigations, and product analysis.

## Retained

- verified text from the prompt, limited by the maximum request size;
- an encrypted and redacted review excerpt together with the review decision;
- the deletion date and an audit record for each individual access.

Detected credentials and obvious personal identifiers are removed before encryption. If the request matches a configured policy block, the service stops before calling the model provider and does not charge the customer.

## Not placed in telemetry or receipts

- prompts or completions;
- raw wallet signatures;
- complete payment payloads;
- receipt access tokens;
- wallet private keys;
- provider credentials;
- cloud project identifiers.

Completed model answers use a separate encrypted recovery buffer. They are kept for 15 minutes after a successful response, or for up to one hour if the payment result is uncertain. This recovery buffer is separate from the seven-day prompt-review record.

Generated images use a separate encrypted private-media store. Every image response includes
`url_retention_days: 7` and an exact `url_expires_at` timestamp. The capability URL stops serving
the image at that timestamp. Azure lifecycle management permanently deletes the encrypted object
after it becomes seven days old; the physical deletion completes on Azure's next lifecycle scan.
Download the image before expiration if it must be kept longer.

Generated speech audio has a separate 24-hour capability URL lifetime, shown by the response's
`expires_at` timestamp. Download before expiry; anyone holding the complete URL may retrieve it
while it is valid. Provider Zero Retention Mode does not remove this hosted output storage.

Text-to-speech requests use ElevenLabs Zero Retention Mode. Speech-to-text uses ElevenLabs standard
retained mode: ElevenLabs receives the uploaded audio and transcript output and may retain both
under the applicable agreement, account settings, and privacy policy. Onchain Router encrypts STT
staging only after payment authorization and attempts to delete its local copy after every definite
provider success or failure. After an ambiguous provider outcome, local staging becomes logically
inaccessible at its one-hour expiry. Encrypted bytes may remain beyond the one-day storage-lifecycle
threshold until Azure completes its next lifecycle scan. Local deletion by Onchain Router does not
delete data held by ElevenLabs.

## Processing and deletion

Google Vertex AI processes requests to generate text or images. ElevenLabs processes text-to-speech
and speech-to-text requests under the route-specific retention behavior above. Coinbase Developer
Platform verifies and settles x402 payments, and Base records the public transaction. Each service
receives only the information needed for its role. Encrypted prompt-review records and generated
images follow their separate seven-day deletion controls. An authorized operator can review only
one prompt-review record at a time, and every access is audited.

## Public service boundaries

This page describes the implemented data flow and retention behavior for the public service.
The current public speech scope accepts MP3 through ElevenLabs Flash v2.5 text to speech and Scribe v2
speech to text. In particular, do not submit personal, confidential, regulated, biometric, or
third-party audio to speech-to-text. For every route, submit content only when you have the right to
process it through the named providers and public-chain payment flow.
