'use client';
import React, { useState } from 'react';
import Modal from '../common/model';

const BookingModal: React.FC<BookingModalProps> = ({
    isOpenModal,
    setIsOpenModal,
    schedules,
    isAuthenticated
}) => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
    const [isBooking, setIsBooking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // Handle the booking logic
    const handleBooking = async () => {
        if (!isAuthenticated) {
            setError('You must be logged in to book a class.');
            return;
        }

        if (!selectedSchedule) {
            setError('Please select a class schedule.');
            return;
        }

        if (!selectedDate) {
            setError('Please select a date for the class.');
            return;
        }

        setIsBooking(true);

        try {
            const response = await fetch('/api/book-schedule', {
                method: 'POST',
                body: JSON.stringify({ scheduleId: selectedSchedule, date: selectedDate }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            if (data.success) {
                alert('Booking successful!');
            } else {
                setError(data.message || 'Failed to book class');
            }
        } catch (error) {
            console.error('Error booking class:', error);
            setError('An error occurred while booking.');
        } finally {
            setIsBooking(false);
            setIsOpenModal(false); // Close the modal after booking
        }
    };

    return (
        <Modal
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            title='Confirm Booking'
            className='bg-white'
        >
            <div className='p-6'>
                <p>Are you sure you want to book a class?</p>

                {/* Date Input Field */}
                <div className='mt-4'>
                    <label htmlFor='classDate' className='block text-sm font-medium text-gray-700'>
                        Select Class Date
                    </label>
                    <input
                        type='date'
                        id='classDate'
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>

                {/* Class Schedule Selection Dropdown */}
                <div className='mt-4'>
                    <label htmlFor='schedule' className='block text-sm font-medium text-gray-700'>
                        Select Class Schedule
                    </label>
                    <select
                        id='schedule'
                        value={selectedSchedule || ''}
                        onChange={(e) => setSelectedSchedule(e.target.value)}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    >
                        <option value='' disabled>
                            Select a Schedule
                        </option>
                        {schedules?.map((schedule) => (
                            <option key={schedule._id} value={schedule._id}>
                                {schedule.className} - {new Date(schedule.day).toLocaleString()}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Error Message */}
                {error && <div className='text-red-500 mt-2'>{error}</div>}

                <div className='mt-4 flex justify-between'>
                    <button
                        className='px-4 py-2 bg-gray-500 text-white rounded-md'
                        onClick={() => setIsOpenModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className={`px-4 py-2 ${isBooking ? 'bg-gray-300' : 'bg-blue-500'} text-white rounded-md`}
                        onClick={handleBooking}
                        disabled={isBooking}
                    >
                        {isBooking ? 'Booking...' : 'Confirm Booking'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default BookingModal;
