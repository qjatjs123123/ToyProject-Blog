import { useFormContext, useFormState } from "react-hook-form";
import { SingUpFormProps } from "./sign-up-form";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { useEffect, useRef } from "react";
import { PHONE } from "../config/constants";

export function usePhone() {
  const { control } = useFormContext<SingUpFormProps>();
  const { errors, touchedFields } = useFormState({ control });
  const { handleProgress } = useProgress();
  const ref = useRef({
    isIncreased: false,
    isLocked: false,
  })

  useEffect(() => {
    if(!touchedFields.phone) return;

    const isError = Boolean(errors.phone);
    handleProgress(PHONE.progressVol, isError, ref);
  }, [touchedFields.phone, errors.phone, handleProgress]);

  return { control };
}