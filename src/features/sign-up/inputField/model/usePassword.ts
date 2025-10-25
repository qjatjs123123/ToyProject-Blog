/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { PASSWORD } from "../config/constants";
import { SignUpFormProps } from "./sign-up-form";

export function usePassword() {
  const { control } = useFormContext<SignUpFormProps>();
  const { errors, touchedFields } = useFormState({ control });
  const { handleProgress } = useProgress();
  const ref_pw = useRef({
    isIncreased: false,
    isLocked: false,
  });
  const ref_pwc = useRef({
    isIncreased: false,
    isLocked: false,
  });


  useEffect(() => {
    if (!touchedFields.password) return;

    const isError = Boolean(errors.password);
    handleProgress(PASSWORD.progressVol1, isError, ref_pw);
  }, [errors.password, handleProgress, touchedFields.password]);

  useEffect(() => {
    if (!touchedFields.confirmPassword) return;

    const isError = Boolean(errors.confirmPassword);
    handleProgress(PASSWORD.progressVol2, isError, ref_pwc);
  }, [touchedFields.confirmPassword, errors.confirmPassword, handleProgress]);

  return { control };
}
