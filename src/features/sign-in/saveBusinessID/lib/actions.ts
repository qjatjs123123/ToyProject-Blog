export function saveIdInLocalStorage(id: string) {
  localStorage.setItem("businessID", id);
}

export function deleteIdInLocalStorage() {
  localStorage.removeItem("businessID");
}

export function getIdInLocalStorage(): string {
  if (typeof window === "undefined") return ""; // 서버에서는 빈 문자열 반환
  return localStorage.getItem("businessID") ?? "";
}
