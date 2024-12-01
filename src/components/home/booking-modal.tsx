'use client';
import React, { useState } from 'react';
import Modal from '../common/model';

interface BookingModalProps {
    isOpenModal: boolean;
    setIsOpenModal: (isOpen: boolean) => void;
    booking: {
        _id: string,
        classSchedule: { className: string },
        status: string
    } | null;
    onUpdateBooking: (status: string) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
    isOpenModal,
    setIsOpenModal,
    booking,
    onUpdateBooking
}) => {
    const [status, setStatus] = useState(booking?.status || '');

    const handleSave = () => {
        if (status) {
            onUpdateBooking(status);
        }
    };
    console.log(booking);
    return (
        <Modal
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            title={`Edit Booking - ${booking?.classSchedule?.className || 'Unknown'}`}
            className='bg-white rounded-lg shadow-lg'
        >
            <div className='p-6'>
                <p className='text-gray-700 text-base mb-6'>
                    You are editing the status for the class:{' '}
                    <strong>{booking?.classSchedule?.className}</strong>
                </p>
                <div className='mb-6'>
                    <label htmlFor='status' className='block text-gray-600 font-medium mb-2'>
                        Booking Status
                    </label>
                    <select
                        id='status'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
                    >
                        <option value='' disabled>
                            Select a status
                        </option>
                        <option value='cancelled'>Cancelled</option>
                        <option value='completed'>Completed</option>{' '}
                    </select>
                </div>
                <div className='flex justify-end gap-4'>
                    <button
                        onClick={() => setIsOpenModal(false)}
                        className='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className={`px-4 py-2 rounded-lg text-white ${
                            status ? 'bg-blue hover:bg-blue' : 'bg-blue cursor-not-allowed'
                        } transition duration-200`}
                        disabled={!status}
                    >
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default BookingModal;
