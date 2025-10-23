import { Text } from "../../Text/Text";
import { useProgress } from "../model/ProgressProvider";

export function ProgressText() {
  const {progress} = useProgress();

  return (
    <Text type="body" size="3" className="text-[var(--color-primary)]">
      {progress}%
    </Text>
  );
}
