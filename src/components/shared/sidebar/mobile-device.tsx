import React from 'react';
import SheetDrawer from '@/components/common/sheet_drawer';
import Sidebar from './sidebar';

const MobileDevice = ({ setIsDrawerOpen, isDrawerOpen }: any) => {
    return (
        <div>
            <SheetDrawer
                isOpen={isDrawerOpen}
                setIsOpen={setIsDrawerOpen}
                title='Mobile Drawer'
                size={250}
            >
                <Sidebar />
            </SheetDrawer>
        </div>
    );
};

export default MobileDevice;
