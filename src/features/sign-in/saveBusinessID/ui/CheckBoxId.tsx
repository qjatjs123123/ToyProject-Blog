import Checkbox from "@/shared/ui/Checkbox/CheckBox";
import { useCheck } from "../model/CheckProvider";

export function SaveIdCheckBox() {
  const {checked, setChecked} = useCheck();

  return (
    <Checkbox
      id={"아이디 저장"}
      type={"normal"}
      content="아이디 저장"
      checked={checked}
      onChange={() => setChecked(!checked)}
      className="pt-[25px]"
    />
  );
}
