import { Button } from "@/shared/ui";

export function GoToSignUpPageButton() {
  return (
    <Button
      type="primary"
      style="outline"
      className="w-full"
      // onClick={handleSubmit(onSubmit)}
    >
      회원가입
    </Button>
  );
}
