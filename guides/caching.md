---
title: Local response caching
description: What is cached, when a cache hit costs nothing new, and how to preserve recovery.
owner: Developer experience
lastReviewed: 2026-09-05
order: 90
---

# Local response caching

Caching is implemented in the local OpenAI proxy. The public API, direct SDK, CLI, and MCP do not provide this response cache. This is not provider prompt-prefix caching or a cached-token price discount.

## Eligible text only

The proxy can reuse an identical successful text answer for up to ten minutes inside the same wallet, agent, session, policy, origin, and catalog. It keeps bounded memory: at most 200 entries, 1 MiB per item, and 16 MiB serialized data in total. Shutdown clears it.

Tools, media, streaming, refusals, incomplete output, unknown extensions, and confirmation-only policies are excluded. Repeated stochastic prompts can return the same answer; refresh when you need a new sample or current information.

## Cache hit meaning

`x-onchain-router-cache: HIT` and `x-onchain-router-charge-atomic: 0` mean no new paid execution. The source receipt identifies the original request. There is no new settlement or receipt; body usage belongs to the original inference.

## Control and recovery

- An explicit `Idempotency-Key` always bypasses the cache. Keep stable keys for requests that need durable recovery.
- `Cache-Control: no-cache` requests a fresh answer.
- `Cache-Control: no-store`, `cache: false`, or `no_cache: true` bypasses cache reads and writes.
- Proxy `--no-cache` disables it for the process.

Do not omit a recovery key just to get cache hits. Simultaneous fresh misses may each execute; this is not request coalescing. See [local proxy](/docs/proxy).

OpenClaw and Hermes intentionally send stable turn idempotency keys and `no-store`, so their paid
turns do not use this response cache. The proxy coalesces concurrent _discovery reads_ only and avoids
fetching pricing when only models are needed. It still checks the live catalog and current local
policy before reusing an answer; there is no stale-catalog TTL and no coalescing of signed payments.
