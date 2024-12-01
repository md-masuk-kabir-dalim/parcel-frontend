'use client';
import BookingCard from '@/components/shared/card/booking-card';
import Loading from '@/components/shared/loading';
import { bookingRoutes } from '@/constants/end-point';
import withAuth from '@/HOC/withAuth';
import { useFetchResourceQuery } from '@/redux/api/curd';
import { useAppSelector } from '@/redux/hooks';
import { tagTypes } from '@/redux/tag-types';
import React from 'react';

const MyBookingList = () => {
    const { user } = useAppSelector((state) => state.auth);
    const { data: bookingData, isLoading: isBookingLoading } = useFetchResourceQuery({
        url: bookingRoutes.get,
        tags: tagTypes.booking,
        params: { traineeId: user?.id }
    });

    if (isBookingLoading) {
        return <Loading />;
    }
    return <BookingCard bookings={bookingData?.data} title='Your Bookings' />;
};

export default withAuth(MyBookingList);
