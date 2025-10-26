export const formatBusinessId = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  return digits.replace(/(\d{3})(\d{2})(\d{0,5})/, (_, p1, p2, p3) =>
    [p1, p2, p3].filter(Boolean).join("-")
  );
};

export const formatBirth = (raw: string) => {
    if (raw.length < 5) return raw;                // YYYY, YYYYM
    if (raw.length < 7) return `${raw.slice(0,4)}-${raw.slice(4)}`; // YYYY-MM
    return `${raw.slice(0,4)}-${raw.slice(4,6)}-${raw.slice(6,8)}`; // YYYY-MM-DD
  }

export const formatPhone = (value: string): string => {
  const raw = value.replace(/\D/g, ""); // 숫자만
  const len = raw.length;

  if (len < 4) return raw;
  if (len < 7) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
  if (len < 11) return `${raw.slice(0, 3)}-${raw.slice(3, 6)}-${raw.slice(6)}`;
  return `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
};