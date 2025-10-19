
import { atom } from "jotai";

const toastMessageAtom = atom("");
export const toastMessage = atom(
  (get) => get(toastMessageAtom),
  (get, set, newMsg: string) => {
    set(toastMessageAtom, `${newMsg}`);
  }
);
