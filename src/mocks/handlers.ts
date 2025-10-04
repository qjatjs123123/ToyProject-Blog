import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const handlers = [
  http.get(`${baseUrl}/api/blogs`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = Number(url.searchParams.get('pageSize')) || 5;

    const blogs = Array.from({ length: pageSize }).map((_, i) => ({
      id: i + 1,
      title: faker.lorem.sentence(),
      category: faker.helpers.arrayElement(['Dev', 'Design', 'Life']),
      thumbnail: faker.image.urlPicsumPhotos(),
      showCount: faker.number.int({ min: 100, max: 9999 }),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }));

    return HttpResponse.json({
      list: blogs,
      totalCount: 42,
      totalPages: 9,
      page,
      pageSize,
    });
  }),
];
