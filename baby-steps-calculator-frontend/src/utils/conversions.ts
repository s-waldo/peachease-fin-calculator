export function formatInputValueToNumericDecimals(text: string) {
  return (Number(text.replace(/[^\d]/g, "")) / 100).toLocaleString("en-US", {minimumFractionDigits: 2})
}