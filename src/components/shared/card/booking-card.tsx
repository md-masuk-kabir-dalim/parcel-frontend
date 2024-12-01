import { icons } from '@/constants/icons';
import React from 'react';

interface BookingCardProps {
    bookings: Array<{
        _id: string,
        classSchedule: {
            className: string,
            day: string,
            bookedTrainees: number,
            maxTrainees: number,
            trainer?: { fullName: string }
        },
        status: string
    }>;
    onDelete?: (id: any) => void;
    onEdit?: (id: any) => void;
    title: string;
}

const BookingCard: React.FC<BookingCardProps> = ({ bookings, onDelete, onEdit, title }) => {
    return (
        <div className='mt-5'>
            <h1 className='text-4xl font-semibold text-center mb-8 text-blue'>{title}</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {bookings?.map((booking) => {
                    const { classSchedule } = booking;
                    const classDate = new Date(classSchedule.day);

                    return (
                        <div
                            key={booking._id}
                            className='bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'
                        >
                            {/* Header */}
                            <div className='bg-blue text-white-light px-4 py-3 flex justify-between items-center'>
                                <div>
                                    <h2 className='text-lg font-bold'>{classSchedule.className}</h2>
                                    <span className='text-sm'>
                                        {classSchedule.trainer?.fullName || 'TBD'}
                                    </span>
                                </div>
                                <div className='flex space-x-2'>
                                    {/* Edit Button */}
                                    {onEdit && (
                                        <button
                                            className='p-2 rounded-full bg-yellow-100 hover:bg-yellow-200'
                                            onClick={onEdit ? () => onEdit(booking) : undefined}
                                        >
                                            <icons.editIcons className='h-5 w-5 text-yellow-600' />
                                        </button>
                                    )}
                                    {/* Delete Button */}
                                    {onDelete && (
                                        <button
                                            className='p-2 rounded-full bg-red-100 hover:bg-red-200'
                                            onClick={onDelete ? () => onDelete(booking) : undefined}
                                        >
                                            <icons.deleteIcons className='h-5 w-5 text-red-600' />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className='p-6'>
                                <p className='text-black'>
                                    <strong>Date:</strong>{' '}
                                    {classDate.toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                                <p className='text-black'>
                                    <strong>Time:</strong>{' '}
                                    {classDate.toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                                <p className='text-black'>
                                    <strong>Status:</strong>
                                    <span
                                        className={`inline-block px-3 py-1 text-xs font-semibold rounded ${
                                            booking.status === 'completed'
                                                ? 'text-green'
                                                : 'bg-red-100 text-red'
                                        }`}
                                    >
                                        {booking.status.charAt(0).toUpperCase() +
                                            booking.status.slice(1)}
                                    </span>
                                </p>
                                <div className='mt-4'>
                                    <p className='text-black'>
                                        <strong>Capacity:</strong> {classSchedule.bookedTrainees}/
                                        {classSchedule.maxTrainees}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BookingCard;
