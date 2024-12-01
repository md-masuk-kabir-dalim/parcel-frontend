'use client';
import { useEffect, useState } from 'react';
import { icons } from '@/constants/icons';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Show the button when scrolled to the bottom
            if (scrollTop > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className='hidden sm:block fixed bottom-10 right-5 p-3 text-white-light text-2xl bg-primary border-none rounded-full cursor-pointer transition-transform transform hover:scale-90 hover:bg-primary/85'
            >
                <icons.TopArrowIcon className='w-6 h-6 stroke-1' />
            </button>
        )
    );
};

export default ScrollToTopButton;
