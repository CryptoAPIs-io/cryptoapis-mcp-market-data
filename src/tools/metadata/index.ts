import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { MetadataToolSchema, type MetadataToolInput } from "./schema.js";
import { handleListSupportedAssets } from "./list-supported-assets/index.js";
import { credits as listSupportedAssetsCredits } from "./list-supported-assets/credits.js";

const METADATA_DESCRIPTION = `Market Data metadata (list supported assets).

Actions:
• list-supported-assets: List supported crypto and fiat assets (optional pagination and type filter)`;

export const metadataTool: McpToolDef<typeof MetadataToolSchema> = {
    name: "market_data_metadata",
    description: METADATA_DESCRIPTION,
    credits: { "list-supported-assets": listSupportedAssetsCredits },
    inputSchema: MetadataToolSchema,
    handler:
        (client: CryptoApisHttpClient) =>
        async (input: MetadataToolInput) => {
            let result: RequestResult<unknown>;
            result = await handleListSupportedAssets(client, {
                limit: input.limit,
                offset: input.offset,
                type: input.type,
                context: input.context,
            });
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
