---
title: Claude Code with MCP
description: Add Onchain Router as a local Claude Code tool server, verify free discovery first, and keep payment authority in your local wallet policy.
owner: Developer experience
lastReviewed: 2026-09-06
order: 36
---

# Claude Code with MCP

Use your existing Claude Code model to call Onchain Router tools for images, speech and text. This integration adds tools; it does not replace Claude Code's inference provider or give it a wallet key.

## Install the server

Complete [CLI wallet setup](/docs/cli) first, then:

```bash
npm install --global @onchainrouter/mcp@0.2.0
onchain-router-mcp --version
claude mcp add --transport stdio --scope user onchain-router -- onchain-router-mcp
claude mcp get onchain-router
```

For a non-default wallet profile, append `--profile /absolute/path/to/profile` after `onchain-router-mcp`. The profile path is configuration, not a secret. Never add a passphrase, wallet key or signer capability to MCP configuration. These commands follow the [official Claude Code local-server configuration](https://code.claude.com/docs/en/mcp).

## Verify without paying

Start Claude Code, inspect `/mcp`, and ask:

```text
Use only onchain_router_models to list the available image and speech models and local limits. Do not make a paid call or change any wallet setting.
```

Success means the real tool returns current discovery. A natural-language answer without a tool call is not a connectivity test.

## Allow a bounded task

The default per-call confirmation policy intentionally prevents unattended MCP payments. MCP is not a trusted wallet-confirmation channel. If you want agent-driven spending, make a separate deliberate decision in your own terminal: inspect the profile, restrict its models and session/hour/day limits, and then use `onchain-router policy set --confirm-each false`. This requires human authentication. Keep a dedicated low-balance wallet and unlock only for a short session. Do not ask Claude to perform these authority changes.

Then ask for one specific output:

```text
Generate one 1K square illustration of a yellow chicken in a garden using onchain_router_images and the enabled image model. Make exactly one paid tool call with a persistent idempotency key. Report the verified charge and expiry privately. If the outcome is uncertain, stop and inspect the same key; do not retry with another key or model.
```

Approve the host tool permission separately. The host's permission does not override the wallet's monetary limits. At the end run `onchain-router lock` in your terminal.

## Boundaries and troubleshooting

- This is local stdio MCP, not a remote ChatGPT connector.
- Nine focused tools are available; they cannot unlock, fund or expand a wallet policy.
- A locked wallet or per-call confirmation rejection is not a server outage.
- Tool registration is not proof that every host/model combination has funded acceptance.
- Native model-provider tool loops and streaming are separate from calling MCP media tools; do not infer their support from an image demo.
- Media and receipt URLs are bearer capabilities. Keep them out of public chats and bug reports.

See the [tool contracts and upload limits](/docs/mcp), [wallet policy](/docs/wallet-security), and [narrated-image example](/docs/narrated-image).
