'use client';
import React, { useState } from 'react';
import {
    FaBox,
    FaShippingFast,
    FaTruck,
    FaMapMarkedAlt,
    FaCheckCircle,
    FaUserCheck,
    FaTimesCircle
} from 'react-icons/fa';
import { useFetchResourceQuery } from '@/redux/api/curd';
import { tagTypes } from '@/redux/tag-types';
import { parcelRoutes } from '@/constants/end-point';
import Loading from '@/components/shared/loading';

enum PARCEL_STATUS {
    UNASSIGNED = 'UNASSIGNED',
    ASSIGNED = 'ASSIGNED',
    PICKED_UP = 'PICKED_UP',
    IN_TRANSIT = 'IN_TRANSIT',
    DELIVERED = 'DELIVERED',
    FAILED = 'FAILED'
}

const ParcelTracking = () => {
    const [parcelId, setParcelId] = useState<string>('');
    const [isCall, setIsCall] = useState<boolean>(false);
    const { data: parcelData, isFetching } = useFetchResourceQuery(
        {
            url: parcelRoutes.getSingleParcel(parcelId),
            tags: tagTypes.parcelList
        },
        { skip: !isCall }
    );

    const handleCall = (payload: boolean) => {
        console.log('hit');
        setIsCall(payload);
    };
    console.log(parcelData);

    if (isFetching) {
        return <Loading />;
    }
    const currentStatus = parcelData?.status || 'PICKED_UP';
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
                        onClick={() => handleCall(true)}
                        className='bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
                    >
                        Track
                    </button>
                </div>
            </div>

            {/* 📦 Tracking Info Card */}
            <div className='bg-white shadow-md rounded-lg p-6'>
                <p className='text-gray-600'>
                    Tracking ID: <span className='font-semibold'>#123456789</span>
                </p>
                <p className='text-gray-600'>
                    Estimated Delivery: <span className='font-semibold'>28 Aug, 2025</span>
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
                            {/* Circle with icon */}
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

                            {/* Label */}
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
            {/* <TrackMap /> */}

            {/* Parcel Details */}
            <div className='bg-white shadow-md rounded-lg p-6'>
                <h2 className='text-lg font-bold text-gray-800 mb-4'>Parcel Details</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700'>
                    <p>
                        <span className='font-semibold'>Sender:</span> Masuk Kabir
                    </p>
                    <p>
                        <span className='font-semibold'>Receiver:</span> Dalim Hasan
                    </p>
                    <p>
                        <span className='font-semibold'>Weight:</span> 2.5 KG
                    </p>
                    <p>
                        <span className='font-semibold'>Type:</span> Electronics
                    </p>
                    <p>
                        <span className='font-semibold'>Pickup:</span> Dhaka, Bangladesh
                    </p>
                    <p>
                        <span className='font-semibold'>Delivery:</span> Chattogram, Bangladesh
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ParcelTracking;
