import RevenueChart from '@/components/dashboard/admin/revenue-chart';
import Summery from '@/components/dashboard/admin/summery';
import TopAgent from '@/components/dashboard/admin/top-agent';
import TopCustomer from '@/components/dashboard/admin/top-customer';
import React from 'react';

const DashBoardPage = () => {
    return (
        <section className='p-3'>
            <Summery />
            <div className='mt-9'>
                <RevenueChart />
            </div>
            <div className='mt-9'>
                <TopCustomer />
                <TopAgent />
            </div>
        </section>
    );
};

export default DashBoardPage;
