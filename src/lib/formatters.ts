const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

const DATE_FORMATTER = new Intl.DateTimeFormat("zh-TW", {
  dateStyle: "medium",
});

export function formatDate(date: Date) {
  return DATE_FORMATTER.format(date);
}
