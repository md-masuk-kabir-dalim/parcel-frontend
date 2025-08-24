'use client';
import React, { useState } from 'react';
import { icons } from '@/constants/icons';
import useToaster from '@/hooks/useToaster';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteResourceMutation, useFetchResourceQuery } from '@/redux/api/curd';
import { hideAlert, showAlert } from '@/redux/features/action/alertActions';
import { useDebounced } from '@/hooks/useDebounce';
import Loading from '@/components/shared/loading';
import DataTable from '@/components/common/data_table';
import CustomPagination from '@/components/common/custom_pagination';
import { CustomAlert } from '@/components/common/alert_dialog';
import { parcelRoutes } from '@/constants/end-point';

const MyParcel = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState('');
    const showToast = useToaster();
    const dispatch = useDispatch();
    const alert = useSelector((state: any) => state.alert);
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

    // ✅ Fetch parcels
    const {
        data: allParcels,
        isLoading,
        refetch
    } = useFetchResourceQuery({
        url: parcelRoutes.getParcelList,
        params: {
            page: currentPage,
            limit: pageSize,
            searchText: searchTerm
        }
    });
    console.log(allParcels);
    const [deleteParcel] = useDeleteResourceMutation();

    const headers = [
        { text: '#', key: 'sl' },
        { text: 'Image', key: 'image' },
        { text: 'Title', key: 'title' },
        { text: 'Customer', key: 'customer' }
    ];

    const handleConfirm = async () => {
        if (deleteItemId) {
            try {
                const res: any = await deleteParcel({
                    url: `/parcels/${deleteItemId}`
                }).unwrap();

                if (res?.isSuccess) {
                    showToast('success', 'Parcel deleted successfully');
                    refetch();
                }
            } catch (error) {
                showToast('error', `${error}`);
            } finally {
                setDeleteItemId(null);
                dispatch(hideAlert());
            }
        }
    };

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

    const actions = [
        {
            label: <icons.editIcon />,
            link: (row: any) => `/dashboard/parcels/edit/${row?._id}`
        },
        {
            label: <icons.deleteIcon />,
            onClick: (row: any) => handleShowDeleteAlert(row?._id)
        }
    ];

    // ✅ Debounced Search
    const debouncedSearchTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 600
    });

    // ✅ Table Data Mapping (backend → table)
    const tableData = allParcels?.result?.data?.map((parcel: any, index: number) => ({
        sl: index + 1 + (currentPage - 1) * pageSize,
        _id: parcel?.id,
        image: parcel?.images?.viewUrl || '',
        title: parcel?.title || '',
        customer: parcel?.customer?.username || ''
    }));

    if (isLoading) return <Loading />;

    return (
        <div className='pt-5 pb-10'>
            <DataTable
                headers={headers}
                data={[]}
                actions={actions}
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
                    onConfirm={handleConfirm}
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
