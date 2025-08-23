'use client';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import Input from '../common/input';
import useToaster from '@/hooks/useToaster';
import { useCreateResourceMutation } from '@/redux/api/curd';
import { authRoutes } from '@/constants/end-point';
import { tagTypes } from '@/redux/tag-types';
import SelectBox from '../common/select_box';

// ✅ Define your own form type
type RegisterFormValues = {
    username: string,
    email: string,
    role: 'CUSTOMER' | 'DELIVERY_AGENT',
    phoneNumber: string,
    password: string
};

const Register = () => {
    const showToast = useToaster();
    const navigate = useRouter();

    // ✅ Pass custom type to useForm
    const methods = useForm<RegisterFormValues>({
        defaultValues: {
            username: '',
            email: '',
            role: 'CUSTOMER',
            phoneNumber: '',
            password: ''
        }
    });

    const [registerUser, { isLoading }] = useCreateResourceMutation();
    const { handleSubmit } = methods;

    // ✅ `data` now properly typed
    const onSubmit = async (data: RegisterFormValues) => {
        try {
            const payload = { ...data };
            await registerUser({
                url: authRoutes.register,
                tags: tagTypes.auth,
                payload
            }).unwrap();
            showToast('success', 'Registration successful!');
            navigate.push('/login');
        } catch (error: any) {
            showToast('error', error.data?.message || 'Registration failed!');
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4'>
            <div className='max-w-lg w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg'>
                <h2 className='text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6'>
                    Create an Account
                </h2>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        {/* Username */}
                        <Input
                            name='username'
                            label='Username'
                            placeholder='Enter your username'
                            formClassName='mb-2'
                        />

                        {/* Email */}
                        <Input
                            name='email'
                            type='email'
                            label='Email'
                            placeholder='Enter your email'
                            formClassName='mb-2'
                        />

                        {/* Role */}
                        <div>
                            <label
                                htmlFor='role'
                                className='block text-sm font-medium text-gray-700 mb-2'
                            >
                                Select Role
                            </label>
                            <select
                                id='role'
                                {...methods.register('role')}
                                className='block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            >
                                <option value='CUSTOMER'>Customer</option>
                                <option value='DELIVERY_AGENT'>Delivery Agent</option>
                            </select>
                        </div>

                        {/* Phone Number */}
                        <Input
                            name='phoneNumber'
                            label='Phone Number'
                            placeholder='Enter your phone number'
                            formClassName='mb-2'
                        />

                        {/* Password */}
                        <Input
                            name='password'
                            label='Password'
                            type='password'
                            placeholder='Enter your password'
                            formClassName='mb-4'
                        />

                        {/* Submit Button */}
                        <Button
                            type='submit'
                            className={`w-full py-2 px-4 bg-blue text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default Register;
