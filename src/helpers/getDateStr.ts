export function getDateStr(dateStr: string): string {
  const birthdate = new Date(dateStr);
  const date = String(birthdate.getDate());
  const month = String(birthdate.getMonth() + 1);
  const year = String(birthdate.getFullYear());
  return `${date}.${month.length === 2 ? month : `0${month}`}.${year}`;
}
