'use client';
import Loading from '@/components/shared/loading';
import { adminRoutes } from '@/constants/end-point';
import { useFetchResourceQuery } from '@/redux/api/curd';
import React from 'react';
import { FaUser, FaUsers, FaBox, FaCheckCircle, FaTimesCircle, FaDollarSign } from 'react-icons/fa';

const Summary = () => {
    const { data: summaryData, isFetching } = useFetchResourceQuery({
        url: adminRoutes.summary
    });

    if (isFetching) return <Loading />;

    const users = summaryData?.result?.users;
    const parcels = summaryData?.result?.parcels;
    const revenue = summaryData?.result?.revenue;

    const cards = [
        {
            label: 'Total Customers',
            value: users?.totalCustomers || 0,
            icon: <FaUser className='h-8 w-8' />
        },
        {
            label: 'Total Agents',
            value: users?.totalAgents || 0,
            icon: <FaUsers className='h-8 w-8' />
        },
        { label: 'Total Parcels', value: parcels?.total || 0, icon: <FaBox className='h-8 w-8' /> },
        {
            label: 'Active Parcels',
            value: parcels?.active || 0,
            icon: <FaCheckCircle className='h-8 w-8' />
        },
        {
            label: 'Completed Parcels',
            value: parcels?.completed || 0,
            icon: <FaCheckCircle className='h-8 w-8' />
        },
        {
            label: 'Failed Parcels',
            value: parcels?.failed || 0,
            icon: <FaTimesCircle className='h-8 w-8' />
        },
        {
            label: 'Total Revenue',
            value: revenue?.totalAmount || 0,
            icon: <FaDollarSign className='h-8 w-8' />
        },
        {
            label: 'Total Delivery Fee',
            value: revenue?.totalDeliveryFee || 0,
            icon: <FaDollarSign className='h-8 w-8' />
        }
    ];

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
            {cards.map((card) => (
                <div
                    key={card.label}
                    className='flex flex-col justify-center items-center p-3 rounded shadow-md bg-white text-blue hover:scale-105 transition-transform duration-200'
                >
                    <div className='mb-3'>{card.icon}</div>
                    <div className='text-md font-medium'>{card.label}</div>
                    <div className='text-xl font-bold mt-2'>{card.value}</div>
                </div>
            ))}
        </div>
    );
};

export default Summary;
