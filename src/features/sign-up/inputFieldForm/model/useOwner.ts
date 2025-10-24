/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { OWNER } from "../config/constants";
import { SingUpFormProps } from "./sign-up-form";

export function useOwner() {
  const { control } = useFormContext<SingUpFormProps>();
  const { errors } = useFormState({ control });
  const { handleProgress } = useProgress();
  const isIncrease = useRef(false);

  useEffect(() => {
    const isError = Boolean(errors.userName);
    handleProgress(OWNER.progressVol, isError, isIncrease);
  }, [errors.userName, handleProgress]);

  return { control };
}
