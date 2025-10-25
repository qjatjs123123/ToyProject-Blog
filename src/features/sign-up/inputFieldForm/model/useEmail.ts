import { useFormContext, useFormState } from "react-hook-form";
import { SignUpFormProps } from "./sign-up-form";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { useEffect, useRef } from "react";
import { EMAIL } from "../config/constants";

export function useEmail() {
  const { control } = useFormContext<SignUpFormProps>();
  const { errors, touchedFields } = useFormState({ control });
  const { handleProgress } = useProgress();
  const ref = useRef({
    isIncreased: false,
    isLocked: false,
  });

  useEffect(() => {
    if (!touchedFields.email) return;

    const isError = Boolean(errors.email);
    handleProgress(EMAIL.progressVol, isError, ref);
  }, [errors.email, handleProgress, touchedFields.email]);

  return { control };
}
