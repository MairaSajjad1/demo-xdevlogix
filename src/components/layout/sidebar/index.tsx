import { FC, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { AiOutlineCloseCircle as CloseCircle } from "react-icons/ai";
import {
  HiOutlineUserCircle as UserCircle,
  HiOutlineLocationMarker as Location,
} from "react-icons/hi";
import { BsArrowRight as Right, BsArrowLeft as Left } from "react-icons/bs";
import { FiSettings as Settings } from "react-icons/fi";
import {
  RiContactsBook2Line as Contacts,
  RiEBike2Line as Rider,
} from "react-icons/ri";
import {
  BiCategory as Category,
  BiDollarCircle as Buisness,
  BiBarcodeReader as Barcode,
} from "react-icons/bi";
import { TbReceiptTax as Tax } from "react-icons/tb";
import { PiCertificateBold as Brand } from "react-icons/pi";
// Custom Components
import MenuItem from "./MenuItem";

// Custom Icons
import {
  HomeIcon,
  ReportIcon,
  VariationIcon,
  OrderIcon,
  ServiceIcon,
  UserManagementIcon,
  ServicesIcon,
  ListIcon,
  UnitIcon,
  ProductsIcons,
  PurchaseIcon,
} from "@/assets/icons";

import { MenuIcon } from "@/assets/icons";
interface SidebarProps {
  openSidebar: boolean;
  toggleSidebar: () => void;
  toggleOpen: () => void;
  open: boolean;
}

const Sidebar: FC<SidebarProps> = ({
  openSidebar,
  toggleSidebar,
  toggleOpen,
  open,
}) => {
  const navBarItems = [
    { label: "Dashboard", icon: <HomeIcon />, slug: "/dashboard/home" },
    {
      label: "Contacts",
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
          slug: "/user-management/roles",
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
          slug: "/products/products-list",
        },
        { label: "Brand", icon: <Brand />, slug: "/products/brands" },
        {
          label: "Bar Codes",
          icon: <Barcode />,
          slug: "/products/bar-codes",
        },
        {
          label: "Variation",
          icon: <VariationIcon />,
          slug: "/products/variations",
        },
        {
          label: "Purchase",
          icon: <PurchaseIcon />,
          slug: "/products/purchases",
        },
        { label: "Units", icon: <UnitIcon />, slug: "/products/units" },
      ],
    },
    {
      label: "Orders",
      icon: <OrderIcon />,
      childrens: [
        {
          label: "Orders List",
          icon: <ListIcon />,
          slug: "/orders/orders-list",
        },
      ],
    },
    {
      label: "Contacts",
      icon: <Contacts />,
      childrens: [
        { label: "Rider", icon: <Rider />, slug: "/contacts/riders" },
        { label: "Suppliers", icon: <UnitIcon />, slug: "/contacts/suppliers" },
      ],
    },
    {
      label: "Settings",
      icon: <Settings />,
      childrens: [
        { label: "Location", icon: <Location />, slug: "/settings/locations" },
        {
          label: "Categories",
          icon: <Category />,
          slug: "/settings/categories",
        },
        {
          label: "Tax Rates",
          icon: <Tax />,
          slug: "/settings/taxrates",
        },
        { label: "Business", icon: <Buisness />, slug: "/settings/buisnesses" },
      ],
    },
    { label: "Reports", icon: <ReportIcon />, slug: "/dashboard/reports" },
  ];

  const toggleIsHovered = () => {
    if (!open) toggleOpen();
  };

  const sidebarContainerClasses = classNames(
    "fixed duration-500 top-0 scrollbar overflow-y-scroll bg-[#ffffff] md:left-0 pt-5 pb-2 z-40  bottom-0  h-full border-r border-[#F0F0F0] flex flex-col justify-between",
    {
      "-left-80": !openSidebar,
      "left-0": openSidebar,
      "md:w-14": !open,
      "md:w-56": open,
    }
  );

  return (
    <>
      <div className={sidebarContainerClasses}>
        <div className="relative">
          <div
            onClick={toggleSidebar}
            className={`fixed  z-40 md:hidden text-[#4f46e5] top-10  cursor-pointer bg-[#ffffff] rounded-full border-r border-[#4f46e5] p-2 duration-500 ${
              openSidebar ? "left-[199px]" : "-left-80"
            }`}
            aria-label="Close Sidebar"
          >
            <CloseCircle />
          </div>
          <div
            onClick={toggleOpen}
            className={`fixed duration-500  z-40 hidden md:block rounded-full border border-[#F0F0F0] p-1  cursor-pointer bg-[#FFFFFF] ${
              open ? "left-52" : "left-11"
            }`}
          >
            {open ? <Left /> : <Right />}
            {/* <MenuIcon /> */}
          </div>
          <div
            onMouseEnter={toggleIsHovered}
            onMouseLeave={toggleIsHovered}
            className="w-full flex-1 px-2 flex flex-col justify-center space-y-2"
          >
            <div className="flex items-center justify-center">
              <Image
                src={"/assets/images/logo.png"}
                alt="logo"
                width={60}
                height={60}
                priority
              />
            </div>
            <div className="flex-1 space-y-1">
              {navBarItems.map((item, index) => {
                const { icon, label, slug, childrens } = item;
                return (
                  <MenuItem
                    open={open}
                    key={index}
                    icon={icon}
                    label={label}
                    slug={slug}
                    childrens={childrens}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
