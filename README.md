# 개발하면서 고민한 내용

##  어떻게 하면 확장성 있고, 유지보수 용이한 코드를 작성할 수 있을까?
### 1. Atomic 단위의 컴포넌트를 설계하고, 이를 조합해서 컴포넌트를 만들자.
작은 단위 **(버튼, 인풋, 텍스트, 체크 박스 등)** 부터 설계하였고, 이를 조합하여 상위 레벨의 컴포넌트를 만들어 나갔습니다. 그 결과 불필요한 중복을 줄이고, 기능 확장시에도 컴포넌트를 재활용할 수 있어 유지보수 부담이 줄어들었습니다.
- **classnames 라이브러리**를 사용했습니다.
  - 공통 컴포넌트를 재사용할 때, props로 다양한 옵션을 제어해야 하는 상황이 많았습니다.
  - 이때 classnames 라이브러리를 활용해 조건부로 클래스를 깔끔하게 적용할 수 있었고, 코드 가독성과 유지보수성을 높일 수 있었습니다.
 
- **CSS module** 을 사용하였습니다.
  - 스타일을 컴포넌트 단위로 분리할 수 있어, 각 컴포넌트가 독립적으로 관리됩니다. **(전역 스타일과의 충돌을 방지)**
  - CSS 파일이 컴포넌트와 함께 존재하므로, 코드 구조가 명확해지고 유지보수가 용이합니다.

<br />

### 2. Atomic 디자인 패턴을 적용하여 개발하기
예를 들어, 회원가입 페이지를 개발할 때는 다음과 같이 **Atomic Design**을 적용했습니다.


- **1. Atomic 단위**
  - `Input`, `Button`, `Text`와 같은 최소 단위 컴포넌트를 먼저 구현했습니다.
- **2. Molecules**
  - 위의 Atomic 컴포넌트들을 조합하여 `Field`와 같은 **중간 단위 컴포넌트**를 만들었습니다.

- **3. Organisms**
  - 여러 Field 컴포넌트를 조합하여 `Form`을 구성했습니다.

- **4. Pages**
  - 마지막으로 Organisms를 조합하여 **회원가입 페이지 전체**를 점진적으로 완성했습니다.


<br />

### 3. 컴파운드 컴포넌트 패턴을 사용하자
요구사항에 따라, **Form의 Field**는 다음과 같은 요소로 구성되어 있습니다.

- `Label`: 입력 필드의 제목
- `Input`: 실제 입력을 받는 컴포넌트
- `Error Label`: 유효성 검사 결과를 표시

컴파운드 컴포넌트 패턴을 적용하여 **내부 상태를 Context**에서 관리하고, 자식 컴포넌트들은 Context를 통해 **인풋값과 에러 상태를 공유**하면서 독립적으로 UI를 렌더링합니다.

이 패턴을 적용하여 `Field` 컴포넌트를 구현한 결과, **회원가입 폼뿐만 아니라 로그인 폼에서도 동일한 Field 컴포넌트를 재사용**할 수 있었습니다. 즉, 추후 새로운 폼을 개발할 경우에도 해당 컴포넌트를 그대로 활용할 수 있어 **확장성**이 향상됩니다.

<br />

### 4. 컴포지션 패턴을 사용하자
블로그 상세보기의 경우, 세부 요소를 나누어 보면 **Title, Category, CreateAt, Thumbnail** 등으로 구성되어 있습니다. 
저는 이것을 다음과 형식으로 설계했습니다.

``` javascript
    <BlogDetail>
      <BlogDetail.Category category={blog.category} />
      <BlogDetail.Title>{blog.title}</BlogDetail.Title>
      <BlogDetail.CreateAt value={blog.createdAt} />
      <BlogDetail.Thumbnail title={blog.title} thumbnail={blog.thumbnail} />
      <BlogDetail.Summary>{blog.summary}</BlogDetail.Summary>
      <BlogDetail.Content blog={blog.content} />
      <BlogDetail.Footer> <BlogDetailFooter /> </BlogDetail.Footer>
    </BlogDetail>
```

이렇게 설계한 결과 얻을 수 있는 이점은 다음과 같습니다.
- 필요에 따라 자식 컴포넌트를 선택적으로 조합 가능
- UI 계층 구조를 직관적으로 표현 가능

<br />

