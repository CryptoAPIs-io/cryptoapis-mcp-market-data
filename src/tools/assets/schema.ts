import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

export const AssetsAction = z.enum([
    "get-asset-details-by-asset-id",
    "get-asset-details-by-asset-symbol",
]);

export const AssetsToolSchema = z
    .object({
        action: AssetsAction.describe("Action to perform"),
        assetId: z.string().min(1).optional().describe("Asset ID - for get-asset-details-by-asset-id"),
        assetSymbol: z.string().min(1).optional().describe("Asset symbol (e.g. BTC) - for get-asset-details-by-asset-symbol"),
    })
    .merge(RequestMetadataSchema)
    .refine(
        (data) => {
            if (data.action === "get-asset-details-by-asset-id") return data.assetId != null;
            if (data.action === "get-asset-details-by-asset-symbol") return data.assetSymbol != null;
            return true;
        },
        { message: "assetId or assetSymbol required per action", path: ["action"] }
    );

export type AssetsToolInput = z.infer<typeof AssetsToolSchema>;
