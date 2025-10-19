import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const blogBannerListHandler = [
  http.get(`${baseUrl}/api/blogs/banners`, ({ request }) => {
     const banners = Array.from({ length: 2 }).map((_, i) => ({
      id: i + 1,
      title: faker.lorem.sentence(),
      thumbnail: faker.image.urlPicsumPhotos(),
      summary: faker.lorem.paragraph(),
    }));

    return HttpResponse.json(banners);
  }),
];