### 5. 그 외
저는 **확장성 있는 코드는 의존성이 적은 코드**라고 생각합니다.
그래서 컴포넌트를 외부에서 주입받도록 설계합니다.
예를 들어, 특정 슬롯(`header`, `content`, `footer`)에 넣을 컴포넌트를 외부에서 전달받거나, `children` props를 활용하여 **유연하게 구성**할 수 있도록 합니다.

<br />

##  API 우아하게 처리하기
### 1. suspense, react-error-boundary 사용하기
블로그 배너 조회, 목록 조회, 상세 조회 등 **다양한 API 요청**이 존재합니다.
이러한 비동기 API 상태를 **우아하게 처리하고, 로딩과 에러 상황을 명확하게 관리**할 필요가 있었습니다.

- **Suspense**를 사용하였습니다.
  - **Skeleton UI**를 Suspense에 적용하여 **API 호출 중 로딩 상태**를 직관적으로 표시했습니다.
  - **TanStack Query**를 연동하여, API 호출 로직과 비동기 처리 로직을 **컴포넌트와 분리**함으로써 유지보수성을 높였습니다.


- **react-error-boundary 라이브러리**를 사용하였습니다.
  - **TanStack Query**를 연동하여, API 호출 에러 로직을 **컴포넌트와 분리**함으로써 유지보수성을 높였습니다.
  - API 호출 중 에러가 발생하면, `Error`라는 컴포넌트를 fallback UI로 렌더링하도록 하였습니다.

``` javascript
// Suspense를 Wrapping하는 고차 컴포넌트입니다.
const BlogListWithSuspense = withSuspense(
  BlogList,
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-15 mt-9 md:mt-10">
    {Array.from({ length: 12 }).map((_, idx) => (
      <BlogCardSkeleton key={idx} />
    ))}
  </div>
);

<HydrationBoundary state={dehydrate(queryClient)}>
  <ErrorBoundary fallback={<Error type="Error" />}>
    <BlogListWithSuspense />
  </ErrorBoundary>
  <Pagination />
</HydrationBoundary>
```

<br />

##  에러 핸들링
### 1. react-error-boundary, error.tsx 사용하기
웹 서비스에서는 **에러 핸들링이 매우 중요**하다고 생각하여, 이에 신경을 썼습니다.
- **서버 컴포넌트**에서 API 처리는 `try-catch`문으로 처리하였고,
- **클라이언트 컴포넌트**에서는 `react-error-boundary`를 활용하여 에러 발생 시 `fallback UI → (Error.tsx)`를 제공했습니다.
- 또한, 예기치 못한 에러가 발생할 경우를 대비해 **최상위 루트에 error.tsx**를 만들어 전체 애플리케이션 수준에서 에러를 처리하도록 했습니다.


<br />

##  상태 관리
### 1. 전역 상태 도구 jotai 사용하기
**페이지 단위나 전역 단위**에서 상태를 여러 컴포넌트가 공유해야 하는 경우 전역 상태 도구를 사용합니다. 전역 상태 관리를 적용해야 했던 경우는 **스낵바 메시지와 유저 정보**입니다.
- **jotai**를 사용했습니다.
  - 간단한 전역 상태 관리에는 Jotai를 활용합니다. 그 이유는 번들 사이즈가 가장 작고, 사용법이 직관적이기 때문입니다.
  - 전역 상태 관리 도구를 사용함으로써 **Provider 지옥에서 벗어나 개발 가독성을 높일 수 있습니다.**

### 2. Context API 사용하기
컴포넌트 단위에서 **props drilling**이 심할 경우에는 Context API를 사용합니다. Context API를 적용한 사례는 **프로그래스 상태와 Field 상태**입니다. Context API는 여러 상태를 복잡하게 관리할 경우 **불필요한 렌더링**이 발생할 수 있기 때문에, 주로 하나의 기능 단위에서 사용했습니다.

- **Context API**를 사용했습니다.
  - props drilling 문제를 해결하였습니다.

### 3. 서버 상태 관리하기
저는 서버 상태, 즉 useQuery를 통해 가져오는 데이터를 관리하기 위해 **TanStack Query**를 사용합니다. 블로그 목록 데이터가 **서버 상태**로 관리되었습니다.

- **TanStack Query**를 사용하였습니다.
  - 블로그 데이터 목록을 관리하여, **페이징 컴포넌트(BlogPagination.tsx)** 와 **요약 컴포넌트(BlogSearchSummary.tsx)** 등에서 공유할 수 있도록 하였습니다.
  - 캐싱 기능을 통해, **fresh 타임 동안 불필요한 API 호출이 발생하지 않도록** 하였습니다. 
  
  <br />
  
