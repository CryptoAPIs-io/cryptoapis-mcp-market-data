import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { AssetsToolSchema, type AssetsToolInput } from "./schema.js";
import { getAssetDetailsByAssetId } from "../../api/assets/get-asset-details-by-asset-id/index.js";
import { getAssetDetailsByAssetSymbol } from "../../api/assets/get-asset-details-by-asset-symbol/index.js";
import { credits as byIdCredits } from "./get-asset-details-by-asset-id/credits.js";
import { credits as bySymbolCredits } from "./get-asset-details-by-asset-symbol/credits.js";

const ASSETS_DESCRIPTION = `Market Data assets (asset details).

Actions:
• get-asset-details-by-asset-id: Get asset details by unique asset ID
• get-asset-details-by-asset-symbol: Get asset details by symbol (e.g. BTC, ETH)`;

export const assetsTool: McpToolDef<typeof AssetsToolSchema> = {
    name: "market_data_assets",
    description: ASSETS_DESCRIPTION,
    credits: {
        "get-asset-details-by-asset-id": byIdCredits,
        "get-asset-details-by-asset-symbol": bySymbolCredits,
    },
    inputSchema: AssetsToolSchema,
    handler:
        (client: CryptoApisHttpClient) =>
        async (input: AssetsToolInput) => {
            let result: RequestResult<unknown>;
            switch (input.action) {
                case "get-asset-details-by-asset-id":
                    result = await getAssetDetailsByAssetId(client, {
                        assetId: input.assetId!,
                        context: input.context,
                    });
                    break;
                case "get-asset-details-by-asset-symbol":
                    result = await getAssetDetailsByAssetSymbol(client, {
                        assetSymbol: input.assetSymbol!,
                        context: input.context,
                    });
                    break;
            }
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            ...(result.data as object),
                            creditsConsumed: result.creditsConsumed,
                            creditsAvailable: result.creditsAvailable,
                            responseTime: result.responseTime,
                            throughputUsage: result.throughputUsage,
                        }),
                    },
                ],
            };
        },
};
