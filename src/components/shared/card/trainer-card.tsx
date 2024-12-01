import React from 'react';
import { icons } from '@/constants/icons';
import Link from 'next/link';

interface TrainerCardProps {
    fullName: string;
    email: string;
    role: string;
    id: string;
    onDelete: () => void;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ fullName, email, role, id, onDelete }) => {
    return (
        <div className='flex flex-col items-center bg-white border border-gray-300 rounded-lg shadow-lg p-6 transition-shadow'>
            {/* Trainer Details */}
            <div className='text-center mb-4 text-black'>
                <h3 className='text-lg font-bold'>{fullName}</h3>
                <p className='text-sm'>{email}</p>
                <span className='mt-2 inline-block px-3 py-1 text-xs font-semibold text-white-light bg-indigo-500 rounded'>
                    {role}
                </span>
            </div>
            {/* Action Buttons */}
            <div className='flex justify-center gap-4 mt-4 w-full'>
                <Link href={`/dashboard/trainer/edit-trainer/${id}`}>
                    <button className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded hover:bg-indigo-200 focus:outline-none focus:ring focus:ring-indigo-300'>
                        <icons.editIcons className='text-indigo-600' />
                    </button>
                </Link>
                <button
                    onClick={onDelete}
                    className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded hover:bg-red-200 focus:outline-none focus:ring focus:ring-red-300'
                >
                    <icons.deleteIcons className='text-red-600' />
                </button>
            </div>
        </div>
    );
};

export default TrainerCard;
