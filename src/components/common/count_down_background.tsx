'use client';
import React from 'react';
import CountDown from './count_down';

const CountDownBackground = () => {
    return (
        <div className='relative'>
            <div className='absolute top-[60px] w-full mb-[60px] sm:top-[40px] sm:mb-[40px]'>
                <div className='w-2/3 min-h-[350px] rounded-[15px] bg-white bg-opacity-70 mx-auto p-[70px_40px] flex flex-col gap-[10px] sm:w-[95%] sm:p-[20px_40px]'>
                    <h1 className='text-center text-black text-[1.5rem]'>
                        My website is under construction
                    </h1>
                    <CountDown />
                    <form
                        onClick={(event) => event.preventDefault()}
                        className='flex flex-row items-center justify-center gap-[10px] mt-[80px] sm:flex-col sm:mt-[40px] xs:mt-[20px]'
                    >
                        <input
                            type='email'
                            placeholder='Your Email'
                            className='text-black p-[20px] bg-white h-[40px] rounded-[5px] outline-none border border-black focus:border focus:border-primary'
                        />
                        <button
                            type='submit'
                            className='px-[20px] bg-primary rounded-[5px] text-white-light py-3 border-none transition-all duration-300'
                        >
                            Get Notified
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CountDownBackground;
