/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from "@/shared/ui";
import { useQueryClient } from "@tanstack/react-query";

export function UserInfo(data: any) {
  if (!data) return null;
  return (
    <Text type="body" size="1" weight="bold">
      {data.data.companyName} 님
    </Text>
  );
}
