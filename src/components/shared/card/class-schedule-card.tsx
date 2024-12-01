import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { useCreateResourceMutation } from '@/redux/api/curd';
import { bookingRoutes } from '@/constants/end-point';
import { tagTypes } from '@/redux/tag-types';
import useToaster from '@/hooks/useToaster';

const ClassScheduleCard: React.FC<ClassScheduleProps> = ({
    schedules,
    isAuthenticated,
    bookingData
}) => {
    const router = useRouter();
    const showToast = useToaster();
    const { user } = useAppSelector((state) => state.auth);
    const [createBooking, { isLoading: isCreateLoading }] = useCreateResourceMutation();

    // Extract booked schedule IDs from bookingData
    const bookedScheduleIds = new Set(
        bookingData?.map((booking) => booking.classSchedule._id) || []
    );

    // Function to handle booking attempt
    const handleBookingClick = async (scheduleId: string) => {
        if (!isAuthenticated) {
            router.push('/login');
        } else {
            try {
                const payload = {
                    traineeId: user?.id,
                    classScheduleId: scheduleId,
                    status: 'booked'
                };
                await createBooking({
                    url: bookingRoutes.create,
                    tags: tagTypes.booking,
                    payload: payload
                }).unwrap();
                showToast('success', 'Booking successful');
            } catch (error: any) {
                showToast('error', error?.message || error?.data?.message);
            }
        }
    };

    return (
        <div className='mt-10'>
            <h1 className='text-4xl font-semibold text-center mb-8 text-blue'>
                Upcoming Class Schedules
            </h1>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8'>
                {schedules?.map((schedule) => {
                    const isBooked = bookedScheduleIds.has(schedule._id);
                    return (
                        <div
                            key={schedule._id}
                            className='bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'
                        >
                            {/* Header */}
                            <div className='bg-blue text-white-light px-4 py-3'>
                                <h2 className='text-lg font-bold'>{schedule.className}</h2>
                            </div>

                            {/* Content */}
                            <div className='p-6'>
                                <p className='text-black'>
                                    <strong>Trainer:</strong> {schedule.trainer?.fullName || 'TBD'}
                                </p>
                                <p className='text-black mt-2'>
                                    <strong>Date:</strong>{' '}
                                    {new Date(schedule.day).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                                <p className='text-black'>
                                    <strong>Time:</strong>{' '}
                                    {new Date(schedule.day).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                                <div className='mt-4 flex items-center justify-between'>
                                    <span className='text-sm font-medium text-black'>
                                        <strong>Capacity:</strong> {schedule.bookedTrainees}/
                                        {schedule.maxTrainees}
                                    </span>
                                    <span
                                        className={`inline-block px-3 py-1 text-xs font-semibold rounded ${
                                            schedule.bookedTrainees < schedule.maxTrainees
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {schedule.bookedTrainees < schedule.maxTrainees
                                            ? 'Available'
                                            : 'Fully Booked'}
                                    </span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className='px-6 py-4 border-t'>
                                <button
                                    className={`w-full py-2 px-4 rounded font-medium text-white-light transition ${
                                        isBooked
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : schedule.bookedTrainees < schedule.maxTrainees
                                              ? 'bg-blue hover:bg-blue'
                                              : 'bg-white-light cursor-not-allowed'
                                    }`}
                                    disabled={
                                        isBooked || schedule.bookedTrainees >= schedule.maxTrainees
                                    }
                                    onClick={() => handleBookingClick(schedule._id)}
                                >
                                    {isBooked
                                        ? 'Already Booked'
                                        : schedule.bookedTrainees < schedule.maxTrainees
                                          ? isCreateLoading
                                              ? 'Loading...'
                                              : 'Book Now'
                                          : 'Fully Booked'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ClassScheduleCard;
