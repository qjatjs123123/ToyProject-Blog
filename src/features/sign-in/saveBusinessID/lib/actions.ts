export function saveIdInLocalStorage(id: string) {
  localStorage.setItem("businessID", id);
}

export function deleteIdInLocalStorage() {
  localStorage.removeItem("businessID");
}

export function getIdInLocalStorage(): string {
  return localStorage.getItem("businessID") ?? "";
}
