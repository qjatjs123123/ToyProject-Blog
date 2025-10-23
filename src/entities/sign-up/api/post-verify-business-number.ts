import { mapBusinessNumberVerifyToken } from "../lib/mapBusinessNumberVerifyToken";

export async function postVerifyBusinessNumber(businessNumber: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify-business-number`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ businessNumber }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.errorMessage || "사업자등록번호 검증 실패");
  }

  const data = await res.json();
  console.log(data);
  return mapBusinessNumberVerifyToken(data);
}
