import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { ListSupportedAssetsRequest } from "./types.js";

export type ListSupportedAssetsInput = ListSupportedAssetsRequest & RequestMetadata;

export async function listSupportedAssets(
    client: CryptoApisHttpClient,
    input: ListSupportedAssetsInput
) {
    const path = "/market-data/metadata/assets";

    return client.request<unknown>("GET", path, {
        query: {
            context: input.context,
            limit: input.limit,
            offset: input.offset,
            type: input.type,
        },
    });
}
