import React, { useState } from 'react';
import Modal from '@/components/common/model';
import { Button } from '@/components/ui/button';
import { useFetchResourceQuery, useUpdateResourceMutation } from '@/redux/api/curd';
import { usersRoutes, parcelRoutes } from '@/constants/end-point';
import { useDebounced } from '@/hooks/useDebounce';
import useToaster from '@/hooks/useToaster';
import { tagTypes } from '@/redux/tag-types';

const AssignParcelModal = ({ isOpen, onClose, parcelData, refetch }: any) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAgent, setSelectedAgent] = useState<any>(null);
    const showToast = useToaster();
    const debouncedSearch = useDebounced({ searchQuery: searchTerm, delay: 500 });

    const { data: agents, isFetching } = useFetchResourceQuery({
        url: usersRoutes.getAllUsers,
        params: { searchText: debouncedSearch, limit: 10, role: 'DELIVERY_AGENT' },
        tags: tagTypes.parcelList
    });

    // Assign API
    const [assignParcel, { isLoading }] = useUpdateResourceMutation();

    const handleAssign = async () => {
        if (!selectedAgent) {
            showToast('error', 'Please select an agent first');
            return;
        }
        try {
            const res: any = await assignParcel({
                url: parcelRoutes.updateParcel(parcelData.id),
                payload: { assignId: selectedAgent.id, status: 'ASSIGNED' }
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

    if (!parcelData) return null;

    return (
        <Modal
            isOpenModal={isOpen}
            setIsOpenModal={onClose}
            title={`Assign Parcel ${parcelData.parcelId}`}
            className='max-w-lg bg-white shadow-xl'
        >
            <div className='flex flex-col gap-3 mt-2'>
                {/* Parcel Info */}
                <input
                    type='text'
                    value={parcelData.customer}
                    className='border p-2 w-full'
                    disabled
                />
                <input
                    type='text'
                    value={parcelData.pickupLocation}
                    className='border p-2 w-full'
                    disabled
                />

                {/* Search Agents */}
                <input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search agent by name or phone...'
                    className='border p-2 w-full'
                />

                {/* Results */}
                <div className='border rounded max-h-40 overflow-y-auto'>
                    {isFetching ? (
                        <p className='p-2 text-sm text-gray-500'>Searching...</p>
                    ) : (
                        agents?.result?.users?.map((agent: any) => (
                            <div
                                key={agent.id}
                                onClick={() => setSelectedAgent(agent)}
                                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                                    selectedAgent?.id === agent.id ? 'bg-green-100' : ''
                                }`}
                            >
                                {agent.username} ({agent.phoneNumber})
                            </div>
                        ))
                    )}
                </div>

                {/* Selected Agent */}
                {selectedAgent && (
                    <p className='text-sm text-green-600'>Selected: {selectedAgent.username}</p>
                )}

                {/* Actions */}
                <div className='flex justify-end mt-4 gap-2'>
                    <Button
                        onClick={onClose}
                        className='bg-rose-600 text-white'
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        className='bg-blue text-white'
                        onClick={handleAssign}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Assigning...' : 'Assign'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default AssignParcelModal;
