import { ReactNode } from "react";
import styles from "./Layout.module.css"

interface ContainerProps {
  children: ReactNode;
}

export function Layout({ children }: ContainerProps) {
  return <div className={styles.container}>{children}</div>;
}