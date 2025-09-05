export interface BusinessDataProps {
  company: string;
  owner: string;
  businessNumberVerifyToken: string;
}

export interface SignUpFormDataProps {
  businessNumber: string;
  userName: string;
  password: string;
  companyName: string;
  phone: string;
  email: string;
  partnerId: string;
  birthDate: string;
  isMarketingConsent: boolean;
  businessNumberVerifyToken: string;
}

export type FormValues = { [K in keyof SignUpFormDataProps]: string | boolean };
export type LoginFormValues = { [K in keyof LoginRequestProps]: string };

export interface LoginRequestProps {
  businessNumber: string;
  password: string;
}

export interface LoginResponseProps {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}


export interface User {
  id: number;
  businessNumber: string;
  userName: string;
  password: string;
  companyName: string;
  phone: string;
  email: string;
  birthDate: string; 
}

export type UserProps = User[];