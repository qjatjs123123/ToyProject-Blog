import { Modal } from "@/shared/ui/Modal/Modal";
import { Button, Text } from "@/shared/ui";
import { useRouter } from "next/navigation";

export function SuccessModal({ setOpen }: { setOpen: (a: boolean) => void }) {
  const router = useRouter();

  return (
    <Modal
      Header={
        <Text align="left" type="title" size="3" weight="semibold">
          마이스토리 가입을 환영합니다. 🎉
        </Text>
      }
      Content={
        <div className="text-[.9375rem] text-left text-[var(--color-label-700)]">
          <p>이제 첫 정산을 신청해보세요!</p>
          <p>
            정산금을{" "}
            <span className="text-[var(--color-primary)]">30초만에 조회</span>
            하고, <span className="text-[var(--color-primary)]">바로 신청</span>
            할 수 있어요.
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
  );
}
