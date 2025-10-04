import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);


// 이건 next 서버용 msw 초기화