import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { GetAssetDetailsByAssetIdRequest } from "./types.js";

export type GetAssetDetailsByAssetIdInput = GetAssetDetailsByAssetIdRequest & RequestMetadata;

export async function getAssetDetailsByAssetId(
    client: CryptoApisHttpClient,
    input: GetAssetDetailsByAssetIdInput
) {
    const path = `/market-data/assets/by-id/${encodeURIComponent(input.assetId)}`;

    return client.request<unknown>("GET", path, {
        query: { context: input.context },
    });
}
