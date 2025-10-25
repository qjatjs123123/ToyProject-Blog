import { PASSWORD } from "../config/constants";
export function validateBusinessNumber(value: string): boolean {
  return /^[0-9]{0,10}$/.test(value);
}

export const validatePassword = (value: string) => {
  const pattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,15}$/;

  if (!pattern.test(value)) {
    return PASSWORD.error_message
  }

  return true;
};