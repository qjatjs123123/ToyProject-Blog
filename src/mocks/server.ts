import { setupServer } from 'msw/node';
import { blogHandlers } from '@/entities/blog/api/__mocks__/blogListHandler';
import { blogBannerListHandler } from '@/entities/banner';

export const server = setupServer(...blogHandlers, ...blogBannerListHandler);


// 이건 next 서버용 msw 초기화