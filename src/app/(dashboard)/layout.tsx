import Sidebar from '@/components/shared/sidebar/sidebar';
import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className='h-screen flex'>
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <main className='flex-grow bg-gray-100 p-6 overflow-auto'>{children}</main>
        </div>
    );
};

export default DashboardLayout;
