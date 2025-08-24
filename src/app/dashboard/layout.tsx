import Sidebar from '@/components/shared/sidebar/sidebar';
import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className='h-screen flex'>
            {/* Sidebar */}
            <div className='hidden md:block'>
                <Sidebar />
            </div>
            {/* Main Content */}
            <main className='flex-grow bg-gray-100 px-4 py-2 overflow-auto'>{children}</main>
        </div>
    );
};

export default DashboardLayout;
