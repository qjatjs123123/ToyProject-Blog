'use client'

import { Suspense, use } from 'react'
import { blogHandlers } from '@/entities/blog/api/__mocks__/blogListHandler';

const mockingEnabledPromise =
  typeof window !== 'undefined'
    ? import('@/mocks/browser').then(async ({  worker }) => {
      if (process.env.NODE_ENV === 'production') {
        return;
      }
      await worker.start({
        onUnhandledRequest(request: { url: string | string[]; }, print: { warning: () => void; }) {
          if (request.url.includes('_next')) {
            return
          }
          print.warning()
        },
      })
      worker.use(...blogHandlers);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (module as any).hot?.dispose(() => { worker.stop(); });
      console.log(worker.listHandlers())
    })
    : Promise.resolve()

export function MSWProvider({
                              children,
                            }: Readonly<{
  children: React.ReactNode
}>) {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  )
}

function MSWProviderWrapper({
                              children,
                            }: Readonly<{
  children: React.ReactNode
}>) {
  use(mockingEnabledPromise)
  return children
}