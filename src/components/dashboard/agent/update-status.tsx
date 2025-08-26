import Modal from '@/components/common/model';
import { parcelRoutes } from '@/constants/end-point';
import useToaster from '@/hooks/useToaster';
import { useUpdateResourceMutation } from '@/redux/api/curd';
import React, { useState } from 'react';

// Enum for parcel status
enum PARCEL_STATUS {
    PICKED_UP = 'PICKED_UP',
    IN_TRANSIT = 'IN_TRANSIT',
    DELIVERED = 'DELIVERED',
}

const UpdateStatusModal = ({ isOpen, onClose, parcelData, refetch }: any) => {
    const [status, setStatus] = useState(parcelData?.status || PARCEL_STATUS.PICKED_UP);
    const showToast = useToaster();
    const [assignParcel, { isLoading }] = useUpdateResourceMutation();

    const handleUpdate = async () => {
        try {
            const res: any = await assignParcel({
                url: parcelRoutes.updateParcel(parcelData.id),
                payload: { status: status }
            }).unwrap();

            if (res?.success) {
                showToast('success', 'Parcel assigned successfully');
                refetch?.();
                onClose();
            }
        } catch (err: any) {
            showToast('error', err?.data?.message || 'Assignment failed');
        }
    };

    return (
        <Modal
            isOpenModal={isOpen}
            setIsOpenModal={onClose}
            title={`Update Parcel ${parcelData.parcelId} Status`}
            className='max-w-lg bg-white shadow-xl'
        >
            <div className='flex flex-col gap-4 mt-2'>
                <label className='font-medium'>Select Status:</label>
                <select
                    className='border px-3 py-2 rounded'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {Object.values(PARCEL_STATUS).map((s) => (
                        <option key={s} value={s}>
                            {s.replace('_', ' ')}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition'
                >
                    {isLoading ? 'Updating...' : 'Update Status'}
                </button>
            </div>
        </Modal>
    );
};

export default UpdateStatusModal;
