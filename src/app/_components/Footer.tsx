import Image from "next/image";
import Text from "./Text";
import Link from "next/link";
import DotIcon from "./svg/Dot";
import { partners } from "@/utils/constants";

export default function Footer() {
  return (
    <footer >
      <div className="shrink-0 h-px w-full bg-[var(--color-line-200)] "></div>
      <div className="lg:gap-20 container flex flex-wrap-reverse items-start gap-8 py-10 md:flex-nowrap md:gap-11 lg:py-[60px] justify-between ">
        <div className="flex flex-col ">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/_next/static/media/logo-label-700.28eb8da1.svg`}
            alt="allra logo"
            width={95}
            height={24}
            loading="lazy"
          />
          <div className="flex flex-col gap-[1rem]  mt-[2rem]">
            <div className="flex items-center gap-1">
              <Link href="/">
                <Text
                  type="body"
                  size="3"
                  className="text-[var(--color-label-700)] hover:!font-bold"
                >
                  회사소개
                </Text>
              </Link>
              <DotIcon />
              <Link href="/">
                <Text
                  type="body"
                  size="3"
                  className="text-[var(--color-label-700)] hover:!font-bold"
                >
                  서비스 이용약관
                </Text>
              </Link>
              <DotIcon />
              <Link href="/">
                <Text
                  type="body"
                  size="3"
                  className="text-[var(--color-label-700)] hover:!font-bold"
                >
                  개인정보 처리방침
                </Text>
              </Link>
              <DotIcon />
              <Link href="/">
                <Text
                  type="body"
                  size="3"
                  className="text-[var(--color-label-700)] hover:!font-bold"
                >
                  공지사항
                </Text>
              </Link>
              <DotIcon />
              <Link href="/">
                <Text
                  type="body"
                  size="3"
                  className="text-[var(--color-label-700)] hover:!font-bold"
                >
                  FAQ
                </Text>
              </Link>
              <DotIcon />
              <Link href="/">
                <Text
                  type="body"
                  size="3"
                  className="text-[var(--color-label-700)] hover:!font-bold"
                >
                  블로그
                </Text>
              </Link>
              <DotIcon />
              <Link href="/">
                <Text
                  type="body"
                  size="3"
                  className="text-[var(--color-label-700)] hover:!font-bold"
                >
                  채용정보
                </Text>
              </Link>
            </div>
            <div className="text-[0.875rem] text-[var(--color-label-500)] font-[400]">
              <p>
                (주)올라핀테크 ㅣ 사업자등록번호 : 509-86-01645 ㅣ
                통신판매업신고 : 제2022-서울강남-02369호
              </p>
              <p>
                대표이사 김상수 ㅣ 주소 : 서울특별시 강남구 봉은사로 327,
                11층(논현동, 궁도빌딩)
              </p>
            </div>
            <p className="text-[0.875rem] text-[var(--color-label-500)] font-[400]">
              © 2020. Allra Fintech Corp. All Rights Reserved.
            </p>
          </div>
          <div className="grid grid-cols-3 flex-wrap items-center gap-4 md:grid-cols-4 lg:flex mt-3 md:mt-7">
            {partners.map((partner, i) => (
              <div key={i} className="flex justify-center items-center">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={100}
                  height={40}
                  className="h-auto max-h-10 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="shrink-0 h-px w-full bg-[var(--color-line-400)] block md:hidden"></div>

        <div className="flex flex-col ">
          <Text
            type="body"
            size="3"
            weight="medium"
            align="left"
            className="text-[var(--color-label-700)]"
          >
            고객센터
          </Text>
          <a className="text-[2.5rem] font-bold text-[var(--color-primary)] text-nowrap">
            1811-1463
          </a>
          <div className="flex flex-col">
            <p className="text-[0.875rem] text-[var(--color-label-500)] font-[400]">
              운영시간
            </p>
            <p className="text-[0.875rem] text-[var(--color-label-500)] font-[400] font-bold">
              평일 10:00 ~ 17:00 (점심시간 11:30 ~ 13:00)
            </p>
            <p className="text-[0.875rem] text-[var(--color-label-500)] font-[400] mb-[10px] font-bold">
              주말, 공휴일 휴무
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-[0.875rem] text-[var(--color-label-500)] font-[400]">
                E-mail
              </p>
              <p className="text-[0.875rem] text-[var(--color-label-500)] font-[400]">
                help@allra.co.kr
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
