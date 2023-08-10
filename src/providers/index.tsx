import { ReactNode } from "react";
import ReduxProvider from "./redux-provider";
import { ToastProvider } from "./toast-provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider>
      <ToastProvider />
      {children}
    </ReduxProvider>
  );
};

export default Providers;
