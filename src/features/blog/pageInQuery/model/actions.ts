/* eslint-disable @typescript-eslint/no-explicit-any */


function changePageQuery(page: number, router: any) {
  const params = new URLSearchParams(window.location.search);
  if (page > 1) {
    params.set("page", page.toString());
  } else {
    params.delete("page");
  }
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  router.replace(newUrl);
}

export const goPage = (page: number, router: any) =>
  changePageQuery(page, router);
