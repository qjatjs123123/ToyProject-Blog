import { BackToBlogButton } from "@/features/detail/backToBlog";
import { CopyToLinkButton } from "@/features/detail/copyToLink";

export function DetailFooter() {
  return (
    <div className="flex justify-center mt-13 gap-5">
      <BackToBlogButton />
      <CopyToLinkButton />
    </div>
  );
}
