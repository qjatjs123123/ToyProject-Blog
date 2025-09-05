import Input from "@/app/_components/Input";
import Text from "@/app/_components/Text";
import { RefObject, useReducer, useRef } from "react";
import { useProgress } from "../../_providers/ProgressProvider";
import { pwRegex } from "@/utils/constants";
import { FormValues } from "../../types/type";

type PasswordFieldProps = {
  formData: RefObject<FormValues>;
};

type State = {
  firstPW: string;
  secondPW: string;
  firstError: boolean;
  secondError: boolean;
  success: boolean;
  isStart: boolean;
};

type Action =
  | { type: "CHANGE_FIRST"; value: string }
  | { type: "BLUR_FIRST" }
  | { type: "CHANGE_SECOND"; value: string }
  | { type: "BLUR_SECOND" }
  | { type: "CHANGE_SUCCESS"; value: string }

const initialState: State = {
  firstPW: "",
  secondPW: "",
  firstError: false,
  secondError: false,
  success: false,
  isStart: true,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "CHANGE_FIRST": {
      const firstError = !pwRegex.test(action.value);
      return { ...state, firstPW: action.value, firstError };
    }
    case "CHANGE_SECOND": {
      const secondError = !pwRegex.test(action.value);
      const success = action.value === state.firstPW && !secondError;

      return {
        ...state,
        secondPW: action.value,
        secondError,
        isStart:false,
        success,
      };
    }
    case "CHANGE_SUCCESS" : {
      const secondError = !pwRegex.test(action.value);
      const success = action.value === state.firstPW && !secondError;
      return {
        ...state,
        success,
      };
    }
    default:
      return state;
  }
}

export default function PasswordField({ formData }: PasswordFieldProps) {
  const { handleProgress } = useProgress();
  const [state, dispatch] = useReducer(reducer, initialState);
  const blurRef = useRef({ first: false, second: false });
  const isIncrease1 = useRef(false); 
  const isIncrease2 = useRef(false);


  const handleChangeFirst = (value: string) => {
    dispatch({ type: "CHANGE_FIRST", value });
    if (blurRef.current.first) {
      handleProgress(11, !pwRegex.test(value), isIncrease1);
    }
  };

  const handleChangeSecond = (value: string) => {
    dispatch({ type: "CHANGE_SECOND", value });
    formData.current["password"] = value;

    const invalid = !pwRegex.test(value) || value !== state.firstPW;
    handleProgress(10, invalid, isIncrease2);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center justify-between h-[32px]">
        <Text type="body" size="3" className="text-[var(--color-label-700)]">
          비밀번호
        </Text>
      </div>
      <Input
        error={state.firstError}
        value={state.firstPW}
        onChange={(e) => handleChangeFirst(e.target.value)}
        onBlur={(e) => {
          blurRef.current.first = true;
          handleChangeFirst((e.target as HTMLInputElement).value);
        }}
        placeholder={"8~15자리/영문, 숫자, 특수문자 조합 입력"}
        type={"password"}
      />
      {state.firstError && (
        <Text
          align="left"
          type={"caption"}
          size="1"
          className="text-[var(--color-status-error)]"
        >
          8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요
        </Text>
      )}
      <Input
        error={state.secondError}
        value={state.secondPW}
        onChange={(e) => handleChangeSecond(e.target.value)}
        onBlur={(e) => {
          blurRef.current.second = true;
          handleChangeSecond((e.target as HTMLInputElement).value);
        }}
        placeholder={"8~15자리/영문, 숫자, 특수문자 조합 재입력"}
        type={"password"}
      />
      <Text
        align="left"
        type={"caption"}
        size="1"
        className="text-[var(--color-status-error)]"
      >
        {state.secondError
          ? "8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요"
          : !state.success && !state.isStart && "비밀번호가 일치하지 않습니다."}
      </Text>
      {state.success && (
        <Text
          align="left"
          type={"caption"}
          size="1"
          className="text-[var(--color-status-correct)]"
        >
          사용 가능한 비밀번호에요
        </Text>
      )}
    </div>
  );
}
