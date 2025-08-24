'use client';
import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchResourceQuery, useDeleteResourceMutation } from '@/redux/api/curd';
import { hideAlert, showAlert } from '@/redux/features/action/alertActions';
import { useDebounced } from '@/hooks/useDebounce';
import useToaster from '@/hooks/useToaster';
import DataTable from '@/components/common/data_table';
import CustomPagination from '@/components/common/custom_pagination';
import { CustomAlert } from '@/components/common/alert_dialog';
import { parcelRoutes } from '@/constants/end-point';
import { icons } from '@/constants/icons';
import { tagTypes } from '@/redux/tag-types';

const MyParcel: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
    const dispatch = useDispatch();
    const alert = useSelector((state: any) => state.alert);
    const showToast = useToaster();

    // Debounced search term
    const debouncedSearchTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 600
    });

    const {
        data: allParcels,
        isFetching,
        refetch
    } = useFetchResourceQuery({
        url: parcelRoutes.getParcelList,
        params: {
            page: currentPage,
            limit: pageSize,
            searchText: debouncedSearchTerm
        },
        tags: tagTypes.parcelList
    });

    const [deleteParcel] = useDeleteResourceMutation();

    // Table headers
    const headers = [
        { text: '#', key: 'sl' },
        { text: 'Parcel ID', key: 'parcelId' },
        { text: 'Customer', key: 'customer' },
        { text: 'Agent', key: 'agent' },
        { text: 'Pickup', key: 'pickupLocation' },
        { text: 'Dropoff', key: 'dropoffLocation' },
        { text: 'Weight', key: 'weight' },
        { text: 'Type', key: 'type' },
        { text: 'Status', key: 'status' }
    ];

    const tableData = useMemo(() => {
        return (
            allParcels?.result?.data?.map((parcel: any, index: number) => ({
                sl: index + 1 + (currentPage - 1) * pageSize,
                _id: parcel.id,
                parcelId: parcel.parcelId,
                customer: parcel.customer?.username || 'N/A',
                agent: parcel.agent?.username || 'N/A',
                status: parcel?.status ?? 'N/A',
                pickupLocation: parcel.pickupLocation?.address || 'N/A',
                dropoffLocation: parcel.dropoffLocation?.address || 'N/A',
                weight: parcel?.weight ?? 'N/A',
                type: parcel?.type ?? 'N/A'
            })) || []
        );
    }, [allParcels, currentPage, pageSize]);

    // Delete handlers
    const handleShowDeleteAlert = (id: string) => {
        setDeleteItemId(id);
        dispatch(
            showAlert({
                title: 'Confirm Action',
                description: 'Are you sure you want to delete this parcel?',
                confirmLabel: 'Yes, Delete',
                cancelLabel: 'No, Cancel',
                alertType: 'deleteItem'
            })
        );
    };

    const handleConfirmDelete = async () => {
        if (!deleteItemId) return;
        try {
            const res: any = await deleteParcel({
                url: parcelRoutes.deleteParcel(deleteItemId),
                tags: tagTypes.parcelList
            }).unwrap();
            if (res?.success) {
                showToast('success', 'Parcel deleted successfully');
                refetch();
            }
        } catch (error: any) {
            showToast('error', error?.data?.message || 'Something went wrong');
        } finally {
            setDeleteItemId(null);
            dispatch(hideAlert());
        }
    };

    // Actions for each row
    const actions = [
        {
            label: <icons.deleteIcon />,
            onClick: (row: any) => handleShowDeleteAlert(row._id)
        }
    ];

    return (
        <div className='pt-5 pb-10'>
            <DataTable
                headers={headers}
                data={tableData}
                actions={actions}
                isFetching={isFetching}
                setSearchTerm={setSearchTerm}
                createButtonText='Create'
                createPageLink='/dashboard/customer/parcel-create'
            />
            <CustomPagination
                totalPages={allParcels?.result?.meta?.totalPage || 1}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                pageSizeOptions={[10, 20, 50]}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
            />
            {alert.isOpen && (
                <CustomAlert
                    title={alert.title}
                    description={alert.description}
                    confirmLabel={alert.confirmLabel}
                    cancelLabel={alert.cancelLabel}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => {
                        setDeleteItemId(null);
                        dispatch(hideAlert());
                    }}
                    isOpen={alert.isOpen}
                />
            )}
        </div>
    );
};

export default MyParcel;
