'use client';
import ReusableBarChart from '@/components/common/bar_chart';
import Loading from '@/components/shared/loading';
import { adminRoutes } from '@/constants/end-point';
import { useFetchResourceQuery } from '@/redux/api/curd';
import React from 'react';

const RevenueChart = () => {
    const { data: revenueData, isFetching } = useFetchResourceQuery({
        url: adminRoutes.monthlyRevenue
    });

    if (isFetching) return <Loading />;

    const chartData = revenueData?.result?.map((item: any) => ({
        month: item.month,
        totalParcel: item.totalParcel,
        totalAmount: item.totalAmount
    }));

    return (
        <div className='bg-white shadow-md p-3'>
            <h3 className='text-lg font-semibold mb-4'>Monthly Revenue</h3>
            <ReusableBarChart
                data={chartData}
                xKey='month'
                bars={[
                    { dataKey: 'totalParcel', radius: 4 },
                    { dataKey: 'totalAmount', radius: 4 }
                ]}
                config={{
                    legend: true,
                    tooltip: true
                }}
                height='h-[300px]'
            />
        </div>
    );
};

export default RevenueChart;
