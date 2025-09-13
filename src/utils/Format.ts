interface moneyFormatProps {
  value: number;
  countryCode: string;
  currency: string;
}

export const moneyFormat = ({ value, countryCode, currency }: moneyFormatProps) => {
  return new Intl.NumberFormat(countryCode, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
};
