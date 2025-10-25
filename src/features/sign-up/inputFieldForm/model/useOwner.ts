/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { OWNER } from "../config/constants";
import { SingUpFormProps } from "./sign-up-form";

export function useOwner(owner: string) {
  const { control, reset } = useFormContext<SingUpFormProps>();
  const { errors, touchedFields } = useFormState({ control });
  const { handleProgress } = useProgress();
  const ref = useRef({
    isIncreased: false,
    isLocked: false,
  });

  useEffect(() => {
    if (owner) {
      reset({ [OWNER.name]: owner });
    }
  }, [owner, reset]);

  useEffect(() => {
    const isError = Boolean(errors.userName);
    handleProgress(OWNER.progressVol, isError, ref);
  }, [touchedFields.userName, errors.userName, handleProgress]);

  return { control };
}
