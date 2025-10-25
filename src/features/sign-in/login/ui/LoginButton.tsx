import { Button } from "@/shared/ui";

export function LoginButton() {
  return (
    <Button
      type="primary"
      style="fill"
      className="w-full mt-[20px]"
      // onClick={handleSubmit(onSubmit)}
    >
      로그인
    </Button>
  );
}
