"use client";
import { FC, ReactNode, useCallback, useState } from "react";
import classNames from "classnames";

// Custom Components
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [open, setOpen] = useState(true);

  const toggleOpen = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const toggleSidebar = useCallback(() => {
    setOpenSidebar((openSidebar) => !openSidebar);
  }, []);

  const mainContentClassName = classNames("flex-1 duration-500 ml-0", {
    "ml-0": !openSidebar,
    // md: openSidebar,
    "md:ml-14": !open,
    "md:ml-56": open,
  });

  return (
    <div className="relative min-h-screen flex w-full">
      <Sidebar
        open={open}
        openSidebar={openSidebar}
        toggleSidebar={toggleSidebar}
        toggleOpen={toggleOpen}
      />
      <div className={mainContentClassName}>
        <Header toggleSidebar={toggleSidebar} />
        <div className="p-3 sm:p-5 md:p-8 lg:p-10 ">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
