'use client';
import { classScheduleRoutes } from '@/constants/end-point';
import { useFetchResourceQuery } from '@/redux/api/curd';
import { tagTypes } from '@/redux/tag-types';
import React from 'react';
import ClassScheduleCard from '../shared/card/class-schedule-card';
import Loading from '../shared/loading';
import { useAppSelector } from '@/redux/hooks';

const ClassSchedule = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const { data, isLoading } = useFetchResourceQuery({
        url: classScheduleRoutes.getAll,
        tags: tagTypes.class_schedule
    });
    if (isLoading) {
        return <Loading />;
    }
    return <ClassScheduleCard schedules={data?.data} isAuthenticated={isAuthenticated} />;
};

export default ClassSchedule;
