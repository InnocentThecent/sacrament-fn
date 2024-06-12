export function formatMoney(value: number, decimalPlaces: number = 2): string {
  const fixedValue = value?.toFixed(decimalPlaces);
  const parts = fixedValue?.split(".");
  const integerPart = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formattedValue =
    integerPart + (decimalPlaces > 0 ? "." + parts[1] : "");

  return formattedValue;
}
