/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatBirth } from "./format";
import { validateBusinessNumber } from "./validate";

export function handleBusinessNumber(
  e: React.ChangeEvent<HTMLInputElement>,
  field: { onChange: (value: string) => void }
) {
  const value = e.target.value;
  if (validateBusinessNumber(value)) {
    field.onChange(value);
  }
}

export function handlePassword(
  e: React.ChangeEvent<HTMLInputElement>,
  field: { onChange: (value: string) => void }
) {
  const value = e.target.value;
  field.onChange(value);
}

export function handleBirth(
  e: React.ChangeEvent<HTMLInputElement>,
  field: { onChange: (value: string) => void }
) {
  const value = e.target.value;
  const raw = value.replace(/-/g, "");

  if (!/^[0-9]{0,8}$/.test(raw)) return;

  const formatValue = formatBirth(raw);
  field.onChange(formatValue);
}