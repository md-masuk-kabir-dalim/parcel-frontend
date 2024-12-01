'use client';
import Input from '@/components/common/input';
import { Button } from '@/components/ui/button';
import useToaster from '@/hooks/useToaster';
import { useFetchResourceQuery, useUpdateResourceMutation } from '@/redux/api/curd';
import { authRoutes } from '@/constants/end-point';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { tagTypes } from '@/redux/tag-types';
import Loading from '@/components/shared/loading';
import withAdmin from '@/HOC/withAdmin';

const EditTrainer = ({ trainerId }: { trainerId: string }) => {
    const [updateTrainer, { isLoading: isUpdateLoading }] = useUpdateResourceMutation();
    const showToast = useToaster();
    const methods = useForm();
    const { handleSubmit, reset } = methods;

    // Fetch trainer data
    const {
        data: trainerData,
        isLoading,
        error
    } = useFetchResourceQuery({
        url: authRoutes.getById(trainerId),
        tags: tagTypes.auth
    });

    useEffect(() => {
        if (trainerData?.data) {
            reset({
                fullName: trainerData.data.fullName,
                email: trainerData.data.email,
                role: trainerData.data.role || 'trainer'
            });
        }
    }, [trainerData, reset]);

    const onSubmit = async (data: any) => {
        try {
            // Send updated data to the backend API
            await updateTrainer({
                url: authRoutes.update_user(trainerId),
                tags: tagTypes.auth,
                payload: data
            }).unwrap();
            showToast('success', 'Trainer updated successfully!');
        } catch (error: any) {
            showToast('error', error?.message || 'Something went wrong.');
        }
    };

    if (isLoading) return <Loading />;

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='p-6 bg-white text-black shadow-md rounded-md'
            >
                <h1 className='text-2xl font-bold text-center mb-4'>Edit Trainer</h1>

                <Input
                    name='fullName'
                    label='Full Name'
                    placeholder="Enter the trainer's full name"
                    required
                    rules={{
                        required: 'Full name is required',
                        maxLength: {
                            value: 100,
                            message: 'Full name must be less than 100 characters'
                        }
                    }}
                />

                <Input
                    name='email'
                    label='Email'
                    type='email'
                    placeholder="Enter the trainer's email"
                    required
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Enter a valid email address'
                        }
                    }}
                />

                <div className='mb-4 mt-2'>
                    <label htmlFor='role' className='block text-sm font-medium'>
                        Role
                    </label>
                    <select
                        id='role'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        {...methods.register('role', { required: 'Role is required' })}
                    >
                        <option value=''>Select Role</option>
                        <option value='trainer'>Trainer</option>
                    </select>
                </div>
                <Button
                    type='submit'
                    className='w-full mt-4 text-white-light'
                    disabled={isUpdateLoading}
                >
                    {isUpdateLoading ? 'Updating...' : 'Update Trainer'}
                </Button>
            </form>
        </FormProvider>
    );
};

export default withAdmin(EditTrainer);
