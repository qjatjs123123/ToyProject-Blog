import { mapLoginToken } from '../lib/mapLoginToken';
import { SignInFormProps } from '../model/sign-in-form';


export async function postSignInForm(formData: SignInFormProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    }
  );
  if (!res.ok) {

    const errorData = await res.json();
    throw new Error(errorData.errorMessage || "로그인 실패");
  }

  const data = await res.json();

  return mapLoginToken(data);
}
