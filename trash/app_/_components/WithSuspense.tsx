import React, { Suspense } from 'react';

export function withSuspense<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback: React.ReactNode = <div>Loading...</div>
) {

  const ComponentWithSuspense: React.FC<P> = (props) => (
    <Suspense fallback={fallback}>
      <WrappedComponent {...props} />
    </Suspense>
  );

  ComponentWithSuspense.displayName = `withSuspense(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithSuspense;
}
