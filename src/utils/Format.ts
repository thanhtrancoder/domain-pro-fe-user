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

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit'
  });
};