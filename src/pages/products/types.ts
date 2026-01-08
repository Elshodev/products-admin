export interface Variation {
  id: number;
  productName?: string;
  sku?: string;
  supplier?: string;
  stocks?: Array<{
    sellPrice?: {
      UZS?: number;
      USD?: number;
    };
  }>;
}
