import React from "react";
import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { CompanyField } from "../ui/CompanyField";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({ defaultValues: { company: "" } });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("CompanyField", () => {
  const companyName = "테스트 회사";

  test("Input이 렌더링되고, props로 전달된 company 값을 표시하며 readonly 처리된다", () => {
    // given, when -> Input이 렌더링된다.
    render(
      <Wrapper>
        <CompanyField company={companyName} />
      </Wrapper>
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;

    // then -> props로 전달한 값이 기본값이다. readonly이다.
    expect(input).toBeInTheDocument();
    expect(input.value).toBe(companyName);
    expect(input).toHaveAttribute("readonly");
  });

});
