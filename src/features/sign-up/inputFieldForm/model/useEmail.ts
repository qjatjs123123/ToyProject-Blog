import { useFormContext, useFormState } from "react-hook-form";
import { SingUpFormProps } from "./sign-up-form";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { useEffect, useRef } from "react";
import { EMAIL } from "../config/constants";

export function useEmail() {
  const { control } = useFormContext<SingUpFormProps>();
  const { errors } = useFormState({ control });
  const { handleProgress } = useProgress();
  const isIncrease = useRef(false);

  useEffect(() => {
    const isError = Boolean(errors.email);
    handleProgress(EMAIL.progressVol, isError, isIncrease);
  }, [errors.email, handleProgress]);

  return { control };
}