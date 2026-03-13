/**
 * Static resource describing the market data capabilities available in this package.
 *
 * Unlike blockchain-specific packages that expose supported chains/networks,
 * market-data exposes tools, actions, and the types of queries they support.
 */

export type MarketDataCapability = {
    tool: string;
    description: string;
    actions: {
        name: string;
        description: string;
        requiredParams: readonly string[];
        optionalParams?: readonly string[];
    }[];
};

export type SupportedCapabilitiesResource = {
    description: string;
    capabilities: readonly MarketDataCapability[];
};

/**
 * Format market data capabilities as human-readable text for embedding in prompt output.
 */
export function formatMarketDataCapabilities(data: SupportedCapabilitiesResource): string {
    const lines: string[] = ["Supported market data capabilities:"];
    for (const cap of data.capabilities) {
        lines.push(`\n${cap.tool}: ${cap.description}`);
        for (const action of cap.actions) {
            const params = action.requiredParams.length > 0
                ? ` (requires: ${action.requiredParams.join(", ")})`
                : "";
            lines.push(`  • ${action.name}: ${action.description}${params}`);
        }
    }
    return lines.join("\n");
}

export const supportedCapabilities: SupportedCapabilitiesResource = {
    description:
        "Market data tools for querying crypto asset details, exchange rates, and supported asset metadata. No blockchain or network selection is needed — these are cross-chain market endpoints.",
    capabilities: [
        {
            tool: "market_data_assets",
            description: "Look up detailed information about a crypto or fiat asset",
            actions: [
                {
                    name: "get-asset-details-by-asset-id",
                    description: "Get asset details using its unique CryptoAPIs asset ID",
                    requiredParams: ["assetId"],
                },
                {
                    name: "get-asset-details-by-asset-symbol",
                    description: "Get asset details using its ticker symbol (e.g. BTC, ETH, USDT)",
                    requiredParams: ["assetSymbol"],
                },
            ],
        },
        {
            tool: "market_data_exchange_rates",
            description: "Get the current exchange rate between two assets",
            actions: [
                {
                    name: "get-exchange-rate-by-asset-symbols",
                    description: "Get exchange rate between two assets by symbol (e.g. BTC to USD)",
                    requiredParams: ["fromAssetSymbol", "toAssetSymbol"],
                },
                {
                    name: "get-exchange-rate-by-asset-ids",
                    description: "Get exchange rate between two assets by their CryptoAPIs asset IDs",
                    requiredParams: ["fromAssetId", "toAssetId"],
                },
            ],
        },
        {
            tool: "market_data_metadata",
            description: "List supported crypto and fiat assets with optional filtering and pagination",
            actions: [
                {
                    name: "list-supported-assets",
                    description: "List all supported assets, optionally filtered by type (crypto or fiat)",
                    requiredParams: [],
                    optionalParams: ["type", "limit", "offset"],
                },
            ],
        },
    ],
};
