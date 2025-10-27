'use client'

import classNames from "classnames";
import { PropsWithChildren, ReactNode, useEffect, useMemo, useState, forwardRef } from "react";
import styles from "./Input.module.css";
import SearchIcon from "./svg/SearchIcon";
import EyeIcon from "./svg/EyeIcon";
import EyeOffIcon from "./svg/EyeOffIcon";

type Props = PropsWithChildren<{
  type?: "text" | "password" | "email" | "search";
  size?: "small" | "medium" | "large";
  rd?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  readonly?: boolean;
  placeholder?: string;
  onBlur?: React.FocusEventHandler<HTMLElement>
  value?: string;
  autoFocus?: boolean
  error: boolean,
  name?:string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus? : React.FocusEventHandler<HTMLElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}>;

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  props: Props,
  ref
) {
  const {
    type = "text",
    size = "medium",
    rd = "md",
    readonly = false,
    autoFocus = false,
    placeholder,
    value,
    onChange,
    onBlur,
    onFocus,
    error,
    className,
    onKeyDown,
    name,
    ...rest
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (autoFocus && ref && typeof ref !== "function") {
      ref.current?.focus?.();
    }
  }, [autoFocus, ref]);

  const inputType = useMemo(() => {
    if (type === "password" && showPassword) {
      return "text";
    }
    return type;
  }, [type, showPassword]);

  return (
    <div className="relative w-full">
      <div className="absolute top-1/2 transform -translate-y-1/2 left-5 pointer ">
        {type === "search" ? <SearchIcon /> : null}
      </div>
      <input
        ref={ref}
        id={name}
        name={name}
        type={inputType}
        className={classNames(
          styles.input,
          { [styles.error]: error },
          styles[`input--size-${size}`],
          styles[`input--rd-${rd}`],
          className
        )}
        readOnly={readonly}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
        {...rest}
      />

      {type === "password" && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 transform -translate-y-1/2 right-5 cursor-pointer "
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </div>
      )}
    </div>
  );
});

export default Input;
