'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';
import useToaster from '@/hooks/useToaster';
import Input from '../common/input';
import SelectBox from '../common/select_box';
import { SubjectOption } from '@/data/contact_subject';
import { images } from '@/constants/images';
import { useCreateResourceMutation } from '@/redux/api/curd';
import { tagTypes } from '@/redux/tag-types';
import { MAIL_ENDPOINTS } from '@/constants/end-point';
const ContactUs = () => {
    const methods = useForm();
    const showToast = useToaster();
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue]: any = useState(SubjectOption?.[0]?.label);
    const [createResource] = useCreateResourceMutation();
    const OnSubmit = async (data: any) => {
        try {
            data.subject = inputValue || SubjectOption?.[0]?.label;
            const { message, ...restData } = data;

            const payload = {
                ...restData,
                html: message,
                websiteName: 'Device Finder',
                isVerified: false,
                place: 'contact'
            };
            const response = await createResource({
                payload,
                url: MAIL_ENDPOINTS.SEND_CONTACT,
                tags: tagTypes.email
            }).unwrap();
            if (!response?.isSuccess) {
                showToast('error', response?.message);
            }
            showToast('success', response?.message);
            methods.reset();
        } catch (error: any) {
            showToast('error', error?.message);
        }
    };
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl'>
                <div className='flex flex-col md:flex-row'>
                    <div className='w-full md:w-1/2 p-8 bg-blue-700 text-white flex items-center justify-center'>
                        <div>
                            <h2 className='text-4xl font-bold mb-4'>Contact Us</h2>
                            <p className='mb-4'>We d love to hear from you!</p>
                            <Image
                                src={images.contact_us_image}
                                alt='contact-us'
                                className='w-96'
                            />
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 p-8 mt-4'>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(OnSubmit)}>
                                <div className='mb-4'>
                                    <Input
                                        type='text'
                                        label='Name'
                                        name='name'
                                        required
                                        className='w-full  focus:outline-none focus:border-_blue p-2 border border-gray-300 rounded mt-1'
                                        placeholder='Enter Your Name'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <Input
                                        type='email'
                                        label='Email'
                                        name='email'
                                        required
                                        className='w-full  focus:outline-none focus:border-_blue p-2 border border-gray-300 rounded mt-1'
                                        placeholder='Email'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <SelectBox
                                        methods={methods}
                                        name='subject'
                                        label='Subject'
                                        options={SubjectOption}
                                        defaultValue={SubjectOption[0]?.label}
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        setInputValue={setInputValue}
                                        inputValue={inputValue}
                                    />
                                </div>
                                <div className='mb-4'>
                                    <Input
                                        textArea={true}
                                        name='message'
                                        label='Your Messages'
                                        required
                                        className='w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-_blue'
                                        placeholder='Message'
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='w-full bg-_dark-color text-white p-2 rounded hover:bg-_blue'
                                >
                                    Send Message
                                </button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
