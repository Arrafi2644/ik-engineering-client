
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

import { useServices } from "@/hooks/useServices";
// import { useDeleteService } from "@/hooks/useDeleteService";

// import ServiceDetailsModal from "@/components/dashboard/service/ServiceDetailsModal";
import { IService } from "@/types";
import { DynamicDataTable } from "@/components/DataTable";
import UpdateServiceModal from "./UpdateServiceModal";
import DeleteAlert from "@/components/DeleteAlert";
import TablePagination from "@/components/TablePagination";
import ServiceToolbar from "@/components/ServiceToolbar";
import DashboardPageHeader from "@/components/DashboardPageHeader";
import DashboardManagementPageSkeleton from "@/components/DashboardManagePageSkeleton";
import axios from "axios";
import ServiceDetailsModal from "@/components/ServiceDetailsModal";

const ServiceManagementPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sort, setSort] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  const { isPending, error, data, refetch } = useServices({
    ...(searchTerm && { searchTerm }),
    ...(sort && { sort }),
    page,
    limit,
  });

  // Modal states
  const [selectedService, setSelectedService] = React.useState<IService | null>(null);
  const [openViewModal, setOpenViewModal] = React.useState(false);

  const [serviceToUpdate, setServiceToUpdate] = React.useState<IService | null>(null);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);

  const [serviceToDelete, setServiceToDelete] = React.useState<IService | null>(null);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  // ✅ Delete handler
  const handleDelete = async (service: IService) => {
    try {
      const res = await axios.delete(`http://localhost:3005/api/service/${service._id}`);
      if (res.data.success) {
        toast.success("Service deleted successfully");
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete service");
    }

  };

  // Table columns
  const columns: ColumnDef<IService>[] = [
    { accessorKey: "title", header: "Title" },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },
  ];

  // Row actions
  const actions = [
    {
      label: "View",
      onClick: (service: IService) => {
        setSelectedService(service);
        setOpenViewModal(true);
      },
    },
    {
      label: "Edit",
      onClick: (service: IService) => {
        setServiceToUpdate(service);
        setOpenUpdateModal(true);
      },
    },
    {
      label: "Delete",
      onClick: (service: IService) => {
        setServiceToDelete(service);
        setOpenDeleteAlert(true);
      },
    },
  ];

  if (isPending) return <DashboardManagementPageSkeleton />;
  if (error) return <p>Error loading services.</p>;

  return (
    <div>
      <DashboardPageHeader title="Service Management" />

      <ServiceToolbar
        onSearchChange={setSearchTerm}
        onSortChange={setSort}
      />

      <DynamicDataTable
        columns={columns}
        data={data?.data ?? []}
        actions={actions}
      />

      {/* Pagination */}
      <TablePagination
        currentPage={page}
        totalPages={data?.meta?.totalPage ?? 1}
        onPageChange={setPage}
      />

      {/* View Modal */}
      {selectedService && (
        <ServiceDetailsModal
          open={openViewModal}
          onOpenChange={setOpenViewModal}
          service={selectedService}
        />
      )}

      {/* Update Modal */}
      {serviceToUpdate && (
        <UpdateServiceModal
          open={openUpdateModal}
          onOpenChange={setOpenUpdateModal}
          service={serviceToUpdate}
        />
      )}

      {/* Delete Confirmation */}
      {serviceToDelete && (
        <DeleteAlert
          open={openDeleteAlert}
          onOpenChange={setOpenDeleteAlert}
          description={`Are you sure you want to delete "${serviceToDelete.title}"? This action is permanent and cannot be undone.`}
          onConfirm={async () => {
            await handleDelete(serviceToDelete);
            setOpenDeleteAlert(false);
            setServiceToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default ServiceManagementPage;