import { mapUserInfo } from "../lib/mapUserInfo";


export async function getUserInfo() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.errorMessage || "로그인 실패");
  }

  const data = await res.json();

  return mapUserInfo(data);
}
