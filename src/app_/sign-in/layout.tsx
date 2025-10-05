import { ReactNode } from "react";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import Nav from "../_components/Nav";

export const metadata = {
  title: "로그인",
  description: "Allra 로그인 페이지",
};

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <section className="h-full">
      <Nav />
      {children}
      <Footer />
    </section>
  );
}
