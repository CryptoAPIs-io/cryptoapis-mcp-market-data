import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { listSupportedAssets } from "../../../api/metadata/list-supported-assets/index.js";

export async function handleListSupportedAssets(
    client: CryptoApisHttpClient,
    input: { limit?: number; offset?: number; type?: "crypto" | "fiat"; context?: string }
) {
    return listSupportedAssets(client, input);
}
