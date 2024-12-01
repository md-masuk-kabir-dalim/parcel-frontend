'use client';
import React, { useEffect, useRef } from 'react';

const CountDown: React.FC = () => {
    const refSecs = useRef<HTMLDivElement>(null);
    const refMins = useRef<HTMLDivElement>(null);
    const refHours = useRef<HTMLDivElement>(null);
    const refDays = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            dateDiff();
        }, 1000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    function dateDiff() {
        const now = new Date();
        const targetDate = new Date('Jun 27 2022 08:40:12 GMT+0430');
        const timeDiff = Math.abs(targetDate.getTime() - now.getTime());
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((timeDiff % (1000 * 60)) / 1000);
        if (refDays.current) refDays.current.innerText = days.toString();
        if (refHours.current) refHours.current.innerText = hours.toString();
        if (refMins.current) refMins.current.innerText = mins.toString();
        if (refSecs.current) refSecs.current.innerText = secs.toString();
    }

    return (
        <div className='flex flex-wrap items-center justify-center gap-5 mt-10 sm:mt-5'>
            <div className='bg-primary text-white-light rounded-lg py-5 px-3 w-[95px] text-center'>
                <div ref={refDays} className='text-4xl font-bold leading-[20px]'></div>
                <p className='text-sm mt-2'>Days</p>
            </div>
            <div className='bg-primary text-white-light rounded-lg py-5 px-3 w-[95px] text-center'>
                <div ref={refHours} className='text-4xl font-bold leading-[20px]'></div>
                <p className='text-sm mt-2'>Hours</p>
            </div>
            <div className='bg-primary text-white-light rounded-lg py-5 px-3 w-[95px] text-center'>
                <div ref={refMins} className='text-4xl font-bold leading-[20px]'></div>
                <p className='text-sm mt-2'>Minutes</p>
            </div>
            <div className='bg-primary text-white-light rounded-lg py-5 px-3 w-[95px] text-center'>
                <div ref={refSecs} className='text-4xl font-bold leading-[20px]'></div>
                <p className='text-sm mt-2'>Seconds</p>
            </div>
        </div>
    );
};

export default CountDown;