##  최적화
### 1. form 최적화
Form의 상태를 부모 컴포넌트에서 관리하면, 상태가 변경될 때마다 **매번 리렌더링**이 발생합니다. Form이 복잡하거나 무거워질 경우, 이는 **성능 문제**를 야기할 수 있습니다. 따라서 저는 Form 요소를 **최적화**하여 이러한 성능 이슈를 방지했습니다.
  
 - **리액트 훅 폼 라이브러리** 를 사용하였습니다.
   - 성능을 최적화하였습니다.
   - 코드 가독성을 향상하였습니다. 

``` javascript
  <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          {/* Label */}
          <div className="flex items-center justify-between h-[32px]">
            <Text
              type="body"
              size="3"
              className="text-[var(--color-label-700)]"
            >
              {label}
            </Text>
...
```

  <br />

### 2. 서버 사이드 렌더링(SSR) 최적화
기존에는 `router.push`를 사용하였고, 매번 서버에서 SSR을 수행했습니다.
하지만 매번 페이징이나 검색 요청마다 SSR을 수행하는 것은 **서버에 과도한 부담**을 줄 수 있다고 판단했습니다.

- **초기 로딩 및 리로드 시 SSR, 그 이후 CSR을 하였습니다.**
  - `router.push` 대신 `window.history.pushState`를 사용하여 URL은 변경되지만, 실제 서버 요청은 발생하지 않도록 처리했습니다.
  - 서버에서 데이터를 **prefetch 후 dyhydrate** 하여 클라이언트로 보내주었습니다. 
  - **hydrationBoundary**를 사용하여 서버에서 데이터를 클라이언트에서 **캐싱**하였습니다.
  - 그 이후부터 CSR을 적용하였습니다.

``` javascript
// API prefetch 이후...

<HydrationBoundary state={dehydrate(queryClient)}>
  <ErrorBoundary fallback={<Error type="Error" />}>
    <BlogListWithSuspense />
  </ErrorBoundary>
  <Pagination />
</HydrationBoundary>
```

  <br />

##  SSR / ISR / SSG
### 1. SSG
블로그 상세보기 페이지는 내용이 거의 변경되지 않습니다. 사용자가 내용을 수정할 경우, **revalidate API**를 호출하여 데이터를 재검증할 수 있습니다. 따라서 블로그 상세보기 페이지는 **SSG(Static Site Generation)** 방식으로 설계했습니다. 

``` javascript
// 데이터 캐시를 했지만, 동적 라우트 경로를 사용하고 있어서 자동으로 SSG 되지 않았습니다. 
// 그래서 강제로 SSG 했습니다.

export const dynamic = "force-static"
```

### 2. SSR / ISR
블로그 배너와 블로그 목록 조회 데이터는 수시로 변경됩니다. 상황에 따라 API 데이터를 캐싱할 수도 있지만, **no-cache** 전략으로 설계했습니다.

 <br />

##  비즈니스 로직 분리하기
### 1. 커스텀 훅
커스텀 훅을 구현하였으며, 그 중 **디바운스 훅**과 **유니크 값**을 반환하는 훅을 만들었습니다. 디바운스 훅은 입력창에서 **마지막 호출 시점에만 API가 호출**되도록 처리했습니다. 유니크 값 반환 훅은, 상태가 동일할 때 **강제로 랜더링**을 시키기 위해 만들었습니다.

- **커스텀 훅**의 장점
  - 비즈니스 로직을 재사용할 수 있습니다. 
  - 컴포넌트로 부터 로직을 분리시킬 수 있습니다.

``` javascript
// 유니크 반환 커스텀 훅
export function useUniqueValue<T extends string>() {
  const [value, setValue] = useState<T | "">("");

  const setUniqueValue = useCallback((val: T) => {
    if (!val) return;
    const random = Math.random().toString(36).substring(2, 8); 
    setValue(`${val}_${random}` as T);
  }, []);


  const displayValue = value?.split("_")[0] ?? "";

  return [displayValue, setUniqueValue, value] as const;
}

```


### 2. Tanstack-Query 커스텀 훅
다양한 API를 호출해야 했습니다. 이때 **TanStack-Query**를 사용하여 API를 호출하고, 해당 쿼리 로직을 **커스텀 훅**으로 분리했습니다. 이렇게 한 이유는, 컴포넌트에서 **패칭 로직**을 분리하고, 성공 및 실패 처리 로직을 훅 안에 구현함으로써 **관심사를 분리**하기 위함입니다.

