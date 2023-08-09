import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

interface MenuItem {
  icon: JSX.Element;
  lbl: string;
  slug?: string;
}
interface MenuItemProps extends MenuItem {
  childrens?: MenuItemProps[];
}
const MenuItem: FC<MenuItemProps> = ({ icon, lbl, slug, childrens }) => {
  const pathname = usePathname();
  const [isParentOpened, setIsParentOpened] = useState<boolean>(
    pathname.includes(lbl.toLowerCase())
  );

  return (
    <>
      {childrens ? (
        <div className="w-full space-y-1.5">
          <div
            onClick={() => {
              setIsParentOpened(!isParentOpened);
            }}
            className="w-full"
          >
            <div
              className={`cursor-pointer w-full flex items-center duration-300 space-x-3 hover:text-[#4540e1] p-2 rounded-lg overflow-hidden hover:bg-[#4540e133] ${
                pathname.includes(lbl.toLowerCase()) &&
                "text-[#4540e1] bg-[#4540e133] text-base font-medium"
              }`}
            >
              {icon}
              <div>{lbl}</div>
            </div>
          </div>
          {isParentOpened && (
            <div className={` ml-4 space-y-2`}>
              {childrens?.map((item, index) => (
                <NavLink
                  key={index}
                  icon={item.icon}
                  lbl={item.lbl}
                  href={item.slug!}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <NavLink icon={icon} lbl={lbl} href={slug!} />
      )}
    </>
  );
};

export default MenuItem;
