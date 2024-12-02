'use client';
import ThemeToggle from '@/components/common/theme_toggle';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai'; // Import the hamburger menu icon
import MobileDevice from '../sidebar/mobile-device';

const Navbar = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [isClient, setIsClient] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control the mobile drawer

    // Ensure the component is only considered hydrated on the client
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            <header className='flex justify-between bg-primary text-white-light p-5'>
                <h1 className='text-2xl font-semibold'>GYM CLASS</h1>
                <div className='flex items-center gap-5'>
                    {isClient && isAuthenticated ? (
                        <Link href='/dashboard' className='text-white-light'>
                            Dashboard
                        </Link>
                    ) : (
                        <div className='flex gap-2'>
                            <Link href='/login' className='text-white-light'>
                                Login
                            </Link>
                            <Link href='/register' className='text-white-light'>
                                Register
                            </Link>
                        </div>
                    )}

                    {/* Hamburger Icon for Mobile Devices */}
                    <AiOutlineMenu
                        onClick={() => setIsDrawerOpen(true)}
                        className='text-3xl cursor-pointer md:hidden'
                    />

                    {/* Toggle Theme */}
                    <ThemeToggle />
                </div>
            </header>
            {/* Mobile Drawer Component */}
            <MobileDevice setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
        </>
    );
};

export default Navbar;
