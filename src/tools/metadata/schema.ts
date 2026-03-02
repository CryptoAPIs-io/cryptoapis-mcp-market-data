import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { OffsetPaginationSchema } from "@cryptoapis-io/mcp-shared";

export const MetadataAction = z.enum(["list-supported-assets"]);

export const MetadataToolSchema = z
    .object({
        action: MetadataAction.describe("Action to perform"),
        type: z.enum(["crypto", "fiat"]).optional().describe("Asset type filter (crypto or fiat)"),
    })
    .merge(OffsetPaginationSchema)
    .merge(RequestMetadataSchema);

export type MetadataToolInput = z.infer<typeof MetadataToolSchema>;
