import Text from "@/app/_components/Text";
import { useProgress } from "../../_providers/ProgressProvider";

export default function ProgressText() {
  const {progress} = useProgress();

  return (
    <Text type="body" size="3" className="text-[var(--color-primary)]">
      {progress}%
    </Text>
  );
}
