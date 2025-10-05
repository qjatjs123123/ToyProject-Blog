import { setupWorker } from 'msw/browser';
import { blogHandlers } from '@/entities/blog/api/__mocks__/blogListHandler';

export const worker = setupWorker(...blogHandlers);


// 브라우저 환경에서 작동할 가짜 API 서버(service worker)를 초기화 하는 코드이다.
// next에서도 서버에서도 돌고 브라우저에서도 돌아야 한다.
// 이건 브라우저용