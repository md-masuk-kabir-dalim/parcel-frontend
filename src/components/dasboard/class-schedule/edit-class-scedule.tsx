'use client';
import Input from '@/components/common/input';
import Loading from '@/components/shared/loading';
import { Button } from '@/components/ui/button';
import { authRoutes, classScheduleRoutes } from '@/constants/end-point';
import useToaster from '@/hooks/useToaster';
import { useUpdateResourceMutation, useFetchResourceQuery } from '@/redux/api/curd';
import { tagTypes } from '@/redux/tag-types';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const EditClassSchedule: React.FC<{ scheduleId: string }> = ({ scheduleId }) => {
    const [updateClassSchedule, { isLoading: isUpdateLoading }] = useUpdateResourceMutation();
    const showToast = useToaster();

    const methods = useForm({
        defaultValues: {
            className: '',
            trainer: '',
            day: '',
            maxTrainees: 10,
            bookedTrainees: 0
        }
    });
    const { handleSubmit, reset } = methods;

    // Fetch trainers for the dropdown
    const { data: trainerData, isLoading: trainersLoading } = useFetchResourceQuery({
        url: authRoutes.get_all_user,
        tags: tagTypes.class_schedule,
        params: { role: 'trainer' }
    });

    // Fetch existing class schedule
    const { data: scheduleData, isLoading: scheduleLoading } = useFetchResourceQuery({
        url: classScheduleRoutes.getById(scheduleId),
        tags: tagTypes.class_schedule
    });

    // Populate the form with existing data
    useEffect(() => {
        if (scheduleData?.data) {
            reset({
                className: scheduleData.data.className,
                trainer: scheduleData.data.trainer,
                day: new Date(scheduleData.data.day).toISOString().slice(0, 16),
                maxTrainees: scheduleData.data.maxTrainees,
                bookedTrainees: scheduleData.data.bookedTrainees
            });
        }
    }, [scheduleData, reset]);

    if (trainersLoading || scheduleLoading) {
        return <Loading />;
    }

    const onSubmit = async (data: any) => {
        try {
            const formattedDate = new Date(data.day).toISOString();
            const payload = {
                className: data?.className,
                trainer: data?.trainer,
                day: formattedDate,
                maxTrainees: data?.maxTrainees,
                bookedTrainees: data?.bookedTrainees
            };

            await updateClassSchedule({
                url: classScheduleRoutes.update(scheduleId),
                tags: tagTypes.class_schedule,
                payload: payload
            }).unwrap();

            showToast('success', 'Class schedule updated successfully');
        } catch (error: any) {
            showToast('error', error?.message || error?.data?.message);
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='p-4 bg-white text-black shadow rounded'
            >
                <h1 className='text-xl font-bold mb-4'>Edit Class Schedule</h1>

                <Input
                    name='className'
                    label='Class Name'
                    placeholder='Enter the class name'
                    required
                    rules={{
                        required: 'Class name is required',
                        maxLength: {
                            value: 50,
                            message: 'Class name must be 50 characters or less'
                        }
                    }}
                />

                {/* Trainer Select Dropdown */}
                <div className='mb-4'>
                    <label htmlFor='trainer' className='block text-sm font-medium text-gray-700'>
                        Trainer
                    </label>
                    <select
                        id='trainer'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        {...methods.register('trainer', {
                            required: 'Trainer is required'
                        })}
                    >
                        <option value=''>Select Trainer</option>
                        {trainerData?.data?.map((trainer: any) => (
                            <option key={trainer._id} value={trainer._id}>
                                {trainer.fullName}
                            </option>
                        ))}
                    </select>
                    <p className='text-sm text-red-500'>
                        {methods.formState.errors.trainer?.message}
                    </p>
                </div>

                {/* Date and Time Picker */}
                <div className='mb-4'>
                    <label htmlFor='day' className='block text-sm font-medium text-gray-700'>
                        Day and Time
                    </label>
                    <input
                        id='day'
                        type='datetime-local'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        {...methods.register('day', {
                            required: 'Date and time are required'
                        })}
                    />
                    <p className='text-sm text-red-500'>{methods.formState.errors.day?.message}</p>
                </div>

                <Input
                    name='maxTrainees'
                    label='Max Trainees'
                    type='number'
                    placeholder='Enter max trainees'
                    rules={{
                        required: 'Max trainees is required',
                        min: {
                            value: 1,
                            message: 'Max trainees must be at least 1'
                        },
                        max: {
                            value: 10,
                            message: 'Max trainees cannot exceed 10'
                        }
                    }}
                />

                <Button type='submit' className='w-full mt-4 text-white' disabled={isUpdateLoading}>
                    {isUpdateLoading ? 'Loading....' : 'Update Schedule'}
                </Button>
            </form>
        </FormProvider>
    );
};

export default EditClassSchedule;
