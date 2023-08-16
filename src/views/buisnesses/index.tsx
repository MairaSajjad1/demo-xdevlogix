"use client";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
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
import BuisnessForm from "./BuisnessForm";
import { useGetBuisnessesQuery } from "@/store/services/buisnessService";
import DeleteModal from "@/components/modal/delete-modal";
import { useSession } from "next-auth/react";

export interface Buisness {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  tax_id: any;
  country: string;
  created_at: string;
  updated_at: string;
  last_updated_by: any;
}

const Buisnesses: FC = () => {
  // GET
  const {
    data: buisnessList,
    isLoading: buisnessLoading,
    isFetching: buisnessFetching,
    // @ts-ignore
  } = useGetBuisnessesQuery();

  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedBuisness, setSelectedBuisness] = useState<Buisness | null>(
    null
  );

  const columns: ColumnDef<Buisness | null>[] = useMemo(
    () => [
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
        accessorKey: "address",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Address" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("address")}</div>
            ) : (
              <Skeleton className="w-40 lg:w-56 h-4 bg-[#F5f5f5]" />
            )}
          </>
        ),
        enableSorting: true,
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

  const handleEdit = (data: Buisness | null) => {
    setSelectedBuisness(data);
    toggleModal();
  };

  const handleDelete = (data: Buisness | null) => {
    setSelectedBuisness(data);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    toast.error("Delete API is not implemented yet.");
    toggleDeleteModal();
  };

  useEffect(() => {
    if (!open && !openDelete) {
      setSelectedBuisness(null);
    }
  }, [open, openDelete]);

  return (
    <>
      <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl text-[#4741E1]">Buisnesses</h1>
            <p className="font-medium text-sm">A List of all the buisnesses</p>
          </div>
          <Button onClick={toggleModal} size={"sm"}>
            <PlusCircle className="mr-2 w-4 h-4" />
            Add Buisness
          </Button>
        </div>
        <Separator />
        <Table
          // @ts-expect-error
          columns={columns}
          data={
            buisnessLoading || buisnessFetching
              ? loadingData
              : buisnessList || []
          }
          filterKey="name"
        />
      </div>
      <Modal
        title={selectedBuisness ? "Update Service" : "Add New Service Type"}
        open={open}
        setOpen={toggleModal}
        body={<BuisnessForm setOpen={toggleModal} data={selectedBuisness} />}
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

export default Buisnesses;
