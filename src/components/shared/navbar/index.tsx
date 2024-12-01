import ThemeToggle from '@/components/common/theme_toggle';
import React from 'react';

const Navbar = ({ navbarLogo }: any) => {
    return (
        <header className='flex justify-between bg-primary text-white-light p-5'>
            <h1 className='text-2xl font-semibold'>navbar</h1>
            <ThemeToggle />
        </header>
    );
};

export default Navbar;
