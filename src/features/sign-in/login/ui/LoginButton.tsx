import { Button } from "@/shared/ui";
import { useLoginService } from "../model/useLoginService";

export function LoginButton() {
  const { mutate } = useLoginService();

  return (
    <Button
      type="primary"
      style="fill"
      className="w-full mt-[25px]"
      onClick={() => mutate()}
    >
      로그인
    </Button>
  );
}
