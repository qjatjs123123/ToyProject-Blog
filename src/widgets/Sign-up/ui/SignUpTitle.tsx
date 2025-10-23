import { Text } from "@/shared/ui";

export function SignUpTitle() {
  return (
    <header>
      <h1>
        <Text type="title" size="1" className="block">
          지금 회원가입하면
        </Text>
        <Text type="title" size="1" weight="bold" className="block">
          수수료 지원금 3만원 지급!
        </Text>
      </h1>
    </header>
  );
}
