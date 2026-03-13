import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

export const ExchangeRatesAction = z.enum([
    "get-exchange-rate-by-asset-symbols",
    "get-exchange-rate-by-asset-ids",
]);

export const ExchangeRatesToolSchema = z
    .object({
        action: ExchangeRatesAction.describe("Action to perform"),
        fromAssetSymbol: z.string().min(1).optional().describe("From asset symbol (e.g. BTC) - for get-exchange-rate-by-asset-symbols"),
        toAssetSymbol: z.string().min(1).optional().describe("To asset symbol (e.g. USD) - for get-exchange-rate-by-asset-symbols"),
        fromAssetId: z.string().min(1).optional().describe("From asset ID - for get-exchange-rate-by-asset-ids"),
        toAssetId: z.string().min(1).optional().describe("To asset ID - for get-exchange-rate-by-asset-ids"),
    })
    .merge(RequestMetadataSchema);

export type ExchangeRatesToolInput = z.infer<typeof ExchangeRatesToolSchema>;
