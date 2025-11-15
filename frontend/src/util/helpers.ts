// src/util/helpers.ts
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
