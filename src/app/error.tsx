'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { images } from '@/constants/images';

const ErrorPage = () => {
    const router = useRouter();
    // Redirect to the home  page after 2 seconds
    setTimeout(() => {
        router.push('/');
    }, 2000);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4'>
            <Image src={images.NotFoundImage} alt='error  page image' />
        </div>
    );
};

export default ErrorPage;
