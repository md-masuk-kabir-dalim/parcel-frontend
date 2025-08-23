'use client';
import { authRoutes } from '@/constants/end-point';
import useToaster from '@/hooks/useToaster';
import { useCreateResourceMutation } from '@/redux/api/curd';
import { useAppDispatch } from '@/redux/hooks';
import { tagTypes } from '@/redux/tag-types';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Input from '../common/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { setAuth } from '@/redux/features/slice/authSlice';

type FormData = {
    email: string,
    password: string
};

const Login = () => {
    const showTost = useToaster();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const methods = useForm<FormData>({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur' // advanced validation trigger
    });

    const { handleSubmit, formState } = methods;
    const [loginUser, { isLoading }] = useCreateResourceMutation();

    const onSubmit = async (data: FormData) => {
        try {
            const response = await loginUser({
                url: authRoutes.login,
                tags: tagTypes.auth,
                payload: data
            }).unwrap();

            dispatch(setAuth({ token: response.token, user: response.user }));
            showTost('success', 'Login successful!');
            router.push('/dashboard');
        } catch (error: any) {
            showTost('error', error.data?.message || 'Login failed!');
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4'>
            <div className='max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-fadeIn'>
                <h2 className='text-3xl font-bold text-center text-gray-900 mb-6'>Welcome Back</h2>
                <p className='text-center text-gray-500 mb-8'>
                    Enter your credentials to access your account
                </p>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                        <Input
                            name='email'
                            label='Email'
                            type='email'
                            placeholder='you@example.com'
                            rules={{
                                required: ' ',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address'
                                }
                            }}
                        />
                        <Input
                            name='password'
                            label='Password'
                            type='password'
                            placeholder='Enter your password'
                            rules={{
                                required: ' ',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            }}
                        />

                        <Button
                            type='submit'
                            className={`w-full py-3 bg-blue text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                </FormProvider>

                <div className='mt-6 text-center text-gray-500 text-sm'>
                    Don't have an account?{' '}
                    <a href='/auth/register' className='text-blue-600 font-medium hover:underline'>
                        Register
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
