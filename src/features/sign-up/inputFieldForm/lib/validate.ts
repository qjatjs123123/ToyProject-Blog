import { BIRTH, OWNER, PASSWORD } from "../config/constants";

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


export const validateOwner = (value : string) => {
  if (value.length === 0) return OWNER.error_message;
  return true;
}

export const validateBirth = (value: string) => {
  const raw = value.replace(/-/g, "");
  if (!/^\d{8}$/.test(raw)) return BIRTH.error_message;

  const year = Number(raw.slice(0, 4));
  const month = Number(raw.slice(4, 6));
  const day = Number(raw.slice(6, 8));

  const date = new Date(year, month - 1, day);
  const isValid =
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day;

  return isValid || BIRTH.error_message;
};