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

export const pwRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d\d!@#$%^&*(),.?":{}|<>]{8,15}$/;

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


export const BusinessIdMSG = {
  VALID_ERROR : "사업자등록번호 10자리를 입력해 주세요.",
  API_ERROR : "이미 가입되어 있는 사업자등록번호에요",
  API_SUCCESS : "사업자등록번호 확인이 완료되었어요"

}

export const partners = [
  { src: `${process.env.NEXT_PUBLIC_ASSET_BASE_URL}/_next/static/media/KB금융그룹.05e1de58.svg`, alt: "KB금융그룹" },
  { src: `${process.env.NEXT_PUBLIC_ASSET_BASE_URL}/_next/static/media/KB국민카드.ec49bd7c.svg`, alt: "KB국민카드" },
  { src: `${process.env.NEXT_PUBLIC_ASSET_BASE_URL}/_next/static/media/키움캐피탈.5237f6c2.svg`, alt: "키움캐피탈" },
  { src: `${process.env.NEXT_PUBLIC_ASSET_BASE_URL}/_next/static/media/금융위원회.70dffc1f.svg`, alt: "금융위원회" },
  { src: `${process.env.NEXT_PUBLIC_ASSET_BASE_URL}/_next/static/media/아기유니콘.e670b125.svg`, alt: "아기유니콘" },
  { src: `${process.env.NEXT_PUBLIC_ASSET_BASE_URL}/_next/static/media/벤처확인기업.e9f58af5.svg`, alt: "벤처확인기업" },
  { src: `${process.env.NEXT_PUBLIC_ASSET_BASE_URL}/_next/static/media/기술보증.b4bd7f27.svg`, alt: "기술보증" },
];


export const blogNavigationData = [
  {title : '전체', category: ""},
  {title : '트렌드', category: "TREND"},
  {title : '운영 팁', category: "TIP"},
  {title : '올라가이드', category: "GUIDE"},
  {title : '올라소식', category: "NEWS"},
  {title : '고객사례', category: "EXPERIENCE"},
]