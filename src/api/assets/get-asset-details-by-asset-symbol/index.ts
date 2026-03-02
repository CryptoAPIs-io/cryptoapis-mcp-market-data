import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { GetAssetDetailsByAssetSymbolRequest } from "./types.js";

export type GetAssetDetailsByAssetSymbolInput = GetAssetDetailsByAssetSymbolRequest & RequestMetadata;

export async function getAssetDetailsByAssetSymbol(
    client: CryptoApisHttpClient,
    input: GetAssetDetailsByAssetSymbolInput
) {
    const path = `/market-data/assets/by-symbol/${encodeURIComponent(input.assetSymbol)}`;

    return client.request<unknown>("GET", path, {
        query: { context: input.context },
    });
}
