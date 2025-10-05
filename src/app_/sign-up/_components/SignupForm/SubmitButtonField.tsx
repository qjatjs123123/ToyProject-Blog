
import Button from "@/app_/_components/Button";
import { useProgress } from "../../_providers/ProgressProvider";
import { useSignup } from "../../hooks/useSignup";
import { useAtom } from "jotai";
import { snackMsg } from "@/utils/atoms";
import { Modal } from "@/app_/_components/Modal";
import Text from "@/app_/_components/Text";
import { RefObject, useState } from "react";
import { useRouter } from 'next/navigation';
import { FormValues } from "../../types/type";
type SubmitButtonFieldProps = {
  formData: RefObject<FormValues>;
};

export function SubmitButtonField({formData} : SubmitButtonFieldProps) {
  const router = useRouter();
  const { progress } = useProgress();
  const [isOpen, setOpen] = useState(false);
  const { mutate } = useSignup();
  const [, setSnackMsg] = useAtom(snackMsg);

  const handleSubmit = () => {
    mutate(formData.current, {
      onSuccess: (data) => {
        setOpen(true);
        console.log(data);
      },
      onError: (err) => {
        setSnackMsg("회원가입 실패했습니다.");
      },
    });
  };

  return (
    <div className="mt-12 w-[100%]">
      <Button
        type={"primary"}
        style={"fill"}
        disabled={progress !== 100}
        className="w-full"
        onClick={handleSubmit}
      >
        가입하기
      </Button>

      {isOpen && (
        <Modal
          Header={
            <Text align="left" type="title" size="3" weight="semibold">
              올라가입을 환영합니다. 🎉
            </Text>
          }
          Content={
            <div className="text-[.9375rem] text-left text-[var(--color-label-700)]">
              <p>이제 첫 정산을 신청해보세요!</p>
              <p>
                정산금을{" "}
                <span className="text-[var(--color-primary)]">
                  30초만에 조회
                </span>
                하고,{" "}
                <span className="text-[var(--color-primary)]">바로 신청</span>할
                수 있어요.
              </p>
            </div>
          }
          Footer={
            <Button
              type="primary"
              style="fill"
              className="w-full"
              onClick={() => {
                setOpen(false);
                router.push("/");
              }}
            >
              정산금 조회하기
            </Button>
          }
        />
      )}
    </div>
  );
}
