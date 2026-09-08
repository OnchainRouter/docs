---
title: Installation & availability
description: Install the stable npm and host-native GitHub releases, verify their sources, and understand the remaining integration boundaries.
owner: Developer experience
lastReviewed: 2026-09-06
order: 15
---

# Installation & availability

{{client-availability}}

## Fastest safe start

Requirements: Node.js 20.18 or newer, macOS or Linux, and a human-controlled terminal.

```bash
npm install --global @onchainrouter/cli@0.2.0
onchain-router --version
onchain-router setup
onchain-router policy show
onchain-router unlock
onchain-router models
```

Version `0.2.0` is the current stable client release. Pin the exact version so an upstream tag change cannot silently alter your install. Before installation, verify the `@onchainrouter` scope and the [OnchainRouter/onchain-router](https://github.com/OnchainRouter/onchain-router) source repository.

Setup, wallet import, funding, unlock, and policy widening are human-authority actions. Run them yourself in a direct terminal. Never put a private key, seed phrase, passphrase, payment payload, proxy bearer, or receipt capability in a prompt, command argument, environment variable, log, screenshot, or issue.

## Choose a public package

| Product        | Install                                           | Status                                             |
| -------------- | ------------------------------------------------- | -------------------------------------------------- |
| TypeScript SDK | `npm install @onchainrouter/client@0.2.0`         | Public npm stable `0.2.0`                          |
| Buyer CLI      | `npm install --global @onchainrouter/cli@0.2.0`   | Public npm stable `0.2.0`                          |
| MCP server     | `npm install --global @onchainrouter/mcp@0.2.0`   | Public npm stable `0.2.0`                          |
| Local proxy    | `npm install --global @onchainrouter/proxy@0.2.0` | Public npm stable `0.2.0`                          |
| Buyer Runtime  | `npm install @onchainrouter/buyer-core@0.2.0`     | Public npm stable `0.2.0`; trusted-adapter authors |
| Smart routing  | `npm install @onchainrouter/routing@0.2.0`        | Public npm stable `0.2.0`; routing is experimental |

The Python SDK remains a source package that delegates paid execution to the matching CLI. It is not on PyPI.

{{integration-table}}

## Agent-host integrations

- [OpenClaw](/docs/openclaw) `0.2.1` is a stable MIT release installed from its immutable [GitHub release](https://github.com/OnchainRouter/onchain-router-openclaw/releases/tag/v0.2.1) with OpenClaw's native Git installer: `openclaw plugins install git:github.com/OnchainRouter/onchain-router-openclaw@v0.2.1 --force`. It is not yet listed on ClawHub.
- [Hermes Agent](/docs/hermes) `0.2.0` is a stable MIT release installed from [OnchainRouter/onchain-router-hermes](https://github.com/OnchainRouter/onchain-router-hermes/releases/tag/v0.2.0) with Hermes' native Git installer: `hermes plugins install OnchainRouter/onchain-router-hermes --enable`. It is not a PyPI release, and PyPI is not required for this host-native path.
- The portable [Agent Skill](/docs/agent-skill) is public in the client repository and requires the matching Buyer CLI.

Verify the exact organization, repository, version, and release commit before installation. Package stability does not prove a funded request in either host; complete the human-owned Buyer Runtime setup and acceptance flow separately.

## Browser Workbench

{{workbench-availability}}

## Update and verify

Pin exact version `0.2.0`. Review release notes before updating, rerun `onchain-router doctor`, and confirm that the local wallet profile, policy, and receipts remain intact. The [product manifest](/products.json) records current publication facts; the live [models](/v1/models), [pricing](/v1/pricing), and HTTP 402 challenge remain authoritative for service behavior.
