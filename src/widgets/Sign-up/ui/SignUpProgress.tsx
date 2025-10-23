import { ProgressBar, ProgressText, Text } from "@/shared/ui";

export function SignUpProgress() {
  return (
    <div>
      <div className="flex items-center justify-between ">
        <Text type="body" size="3" className="text-[var(--color-primary)]">
          최대 1,250만원까지 무료 가능해요.
        </Text>
        <ProgressText />
      </div>
      <ProgressBar />
    </div>
  );
}
