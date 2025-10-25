import Checkbox from "@/shared/ui/Checkbox/CheckBox";

export function SaveIdCheckBox() {
  return (
    <Checkbox
      id={"아이디 저장"}
      type={"normal"}
      content="아이디 저장"
      checked={true}
      onChange={() => {}}
    />
  );
}
