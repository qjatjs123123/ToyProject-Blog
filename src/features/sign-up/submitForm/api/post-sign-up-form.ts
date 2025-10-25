import { SignUpFormProps } from "../../inputFieldForm";

export async function postSignUpForm(formData: SignUpFormProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
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
    throw new Error(errorData.errorMessage || "회원가입 실패");
  }

  const data = await res.json();

  return data;
}
