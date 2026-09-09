---
title: Text generation & Messages
description: Two familiar request formats for the same text capability.
owner: Developer experience
lastReviewed: 2026-09-09
order: 70
---

# Text generation & Messages

When a Messages response contains `tool_use`, return its `id` verbatim as the matching
`tool_result.tool_use_id`. IDs may be long opaque strings carrying provider continuation data;
do not shorten, decode, normalize or log them. Keep the assistant tool-use block in the next turn.

## Choose a format, not a different provider

`POST /v1/chat/completions` accepts OpenAI-compatible messages and returns choices. `POST /v1/messages` accepts Anthropic-compatible messages and returns content blocks. Both use the same enabled text models and USDC payment lifecycle.

Choose Chat Completions for an OpenAI-style client; choose Messages for an Anthropic-style client.
The format does not choose the provider. Gemini uses Vertex; models with a `venice/` prefix use
Venice. Read the live model catalog for availability and each model's supported capabilities.

The catalog includes 93 Venice text models alongside Gemini on Vertex. This is a sampled release,
not individual certification of every upstream option. Venice models support text; GPT-4o mini also
supports tools and JSON. Encrypted-only Venice endpoints are not supported. Context and output limits
are model-specific; higher-priced long-context tiers are not enabled. Images and speech are unchanged.

## Models and parameters

Read [models](/v1/models) for compatible IDs and limits. Supply an explicit model, messages, and an output-token request within that model's advertised limits. Text supports the documented vision, tools, and structured-output shapes. Streaming is not available.

Start with [Chat Completions](/docs/api/chat-completions) or [Messages](/docs/api/messages). Text uses a fixed exact request price based on conservative input estimation, 10% of requested output, and published fees. Provider-reported usage remains visible in the receipt.

## Supported generation controls

Chat Completions forwards `temperature` (0–2), `top_p` (0–1), `stop` (one string or up to four strings),
`tool_choice`, `parallel_tool_calls`, `seed`, `frequency_penalty`, and `presence_penalty`.
`max_completion_tokens` is an alias for `max_tokens`; supplying different values for both is rejected.
Only one completion (`n: 1`) is supported. Unsupported controls such as `reasoning_effort`, `thinking`,
`top_k`, and log-probability options are rejected rather than silently ignored. Model-specific provider
support still applies; accepting a transport field does not guarantee every model implements it.

Messages translates Anthropic `system`, image blocks, `tools[].input_schema`, assistant `tool_use`,
and user `tool_result` blocks into the private provider format. `temperature` (0–1), `top_p`,
`stop_sequences`, and `tool_choice` (`auto`, `any`, `tool`, or `none`) are supported, including
`disable_parallel_tool_use` where applicable. Tool results keep their `tool_use_id`; do not replace
them with ordinary text when continuing a conversation.

Messages responses preserve text and tool-use blocks, tool IDs, and parsed JSON inputs. A tool request
ends with `stop_reason: "tool_use"`; output truncation is `"max_tokens"`. Malformed tool arguments are
a failed provider response and are not settled as a successful answer. Provider usage still counts
towards our internal provider-cost controls.

## Truncation and recovery

A `finish_reason` of `length` can be a successful, charged but truncated answer. If you intentionally request a longer answer, that is a new logical request with a new key and authorization. Do not change the body under the old key.

Lost responses and ambiguous outcomes must follow the original request's recovery directive. Automatic model selection is experimental source-only; the public endpoint does not silently choose a provider for you.
