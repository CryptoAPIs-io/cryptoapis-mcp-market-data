# @cryptoapis-io/mcp-market-data

MCP server for [Crypto APIs](https://cryptoapis.io/) Market Data product. List supported assets, get exchange rates, and get asset details.

> **API Version:** Compatible with Crypto APIs version **2024-12-12**

## Features

- List supported crypto and fiat assets with filtering and pagination
- Get exchange rates between any two assets (by symbol or asset ID)
- Get asset details by asset ID or symbol

## Prerequisites

- Node.js 18+
- [Crypto APIs](https://cryptoapis.io/) account and API key ([sign up](https://app.cryptoapis.io/signup) | [get API key](https://app.cryptoapis.io/api-keys))

## Installation

```bash
npm install @cryptoapis-io/mcp-market-data
```

Or install all Crypto APIs MCP servers: `npm install @cryptoapis-io/mcp`

## Usage

```bash
# Run with API key
npx @cryptoapis-io/mcp-market-data --api-key YOUR_API_KEY

# Or use environment variable
export CRYPTOAPIS_API_KEY=YOUR_API_KEY
npx @cryptoapis-io/mcp-market-data

# HTTP transport
npx @cryptoapis-io/mcp-market-data --transport http --port 3000 --api-key YOUR_API_KEY
```

### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS, `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "cryptoapis-market-data": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-market-data"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "cryptoapis-market-data": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-market-data"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### MCP Inspector

```bash
npx @modelcontextprotocol/inspector npx @cryptoapis-io/mcp-market-data --api-key YOUR_API_KEY
```

### n8n

1. Start the server in HTTP mode:
   ```bash
   npx @cryptoapis-io/mcp-market-data --transport http --port 3000 --api-key YOUR_API_KEY
   ```
2. In your n8n workflow, add an **AI Agent** node
3. Under **Tools**, add an **MCP Client Tool** and set the URL to `http://localhost:3000/mcp`

> All servers default to port 3000. Use `--port` to assign different ports when running multiple servers.

## Available Tools

### `market_data_metadata`

| Action | Description |
|--------|-------------|
| `list-supported-assets` | List supported crypto and fiat assets. Optional: `limit`, `offset`, `type` (crypto/fiat) |

### `market_data_exchange_rates`

| Action | Description |
|--------|-------------|
| `get-exchange-rate-by-asset-symbols` | Get exchange rate between two assets by symbol (e.g. BTC to USD) |
| `get-exchange-rate-by-asset-ids` | Get exchange rate between two assets by asset ID |

### `market_data_assets`

| Action | Description |
|--------|-------------|
| `get-asset-details-by-asset-id` | Get asset details by unique asset ID |
| `get-asset-details-by-asset-symbol` | Get asset details by symbol (e.g. BTC, ETH) |

## CLI Arguments

| Argument | Description | Default |
|----------|-------------|---------|
| `--api-key` | Crypto APIs API key | `CRYPTOAPIS_API_KEY` env var |
| `--transport` | Transport type: `stdio` or `http` | `stdio` |
| `--host` | HTTP host | `0.0.0.0` |
| `--port` | HTTP port | `3000` |
| `--path` | HTTP path | `/mcp` |
| `--stateless` | Enable stateless HTTP mode | `false` |

### HTTP API Key Modes

When using HTTP transport, the server supports two API key modes:

- **With `--api-key`:** The key is used for all requests. `x-api-key` request headers are ignored.
- **Without `--api-key`:** Each request must include an `x-api-key` header with a valid Crypto APIs key. This enables hosting a public server where each user provides their own key.

```bash
# Per-request key mode (multi-tenant)
npx @cryptoapis-io/mcp-market-data --transport http --port 3000
# Clients send x-api-key header with each request
```

> Stdio transport always requires an API key at startup.

## Important: API Key Required

> **Warning:** Making requests without a valid API key — or with an incorrect one — may result in your IP being banned from the Crypto APIs ecosystem. Always ensure a valid API key is configured before starting any server.

## Hosted MCP Server

Crypto APIs provides an official hosted MCP server with all tools available via HTTP Streamable transport at [https://ai.cryptoapis.io/mcp](https://ai.cryptoapis.io/mcp). Pass your API key via the `x-api-key` header — no installation required.

## License

MIT
