export const GUMROAD_PRODUCTS = {
  lonersFullResult: "https://curiosityhub0.gumroad.com/l/lonersFullResult",
  coupleFullResult: "https://curiosityhub0.gumroad.com/l/coupleFullResult",
} as const;

export type ProductType = keyof typeof GUMROAD_PRODUCTS;
