"use client";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import styles from "./CheckBox.module.css";
import CheckIcon from "./svg/CheckIcon";

type Props = PropsWithChildren<{
  checked?: boolean;
  type?: "title" | "normal";
  rd?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  onChange: (index: number) => void;
  index: number;
  id?: string; // label과 연결
  content: string;
}>;

function Checkbox(props: Props) {
  const {
    checked = false,
    type = "normal",
    disabled,
    content,
    index,
    onChange,
    id,
  } = props;


  return (
    <div className={"flex items-center gap-2"}>
      <button type="button" className={classNames(styles.button)} onClick={() => onChange(index)}>
        <span className="w-full h-full flex justify-center items-center cursor-pointer">
          {checked && <CheckIcon />}
        </span>
      </button>

      <input
        type="checkbox"
        id={String(id)}
        className="hidden"
        checked={checked}
        onChange={() => onChange(index)}
        disabled={disabled}
      />

      <label
        htmlFor={String(id)}
        aria-checked={checked}
        className={classNames(
          styles.label,
          styles[`label--type-${type}`],
          "cursor-pointer"
        )}
      >
        {content}
      </label>
    </div>
  );
}

export default Checkbox;
