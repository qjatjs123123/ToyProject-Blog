export const BUSINESS_ID = {
  title: "사업자등록번호 (ID)",
  subtitle: "사업자 번호가 기억나지 않아요",
  link: "https://www.ftc.go.kr/www/selectBizCommList.do?key=253&token=71FB05C5-4829-80F4-C230-B0FB890B3E892EB62DA22EDEFB1080D78429A22093C1",
  placeholder: "-제외 10자리 입력",
  validation_error: "10자리 숫자를 입력해주세요.",
  success_message: "사업자등록번호 확인이 완료되었어요",
  api_error: "서버 에러입니다.",
  progressVol: 21,
  name: "businessNumber",
};

export const PASSWORD = {
  title: "비밀번호",
  name: { pw: "password", pwc: "confirmPassword" },
  first_validation_error:
    "8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요",
  first_placeholder: "8~15자리/영문, 숫자, 특수문자 조합 입력",
  second_placeholder: "8~15자리/영문, 숫자, 특수문자 조합 재입력",
  second_validation_error: "비밀번호가 일치하지 않습니다.",
  success_message: "사용 가능한 비밀번호에요",
  progressVol1: 11,
  progressVol2: 10,
};

export const COMPANY = {
  title: "상호명",
  name: "companyName",
};

export const OWNER = {
  title: "대표자",
  placeholder: "사업자등록증에 기재된 대표자명 입력",
  error_message: "대표자명을 입력해주세요",
  progressVol: 11,
  name: "userName",
};

export const BIRTH = {
  title: "대표자 생년월일",
  placeholder: "생년월일 8자리 입력 (19900101)",
  error_message: "생년월일은 YYYYMMDD 형식입니다.",
  progressVol: 11,
  name: "birthDate"
};

export const PHONE = {
  title: "대표자 휴대폰 번호",
  placeholder: "계약서 송부를 위해 꼭 본인정보 입력",
  error_message: "전화번호는 010-1234-5678 형식입니다.",
  progressVol: 10,
  name: "phone",
};

export const EMAIL = {
  title: "대표자 이메일",
  placeholder: "이메일 입력",
  error_message: "이메일 형식이 올바르지 않습니다.",
  progressVol: 11,
  name: "email",
};

export const correctClass = "text-[var(--color-status-correct)]";
export const errorClass = "text-[var(--color-status-error)]";

export const domains = [
  "gmail.com",
  "naver.com",
  "daum.net",
  "hanmail.net",
  "kakao.com",
  "hotmail.com",
  "yahoo.com",
  "outlook.com",
  "icloud.com",
  "protonmail.com",
  "live.com",
  "gmx.com",
  "aol.com",
  "me.com",
  "msn.com",
  "naver.me",
  "hanmail.co.kr",
];