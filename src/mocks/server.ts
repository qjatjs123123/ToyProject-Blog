import { setupServer } from 'msw/node';
import { blogHandlers } from '@/entities/blog/api/__mocks__/blogListHandler';

export const server = setupServer(...blogHandlers);


// 이건 next 서버용 msw 초기화