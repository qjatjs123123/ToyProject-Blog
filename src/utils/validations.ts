export const invalidEmail = (value: string): boolean => {
  const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

  if (!pattern.test(value)) return true;
  return false;
};

export const invalidBirth = (value: string) => {
  const raw = value.replace(/-/g, "");
  if (!/^\d{8}$/.test(raw)) return true;

  const year = Number(raw.slice(0, 4));
  const month = Number(raw.slice(4, 6));
  const day = Number(raw.slice(6, 8));

  if (month < 1 || month > 12) return true;
  if (day < 1 || day > 31) return true;
  const date = new Date(year, month - 1, day);

  return !(
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
};

export const invalidPhone = (value: string): boolean => {
  const raw = value.replace(/\D/g, "");
  if (raw.length <= 10) return true;
  if (!/^01[016789]\d{7,8}$/.test(raw)) return true;

  return false; // 유효하면 false
};
