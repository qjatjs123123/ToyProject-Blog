import { useFormContext, useFormState } from "react-hook-form";
import { SignUpFormProps } from "./sign-up-form";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { useEffect, useRef } from "react";
import { BIRTH } from "../config/constants";

export function useBirth() {
  const { control } = useFormContext<SignUpFormProps>();
  const { errors, touchedFields } = useFormState({ control });
  const { handleProgress } = useProgress();
  const ref = useRef({
    isIncreased: false,
    isLocked: false,
  })

  useEffect(() => {
    if (!touchedFields.birthDate) return;

    const isError = Boolean(errors.birthDate);
    handleProgress(BIRTH.progressVol, isError, ref);
  }, [errors.birthDate, handleProgress, touchedFields.birthDate]);

  return { control };
}
