import { useEffect } from "react";
import { toastTimer } from "../config/constants";
import { useAtom } from "jotai";
import { toastMessage } from "./action";

// 3초 뒤 메시지는 초기화 된다.
export function useMessage() {
  const [msg, setMsg] = useAtom(toastMessage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, toastTimer);

    return () => clearTimeout(timer);
  }, [msg, setMsg]);

  return msg;
}
