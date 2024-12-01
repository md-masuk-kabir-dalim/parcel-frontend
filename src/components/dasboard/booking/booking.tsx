'use client';
import React, { useState } from 'react';
import BookingCard from '@/components/shared/card/booking-card';
import Loading from '@/components/shared/loading';
import { bookingRoutes } from '@/constants/end-point';
import {
    useFetchResourceQuery,
    useDeleteResourceMutation,
    useUpdateResourceMutation
} from '@/redux/api/curd';
import { tagTypes } from '@/redux/tag-types';
import useToaster from '@/hooks/useToaster';
import BookingModal from '@/components/home/booking-modal';

const BookingList = () => {
    const { data: bookingData, isLoading: isBookingLoading } = useFetchResourceQuery({
        url: bookingRoutes.get,
        tags: tagTypes.booking
    });
    const [deleteBooking] = useDeleteResourceMutation();
    const [updateBooking] = useUpdateResourceMutation();
    const showToast = useToaster();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);

    const handleDelete = async (data: any) => {
        try {
            await deleteBooking({
                url: bookingRoutes.deleteById(data?._id),
                tags: tagTypes.booking,
                params: { traineeId: data?.trainee }
            }).unwrap();
            showToast('success', 'Booking deleted successfully');
        } catch (error: any) {
            showToast('error', error?.message || 'Failed to delete booking');
        }
    };

    const handleEdit = (booking: any) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const handleUpdateBooking = async (status: string) => {
        if (!selectedBooking) return;
        try {
            await updateBooking({
                url: bookingRoutes.updateById(selectedBooking._id),
                tags: tagTypes.booking,
                payload: { status },
                params: { traineeId: selectedBooking?.trainee }
            }).unwrap();
            showToast('success', 'Booking updated successfully');
            setIsModalOpen(false);
        } catch (error: any) {
            showToast('error', error?.message || 'Failed to update booking');
        }
    };

    if (isBookingLoading) {
        return <Loading />;
    }

    return (
        <>
            <BookingCard
                bookings={bookingData?.data}
                onDelete={handleDelete}
                onEdit={handleEdit}
                title='Booking List'
            />
            {isModalOpen && (
                <BookingModal
                    isOpenModal={isModalOpen}
                    setIsOpenModal={setIsModalOpen}
                    booking={selectedBooking}
                    onUpdateBooking={handleUpdateBooking}
                />
            )}
        </>
    );
};

export default BookingList;
