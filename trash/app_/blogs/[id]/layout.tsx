import Container from "@/app_/_components/Container";
import { ReactNode } from "react";

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <Container>
      {children}
    </Container>
  );
}
