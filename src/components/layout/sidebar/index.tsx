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
    { label: "Home", icon: <HomeIcon />, slug: "/dashboard/home" },
    {
      label: "User Management",
      icon: <UserManagementIcon />,
      childrens: [
        {
          label: "Users",
          icon: <UserCircle />,
          slug: "/user-management/users",
        },
        {
          label: "Role",
          icon: <HomeIcon />,
          slug: "/user-management/usermanagement",
        },
      ],
    },
    {
      label: "Services",
      icon: <ServicesIcon />,
      childrens: [
        {
          label: "Types of services",
          icon: <ServiceIcon />,
          slug: "/services/type-of-services",
        },
      ],
    },
    {
      label: "Product",
      icon: <ProductsIcons />,
      childrens: [
        {
          label: "Product List",
          icon: <ListIcon />,
          slug: "/product/products",
        },
        { label: "Brand", icon: <BrandIcon />, slug: "/product/brand" },
        { label: "Bar Codes", icon: <BarcodeIcon />, slug: "/product/barcode" },
        {
          label: "Variation",
          icon: <VariationIcon />,
          slug: "/product/variation",
        },
        {
          label: "Purchase",
          icon: <PurchaseIcon />,
          slug: "/product/purchase",
        },
        {
          label: "Purchase-Time",
          icon: <PurchaseTimeIcon />,
          slug: "/product/purchasetime",
        },
        { label: "Units", icon: <UnitIcon />, slug: "/product/units" },
      ],
    },
    {
      label: "Orders",
      icon: <OrderIcon />,
      childrens: [
        { label: "Orders List", icon: <ListIcon />, slug: "/orders/orders" },
        { label: "Rider", icon: <RiderIcon />, slug: "/orders/rider" },
        { label: "Suppliers", icon: <UnitIcon />, slug: "/orders/supplier" },
      ],
    },
    {
      label: "Settings",
      icon: <Settings />,
      childrens: [
        { label: "Location", icon: <HomeIcon />, slug: "/settings/location" },
        {
          label: "Categories",
          icon: <ProductsIcons />,
          slug: "/settings/category",
        },
        {
          label: "Tax Rates",
          icon: <ProductsIcons />,
          slug: "/settings/taxrate",
        },
        { label: "Business", icon: <ListIcon />, slug: "/settings/business" },
      ],
    },

    { label: "Reports", icon: <ReportIcon />, slug: "/dashboard/reports" },
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
          const { icon, label, slug, childrens } = item;
          return (
            <MenuItem
              key={index}
              icon={icon}
              label={label}
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
