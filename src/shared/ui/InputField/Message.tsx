import { Text } from "../Text/Text";
import { ErrorMessage, SuccessMessage } from "./model/type";

interface MessageProps {
  error: ErrorMessage;
  success: SuccessMessage;
}

/**
 * 성공 메시지를 먼저 보여줍니다.
 * @param param0 
 * @returns 
 */

export function Message({ error, success }: MessageProps) {
  if (success.isSuccess) {
    return (
      <Text
        align="left"
        type={"caption"}
        size="1"
        className={"text-[var(--color-status-correct)]"}
      >
        {success.message}
      </Text>
    );
  }

  if (error.isError) {
    return (
      <Text
        align="left"
        type={"caption"}
        size="1"
        className={"text-[var(--color-status-correct)]"}
      >
        {error.message}
      </Text>
    );
  }

  return null
}
