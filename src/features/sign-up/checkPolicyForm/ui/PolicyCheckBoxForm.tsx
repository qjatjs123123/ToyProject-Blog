'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import Checkbox from "@/shared/ui/Checkbox/CheckBox";
import { CheckboxGroup } from "@/shared/ui/Checkbox/CheckBoxGroup";
import RightIcon from "@/shared/ui/Icon/RightIcon";
import { checkBoxList } from "../config/constants";
import { useSelected } from "../model/SelectedProvider";

export function PolicyCheckBoxForm() {
  const { selected, setSelected } = useSelected();

  return (
    <CheckboxGroup selectedId={selected} onChange={setSelected}>
      {({ allChecked, toggleAll, isChecked, toggle }: any) => (
        <div>
          <Checkbox
            id={"전체 동의"}
            type={"title"}
            content="전체 동의"
            checked={allChecked(checkBoxList.map((item) => item.content))}
            onChange={() => toggleAll(checkBoxList.map((item) => item.content))}
          />

          {checkBoxList.map(({ content, link }) => (
            <div key={content} className="flex justify-between items-center">
              <Checkbox
                id={content}
                checked={isChecked(content)}
                type={"normal"}
                content={content}
                onChange={() => toggle(content)}
              />
              <a className="cursor-pointer" target="_blank" href={link}>
                {link && <RightIcon />}
              </a>
            </div>
          ))}
        </div>
      )}
    </CheckboxGroup>
  );
}
