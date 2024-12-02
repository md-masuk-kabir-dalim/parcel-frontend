import { FaUserTie, FaCalendarAlt, FaUsers, FaUserCheck, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';

interface ClassScheduleCardProps {
    className: string;
    id: string;
    trainer: string;
    day: string;
    maxTrainees: number;
    bookedTrainees: number;
    onDelete: () => void;
}

const ClassScheduleCard: React.FC<ClassScheduleCardProps> = ({
    className,
    id,
    trainer,
    day,
    maxTrainees,
    bookedTrainees,
    onDelete
}) => {
    const availableSpots = maxTrainees - bookedTrainees;

    return (
        <div className='border rounded-lg shadow-md p-6 bg-white w-full max-w-lg mx-auto hover:shadow-lg transition-shadow'>
            {/* Class Info Header */}
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold text-black'>{className}</h2>
                <span
                    className={`px-3 py-1 rounded-full text-sm ${
                        availableSpots > 0
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                    }`}
                >
                    {availableSpots > 0 ? `${availableSpots} spots left` : 'Full'}
                </span>
            </div>

            {/* Class Details */}
            <div className='space-y-3'>
                <p className='flex items-center text-black'>
                    <FaUserTie className='mr-2 text-blue' />
                    <strong>Trainer:</strong> <span className='ml-2'>{trainer}</span>
                </p>
                <p className='flex items-center text-black'>
                    <FaCalendarAlt className='mr-2 text-blue' />
                    <strong>Day:</strong>
                    <span className='ml-2'>{new Date(day).toLocaleDateString()}</span>
                </p>
                <p className='flex items-center text-black'>
                    <FaUsers className='mr-2 text-blue' />
                    <strong>Max Trainees:</strong>
                    <span className='ml-2'>{maxTrainees}</span>
                </p>
                <p className='flex items-center text-black'>
                    <FaUserCheck className='mr-2 text-blue' />
                    <strong>Booked Trainees:</strong>
                    <span className='ml-2'>{bookedTrainees}</span>
                </p>
            </div>

            {/* Action Buttons */}
            <div className='mt-6 flex justify-between'>
                <Link href={`/dashboard/class-schedule/edit-class-schedule/${id}`}>
                    <button className='flex items-center px-4 py-2 bg-blue text-white-light rounded-lg hover:bg-blue-600 transition-colors'>
                        <FaEdit className='mr-2' />
                        Edit
                    </button>
                </Link>
                <button
                    onClick={onDelete}
                    className='flex items-center px-4 py-2 bg-red-500 text-white-light rounded-lg hover:bg-red-600 transition-colors'
                >
                    <FaTrashAlt className='mr-2' />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ClassScheduleCard;
