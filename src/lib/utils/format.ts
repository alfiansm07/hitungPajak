/**
 * Format angka ke format Rupiah
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format angka dengan separator ribuan
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

/**
 * Parse string angka ke number (hapus separator)
 */
export function parseNumber(value: string): number {
  const cleaned = value.replace(/[^\d-]/g, "");
  return parseInt(cleaned, 10) || 0;
}

/**
 * Format persentase
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}
