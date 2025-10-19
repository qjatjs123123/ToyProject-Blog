import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const blogDetailHandlers = [
  // 블로그 상세
  http.get(`${baseUrl}/api/blogs/:id`, ({ params }) => {
    const { id } = params;

    const blog = {
      id: Number(id),
      category: faker.helpers.arrayElement(["TIP", "NEWS", "DEV"]),
      title: faker.lorem.sentence(),
      thumbnail: faker.image.urlPicsumPhotos({ width: 800, height: 400 }),
      summary: faker.lorem.sentences(3),
      content: `
        <h2><strong>"${faker.lorem.sentence()}"</strong></h2>
        <p><br></p>
        <p><img src="${faker.image.urlPicsumPhotos({
          width: 800,
          height: 400,
        })}" alt="${faker.lorem.words(3)}"></p>
        <p>${faker.lorem.paragraphs(3, "</p><p>")}</p>

        <h3><strong>${faker.lorem.sentence()}</strong></h3>
        <p>${faker.lorem.paragraphs(4, "</p><p>")}</p>
        <p><u>(${faker.number.int({
          min: 2018,
          max: 2024,
        })}~ ${faker.number.int({
        min: 10,
        max: 30,
      })}% ${faker.lorem.sentence()})</u></p>

        <h2><strong>${faker.lorem.sentence()}</strong></h2>
        <p>${faker.lorem.paragraphs(4, "</p><p>")}</p>
        <p><strong><u>“${faker.lorem.sentence()}”</u></strong></p>

        <p><br></p>
        <p><img src="${faker.image.urlPicsumPhotos({
          width: 800,
          height: 400,
        })}" alt="random-blog-image"></p>
        <p>${faker.lorem.paragraphs(5, "</p><p>")}</p>

        <h3><strong><em>${faker.lorem.sentence()}</em></strong></h3>
        <p>${faker.lorem.paragraphs(3, "</p><p>")}</p>

        <blockquote>
          "${faker.lorem.sentences(2)}"
        </blockquote>

        <p><strong style="color: rgb(24,160,251);">
          "${faker.lorem.sentence()}"
        </strong></p>

        <h2><strong>${faker.lorem.sentence()}</strong></h2>
        <p>${faker.lorem.paragraphs(4, "</p><p>")}</p>
        <p><img src="${faker.image.urlPicsumPhotos({
          width: 800,
          height: 400,
        })}" alt="${faker.lorem.words(2)}"></p>
        <p>${faker.lorem.paragraphs(4, "</p><p>")}</p>
      `,
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };

    return HttpResponse.json(blog);
  }),
];
