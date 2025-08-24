'use client';
import Loading from '@/components/shared/loading';
import { adminRoutes } from '@/constants/end-point';
import { useFetchResourceQuery } from '@/redux/api/curd';
import React from 'react';

interface Agent {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    delivered: number;
    revenueHandled: number;
}

const TopAgentTable = () => {
    const { data: topAgentData, isFetching } = useFetchResourceQuery({
        url: adminRoutes.topAgents
    });

    if (isFetching) return <Loading />;

    const agents: Agent[] = topAgentData?.result || [];

    return (
        <div className='p-3 bg-white rounded-sm shadow-md'>
            <h2 className='text-xl font-bold mb-4 text-gray-800'>Top Delivery Agents</h2>
            <div className='overflow-x-auto'>
                <table className='min-w-full border border-gray-300'>
                    <thead className='bg-blue text-white'>
                        <tr>
                            <th className='border px-4 py-2 text-left'>#</th>
                            <th className='border px-4 py-2 text-left'>Name</th>
                            <th className='border px-4 py-2 text-left'>Email</th>
                            <th className='border px-4 py-2 text-left'>Phone</th>
                            <th className='border px-4 py-2 text-left'>Joined</th>
                            <th className='border px-4 py-2 text-left'>Delivered Parcels</th>
                            <th className='border px-4 py-2 text-left'>Revenue Handled</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agents.map((agent, index) => (
                            <tr key={agent.id} className='hover:bg-gray-50 transition-colors'>
                                <td className='border px-4 py-2 text-center font-bold text-blue-500'>
                                    {index + 1}
                                </td>
                                <td className='border px-4 py-2 text-black font-semibold'>
                                    {agent.username}
                                </td>
                                <td className='border px-4 py-2'>{agent.email}</td>
                                <td className='border px-4 py-2'>{agent.phoneNumber}</td>
                                <td className='border px-4 py-2'>
                                    {new Date(agent.createdAt).toLocaleDateString()}
                                </td>
                                <td className='border px-4 py-2 font-medium'>
                                    {agent.delivered || 0}
                                </td>
                                <td className='border px-4 py-2 font-medium'>
                                    ${agent.revenueHandled || 0}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopAgentTable;
