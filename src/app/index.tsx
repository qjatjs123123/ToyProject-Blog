import { ReactNode } from "react";
import { MSWProvider } from "./providers/MSWProvider";
import { PortalProvider } from "./providers/PortalProvider";
import TanStackProvider from "./providers/TanStackProvider";

export default function App({ children } : { children : ReactNode }) {
  return (
    <MSWProvider>
      <TanStackProvider>
        <PortalProvider>{children}</PortalProvider>
      </TanStackProvider>
    </MSWProvider>
  );
}
