'use client';
import ThemeToggle from '@/components/common/theme_toggle';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    return (
        <header className='flex justify-between bg-primary text-white-light p-5'>
            <h1 className='text-2xl font-semibold'>navbar</h1>
            <div className='flex items-center gap-10'>
                {isAuthenticated && (
                    <Link href='/dashboard' className='text-white-light'>
                        Dashboard
                    </Link>
                )}
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Navbar;
