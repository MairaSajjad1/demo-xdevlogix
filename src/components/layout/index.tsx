import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { RootState } from "@/store/types";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const openSidebar = useSelector(
    (state: RootState) => state.globalReducer.openSidebar
  );

  const mainContentClassName = classNames("flex-1 duration-300 ml-0 md:ml-56", {
    "ml-0": !openSidebar,
    "md:ml-56": openSidebar,
  });

  return (
    <div className="relative min-h-screen flex w-full">
      <Sidebar />
      <div className={mainContentClassName}>
        <Header />
        <div className="p-3 sm:p-5 md:p-8 lg:p-10 ">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
