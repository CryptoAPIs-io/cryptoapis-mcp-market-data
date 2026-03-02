import { systemInfoTool } from "@cryptoapis-io/mcp-shared";
import { metadataTool } from "./metadata/index.js";
import { exchangeRatesTool } from "./exchange-rates/index.js";
import { assetsTool } from "./assets/index.js";

export const tools = [metadataTool, exchangeRatesTool, assetsTool, systemInfoTool] as const;
