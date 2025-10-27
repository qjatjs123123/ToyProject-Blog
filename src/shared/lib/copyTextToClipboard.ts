export async function copyTextToClipboard(text: string): Promise<void> {
  if (!navigator.clipboard) throw new Error("Clipboard not supported");
  await navigator.clipboard.writeText(text);
}
