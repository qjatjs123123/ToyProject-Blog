export const ErrorMessage = {
  title: "다시 시도해주세요",
  content: "서버에 잠깐 문제가 생겼어요",
  src: "/empty-box.webp",
  alt: "오류 이미지",
};

export const EmptyMessage = {
  title: "검색 결과가 없어요",
  content: "아래와 같은 단어로 다시 검색해보세요",
  src: "/empty-box.webp",
  alt: "빈 박스",
};
export const correctClass = "text-[var(--color-status-correct)]";
export const errorClass = "text-[var(--color-status-error)]";

export const pathNameMap: Record<string, string> = {
  "sign-in": "로그인",
  "blogs": "블로그",
  "sign-up": "회원가입"
};
