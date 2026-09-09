# Onchain Router documentation

The editable guides and navigation for [onchainrouter.dev/docs](https://onchainrouter.dev/docs).
One API for text, images and speech, paid per successful request with USDC on Base.

## Start here

- [First request](https://onchainrouter.dev/docs/quickstart)
- [Install the CLI and SDKs](https://onchainrouter.dev/docs/installation)
- [OpenClaw](https://onchainrouter.dev/docs/openclaw) · [Hermes](https://onchainrouter.dev/docs/hermes) · [MCP](https://onchainrouter.dev/docs/mcp)
- [API reference](https://onchainrouter.dev/docs/endpoints)
- [Live models](https://onchainrouter.dev/v1/models) · [Live prices](https://onchainrouter.dev/v1/pricing)
- [Agent index](https://onchainrouter.dev/llms.txt) · [Complete agent documentation](https://onchainrouter.dev/llms-full.txt)

## Change the documentation

1. Edit a Markdown file in `guides/`. Update its `lastReviewed` date.
2. For a new guide, add its website route to `navigation.json`.
3. Run `node scripts/check.mjs` with Node.js 24, then open a pull request.

No package installation, wallet, API key or paid call is needed to check the documentation.
See [CONTRIBUTING.md](CONTRIBUTING.md) for formatting and release rules.

## How changes reach the website

This repository is the source of truth for authored guides and navigation. The website consumes
an immutable commit as a generated snapshot. Merged changes are picked up by the website's
documentation-update process, checked against its API contracts, reviewed, and deployed through
the normal website release process. Merging here does **not** instantly change the live site.

The same snapshot produces HTML, search, per-page Markdown and the complete agent documentation.
An hourly update check prepares a review branch when this repository changes. A maintainer reviews
and releases that snapshot; changes are not automatically deployed. The website's
[build metadata](https://onchainrouter.dev/build-metadata.json) records the consumed documentation
commit after the integration release, so a merged edit can be distinguished from a deployed one.

API references, model availability, prices, release-status tables and agent contracts are generated
by the application from authoritative schemas, catalog and release evidence. They are intentionally
not separate editable copies here. The live HTTP 402 response supplies the exact price for a request.
Documentation edits cannot enable a model, change a payment or publish a client package.

## Related source

- [Client SDK, CLI, Buyer Runtime, MCP and proxy](https://github.com/OnchainRouter/onchain-router)
- [OpenClaw integration](https://github.com/OnchainRouter/onchain-router-openclaw)
- [Hermes integration](https://github.com/OnchainRouter/onchain-router-hermes)
- [Narrated-image example](https://github.com/OnchainRouter/narrated-image)

For a documentation correction, [open an issue](https://github.com/OnchainRouter/docs/issues).
Never include private keys, wallet passphrases, payment signatures, receipt tokens or provider keys
in an issue or pull request. Report sensitive issues privately to support@onchainrouter.dev.

## License

MIT. See [LICENSE](LICENSE). This license covers this repository's documentation, not private service code.
