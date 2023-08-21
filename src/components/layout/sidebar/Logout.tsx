"use client";
import { LogoutIcon } from "@/assets/icons";
import LogoutModal from "@/components/modal/logout-modal";
import React, { useState } from "react";

const Logout = () => {
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
        <h3>Logout</h3>
      </button>

      <LogoutModal open={showLogOutModal} setOpen={toggleLogoutModal} />
    </>
  );
};

export default Logout;
