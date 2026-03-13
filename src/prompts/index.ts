import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { supportedCapabilities, formatMarketDataCapabilities } from "../resources/supported-capabilities.js";

export function registerPrompts(server: McpServer): void {
    server.registerPrompt(
        "check-asset-price",
        {
            description: "Look up the current price and exchange rate for a crypto asset",
            argsSchema: {
                assetSymbol: z.string().describe("Crypto asset symbol, e.g. BTC, ETH"),
                targetCurrency: z.string().optional().describe("Target fiat currency, e.g. USD, EUR. Defaults to USD"),
            },
        },
        (args): GetPromptResult => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Use market_data_exchange_rates to look up the current exchange rate for ${args.assetSymbol} in ${args.targetCurrency || "USD"} (default USD). Also use market_data_assets to get additional details about the asset including market cap, volume, and supply information. Present the results in a clear summary.\n\n${formatMarketDataCapabilities(supportedCapabilities)}`,
                    },
                },
            ],
        }),
    );
}
