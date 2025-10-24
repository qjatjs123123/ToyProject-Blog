import { useFormContext, useFormState } from "react-hook-form";
import { SingUpFormProps } from "./sign-up-form";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { useEffect, useRef } from "react";
import { PHONE } from "../config/constants";

export function usePhone() {
  const { control } = useFormContext<SingUpFormProps>();
  const { errors } = useFormState({ control });
  const { handleProgress } = useProgress();
  const isIncrease = useRef(false);

  useEffect(() => {
    const isError = Boolean(errors.phone);
    handleProgress(PHONE.progressVol, isError, isIncrease);
  }, [errors.phone, handleProgress]);

  return { control };
}