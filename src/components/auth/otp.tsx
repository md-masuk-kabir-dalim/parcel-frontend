'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useRouter } from 'next/navigation';
import useToaster from '@/hooks/useToaster';
import { useCreateResourceMutation } from '@/redux/api/curd';
import { authRoutes } from '@/constants/end-point';
import { tagTypes } from '@/redux/tag-types';
import { getUserInfo } from '@/utils/auth.service';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/features/slice/authSlice';

type OtpFormValues = { otp: string };

const OtpVerify = () => {
    const { control, handleSubmit } = useForm<OtpFormValues>({ defaultValues: { otp: '' } });
    const showToast = useToaster();
    const userInfo = getUserInfo();
    const navigate = useRouter();
    const dispatch = useDispatch();
    const [verifyOtp, { isLoading }] = useCreateResourceMutation();
    const [resendLoading, setResendLoading] = useState(false);

    const onSubmit = async (data: OtpFormValues) => {
        try {
            const response = await verifyOtp({
                url: authRoutes.verifyOtp,
                tags: tagTypes.auth,
                payload: { otpCode: data.otp }
            }).unwrap();

            showToast('success', 'OTP verified successfully!');
            dispatch(setAuth({ token: response.result?.accessToken }));
            if (response.result?.role === 'ADMIN') {
                navigate.push('/dashboard');
            }
            if (response.result?.role === 'DELIVERY_AGENT') {
                navigate.push('/dashboard/agent');
            }
            if (response.result?.role === 'CUSTOMER') {
                navigate.push('/dashboard/customer');
            }
        } catch (error: any) {
            showToast('error', error.data?.message || 'Invalid OTP!');
        }
    };

    const handleResendOtp = async () => {
        try {
            setResendLoading(true);
            const response = await verifyOtp({
                url: authRoutes.sendOtp,
                tags: tagTypes.auth,
                payload: {
                    identify: userInfo?.email,
                    otpType: 'EMAIL_VERIFICATION',
                    deliveryType: 'email'
                }
            }).unwrap();
            dispatch(setAuth({ token: response.result?.verifyToken }));
            showToast('success', 'OTP resent successfully!');
        } catch (error: any) {
            showToast('error', error.data?.message || 'Failed to resend OTP');
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50 px-4'>
            <div className='max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100'>
                <h2 className='text-2xl font-bold text-center text-gray-900'>OTP Verification</h2>
                <p className='text-sm text-gray-500 text-center mt-2 mb-6'>
                    Enter the 4-digit code we sent to your email
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <Controller
                        name='otp'
                        control={control}
                        render={({ field }) => (
                            <div className='flex justify-center'>
                                <InputOTP
                                    maxLength={4}
                                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                    value={field.value}
                                    onChange={field.onChange}
                                >
                                    <InputOTPGroup>
                                        {[...Array(4)].map((_, i) => (
                                            <InputOTPSlot
                                                key={i}
                                                index={i}
                                                className='w-14 h-14 text-xl font-semibold text-center rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition mx-1'
                                            />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                        )}
                    />

                    <Button
                        type='submit'
                        className='w-full py-2 text-base rounded-xl'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </Button>
                </form>

                <p className='mt-6 text-center text-sm text-gray-600'>
                    Didn’t receive the code?{' '}
                    <button
                        type='button'
                        onClick={handleResendOtp}
                        className='text-blue-600 font-medium hover:underline'
                        disabled={resendLoading}
                    >
                        {resendLoading ? 'Resending...' : 'Resend OTP'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default OtpVerify;
