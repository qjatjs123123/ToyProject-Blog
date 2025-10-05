import { User } from "@/app_/sign-up/types/type";
import { atom } from "jotai";

const snackMsgAtom = atom("");

// 스낵바 메시지
export const snackMsg = atom(
  (get) => get(snackMsgAtom),
  (get, set, newMsg: string) => {
    const timestamp = Date.now(); // 예: id 붙이기
    set(snackMsgAtom, `${newMsg}_${timestamp}`);
  }
);

// 유저 정보
export interface UserInfoProps {
  isAuth : boolean;
  userInfo: User | null;
}

export const userInfoAtom = atom<UserInfoProps>({
  isAuth: false,
  userInfo: null,
});
