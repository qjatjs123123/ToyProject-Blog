"use client";

import { createContext, ReactNode, RefObject, useContext, useEffect, useRef, useState } from "react";
import Text from "./Text";
import Input from "./Input";

type InputFieldProps = {
  init?: string;
  children: ReactNode;
};

type InputFieldContextType = {
  value: string;
  setValue: (val: string) => void;
  status: StatusProps;
  setStatus: (val: StatusProps) => void;
  showEmailSuggest: boolean;
  setShowEmailSuggest: (val: boolean) => void;
};

type InputFieldLabelType = {
  left?: string;
  right?: string;
  link?: string;
};
type Callback = (isError: boolean, isIncrease: RefObject<boolean>, newValue: string) => void;

type FieldInputProps = {
  placeholder?: string;
  readonly?: boolean;
  validator?: (value: string) => boolean;
  restrictor?: (value: string) => boolean;
  format?: (value: string) => string;
  charRemover?: (value: string) => string;
  progress?: number;
  autoFocus?: boolean;
  type: "text" | "password" | "email" | "search";
  callback?: Callback;
  errorMessage?: string,
  successMessage? : string,
};

type StatusProps = {
  isError : 0 | 1 | 2 // 1은 에러, 0은 성공, 3은 초기
  message : string
}

const InputFieldContext = createContext<InputFieldContextType | undefined>(
  undefined
);

export function useFieldContext() {
  const context = useContext(InputFieldContext);
  if (context === undefined) {
    throw new Error("useEditor must be used within a EditorProvider");
  }
  return context;
}

export function Field({ children, init = "" }: InputFieldProps) {
  const [value, setValue] = useState(init);
  const [status, setStatus] = useState<StatusProps>({isError: 2, message:""});
  const [showEmailSuggest, setShowEmailSuggest] = useState<boolean>(true);

  return (
    <InputFieldContext.Provider
      value={{
        value,
        setValue,
        status,
        setStatus,
        showEmailSuggest,
        setShowEmailSuggest,
      }}
    >
      <div className="flex flex-col w-full relative">{children}</div>
    </InputFieldContext.Provider>
  );
}

export function FieldLabel({ left, right, link }: InputFieldLabelType) {
  return (
    <div className="flex items-center justify-between h-[32px]">
      <Text type="body" size="3" className="text-[var(--color-label-700)]">
        {left}
      </Text>
      <a target="_blank" href={link}>
        <Text
          type="body"
          size="3"
          className="text-[var(--color-label-700)] underline underline-offset-4 hover:bg-[var(--color-background-alternative)]"
        >
          {right}
        </Text>
      </a>
    </div>
  );
}

export function FieldInput({
  placeholder,
  readonly = false,
  validator = () => false,
  restrictor = () => true,
  format = (value) => value,
  charRemover = (value) => value,
  callback = () => {}, 
  errorMessage = "",
  successMessage = "",
  autoFocus = false,
  type = "text",
}: FieldInputProps) {
  const { value, setValue, status, setStatus, setShowEmailSuggest } =
    useFieldContext();
  const isIncrease = useRef(false);
  const blured = useRef(false);

  useEffect(() => {
    const isError = validator(value);
    callback(isError, isIncrease, value);
  }, [])

  const handleChange = (param: string) => {
    const newValue = charRemover(param);
    setShowEmailSuggest(true);
    if (restrictor(newValue) === false) return;

    const isError = validator(newValue);

    callback(isError, isIncrease, newValue);

    if (blured.current) {
      if (isError === true) setStatus({ isError: 1, message: errorMessage });
      else setStatus({ isError: 0, message: successMessage });
    }

    setValue(newValue);
  };

  return (
    <Input
      autoFocus={autoFocus}
      onFocus={(e) =>
        setValue(charRemover((e.target as HTMLInputElement).value))
      }
      onChange={(e) => handleChange(e.currentTarget.value)}
      onBlur={(e) => {
        const newValue = (e.target as HTMLInputElement).value;
        const isError = validator(newValue);
        blured.current = true;

        handleChange(newValue);
        setShowEmailSuggest(false);
        if (isError === false) setValue(format(newValue));
      }}
      placeholder={placeholder}
      type={type}
      readonly={readonly}
      error={status.isError === 1 && blured.current}
      value={value}
    />
  );
}


function FieldMessage() {
  const { status } = useFieldContext();
  const { isError, message } = status

  const showMessage = isError !== 2;
  const color =
    isError === 1
      ? "text-[var(--color-status-error)]"
      : "text-[var(--color-status-correct)]";

  return (
    <>
      <Text align="left" type={"caption"} size="1" className={color}>
        {showMessage && message }
      </Text>
    </>
  );
}

Field.Input = FieldInput;
Field.Label = FieldLabel;
Field.Message = FieldMessage;
