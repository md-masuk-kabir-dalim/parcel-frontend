'use client';
import Modal from '@/components/common/model';
import React, { useState } from 'react';

const parcelTypes = [
    { value: '', label: 'All Statuses' },
    { value: 'UNASSIGNED', label: 'UNASSIGNED' },
    { value: 'ASSIGNED', label: 'ASSIGNED' },
    { value: 'PICKED_UP', label: 'PICKED UP' },
    { value: 'IN_TRANSIT', label: 'IN TRANSIT' },
    { value: 'DELIVERED', label: 'DELIVERED' },
    { value: 'FAILED', label: 'FAILED' }
];

const AssignUpdate = () => {
    const [filterType, setFilterType] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <div className='p-5'>
            <h2 className='mb-3 text-lg font-semibold'>Filter Parcel by Status</h2>

            {/* Filter Dropdown */}
            <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className='border border-blue-500 rounded px-2 py-1'
            >
                {parcelTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                        {type.label}
                    </option>
                ))}
            </select>

            <p className='mt-4'>
                Selected Status: <strong>{filterType || 'All'}</strong>
            </p>

            {/* Button to Open Modal */}
            <button
                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                onClick={() => setIsModalOpen(true)}
            >
                Open Modal
            </button>
                
            {/* Modal */}
            <Modal isOpenModal={isModalOpen} setIsOpenModal={setIsModalOpen} title='Parcel Details'>
                <div className='space-y-2'>
                    <p>
                        <strong>Status:</strong> {filterType || 'All'}
                    </p>
                    <p>This is where you can show parcel details or an edit form.</p>
                </div>
            </Modal>
        </div>
    );
};

export default AssignUpdate;
