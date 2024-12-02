'use client';
import ThemeToggle from '@/components/common/theme_toggle';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [isClient, setIsClient] = useState(false);

    // Ensure the component is only considered hydrated on the client
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <header className='flex justify-between bg-primary text-white-light p-5'>
            <h1 className='text-2xl font-semibold'>navbar</h1>
            <div className='flex items-center gap-10'>
                {isClient && isAuthenticated ? (
                    <Link href='/dashboard' className='text-white-light'>
                        Dashboard
                    </Link>
                ) : (
                    <div className='flex gap-4'>
                        <Link href='/login' className='text-white-light'>
                            Login
                        </Link>
                        <Link href='/register' className='text-white-light'>
                            Register
                        </Link>
                    </div>
                )}
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Navbar;
