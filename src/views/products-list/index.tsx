"use client";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ColumnDef } from "@tanstack/react-table";
import { GoPlusCircle as PlusCircle } from "react-icons/go";
import {GoChevronDown as ChevronDown} from  "react-icons/go";
import Table from "@/components/table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal";
import DeleteModal from "@/components/modal/delete-modal";
import { useSession } from "next-auth/react";
import { useGetLocationsQuery } from "@/store/services/locationService";
import { Variation, VariationTemplate } from "../variations";
import { useGetProductsQuery } from "@/store/services/productService";
import Image from "next/image";

export interface ProductImage {
  id: number;
  business_id: number;
  product_id: number;
  slug: string;
  created_at: string;
  updated_at: string;
  image_url: string;
}

export interface ProductVariation {
  id: number;
  product_id: number;
  variation_id: number;
  business_id: number;
  variation_template_id: string;
  last_updated_by: any;
  created_at: string;
  updated_at: string;
  variations: Omit<Variation, "variation_template">;
  variation_template: VariationTemplate;
  product_price: ProductPrice;
}

export interface ProductPrice {
  id: number;
  product_variation_id: number;
  tax_type: string;
  price_exclusive_tax: string;
  price_inclusive_tax: string;
  profit_margin: string;
  selling_price: string;
  selling_price_inc_tax: string;
  business_id: number;
  tax_id: any;
  last_updated_by: any;
  created_at: string;
  updated_at: string;
}

export interface ProductStock {
  id: number;
  business_id: number;
  location_id: number;
  product_id: number;
  product_variation_id: number;
  last_updated_by: any;
  quantity_available: number;
  created_at: string;
  updated_at: string;
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
  product_images: ProductImage[];
  product_time: any[];
  product_variations: ProductVariation[];
  product_stock: ProductStock[];
}

const ProductsList: FC = () => {
  const { data: session } = useSession();
  // GET
  const {
    data: productsList,
    isLoading: productsLoading,
    isFetching: productsFetching,
  } = useGetProductsQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedProductList, setSelectedProductList] =
    useState<Product | null>(null);

  const columns: ColumnDef<Product | null>[] = useMemo(
    () => [
      {
        accessorKey: "product_images",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Image" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>
                {/* <Image
                  src={
                    (row.getValue("product_images") as ProductImage[])?.[0]
                      .image_url
                  }
                  alt={
                    (row.getValue("product_images") as ProductImage[])?.[0]
                      ?.id as unknown as string
                  }
                  width={40}
                  height={40}
                  className="rounded-full"
                /> */}
              </div>
            ) : (
              <Skeleton className="w-10 h-10 rounded-full bg-[#F5f5f5]" />
            )}
          </>
        ),
        enableSorting: false,
        enableHiding: true,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("name")}</div>
            ) : (
              <Skeleton className="w-40 h-4 bg-[#F5f5f5]" />
            )}
          </>
        ),
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "landmark",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Landmark" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("landmark")}</div>
            ) : (
              <Skeleton className="w-40 lg:w-56 h-4 bg-[#F5f5f5]" />
            )}
          </>
        ),
        enableSorting: false,
        enableHiding: true,
      },
      {
        accessorKey: "city",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="City" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("city")}</div>
            ) : (
              <Skeleton className={`w-10 lg:w-16 h-4 bg-[#F5f5f5]`} />
            )}
          </>
        ),
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "state",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="State" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("state")}</div>
            ) : (
              <Skeleton className={`w-10 lg:w-16 h-4 bg-[#F5f5f5]`} />
            )}
          </>
        ),
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "country",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Country" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("country")}</div>
            ) : (
              <Skeleton className={`w-10 lg:w-16 h-4 bg-[#F5f5f5]`} />
            )}
          </>
        ),
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DataTableRowActions
            deleteAction={handleDelete}
            editAction={handleEdit}
            row={row}
          />
        ),
      },
    ],
    []
  );

  const loadingData = Array.from({ length: 10 }, () => null);

  const toggleModal = useCallback(() => {
    setOpen((open) => !open);
  }, [open]);

  const toggleDeleteModal = useCallback(() => {
    setOpenDelete((open) => !open);
  }, [open]);

  const handleEdit = (data: Product | null) => {
    setSelectedProductList(data);
    toggleModal();
  };

  const handleDelete = (data: Product | null) => {
    setSelectedProductList(data);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    toast.error("Delete API is not implemented yet.");
    toggleDeleteModal();
  };

  useEffect(() => {
    if (!open && !openDelete) {
      setSelectedProductList(null);
    }
  }, [open, openDelete]);

  return (
    <>
      <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl text-[#4741E1]">Products</h1>
            <p className="font-medium text-sm">A List of all the Products.</p>
          </div>
          <Button onClick={toggleModal} size={"sm"}>
            <PlusCircle className="mr-2 w-4 h-4" />
            Add Product
          </Button>
        </div>
        <Separator />
        <Table
          // @ts-expect-error
          columns={columns}
          data={
            productsLoading || productsFetching
              ? loadingData
              : productsList || []
          }
          filterKey="name"
        />
      </div>
      {/* <Modal
        title={selectedProductList ? "Update Order" : "Add New Order"}
        open={open}
        setOpen={toggleModal}
        body={<OrderForm setOpen={toggleModal} data={selectedProductList} />}
      /> */}
      <DeleteModal
        open={openDelete}
        setOpen={toggleDeleteModal}
        loading={false}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default ProductsList;
