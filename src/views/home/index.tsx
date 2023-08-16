"use client";
import { GoOrganization as Organication } from "react-icons/go";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

import { useSession } from "next-auth/react";
import { useGetOrdersQuery } from "@/store/services/reportService";

export interface Order {
  id: number;
  business_id: number;
  location_id: number;
  order_no: string;
  customer_id: number;
  order_status: string;
  payment_status: string;
  order_type: string;
  total_before_tax: number;
  final_total: number;
  tax_rate_id: number;
  tax_amount: number;
  rider_id: any;
  invoice_id: any;
  source: string;
  address: string;
  discount_type: string;
  discount: number;
  created_at: string;
  updated_at: string;
  type_of_service_id: any;
  order_created_time: string;
  order_delivered_time: any;
  customer: Customer;
  order_lines: OrderLine[];
  payment_lines: PaymentLine[];
}

export interface Customer {
  id: number;
  name: string;
  business_id: number;
  mobile_no: string;
  email: string;
  email_verified_at: any;
  user_type: string;
  role_id: number;
  created_at: string;
  updated_at: string;
}

export interface OrderLine {
  id: number;
  order_id: number;
  business_id: number;
  product_id: number;
  product_variation_id: number;
  qty: number;
  unit_price_before_discount: string;
  unit_price_exc_tax: string;
  line_discount_type: string;
  line_discount_amount: number;
  discount_id: any;
  unit_price_inc_tax: string;
  item_tax: string;
  tax_id: any;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  business_id: number;
  unit_id: number;
  category_id: number;
  sub_category_id: any;
  sku: string;
  type: string;
  vendor_id: any;
  brand_id: any;
  manage_stock_status: number;
  alerty_quantity: number;
  not_for_selling: number;
  tax_type: string;
  weight: any;
  barcode_id: any;
  tax_id: any;
  created_at: string;
  updated_at: string;
  product_time_id: any;
}

export interface PaymentLine {
  id: number;
  order_id: number;
  purchase_id: any;
  business_id: number;
  method: string;
  amount: string;
  type: string;
  reference_number: any;
  payment_date: string;
  created_at: string;
  updated_at: string;
}

const Home: React.FC = () => {
  const { data: session } = useSession();

  const {
    data: ordersList,
    isLoading: ordersLoading,
    isFetching: ordersFetching,
  } = useGetOrdersQuery({
    buisnessId: session?.user?.business_id,
    // customerId: session?.user?.customer_id,
    customerId: 31,
    perPage: -1,
  });

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
      {false ? (
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
