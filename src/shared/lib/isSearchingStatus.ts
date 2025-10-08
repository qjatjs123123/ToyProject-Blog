export function isSearchingStatus() {
  const params = new URLSearchParams(window.location.search);
  const term = params.get("term");

}