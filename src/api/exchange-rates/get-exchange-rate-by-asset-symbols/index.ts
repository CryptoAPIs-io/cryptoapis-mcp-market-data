import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { GetExchangeRateByAssetSymbolsRequest } from "./types.js";

export type GetExchangeRateByAssetSymbolsInput = GetExchangeRateByAssetSymbolsRequest & RequestMetadata;

export async function getExchangeRateByAssetSymbols(
    client: CryptoApisHttpClient,
    input: GetExchangeRateByAssetSymbolsInput
) {
    const path = `/market-data/exchange-rates/by-symbol/${encodeURIComponent(input.fromAssetSymbol)}/${encodeURIComponent(input.toAssetSymbol)}`;

    return client.request<unknown>("GET", path, {
        query: { context: input.context },
    });
}
