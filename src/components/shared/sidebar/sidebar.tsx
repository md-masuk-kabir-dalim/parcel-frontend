'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { FaUser, FaBox, FaTruck, FaHome, FaClipboardList } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();

    useEffect(() => setIsClient(true), []);

    if (!isClient) return null;

    const routes = [
        {
            label: 'Home',
            href: '/dashboard',
            roles: ['ADMIN'],
            icon: <FaHome />
        },
        {
            label: 'Home',
            href: '/dashboard/agent',
            roles: ['DELIVERY_AGENT'],
            icon: <FaHome />
        },
        {
            label: 'Home',
            href: '/dashboard/customer',
            roles: ['CUSTOMER'],
            icon: <FaHome />
        },
        {
            label: 'Parcel History',
            href: '/dashboard/admin/parcel-history',
            roles: ['ADMIN'],
            icon: <FaClipboardList />
        },
        {
            label: 'Assign Agents',
            href: '/dashboard/admin/assign-agent',
            roles: ['ADMIN'],
            icon: <FaTruck />
        },
        {
            label: 'Manage Users',
            href: '/dashboard/admin/manage-user',
            roles: ['ADMIN'],
            icon: <FaUser />
        },
        {
            label: 'Manage Agent',
            href: '/dashboard/admin/manage-agent',
            roles: ['ADMIN'],
            icon: <FaUser />
        },
        {
            label: 'My Parcel',
            href: '/dashboard/customer/my-parcel',
            roles: ['CUSTOMER'],
            icon: <FaBox />
        },
        {
            label: 'Track Parcels',
            href: '/dashboard/customer/track-parcel',
            roles: ['CUSTOMER'],
            icon: <FaBox />
        },
        {
            label: 'Assigned Parcels',
            href: '/dashboard/assigned-parcels',
            roles: ['DELIVERY_AGENT'],
            icon: <FaTruck />
        },
        {
            label: 'Update Status',
            href: '/dashboard/update-status',
            roles: ['DELIVERY_AGENT'],
            icon: <FaClipboardList />
        }
    ];

    const filteredRoutes = routes.filter(
        (route) => user && route.roles.includes(user.role?.toUpperCase() || '')
    );

    return (
        <aside className='w-64 bg-white text-gray-900 flex flex-col h-screen'>
            {/* Header */}
            <div className='p-6 text-center text-2xl font-bold border-b border-gray-200 bg-blue-600 text-black'>
                Courier System
            </div>

            {/* Navigation */}
            <nav className='flex-grow p-4 overflow-y-auto'>
                <ul className='space-y-1'>
                    {filteredRoutes.map((route, index) => {
                        const isActive = pathname === route.href;
                        return (
                            <li key={index}>
                                <Link href={route.href}>
                                    <div
                                        className={`flex items-center gap-3 py-2 px-4 transition-all cursor-pointer
                                            ${isActive ? 'bg-blue text-white' : 'hover:bg-blue-100 hover:text-blue-800'}
                                        `}
                                    >
                                        <span className='text-lg'>{route.icon}</span>
                                        <span className='font-medium'>{route.label}</span>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className='p-4 border-t border-gray-200 text-center text-sm text-gray-500'>
                Logged in as: <span className='font-medium'>{user?.role}</span>
            </div>
        </aside>
    );
};

export default Sidebar;
