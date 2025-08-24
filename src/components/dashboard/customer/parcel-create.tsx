'use client';
import React, { useEffect } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { useCreateResourceMutation } from '@/redux/api/curd';
import useToaster from '@/hooks/useToaster';
import LocationInput from '@/components/common/Location_Input';
import { parcelRoutes } from '@/constants/end-point';
import Input from '@/components/common/input';
import { useRouter } from 'next/navigation';
import { tagTypes } from '@/redux/tag-types';
import { calculateDistance } from '@/lib/helpers/calculate_distance';

const PARCEL_TYPES = [
    'DOCUMENT',
    'PACKAGE',
    'FOOD',
    'ELECTRONICS',
    'CLOTHING',
    'MEDICAL',
    'FRAGILE',
    'LIQUID',
    'FURNITURE',
    'COSMETICS',
    'BOOKS',
    'OTHER'
];
const SIZE_CATEGORIES = ['SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE'];
const PAYMENT_MODES = ['COD', 'PREPAID'];

const BASE_FEE = 100;
const PER_KG = 20;
const PER_KM = 10;

const ParcelCreate: React.FC = () => {
    const router = useRouter();
    const methods = useForm({
        defaultValues: {
            pickupLocation: { type: 'Point', address: '', coordinates: [0, 0] },
            dropoffLocation: { type: 'Point', address: '', coordinates: [0, 0] },
            pickupContactName: '',
            pickupContactPhone: '',
            dropoffContactName: '',
            dropoffContactPhone: '',
            type: 'DOCUMENT',
            weight: 0,
            sizeCategory: 'SMALL',
            paymentMode: 'COD',
            deliveryFee: BASE_FEE,
            totalAmount: BASE_FEE
        }
    });

    const { handleSubmit, register, reset, setValue, control } = methods;
    const [createParcel, { isLoading }] = useCreateResourceMutation();
    const showToast = useToaster();

    // 👀 watch fields dynamically
    const weight = useWatch({ control, name: 'weight' });
    const pickup = useWatch({ control, name: 'pickupLocation' });
    const dropoff = useWatch({ control, name: 'dropoffLocation' });

    useEffect(() => {
        const distance = calculateDistance(pickup?.coordinates, dropoff?.coordinates);
        const deliveryFee = BASE_FEE + (weight || 0) * PER_KG + distance * PER_KM;
        setValue('deliveryFee', Math.round(BASE_FEE));
        setValue('totalAmount', Math.round(deliveryFee));
    }, [weight, pickup, dropoff, setValue]);

    const onSubmit = async (values: any) => {
        values.weight = Number(values.weight);
        console.log(values);

        try {
            const res: any = await createParcel({
                url: parcelRoutes.create,
                payload: values,
                tags: tagTypes.parcelList
            }).unwrap();
            if (res?.success) {
                showToast('success', 'Parcel created successfully');
                reset();
                router.push('/dashboard/customer/my-parcel');
            } else {
                showToast('error', 'Failed to create parcel');
            }
        } catch (error: any) {
            showToast('error', error?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className='mx-auto p-4 bg-white rounded-md shadow'>
            <h2 className='text-xl font-bold mb-4'>Create New Parcel</h2>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <h3 className='font-semibold'>Pickup Info</h3>
                    <LocationInput name='pickupLocation' label='Pickup Address' />
                    <Input name='pickupContactName' label='Contact Name' required />
                    <Input name='pickupContactPhone' label='Contact Phone' required />

                    <h3 className='font-semibold'>Dropoff Info</h3>
                    <LocationInput name='dropoffLocation' label='Dropoff Address' />
                    <Input name='dropoffContactName' label='Contact Name' required />
                    <Input name='dropoffContactPhone' label='Contact Phone' required />

                    <h3 className='font-semibold'>Parcel Details</h3>
                    <div>
                        <label className='block mb-1 font-medium'>Parcel Type *</label>
                        <select {...register('type')} className='w-full border rounded-md p-2'>
                            {PARCEL_TYPES.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Input name='weight' type='number' label='Weight (kg)' />
                    <div>
                        <label className='block mb-1 font-medium'>Size Category *</label>
                        <select
                            {...register('sizeCategory')}
                            className='w-full border rounded-md p-2'
                        >
                            {SIZE_CATEGORIES.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className='block mb-1 font-medium'>Payment Mode *</label>
                        <select
                            {...register('paymentMode')}
                            className='w-full border rounded-md p-2'
                        >
                            {PAYMENT_MODES.map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Input name='deliveryFee' type='number' label='Delivery Fee' disabled />
                    <Input name='totalAmount' type='number' label='Total Amount' disabled />

                    <button
                        type='submit'
                        disabled={isLoading}
                        className='w-full bg-blue text-white py-2 rounded-md hover:bg-blue-700 transition'
                    >
                        {isLoading ? 'save..........' : 'create parcel'}
                    </button>
                </form>
            </FormProvider>
        </div>
    );
};

export default ParcelCreate;
