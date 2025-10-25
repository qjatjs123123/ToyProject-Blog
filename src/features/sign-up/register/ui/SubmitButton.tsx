import { Button } from "@/shared/ui";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { useState } from "react";
import { SuccessModal } from "./SuccessModal";
import { useSignUp } from "../model/useSignUp";

export function SubmitButton() {
  const { progress } = useProgress();
  const [isOpen, setOpen] = useState(false);
  const { mutate } = useSignUp({ setOpen });

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
      {isOpen && <SuccessModal setOpen={setOpen} />}
    </div>
  );
}
