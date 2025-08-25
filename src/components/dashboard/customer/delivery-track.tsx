'use client';
import React, { useEffect, useState } from 'react';
import {
    FaBox,
    FaShippingFast,
    FaTruck,
    FaCheckCircle,
    FaUserCheck,
    FaTimesCircle
} from 'react-icons/fa';
import { useFetchResourceQuery } from '@/redux/api/curd';
import { tagTypes } from '@/redux/tag-types';
import { parcelRoutes } from '@/constants/end-point';
import Loading from '@/components/shared/loading';
import TrackMap from './track-map';
import { socket } from '../agent/agent_location';

enum PARCEL_STATUS {
    UNASSIGNED = 'UNASSIGNED',
    ASSIGNED = 'ASSIGNED',
    PICKED_UP = 'PICKED_UP',
    IN_TRANSIT = 'IN_TRANSIT',
    DELIVERED = 'DELIVERED',
    FAILED = 'FAILED'
}

interface AgentLocation {
    lat: number;
    lng: number;
}

const ParcelTracking = () => {
    const [parcelId, setParcelId] = useState<string>('');
    const [isCall, setIsCall] = useState<boolean>(false);
    const [agentLocationRealTime, setAgentLocationRealTime] = useState<AgentLocation>({
        lat: 0,
        lng: 0
    });
    const { data: parcelData, isFetching } = useFetchResourceQuery(
        {
            url: parcelRoutes.getSingleParcel(parcelId),
            tags: tagTypes.parcelList
        },
        { skip: !isCall }
    );

    const handleCall = () => setIsCall(true);

    useEffect(() => {
        if (!parcelData) return;
        const agentId = parcelData.result.agentId;
        const handleMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.type === 'getAgentLocation') {
                setAgentLocationRealTime({ lat: data.location.lat, lng: data.location.lng });
            }
        };
        socket?.addEventListener('message', handleMessage);
        const requestAgentLocation = () => {
            socket?.send(
                JSON.stringify({
                    type: 'getAgentLocation',
                    agentId
                })
            );
        };
        requestAgentLocation();
        const intervalId = setInterval(requestAgentLocation, 40000);

        return () => {
            socket?.removeEventListener('message', handleMessage);
            clearInterval(intervalId);
        };
    }, [parcelData]);

    if (isFetching) return <Loading />;

    // Use dynamic parcel data
    const parcel = parcelData?.result;
    const currentStatus = parcel?.status || PARCEL_STATUS.UNASSIGNED;

    const steps = [
        { label: 'Order Placed', value: PARCEL_STATUS.UNASSIGNED, icon: <FaBox /> },
        { label: 'Assigned', value: PARCEL_STATUS.ASSIGNED, icon: <FaUserCheck /> },
        { label: 'Picked Up', value: PARCEL_STATUS.PICKED_UP, icon: <FaShippingFast /> },
        { label: 'In Transit', value: PARCEL_STATUS.IN_TRANSIT, icon: <FaTruck /> },
        { label: 'Delivered', value: PARCEL_STATUS.DELIVERED, icon: <FaCheckCircle /> },
        { label: 'Failed', value: PARCEL_STATUS.FAILED, icon: <FaTimesCircle /> }
    ];

    const currentIndex = steps.findIndex((step) => step.value === currentStatus);

    return (
        <div className='p-6 max-w-5xl mx-auto space-y-6'>
            {/* Search Section */}
            <div className='bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
                <h1 className='text-2xl font-bold text-gray-800'>Parcel Tracking</h1>
                <div className='flex items-center gap-2 w-full sm:w-1/2'>
                    <input
                        type='text'
                        value={parcelId}
                        onChange={(e) => setParcelId(e.target.value)}
                        placeholder='Enter Tracking ID...'
                        className='flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                    />
                    <button
                        onClick={handleCall}
                        disabled={isFetching}
                        className='bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
                    >
                        Track
                    </button>
                </div>
            </div>

            {/* Tracking Info Card */}
            <div className='bg-white shadow-md rounded-lg p-6'>
                <p className='text-gray-600'>
                    Tracking ID: <span className='font-semibold'>{parcel?.parcelId || '-'}</span>
                </p>
                <p className='text-gray-600'>
                    Estimated Delivery:{' '}
                    <span className='font-semibold'>
                        {parcel?.createdAt
                            ? new Date(parcel.createdAt).toLocaleDateString()
                            : 'Not Available'}
                    </span>
                </p>
            </div>

            {/* Delivery Progress */}
            <div className='bg-white shadow-md rounded-lg p-6'>
                <h2 className='text-lg font-bold text-gray-800 mb-6'>Delivery Progress</h2>
                <div className='flex items-center justify-between relative'>
                    {steps.map((step, index) => (
                        <div
                            key={step.value}
                            className='flex-1 flex flex-col items-center text-center relative'
                        >
                            <div
                                className={`w-12 h-12 flex items-center justify-center rounded-full border-2 shadow-md z-10
                  ${
                      index <= currentIndex
                          ? 'bg-blue text-white border-blue'
                          : 'bg-white text-blue border-blue'
                  }`}
                            >
                                {step.icon}
                            </div>
                            <p
                                className={`mt-2 text-sm font-medium ${
                                    index <= currentIndex ? 'text-blue' : 'text-gray-500'
                                }`}
                            >
                                {step.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* map */}
            <TrackMap
                pickupLocation={{
                    lat: parcel?.pickupLocation?.coordinates?.[1],
                    lng: parcel?.pickupLocation?.coordinates?.[0]
                }}
                dropoffLocation={{
                    lat: parcel?.dropoffLocation?.coordinates?.[1],
                    lng: parcel?.dropoffLocation?.coordinates?.[0]
                }}
                agentLocation={agentLocationRealTime}
            />
            {/* Parcel Details */}
            <div className='bg-white shadow-md rounded-lg p-6 space-y-4'>
                <h2 className='text-lg font-bold text-gray-800 mb-4'>Parcel Details</h2>
                {parcel ? (
                    <>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700'>
                            {/* Parcel Info */}
                            <p>
                                <span className='font-semibold'>Sender:</span>{' '}
                                {parcel.pickupContactName || parcel.customer?.email || '-'}
                            </p>
                            <p>
                                <span className='font-semibold'>Sender Phone:</span>{' '}
                                {parcel.pickupContactPhone || '-'}
                            </p>
                            <p>
                                <span className='font-semibold'>Receiver:</span>{' '}
                                {parcel.dropoffContactName || parcel.agent?.email || '-'}
                            </p>
                            <p>
                                <span className='font-semibold'>Receiver Phone:</span>{' '}
                                {parcel.dropoffContactPhone || '-'}
                            </p>
                            <p>
                                <span className='font-semibold'>Weight:</span> {parcel.weight} KG
                            </p>
                            <p>
                                <span className='font-semibold'>Type:</span> {parcel.type}
                            </p>
                            <p>
                                <span className='font-semibold'>Pickup:</span>{' '}
                                {parcel.pickupLocation?.address || '-'}
                            </p>
                            <p>
                                <span className='font-semibold'>Delivery:</span>{' '}
                                {parcel.dropoffLocation?.address || '-'}
                            </p>
                            <p>
                                <span className='font-semibold'>Payment Mode:</span>{' '}
                                {parcel.paymentMode || '-'}
                            </p>
                            <p>
                                <span className='font-semibold'>Delivery Fee:</span>{' '}
                                {parcel.deliveryFee}
                            </p>
                            <p>
                                <span className='font-semibold'>Total Amount:</span>{' '}
                                {parcel.totalAmount}
                            </p>
                        </div>

                        {/* Agent Info */}
                        {parcel.agent && (
                            <div className='mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200'>
                                <h3 className='text-md font-semibold text-gray-800 mb-2'>
                                    Agent Information
                                </h3>
                                <p>
                                    <span className='font-semibold'>Agent Name:</span>{' '}
                                    {parcel.agent.username || '-'}
                                </p>
                                <p>
                                    <span className='font-semibold'>Email:</span>{' '}
                                    {parcel.agent.email || '-'}
                                </p>
                                <p>
                                    <span className='font-semibold'>Phone Number:</span>{' '}
                                    {parcel.agent.phoneNumber || '-'}
                                </p>
                                <p>
                                    <span className='font-semibold'>Joined At:</span>{' '}
                                    {parcel.agent.createdAt
                                        ? new Date(parcel.agent.createdAt).toLocaleDateString()
                                        : '-'}
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <p className='text-gray-500'>Enter a tracking ID to see parcel details.</p>
                )}
            </div>
        </div>
    );
};

export default ParcelTracking;
