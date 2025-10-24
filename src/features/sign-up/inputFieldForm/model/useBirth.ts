import { useFormContext, useFormState } from "react-hook-form";
import { SingUpFormProps } from "./sign-up-form";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { useEffect, useRef } from "react";
import { BIRTH } from "../config/constants";

export function useBirth() {
  const { control } = useFormContext<SingUpFormProps>();
  const { errors } = useFormState({ control });
  const { handleProgress } = useProgress();
  const isIncrease = useRef(false);

  useEffect(() => {
    const isError = Boolean(errors.birthDate);
    handleProgress(BIRTH.progressVol, isError, isIncrease);
  }, [errors.birthDate, handleProgress]);

  return { control };
}