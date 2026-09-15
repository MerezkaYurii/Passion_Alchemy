
export const getEnvVar = (name: string, defaultValue?: string): string => {
  const envMap: Record<string, string | undefined> = {
   NEXT_PUBLIC_STRIPE_PRICE_LONERS_FULL_RESULT: process.env.NEXT_PUBLIC_STRIPE_PRICE_LONERS_FULL_RESULT,
   NEXT_PUBLIC_STRIPE_PRICE_COUPLE_FULL_RESULT: process.env.NEXT_PUBLIC_STRIPE_PRICE_COUPLE_FULL_RESULT,

  };

  const value = envMap[name] ?? process.env[name];
  if (value) return value;
  if (defaultValue !== undefined) return defaultValue;
  throw new Error(`Cannot find process.env[${name}]`);
};