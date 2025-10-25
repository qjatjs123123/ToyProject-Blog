import { setupWorker } from "msw/browser";
import { blogHandlers } from "@/entities/blog/api/__mocks__/get-blog-list-handler";
import { blogBannerListHandler } from "@/entities/blog";
import { verifyBusinessNumberhandlers } from "@/entities/sign-up/api/__mocks__/post-verify-business-number-handler";
import { registerhandlers } from "@/features/sign-up/submitForm/api/__mocks__/post-sign-up-handler";

export const worker = setupWorker(
  ...blogHandlers,
  ...blogBannerListHandler,
  ...verifyBusinessNumberhandlers,
  ...registerhandlers,
);

// 브라우저 환경에서 작동할 가짜 API 서버(service worker)를 초기화 하는 코드이다.
// next에서도 서버에서도 돌고 브라우저에서도 돌아야 한다.
// 이건 브라우저용
