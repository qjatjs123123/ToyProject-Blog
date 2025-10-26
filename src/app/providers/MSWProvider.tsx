/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Suspense, use } from 'react';

let workerPromise: Promise<any> | null = null;

if (typeof window !== 'undefined') {
  workerPromise = import('@/shared/config/mocks/browser').then(async ({ worker }) => {
    await worker.start({
      onUnhandledRequest(request, print) {
        if (request.url.includes('_next')) return;
        print.warning();
      },
    });

    // HMR 시 Worker 중지
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (module as any).hot?.dispose(() => worker.stop());

    console.log('MSW Handlers:', worker.listHandlers());
  });
}

export function MSWProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({ children }: { children: React.ReactNode }) {
  use(workerPromise ?? Promise.resolve());
  return <>{children}</>;
}
