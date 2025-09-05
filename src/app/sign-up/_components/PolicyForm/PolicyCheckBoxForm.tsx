"use client";
import { useState } from "react";
import Checkbox from "@/app/_components/CheckBox";
import Button from "@/app/_components/Button";
import RightIcon from "@/app/_components/svg/RightIcon";
import { useProgress } from "../../_providers/ProgressProvider";
import { checkBoxList } from "@/utils/constants";

type CheckBoxFormProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function PolicyCheckBoxForm({ setStep }: CheckBoxFormProps) {
  const { setProgress } = useProgress();

  const [checkedList, setCheckedList] = useState(checkBoxList.map(() => false));
  const allChecked = checkedList.every(Boolean);
  const isNextDisabled = checkBoxList
    .map((item, idx) => (item.required ? checkedList[idx] : true))
    .some((checked) => checked === false);

  const toggleAll = () => {
    const newValue = !allChecked;
    setCheckedList(checkBoxList.map(() => newValue));
  };

  const toggleItem = (index: number) => {
    const newList = [...checkedList];
    newList[index] = !newList[index];
    setCheckedList(newList);
  };

  const clickBtn = () => {
    setStep(1);
    setProgress(15);
  }

  return (
    <>
      <div>
        <Checkbox
          id={"전체 동의"}
          index={0}
          type={"title"}
          content="전체 동의"
          checked={allChecked}
          onChange={toggleAll}
        />

        <div className="shrink-0 h-px w-full bg-[var(--color-line-400)] my-7"></div>

        <div className="flex flex-col gap-7">
          {checkBoxList.map(({ content, link }, index) => (
            <div key={content} className="flex justify-between items-center">
              <Checkbox
                id={content}
                index={index}
                checked={checkedList[index]}
                type={"normal"}
                content={content}
                onChange={toggleItem}
              />
              <a className="cursor-pointer" target="_blank" href={link}>
                {link && <RightIcon />}
              </a>
            </div>
          ))}
        </div>
      </div>

      <Button
        type={"primary"}
        style={"fill"}
        className="w-full"
        disabled={isNextDisabled}
        onClick={clickBtn}
      >
        다음
      </Button>
    </>
  );
}
