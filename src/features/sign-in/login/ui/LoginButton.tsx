import { Button } from "@/shared/ui";
import { useLogin } from "../model/useLogin";

export function LoginButton() {
  const { mutate } = useLogin();

  return (
    <Button
      type="primary"
      style="fill"
      className="w-full mt-[20px]"
      onClick={() => mutate()}
    >
      로그인
    </Button>
  );
}
