'use client';
import Loading from '@/components/shared/loading';
import { adminRoutes } from '@/constants/end-point';
import { useFetchResourceQuery } from '@/redux/api/curd';
import React from 'react';

const TopAgent = () => {
    const { data: topAgentData, isFetching } = useFetchResourceQuery({
        url: adminRoutes.topAgents
    });

    console.log(topAgentData);

    if (isFetching) return <Loading />;
    return <div></div>;
};

export default TopAgent;
