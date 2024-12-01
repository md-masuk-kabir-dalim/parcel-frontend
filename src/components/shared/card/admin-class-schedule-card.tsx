import { icons } from '@/constants/icons';
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
    return (
        <div className='border rounded-lg shadow-lg p-6 bg-white w-full max-w-lg mx-auto hover:shadow-xl transition-shadow'>
            {/* Class Title */}
            <h2 className='text-2xl font-bold text-black mb-2'>{className}</h2>

            {/* Details Section */}
            <div className='text-black space-y-1'>
                <p>
                    <strong>Trainer:</strong> {trainer}
                </p>
                <p>
                    <strong>Day:</strong> {new Date(day).toLocaleDateString()}
                </p>
                <p>
                    <strong>Max Trainees:</strong> {maxTrainees}
                </p>
                <p>
                    <strong>Booked Trainees:</strong> {bookedTrainees}
                </p>
            </div>

            {/* Action Buttons */}
            <div className='mt-4 flex justify-end space-x-4'>
                <Link href={`/dashboard/class-schedule/edit-class-schedule/${id}`}>
                    <button className='flex items-center px-4 py-2 bg-blue text-white rounded-lg hover:bg-blue'>
                        <icons.editIcons className='mr-2' />
                    </button>
                </Link>
                <button
                    onClick={onDelete}
                    className='flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors'
                >
                    <icons.deleteIcons className='mr-2' />
                </button>
            </div>
        </div>
    );
};

export default ClassScheduleCard;
