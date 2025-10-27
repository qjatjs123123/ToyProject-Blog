import { Button } from "@/shared/ui";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { useSignUpWithModal } from "../model/useSignUpWithModal";

export function SubmitButton() {
  const { progress } = useProgress();
  const { mutate, modal } = useSignUpWithModal();

  return (
    <div className="mt-12 w-[100%]">
      <Button
        type={"primary"}
        style={"fill"}
        disabled={progress !== 100}
        className="w-full"
        onClick={() => mutate()}
      >
        가입하기
      </Button>
      {modal}
    </div>
  );
}
