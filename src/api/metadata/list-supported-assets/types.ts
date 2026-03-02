export type ListSupportedAssetsRequest = {
    limit?: number;
    offset?: number;
    type?: "crypto" | "fiat";
};
