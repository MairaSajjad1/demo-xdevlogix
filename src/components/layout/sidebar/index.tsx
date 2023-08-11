import { FC } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AiOutlineCloseCircle as CloseCircle } from "react-icons/ai";
import { HiOutlineUserCircle as UserCircle } from "react-icons/hi";
import { FiSettings as Settings } from "react-icons/fi";

// Custom Components
import MenuItem from "./MenuItem";

// Custom Icons
import {
  HomeIcon,
  RiderIcon,
  LogoutIcon,
  ReportIcon,
  BrandIcon,
  VariationIcon,
  OrderIcon,
  ServiceIcon,
  UserManagementIcon,
  PurchaseTimeIcon,
  ServicesIcon,
  ListIcon,
  UnitIcon,
  ProductsIcons,
  BarcodeIcon,
  PurchaseIcon,
} from "@/assets/icons";
import { signOut } from "next-auth/react";

interface SidebarProps {
  openSidebar: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ openSidebar, toggleSidebar }) => {
  const router = useRouter();

  const navBarItems = [
    { lbl: "Home", icon: <HomeIcon />, slug: "/dashboard/home" },
    {
      lbl: "UserManagement",
      icon: <UserManagementIcon />,
      childrens: [
        {
          lbl: "Users",
          icon: <UserCircle />,
          slug: "/Usermanagement/users",
        },
        {
          lbl: "Role",
          icon: <HomeIcon />,
          slug: "/Usermanagement/usermanagement",
        },
      ],
    },
    {
      lbl: "Services",
      icon: <ServicesIcon />,
      childrens: [
        {
          lbl: "Types of services",
          icon: <ServiceIcon />,
          slug: "/services/listservice",
        },
      ],
    },
    {
      lbl: "Product",
      icon: <ProductsIcons />,
      childrens: [
        { lbl: "Product List", icon: <ListIcon />, slug: "/product/products" },
        { lbl: "Brand", icon: <BrandIcon />, slug: "/product/brand" },
        { lbl: "Bar Codes", icon: <BarcodeIcon />, slug: "/product/barcode" },
        {
          lbl: "Variation",
          icon: <VariationIcon />,
          slug: "/product/variation",
        },
        { lbl: "Purchase", icon: <PurchaseIcon />, slug: "/product/purchase" },
        {
          lbl: "Purchase-Time",
          icon: <PurchaseTimeIcon />,
          slug: "/product/purchasetime",
        },
        { lbl: "Units", icon: <UnitIcon />, slug: "/product/units" },
      ],
    },
    {
      lbl: "Orders",
      icon: <OrderIcon />,
      childrens: [
        { lbl: "Orders List", icon: <ListIcon />, slug: "/orders/orders" },
        { lbl: "Rider", icon: <RiderIcon />, slug: "/orders/rider" },
        { lbl: "Suppliers", icon: <UnitIcon />, slug: "/orders/supplier" },
      ],
    },
    {
      lbl: "Settings",
      icon: <Settings />,
      childrens: [
        { lbl: "Location", icon: <HomeIcon />, slug: "/settings/location" },
        {
          lbl: "Categories",
          icon: <ProductsIcons />,
          slug: "/settings/category",
        },
        {
          lbl: "Tax Rates",
          icon: <ProductsIcons />,
          slug: "/settings/taxrate",
        },
        { lbl: "Business", icon: <ListIcon />, slug: "/settings/business" },
      ],
    },

    { lbl: "Reports", icon: <ReportIcon />, slug: "/dashboard/reports" },
  ];

  const handleLogOut = () => {
    signOut();
    // router.push("/");
  };

  return (
    <div
      className={`${
        openSidebar ? "left-0" : "-left-80"
      } fixed duration-300 top-0 bg-[#ffffff] md:left-0 py-5 pb-16 bottom-0 z-50 w-64 md:w-56 h-full border-r border-[#F0F0F0] flex flex-col justify-between`}
    >
      <div
        onClick={toggleSidebar}
        className="absolute md:hidden text-[#4f46e5] top-10 -right-4 cursor-pointer bg-[#ffffff] rounded-full border-r border-[#4f46e5] p-2"
        aria-label="Close Sidebar"
      >
        <CloseCircle />
      </div>
      <div className="w-full px-2 flex flex-col justify-center space-y-2">
        <div className="flex items-center justify-center">
          <Image
            src={"/assets/images/logo.png"}
            alt="logo"
            width={60}
            height={60}
          />
        </div>
        {navBarItems.map((item, index) => {
          const { icon, lbl, slug, childrens } = item;
          return (
            <MenuItem
              key={index}
              icon={icon}
              lbl={lbl}
              slug={slug}
              childrens={childrens}
            />
          );
        })}

        <button
          onClick={handleLogOut}
          className="flex items-center duration-300 space-x-3 hover:text-[#4540e1] p-2 rounded-lg overflow-hidden hover:bg-[#4540e133]"
        >
          <LogoutIcon />
          <h3>Logout</h3>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
