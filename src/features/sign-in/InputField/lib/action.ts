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