``` javascript
// 블로그 목록 조회 커스텀 훅

export function useBlogsQuery() {
    const searchParams = useSearchParams();
  
    const page = searchParams.get('page') ?? "";
    const category = searchParams.get('category') ?? "";
    const term = searchParams.get('term') ?? "";

  return useSuspenseQuery({
    queryKey: ["blogs", {page, category, term}],
    queryFn: () => fetchBlogs({ page, category, term }),
    staleTime: 1000 * 60, 
  });
}

```


### 3. 그 외
**상수, 포맷팅 함수, 유효성 검사 함수**는 외부 함수로 분리하여 재사용하였습니다.

``` javascript
// 생일 포맷팅 함수
export const formatBirth = (raw: string) => {
    if (raw.length < 5) return raw;                // YYYY, YYYYM
    if (raw.length < 7) return `${raw.slice(0,4)}-${raw.slice(4)}`; // YYYY-MM
    return `${raw.slice(0,4)}-${raw.slice(4,6)}-${raw.slice(6,8)}`; // YYYY-MM-DD
  }
```

<br />







# 배운점
## 1. 적절히 상태 관리하는 방법을 배웠습니다.
- **전역 상태 관리 도구** 는 상태가 복잡하지 않거나 꼭 필요한 상황이 아니라면 굳이 사용할 필요가 없다는 것을 느꼈습니다.
  - 오히려 전역 상태 관리 도구는 단방향 상태 흐름이 아니기 때문에, 에러를 추적하고 원인을 찾는 것이 어려울 수 있습니다.

- **Context API** 는 하나의 문맥, 즉 연관된 기능 단위에서 **props drilling 문제** 를 해결할 때 사용하는 것이 적절합니다.
  - 만약 여러 문맥이 섞여 공유되는 상태가 복잡해지면, 불필요한 리렌더링이 발생할 수 있기 때문입니다.
  - props를 내려주는 것 자체를 지나치게 꺼릴 필요는 없다고 느꼈습니다.
  - 오히려 단방향으로 데이터를 전달하는 구조가 에러 추적과 디버깅에 훨씬 유리합니다.

- 서버 상태 관리는 **TanStack Query** 를 사용하는 것이 좋다고 느꼈습니다.
  - 그 이유는 서버 데이터를 효율적으로 캐싱하고, 데이터 동기화와 에러 처리까지 편리하게 관리할 수 있기 때문입니다.

## 2. API 호출 효과적으로 처리하기
- Suspense
  - Tanstack Query와 연동하여 사용하면 API 호출 동안에 스켈레톤 UI를 간편하게 보여줄 수 있습니다.

- react-error-boundary
  - Tanstack Query와 연동하여 사용하면 API 호출 동안에 발생하는 에러를 효과적으로 잡고 에러 UI를 쉽게 보여줄 수 있습니다.
 
## 3. 코드 리팩토링
- react-hook-form
  - 리액트 훅 폼 라이브러리를 사용하면서 품의 성능을 최적화했습니다.
  - 기존에는 ref를 사용하여 비제어 컴포넌트 방식으로 최적화를 시도했지만, 코드가 복잡해지고 가독성이 떨어진다는 단점을 느꼈습니다.
  - 반면, React Hook Form과 같은 라이브러리는 이러한 문제를 효과적으로 해결해 주어 코드가 더 간결하고 관리하기 쉬워집니다.

- useReducer
  - 기존에는 state를 관리할 때 useState로 관리했습니다.
  - 그러다보니까 복잡한 컴포넌트 같은 경우 useState가 굉장히 많아서 관리하기 힘들었습니다.
  - 또한 상태변경 로직이 컴포넌트안에 있어 가독성, 유지보수성이 떨어졌습니다.
  - useReducer는 연관된 상태를 하나로 관리하고, reducer 함수로 상태 변경 로직을 컴포넌트로 분리할 수 있습니다.


## 4. 디자인 패턴
제가 느낀 점은, 개발을 시작하기 전에 가장 작은 단위의 공통 컴포넌트를 먼저 작성하는 것이 유리하다는 것입니다.
그 이유는 작은 단위의 컴포넌트를 조합하여 큰 컴포넌트를 만들고, 이를 기반으로 페이지를 구성할 수 있기 때문입니다.
또한, 의존성을 분리하기 위해 props나 children 형태로 데이터를 전달하면 컴포넌트 간 결합도를 낮추고 재사용성을 높일 수 있습니다.
 

