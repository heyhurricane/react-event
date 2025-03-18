export function formatDate(dateString: Date): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function formatString(text) {
  return text.replace(/^\[\d+\]\s*/, ''); // Убираем часть до "] "
}

export function formatNumber(num: number): string {
  return num.toLocaleString('ru-RU');
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/^(\+7)(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
}
