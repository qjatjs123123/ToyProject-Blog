export function handleBusinessNumber(
  e: React.ChangeEvent<HTMLInputElement>,
  field: { onChange: (value: string) => void }
) {
  const value = e.target.value;
  if (/^[0-9]{0,10}$/.test(value)) {
    field.onChange(value);
  }
}
