import { render, screen, fireEvent } from "@testing-library/react";
import { PolicyCheckBoxForm } from "../ui/PolicyCheckBoxForm";
import { SelectedProvider } from "../model/SelectedProvider";
import { checkBoxList } from "../config/constants";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <SelectedProvider>{children}</SelectedProvider>
);

describe("PolicyCheckBoxForm 체크 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("렌더링 시 전체 동의와 개별 항목들이 표시된다", () => {
    render(
      <Wrapper>
        <PolicyCheckBoxForm />
      </Wrapper>
    );

    // 전체 동의
    expect(screen.getByLabelText("전체 동의")).toBeInTheDocument();

    // 개별 체크박스
    checkBoxList.forEach(({ content }) => {
      expect(screen.getByLabelText(content)).toBeInTheDocument();
    });
  });

  test("전체 동의를 클릭하면 모든 체크박스가 체크된다", () => {
    render(
      <Wrapper>
        <PolicyCheckBoxForm />
      </Wrapper>
    );

    const allCheckbox = screen.getByLabelText("전체 동의");
    fireEvent.click(allCheckbox);

    checkBoxList.forEach(({ content }) => {
      const checkbox = screen.getByLabelText(content) as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });
  });

  test("전체 동의를 해제하면 모든 체크박스가 해제된다", () => {
    render(
      <Wrapper>
        <PolicyCheckBoxForm />
      </Wrapper>
    );

    const allCheckbox = screen.getByLabelText("전체 동의");

    // 전체 체크 후 다시 클릭해서 해제
    fireEvent.click(allCheckbox);
    fireEvent.click(allCheckbox);

    checkBoxList.forEach(({ content }) => {
      const checkbox = screen.getByLabelText(content) as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });
  });

  test("개별 체크박스 클릭 시 해당 항목만 체크된다", () => {
    render(
      <Wrapper>
        <PolicyCheckBoxForm />
      </Wrapper>
    );

    const firstCheckbox = screen.getByLabelText(
      checkBoxList[0].content
    ) as HTMLInputElement;
    const secondCheckbox = screen.getByLabelText(
      checkBoxList[1].content
    ) as HTMLInputElement;
    const thirdCheckbox = screen.getByLabelText(
      checkBoxList[2].content
    ) as HTMLInputElement;

    // 다른 항목은 체크되지 않음
    fireEvent.click(firstCheckbox);

    expect(firstCheckbox.checked).toBe(true);
    expect(secondCheckbox.checked).toBe(false);
    expect(thirdCheckbox.checked).toBe(false);
  });

  test("모든 개별 체크박스를 체크하면 전체 동의도 자동으로 체크된다", () => {
    render(
      <Wrapper>
        <PolicyCheckBoxForm />
      </Wrapper>
    );

    checkBoxList.forEach(({ content }) => {
      const checkbox = screen.getByLabelText(content);
      fireEvent.click(checkbox);
    });

    const allCheckbox = screen.getByLabelText("전체 동의") as HTMLInputElement;
    expect(allCheckbox.checked).toBe(true);
  });
});
