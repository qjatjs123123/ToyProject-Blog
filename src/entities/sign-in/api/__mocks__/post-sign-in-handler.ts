// mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const loginhandlers = [
  http.post("/api/auth/login", async ({ request }) => {
    // 요청 JSON을 파싱
    const { formData } = (await request.json()) as {
      formData: {
        businessNumber: string;
        password: string;
      };
    };

    const { businessNumber, password } = formData;

    // INVALID_REQUEST: businessNumber나 password가 잘못된 경우
    if (businessNumber === "invalidNumber" || password === "invalidPassword") {
      return HttpResponse.json(
        {
          errorCode: "INVALID_REQUEST",
          errorMessage: "데이터 형식이 올바르지 않습니다.",
        },
        { status: 400 }
      );
    }

    // NOT_FOUND: 계정 정보 틀린 경우
    if (businessNumber === "wrongNumber" || password === "wrongPassword") {
      return HttpResponse.json(
        {
          errorCode: "NOT_FOUND",
          errorMessage: "계정 정보를 다시 확인해주세요.",
        },
        { status: 401 }
      );
    }

    // 정상 응답
    return HttpResponse.json(
      {
        accessToken: "mock_access_token_123",
        refreshToken: "mock_refresh_token_123",
        accessTokenExpiresIn: 30,
        refreshTokenExpiresIn: 300,
      },
      { status: 200 }
    );
  }),
];
