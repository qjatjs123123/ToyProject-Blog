import { setupServer } from 'msw/node';
import { blogHandlers } from '@/entities/blog/api/__mocks__/get-blog-list-handler';
import { blogBannerListHandler } from '@/entities/banner';
import { blogDetailHandlers } from '@/entities/blog';

export const server = setupServer(...blogHandlers, ...blogBannerListHandler, ...blogDetailHandlers);


// 이건 next 서버용 msw 초기화