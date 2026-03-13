import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { supportedCapabilities } from "./supported-capabilities.js";

const RESOURCE_URI = "cryptoapis://market-data/supported-capabilities";

export function registerResources(server: McpServer): void {
    server.registerResource(
        "supported-capabilities",
        RESOURCE_URI,
        { description: "Available market data tools, actions, and query parameters" },
        (uri) => ({
            contents: [{
                uri: uri.href,
                mimeType: "application/json",
                text: JSON.stringify(supportedCapabilities, null, 2),
            }],
        }),
    );
}
