"use client";

import { Text } from "@/shared/ui";
import Checkbox from "@/shared/ui/Checkbox/CheckBox";
import { CheckboxGroup } from "@/shared/ui/Checkbox/CheckBoxGroup";
import RightIcon from "@/shared/ui/Icon/RightIcon";
import { s } from "framer-motion/client";
import { useState } from "react";

export const checkBoxList = [
  {
    content: "서비스 이용약관 동의 (필수)",
    link: "https://intro.allra.co.kr/policy/terms",
    required: true,
  },
  {
    content: "개인(신용)정보 수집 및 이용동의 (필수)",
    link: "https://intro.allra.co.kr/policy/seller",
    required: true,
  },
  {
    content: "개인(신용)정보 제공 및 위탁동의 (필수)",
    link: "https://intro.allra.co.kr/policy/manage",
    required: true,
  },
  {
    content: "개인(신용)정보 조회 동의 (필수)",
    link: "https://intro.allra.co.kr/policy/inquiry",
    required: true,
  },
  { content: "마케팅 활용 및 광고성 정보 수신동의", link: "", require: false },
];

export default function Page() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState([]);

  return (
    <>
      <header>
        <h1>
          <Text type="title" size="1" className="block">
            지금 회원가입하면
          </Text>
          <Text type="title" size="1" weight="bold" className="block">
            수수료 지원금 3만원 지급!
          </Text>
        </h1>
      </header>

      <div>
        <div className="flex items-center justify-between ">
          <Text type="body" size="3" className="text-[var(--color-primary)]">
            최대 1,250만원까지 무료 가능해요.
          </Text>
        </div>
      </div>

      <CheckboxGroup selectedId={selected} onChange={setSelected}>
        {({ allChecked, toggleAll, isChecked, toggle }) => (
          <div>
            <Checkbox
              id={"전체 동의"}
              type={"title"}
              content="전체 동의"
              checked={allChecked(checkBoxList.map((item) => item.content))}
              onChange={toggleAll}
            />

            {checkBoxList.map(({ content, link }) => (
              <div key={content} className="flex justify-between items-center">
                <Checkbox
                  id={content}
                  checked={isChecked(content)}
                  type={"normal"}
                  content={content}
                  onChange={() => toggle(content)}
                />
                <a className="cursor-pointer" target="_blank" href={link}>
                  {link && <RightIcon />}
                </a>
              </div>
            ))}
          </div>
        )}
      </CheckboxGroup>
    </>
  );
}
