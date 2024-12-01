'use client';
import Input from '@/components/common/input';
import { Button } from '@/components/ui/button';
import useToaster from '@/hooks/useToaster';
import { useCreateResourceMutation } from '@/redux/api/curd';
import { authRoutes } from '@/constants/end-point';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { tagTypes } from '@/redux/tag-types';
import withAdmin from '@/HOC/withAdmin';

const CreateTrainer = () => {
    const [createTrainer, { isLoading: isCreateLoading }] = useCreateResourceMutation();
    const showToast = useToaster();
    const methods = useForm();
    const { handleSubmit } = methods;

    // Handle form submission
    const onSubmit = async (data: any) => {
        try {
            // Send data to the backend API
            await createTrainer({
                url: authRoutes.register,
                tags: tagTypes.auth,
                payload: data
            });
            showToast('success', 'Trainer created successfully!');
        } catch (error: any) {
            showToast('error', error?.message || 'Something went wrong.');
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='p-6 bg-white text-black shadow-md rounded-md'
            >
                <h1 className='text-2xl font-bold text-center mb-4'>Create Trainer</h1>

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

                <Input
                    name='password'
                    label='Password'
                    type='password'
                    placeholder='Enter the password'
                    required
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                        }
                    }}
                />

                <Input
                    name='confirmPassword'
                    label='Confirm Password'
                    type='password'
                    placeholder='Confirm the password'
                    required
                    rules={{
                        required: 'Confirm password is required',
                        validate: (value: any) =>
                            value === methods.getValues('password') || 'Passwords do not match'
                    }}
                />

                <Button
                    type='submit'
                    className='w-full mt-4 text-white-light'
                    disabled={isCreateLoading}
                >
                    {isCreateLoading ? 'Creating...' : 'Create Trainer'}
                </Button>
            </form>
        </FormProvider>
    );
};

export default withAdmin(CreateTrainer);
