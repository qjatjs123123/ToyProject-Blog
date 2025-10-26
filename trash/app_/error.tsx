"use client";

import Error from "./_components/Error";

export default function Page() {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <Error type="Error" />
    </div>
  );
}
