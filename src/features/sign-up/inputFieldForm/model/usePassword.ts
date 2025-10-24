/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCallback,
  useEffect,
  useRef,
  MutableRefObject,
  useState,
} from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { PASSWORD } from "../config/constants";
import { SingUpFormProps } from "./sign-up-form";

export function usePassword() {
  const { control } = useFormContext<SingUpFormProps>();
  const { errors, touchedFields } = useFormState({ control });
  const { trigger } = useFormContext();
  const { setProgress } = useProgress();
  const [blurPassword, setBlurPassword] = useState(false);
  const [blurConfirmPassword, setConfirmPassword] = useState(false);
  const isIncrease1 = useRef(false);
  const isIncrease2 = useRef(false);

  const handleProgress = useCallback(
    (plus: number, result: boolean, isIncrease: MutableRefObject<boolean>) => {
      if (result && isIncrease.current) {
        setProgress((prev) => prev - plus);
        isIncrease.current = false;
      } else if (!result && !isIncrease.current) {
        setProgress((prev) => prev + plus);
        isIncrease.current = true;
      }
    },
    [setProgress]
  );

  const handleBlur = useCallback(
    async (field: any, type: "password" | "confirmPassword") => {
      field.onBlur();

      switch (type) {
        case "password":
          setBlurPassword(true);
          await trigger("password");
          break;
        case "confirmPassword":
          setConfirmPassword(true);
          await trigger("confirmPassword");
          break;
        default:
          break;
      }
    },
    [trigger]
  );

  useEffect(() => {
    if (!blurPassword) return;

    const isError = Boolean(errors.password);
    handleProgress(PASSWORD.progressVol1, isError, isIncrease1);
  }, [blurPassword, errors.password, handleProgress, touchedFields.password]);

  useEffect(() => {
    if (!blurConfirmPassword) return;

    const isError = Boolean(errors.confirmPassword);
    handleProgress(PASSWORD.progressVol2, isError, isIncrease2);
  }, [
    touchedFields.confirmPassword,
    errors.confirmPassword,
    handleProgress,
    blurConfirmPassword,
  ]);

  return { control, handleBlur };
}
