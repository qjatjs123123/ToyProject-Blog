import { ReactNode } from "react";
import Footer from "@/widgets/Footer/ui/Footer";

export const metadata = {
  title: "블로그",
  description: "Allra 블로그 페이지",
};

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
