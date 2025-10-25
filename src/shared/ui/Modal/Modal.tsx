import React, { ReactNode } from "react";
import styles from "./Modal.module.css";
import { PortalConsumer } from "@/app/providers/PortalProvider";

interface ModalProps {
  Header: ReactNode;
  Content: ReactNode;
  Footer: ReactNode;
  onClose?: () => void;
}

export function Modal({ Header, Content, Footer, onClose }: ModalProps) {
  return (
    <PortalConsumer>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={`${styles.modalContent} flex flex-col gap-4`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full text-left">{Header}</div>
          <div>{Content}</div>
          <div>{Footer}</div>
        </div>
      </div>
    </PortalConsumer>
  );
}
