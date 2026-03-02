import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { ExchangeRatesToolSchema, type ExchangeRatesToolInput } from "./schema.js";
import { getExchangeRateByAssetSymbols } from "../../api/exchange-rates/get-exchange-rate-by-asset-symbols/index.js";
import { getExchangeRateByAssetIds } from "../../api/exchange-rates/get-exchange-rate-by-asset-ids/index.js";
import { credits as bySymbolsCredits } from "./get-exchange-rate-by-asset-symbols/credits.js";
import { credits as byIdsCredits } from "./get-exchange-rate-by-asset-ids/credits.js";

const EXCHANGE_RATES_DESCRIPTION = `Market Data exchange rates.

Actions:
• get-exchange-rate-by-asset-symbols: Get exchange rate between two assets by symbol (e.g. BTC, USD)
• get-exchange-rate-by-asset-ids: Get exchange rate between two assets by asset ID`;

export const exchangeRatesTool: McpToolDef<typeof ExchangeRatesToolSchema> = {
    name: "market_data_exchange_rates",
    description: EXCHANGE_RATES_DESCRIPTION,
    credits: {
        "get-exchange-rate-by-asset-symbols": bySymbolsCredits,
        "get-exchange-rate-by-asset-ids": byIdsCredits,
    },
    inputSchema: ExchangeRatesToolSchema,
    handler:
        (client: CryptoApisHttpClient) =>
        async (input: ExchangeRatesToolInput) => {
            let result: RequestResult<unknown>;
            switch (input.action) {
                case "get-exchange-rate-by-asset-symbols":
                    result = await getExchangeRateByAssetSymbols(client, {
                        fromAssetSymbol: input.fromAssetSymbol!,
                        toAssetSymbol: input.toAssetSymbol!,
                        context: input.context,
                    });
                    break;
                case "get-exchange-rate-by-asset-ids":
                    result = await getExchangeRateByAssetIds(client, {
                        fromAssetId: input.fromAssetId!,
                        toAssetId: input.toAssetId!,
                        context: input.context,
                    });
                    break;
            }
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
