import { PASSWORD } from "../config/constants";

export function validateBusinessNumber(value: string): boolean {
  return /^[0-9]{0,10}$/.test(value);
}


export const validatePassword = (value: string) => {
  const pattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,15}$/;

  if (!pattern.test(value)) {
    return PASSWORD.first_validation_error;
  }

  return true;
};

export const validateConfirmPassword = (value: string, password: string) => {
  const patternCheck = validatePassword(value);

  if (patternCheck !== true) return patternCheck;

  if (value !== password) {
    return PASSWORD.second_validation_error;
  }

  return true;
};