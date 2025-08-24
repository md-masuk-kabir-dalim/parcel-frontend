import { icons } from '@/constants/icons';
import React from 'react';

const Loading = () => {
    return (
        <div className='flex gap-2 items-center mt-48 justify-center'>
            <icons.loading className='animate-spin h-8 w-8 text-_secondary' />
        </div>
    );
};

export default Loading;
