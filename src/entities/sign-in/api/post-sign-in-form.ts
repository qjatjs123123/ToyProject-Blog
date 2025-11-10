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
  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  // 정상 응답이면 mapLoginToken 호출
  return mapLoginToken(data);
}
