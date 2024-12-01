import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
    const { user } = useAppSelector((state) => state.auth);
    return (
        <aside className='w-64 bg-white text-black shadow-lg flex flex-col h-screen'>
            {/* Header */}
            <div className='p-4 text-center text-2xl font-bold border-b border-gray-700'>
                Dashboard
            </div>

            {/* Navigation Links */}
            <nav className='flex-grow p-4'>
                <ul className='space-y-2'>
                    <li>
                        <Link href='/'>
                            <p className='block py-2 px-4 rounded hover:bg-blue hover:text-white-light transition'>
                                Home
                            </p>
                        </Link>
                    </li>
                    {user?.role === 'admin' ||
                        (user?.role === 'trainer' && (
                            <li>
                                <Link href='/dashboard/class-schedule'>
                                    <p className='block py-2 px-4 rounded hover:bg-blue hover:text-white-light transition'>
                                        Class schedule
                                    </p>
                                </Link>
                            </li>
                        ))}
                    {user?.role === 'admin' && (
                        <li>
                            <Link href='/dashboard/trainer'>
                                <p className='block py-2 px-4 rounded hover:bg-blue hover:text-white-light transition'>
                                    Trainer
                                </p>
                            </Link>
                        </li>
                    )}
                    {user?.role === 'admin' && (
                        <li>
                            <Link href='/dashboard/booking'>
                                <p className='block py-2 px-4 rounded hover:bg-blue hover:text-white-light transition'>
                                    Booking
                                </p>
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link href='/dashboard/my-booking'>
                            <p className='block py-2 px-4 rounded hover:bg-blue hover:text-white-light transition'>
                                My Booking
                            </p>
                        </Link>
                    </li>
                </ul>
            </nav>
            {/* Footer */}
            <div className='p-4 border-t border-gray-700 text-center text-sm'>© 2024 MyApp</div>
        </aside>
    );
};

export default Sidebar;
