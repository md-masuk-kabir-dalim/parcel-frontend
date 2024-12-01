'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { images } from '@/constants/images';

const NotFoundPage = () => {
    const router = useRouter();
    //Redirect to the home page after 2 seconds
    setTimeout(() => {
        router.push('/');
    }, 2000);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <Image src={images.NotFoundImage} alt='Not Found page image' />
        </div>
    );
};

export default NotFoundPage;
