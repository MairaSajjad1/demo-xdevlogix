import { FC } from "react";
import { MenuIcon } from "@/assets/icons";
import Image from "next/image";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <div
      className={`
       bg-[#ffffff] sticky top-0 right-0 z-20 flex items-center justify-between  md:justify-end px-4  md:px-10 py-4`}
    >
      <div
        onClick={toggleSidebar}
        className="md:hidden cursor-pointer text-[#4f46e5] "
      >
        <MenuIcon />
      </div>
      <div className="flex items-center space-x-3 md:space-x-8">
        <div className="relative">
          <svg
            className="hover:stroke-[#26abf5] duration-300"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#292D32"
          >
            <path
              d="M11.1725 6.79089V9.81757"
              strokeWidth="1.36337"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M11.1907 2.75537C7.84587 2.75537 5.13731 5.46393 5.13731 8.80872V10.7174C5.13731 11.3355 4.88282 12.2626 4.5647 12.7898L3.41038 14.7166C2.70143 15.9073 3.19224 17.2343 4.50107 17.6706C8.84567 19.1158 13.5447 19.1158 17.8893 17.6706C19.1164 17.2616 19.6435 15.8255 18.98 14.7166L17.8257 12.7898C17.5076 12.2626 17.2531 11.3264 17.2531 10.7174V8.80872C17.244 5.4821 14.5173 2.75537 11.1907 2.75537Z"
              strokeWidth="1.36337"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M14.1992 18.0432C14.1992 19.7065 12.8358 21.0699 11.1725 21.0699C10.3454 21.0699 9.58189 20.7245 9.03655 20.1792C8.4912 19.6338 8.14581 18.8703 8.14581 18.0432"
              strokeWidth="1.36337"
              strokeMiterlimit="10"
            />
          </svg>

          <div className="bg-[#ffffff] rounded-full absolute top-0.5 right-0.5 w-2 h-2 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF3737]"></div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-[#aaaaaa]">Admin User</div>
        </div>
        <div className="profile-img flex items-center justify-center">
          <Image
            width={40}
            height={40}
            src={`/assets/images/avatar-profile.png`}
            alt="Avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
