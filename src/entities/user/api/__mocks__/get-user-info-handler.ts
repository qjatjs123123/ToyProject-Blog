// mocks/handlers.ts
import { http, HttpResponse } from "msw";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const userInfohandlers = [
  http.get(`${baseUrl}/api/auth/me`, ({ params }) => {
    const {} = params;

    // 정상 응답
    return HttpResponse.json(
      {
        businessNumber: "5234568790",
        companyName: "네이버",
      },
      { status: 200 }
    );
  }),
];
