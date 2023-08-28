"use client";
import { FC, useState } from "react";
import { LogoutIcon } from "@/assets/icons";
import LogoutModal from "@/components/modal/logout-modal";

interface LogoutProps {
  open: boolean;
}

const Logout: FC<LogoutProps> = ({ open }) => {
  const [showLogOutModal, setShowLogoutModal] = useState(false);

  const toggleLogoutModal = () => {
    setShowLogoutModal((showLogOutModal) => !showLogOutModal);
  };
  return (
    <>
      <button
        onClick={toggleLogoutModal}
        className="flex items-center duration-300 space-x-3 hover:text-[#4540e1] p-2 rounded-lg overflow-hidden hover:bg-[#4540e133]"
      >
        <LogoutIcon />
        <h3 className={`${open ? "opacity-100 block" : "opacity-0 hidden"}`}>
          Logout
        </h3>
      </button>

      <LogoutModal open={showLogOutModal} setOpen={toggleLogoutModal} />
    </>
  );
};

export default Logout;
