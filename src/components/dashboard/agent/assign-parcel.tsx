'use client';
import React, { useState, useMemo } from 'react';
import { useFetchResourceQuery } from '@/redux/api/curd';
import { useDebounced } from '@/hooks/useDebounce';
import DataTable from '@/components/common/data_table';
import CustomPagination from '@/components/common/custom_pagination';
import { parcelRoutes } from '@/constants/end-point';
import { icons } from '@/constants/icons';
import { tagTypes } from '@/redux/tag-types';

const parcelTypes = [
    { value: 'UNASSIGNED', label: 'UNASSIGNED' },
    { value: 'ASSIGNED', label: 'ASSIGNED' },
    { value: 'PICKED_UP', label: 'PICKED UP' },
    { value: 'IN_TRANSIT', label: 'IN TRANSIT' },
    { value: 'DELIVERED', label: 'DELIVERED' },
    { value: 'FAILED', label: 'FAILED' }
];

const AssignParcel = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterType, setFilterType] = useState<string>('');


    // Debounced search term
    const debouncedSearchTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 600
    });

    const { data: allParcels, isFetching } = useFetchResourceQuery({
        url: parcelRoutes.getParcelList,
        params: {
            page: currentPage,
            limit: pageSize,
            searchText: debouncedSearchTerm,
            status: filterType
        },
        tags: tagTypes.parcelList
    });

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

    // Actions for each row
    const actions = [
        {
            label: <icons.editIcon />,
            onClick: (row: any) => row._id
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
                filterType={filterType}
                setFilterType={setFilterType}
                filterData={parcelTypes}
            />
            <CustomPagination
                totalPages={allParcels?.result?.meta?.totalPage || 1}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                pageSizeOptions={[10, 20, 50]}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
            />
        </div>
    );
};

export default AssignParcel;
