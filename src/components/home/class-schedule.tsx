'use client';
import { bookingRoutes, classScheduleRoutes } from '@/constants/end-point';
import { useFetchResourceQuery } from '@/redux/api/curd';
import { tagTypes } from '@/redux/tag-types';
import React from 'react';
import ClassScheduleCard from '../shared/card/class-schedule-card';
import Loading from '../shared/loading';
import { useAppSelector } from '@/redux/hooks';

const ClassSchedule = () => {
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const { data, isLoading } = useFetchResourceQuery({
        url: classScheduleRoutes.getAll,
        tags: tagTypes.class_schedule
    });

    const { data: bookingData, isLoading: isBookingLoading } = useFetchResourceQuery({
        url: bookingRoutes.get,
        tags: tagTypes.booking,
        params: { traineeId: user?.id }
    });

    if (isLoading || isBookingLoading) {
        return <Loading />;
    }
    return (
        <ClassScheduleCard
            schedules={data?.data}
            isAuthenticated={isAuthenticated}
            bookingData={bookingData?.data}
        />
    );
};

export default ClassSchedule;
