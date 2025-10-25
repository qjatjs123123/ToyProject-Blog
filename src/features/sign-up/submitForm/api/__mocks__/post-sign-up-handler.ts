// mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const registerhandlers = [
  http.post("/api/auth/register", async ({ request }) => {
    const { businessNumber } = (await request.json()) as {
      businessNumber: string;
    };

    // // 잘못된 사업자등록번호
    // if (businessNumber.startsWith("000")) {
    //   return HttpResponse.json(
    //     {
    //       errorCode: "INVALID_REQUEST",
    //       errorMessage: "사업자등록번호가 올바르지 않습니다.",
    //     },
    //     { status: 400 }
    //   );
    // }

    // 정상 응답
    return HttpResponse.json(
      {
        success: true,
        message: "회원가입이 완료되었습니다",
      },
      { status: 200 }
    );
  }),
];
