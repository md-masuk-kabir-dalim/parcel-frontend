'use client';
import { CustomAlert } from '@/components/common/alert_dialog';
import CustomPagination from '@/components/common/custom_pagination';
import DataTable from '@/components/common/data_table';
import { usersRoutes } from '@/constants/end-point';
import { icons } from '@/constants/icons';
import { useDebounced } from '@/hooks/useDebounce';
import useToaster from '@/hooks/useToaster';
import { useDeleteResourceMutation, useFetchResourceQuery } from '@/redux/api/curd';
import { hideAlert, showAlert } from '@/redux/features/action/alertActions';
import { tagTypes } from '@/redux/tag-types';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ManageAgent = () => {
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
        data: allUsers,
        isFetching,
        refetch
    } = useFetchResourceQuery({
        url: usersRoutes.getAllUsers,
        params: {
            page: currentPage,
            limit: pageSize,
            role: 'DELIVERY_AGENT',
            searchText: debouncedSearchTerm
        }
    });

    const [deleteUser] = useDeleteResourceMutation();

    // Table headers
    const headers = [
        { text: '#', key: 'sl' },
        { text: 'Agent', key: 'agent' },
        { text: 'Email', key: 'email' },
        { text: 'Gender', key: 'gender' },
        { text: 'Date Of Birth', key: 'dateOfBirth' },
        { text: 'Phone Number', key: 'phoneNumber' },
        { text: 'Role', key: 'role' },
        { text: 'CreatedAt', key: 'createdAt' }
    ];

    const tableData = useMemo(() => {
        return (
            allUsers?.result?.users?.map((user: any, index: number) => ({
                sl: index + 1 + (currentPage - 1) * pageSize,
                _id: user.id,
                agent: user?.username || 'N/A',
                email: user?.email ?? 'N/A',
                gender: user?.gender ?? 'N/A',
                dateOfBirth: user?.dateOfBirth ?? 'N/A',
                createdAt: user?.createdAt || 'N/A',
                phoneNumber: user?.phoneNumber || 'N/A',
                role: user.role ?? 'N/A'
            })) || []
        );
    }, [allUsers, currentPage, pageSize]);

    // Delete handlers
    const handleShowDeleteAlert = (id: string) => {
        setDeleteItemId(id);
        dispatch(
            showAlert({
                title: 'Confirm Action',
                description: 'Are you sure you want to delete this user?',
                confirmLabel: 'Yes, Delete',
                cancelLabel: 'No, Cancel',
                alertType: 'deleteItem'
            })
        );
    };

    const handleConfirmDelete = async () => {
        if (!deleteItemId) return;
        try {
            const res: any = await deleteUser({ url: `/users/${deleteItemId}` }).unwrap();
            if (res?.isSuccess) {
                showToast('success', 'user deleted successfully');
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
            />
            <CustomPagination
                totalPages={allUsers?.result?.meta?.totalPage || 1}
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

export default ManageAgent;
