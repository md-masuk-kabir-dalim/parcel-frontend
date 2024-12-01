import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BookingModal from '@/components/home/booking-modal';

const ClassScheduleCard: React.FC<ClassScheduleProps> = ({ schedules, isAuthenticated }) => {
    const router = useRouter();
    const [isOpenModal, setIsOpenModal] = useState(false);
    // Function to handle booking attempt
    const handleBookingClick = (scheduleId: string) => {
        if (!isAuthenticated) {
            router.push('/login');
        } else {
            setIsOpenModal(true);
        }
    };

    return (
        <div className='mt-10'>
            <h1 className='text-4xl font-extrabold text-center mb-8 text-blue'>
                Upcoming Class Schedules
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {schedules?.map((schedule) => (
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
                                <strong>Trainer:</strong> {schedule.trainer?.fullName}
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
                                className={`w-full py-2 px-4 rounded-sm font-medium text-white-light transition ${
                                    schedule.bookedTrainees < schedule.maxTrainees
                                        ? 'bg-blue hover:bg-blue'
                                        : 'bg-white-light cursor-not-allowed'
                                }`}
                                disabled={schedule.bookedTrainees >= schedule.maxTrainees}
                                onClick={() => handleBookingClick(schedule._id)}
                            >
                                {schedule.bookedTrainees < schedule.maxTrainees
                                    ? 'Book Now'
                                    : 'Fully Booked'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {isOpenModal && (
                <BookingModal
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    schedules={schedules}
                    isAuthenticated={isAuthenticated}
                    // selectedSchedule={selectedSchedule}
                />
            )}
        </div>
    );
};

export default ClassScheduleCard;
