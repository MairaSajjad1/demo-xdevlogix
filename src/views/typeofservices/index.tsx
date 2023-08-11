"use client";
import { FC, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ColumnDef } from "@tanstack/react-table";
import { GoPlusCircle as PlusCircle } from "react-icons/go";
import Table from "@/components/table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal";
import ServiceForm from "./ServiceForm";
import DeleteModal from "@/components/modal/delete-modal";
import { useGetTypeOfServiceQuery } from "@/store/services/typeOfServiceService";
import { RootState } from "@/store";
import { useSession } from "next-auth/react";

export interface TypeOfService {
  id: number;
  name: string;
  description: string;
  charge_type: string;
  charge: string;
  business_id: number;
  created_at: string;
  updated_at: string;
}

const TypeOfService: FC = () => {
  const s = useSession();
  console.log({ s });
  const { buisnessId } = useSelector((state: RootState) => state.authReducer);
  const {
    data: typeOfServicesList,
    isLoading: typeOfServiceLoading,
    isFetching: typeOfServiceFetching,
  } = useGetTypeOfServiceQuery({ buisnessId, perPage: -1 });

  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedTypeOfService, setSelectedTypeOfService] =
    useState<TypeOfService | null>(null);

  const columns: ColumnDef<TypeOfService | null>[] = useMemo(
    () => [
      // {
      //   id: "select",
      //   header: ({ table }) => (
      //     <Checkbox
      //       checked={table.getIsAllPageRowsSelected()}
      //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      //       aria-label="Select all"
      //       className="translate-y-[2px]"
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <Checkbox
      //       checked={row.getIsSelected()}
      //       onCheckedChange={(value) => row.toggleSelected(!!value)}
      //       aria-label="Select row"
      //       className="translate-y-[2px]"
      //     />
      //   ),
      //   enableSorting: false,
      //   enableHiding: false,
      // },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div className="w-40">{row.getValue("name")}</div>
            ) : (
              <Skeleton className="w-40 h-4 bg-[#F5f5f5]" />
            )}
          </>
        ),
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "description",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("description")}</div>
            ) : (
              <Skeleton className="w-40 lg:w-56 h-4 bg-[#F5f5f5]" />
            )}
          </>
        ),
        enableSorting: false,
        enableHiding: true,
      },
      {
        accessorKey: "charge",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Charges" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div className="w-[80px]">{row.getValue("charge")}</div>
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

  const handleEdit = (data: TypeOfService | null) => {
    setSelectedTypeOfService(data);
    toggleModal();
  };

  const handleDelete = (data: TypeOfService | null) => {
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    toast.error("Delete Api Is Not Implemented yet.");
    toggleDeleteModal();
  };

  return (
    <>
      <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl text-[#4741E1]">
              Type of Services
            </h1>
            <p className="font-medium text-sm">
              A List of all type of services
            </p>
          </div>
          <Button onClick={toggleModal} size={"sm"}>
            <PlusCircle className="mr-2 w-4 h-4" />
            Add Service
          </Button>
        </div>
        <Separator />
        <Table
          // @ts-expect-error
          columns={columns}
          data={
            typeOfServiceLoading || typeOfServiceFetching
              ? loadingData
              : typeOfServicesList?.data || []
          }
          filterKey="name"
        />
      </div>
      <Modal
        title={
          selectedTypeOfService ? "Update Service" : "Add New Service Type"
        }
        open={open}
        setOpen={toggleModal}
        body={
          <ServiceForm setOpen={toggleModal} data={selectedTypeOfService} />
        }
      />
      <DeleteModal
        open={openDelete}
        setOpen={toggleDeleteModal}
        loading={false}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default TypeOfService;
