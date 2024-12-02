'use client';
import { icons } from '@/constants/icons';
import React, { useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

const SheetDrawer: React.FC<SheetDrawerProps> = ({
    children,
    isOpen = false,
    size = 800,
    direction = 'right',
    setIsOpen = () => {},
    title = 'Drawer',
    lockBackgroundScroll = true
}) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <div>
            <Drawer
                size={size}
                open={isOpen}
                duration={350}
                onClose={toggleDrawer}
                lockBackgroundScroll={lockBackgroundScroll}
                overlayOpacity={0.7}
                direction={direction}
                className='text-white shadow-lg'
                style={{ overflow: 'auto' }}
            >
                <div className='flex gap-4 items-center mb-4'>
                    <icons.arrowBackIcons
                        onClick={toggleDrawer}
                        className='text-3xl text-primary hover:text-primary cursor-pointer'
                    />
                    <h4 className='font-bold text-lg'>{title}</h4>
                </div>
                <div>{children}</div>
            </Drawer>
        </div>
    );
};

export default SheetDrawer;
