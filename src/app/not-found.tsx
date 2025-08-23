'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { images } from '@/constants/images';

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, [router]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Image src={images.NotFoundImage} alt='Not Found page image' />
      <p className='mt-4 text-gray-500 text-center'>Redirecting to home...</p>
    </div>
  );
};

export default NotFoundPage;
