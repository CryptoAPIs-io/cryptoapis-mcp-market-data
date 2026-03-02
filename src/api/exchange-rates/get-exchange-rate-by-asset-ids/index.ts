import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { GetExchangeRateByAssetIdsRequest } from "./types.js";

export type GetExchangeRateByAssetIdsInput = GetExchangeRateByAssetIdsRequest & RequestMetadata;

export async function getExchangeRateByAssetIds(
    client: CryptoApisHttpClient,
    input: GetExchangeRateByAssetIdsInput
) {
    const path = `/market-data/exchange-rates/by-id/${encodeURIComponent(input.fromAssetId)}/${encodeURIComponent(input.toAssetId)}`;

    return client.request<unknown>("GET", path, {
        query: { context: input.context },
    });
}
