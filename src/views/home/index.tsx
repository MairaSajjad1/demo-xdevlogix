"use client";
import { GoOrganization as Organication } from "react-icons/go";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

import { useSession } from "next-auth/react";

const Home: React.FC = () => {
  const { data: session } = useSession();
  const reportList = [
    {
      tag: "Orders",
      icon: <Organication />,
      number: true ? "120" : "00",
      slug: `/reports/order`,
    },
    {
      tag: "Users",
      icon: <Organication />,
      number: "345",
      slug: "/",
    },
    { tag: "Categories", icon: <Organication />, number: "92", slug: "/" },
    { tag: "Products", icon: <Organication />, number: "110", slug: "/" },
    {
      tag: "Orders",
      icon: <Organication />,
      number: "234",
      slug: "/",
    },
    {
      tag: "Users",
      icon: <Organication />,
      number: "345",
      slug: "/",
    },
    { tag: "Categories", icon: <Organication />, number: "92", slug: "/" },
    { tag: "Products", icon: <Organication />, number: "110", slug: "/" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {true ? (
        <>
          {/* {ordersLoading || ordersFetching ? <Loader /> : <></>} */}
          {Array.from({ length: 8 }, (_, i) => i + 1).map((id) => (
            <div
              key={id}
              className="bg-[#FFFFFF] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[30px] rounded-bl-[30px] shadow-lg border border-[#dcdcdc] h-40 p-3 flex items-center cursor-pointer gap-7"
            >
              <Skeleton className="h-14 w-14 rounded-tl-[4px] rounded-br-[4px] rounded-tr-[10px] rounded-bl-[10px] text-[#ffffff] bg-[#4f46e5cc] flex items-center justify-center"></Skeleton>
              <div className="flex flex-col gap-2 text-black">
                <Skeleton className="text-3xl w-10 h-5 bg-[#f5f5f5]"></Skeleton>
                <Skeleton className="text-3xl w-20 h-5 bg-[#f5f5f5]"></Skeleton>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {reportList.map((item, index) => (
            <Link key={index} href={item.slug}>
              <div className="bg-[#FFFFFF] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[30px] rounded-bl-[30px] shadow-lg border border-[#dcdcdc] h-40 p-3 flex items-center cursor-pointer gap-7">
                <div className="h-14 w-14 rounded-tl-[4px] rounded-br-[4px] rounded-tr-[10px] rounded-bl-[10px] text-[#ffffff] bg-[#4f46e5cc] flex items-center justify-center">
                  <Organication />
                </div>
                <div className="flex flex-col text-black">
                  <div className="text-3xl font-bold">{item.number}</div>
                  <div className="text-xl font-semibold">{item.tag}</div>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
