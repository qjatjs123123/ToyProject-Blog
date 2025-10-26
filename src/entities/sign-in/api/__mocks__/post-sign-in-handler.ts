// mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const loginhandlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const { businessNumber, password } = (await request.json()) as {
      businessNumber: string;
      password: string;
    };

    // 정상 응답
    return HttpResponse.json(
      {
        accessToken: "mock_access_token_123",
        refreshToken: "mock_refresh_token_123",
        accessTokenExpiresIn: 30, // 30초
        refreshTokenExpiresIn: 300, // 5분 = 300초
      },
      { status: 200 }
    );
  }),
];
