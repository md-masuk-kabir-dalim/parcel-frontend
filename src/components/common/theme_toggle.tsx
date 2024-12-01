'use client';
import { icons } from '@/constants/icons';
import { useTheme } from '@/hooks/useTheme';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const { mode, toggle } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={toggle}
            className={`relative flex items-center justify-between p-2 w-16 h-8 bg-gray-200 rounded-full transition-all duration-300 focus:outline-none shadow-md hover:shadow-lg`}
            aria-label={`Switch to ${mode === 'light' ? 'Dark' : 'Light'} Mode`}
        >
            {/* Toggle background indicator */}
            <div
                className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white transform transition-all duration-300 ${
                    mode === 'light' ? 'translate-x-0' : 'translate-x-8'
                }`}
            ></div>

            {/* Sun icon for light mode */}
            <icons.LightIcons
                className={`h-5 w-5 flex text-yellow-600 absolute left-2 transition-opacity duration-300 ${
                    mode === 'light' ? 'opacity-100' : 'opacity-0'
                }`}
            />
            {/* Moon icon for dark mode */}
            <icons.DrakIcons
                className={`h-5 w-5 text-white-light absolute right-2 transition-opacity duration-300 ${
                    mode === 'dark' ? 'opacity-100' : 'opacity-0'
                }`}
            />
        </button>
    );
};

export default ThemeToggle;
