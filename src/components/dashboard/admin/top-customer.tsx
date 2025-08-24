'use client';
import Loading from '@/components/shared/loading';
import { adminRoutes } from '@/constants/end-point';
import { useFetchResourceQuery } from '@/redux/api/curd';
import React from 'react';

interface Customer {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    totalParcels?: number;
    totalSpent?: number;
}

const TopCustomerTable = () => {
    const { data: topCustomerData, isFetching } = useFetchResourceQuery({
        url: adminRoutes.topCustomers
    });

    if (isFetching) return <Loading />;

    const customers: Customer[] = topCustomerData?.result || [];

    return (
        <div className='p-3 bg-white rounded-sm shadow-md'>
            <h2 className='text-xl font-bold mb-4 text-gray-800'>Top Customers</h2>
            <div className='overflow-x-auto'>
                <table className='min-w-full border border-gray-300'>
                    <thead className='bg-blue text-white'>
                        <tr>
                            <th className='border px-4 py-2 text-left'>#</th>
                            <th className='border px-4 py-2 text-left'>Name</th>
                            <th className='border px-4 py-2 text-left'>Email</th>
                            <th className='border px-4 py-2 text-left'>Phone</th>
                            <th className='border px-4 py-2 text-left'>Joined</th>
                            <th className='border px-4 py-2 text-left'>Total Parcels</th>
                            <th className='border px-4 py-2 text-left'>Total Spent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={customer.id} className='hover:bg-gray-50 transition-colors'>
                                <td className='border px-4 py-2 text-center font-bold text-red-500'>
                                    {index + 1}
                                </td>
                                <td className='border px-4 py-2 text-black font-semibold'>
                                    {customer.username}
                                </td>
                                <td className='border px-4 py-2'>{customer.email}</td>
                                <td className='border px-4 py-2'>{customer.phoneNumber}</td>
                                <td className='border px-4 py-2'>
                                    {new Date(customer.createdAt).toLocaleDateString()}
                                </td>
                                <td className='border px-4 py-2 font-medium'>
                                    {customer.totalParcels || 0}
                                </td>
                                <td className='border px-4 py-2 font-medium'>
                                    ${customer.totalSpent || 0}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopCustomerTable;
