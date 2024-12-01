'use client';
import ClassScheduleCard from '@/components/shared/card/admin-class-schedule-card';
import Loading from '@/components/shared/loading';
import { Button } from '@/components/ui/button';
import { classScheduleRoutes } from '@/constants/end-point';
import useToaster from '@/hooks/useToaster';
import { useDeleteResourceMutation, useFetchResourceQuery } from '@/redux/api/curd';
import { tagTypes } from '@/redux/tag-types';
import Link from 'next/link';
import React from 'react';

const ListClassSchedule = () => {
    const [deleteClassSchedule] = useDeleteResourceMutation();
    const showToast = useToaster();
    const { data, isLoading } = useFetchResourceQuery({
        url: classScheduleRoutes.getAll,
        tags: tagTypes.class_schedule
    });

    const handleDeleteClassSchedule = async (id: string) => {
        try {
            await deleteClassSchedule({
                url: classScheduleRoutes.delete(id),
                tags: tagTypes.class_schedule
            }).unwrap();
            showToast('success', 'Class schedule delete successful');
        } catch (error: any) {
            showToast('error', error?.message || error?.data?.message);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <section className='p-6 bg-white rounded-lg shadow min-h-screen'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold text-black'>Class Schedule List</h1>
                <Link href={'/dashboard/class-schedule/create-class-schedule'}>
                    <Button className='text-white-light'>Create Class Schedule</Button>
                </Link>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                {data?.data?.map((schedule: any) => (
                    <ClassScheduleCard
                        key={schedule._id}
                        id={schedule?._id}
                        className={schedule.className}
                        trainer={schedule.trainer?.fullName}
                        day={schedule.day}
                        maxTrainees={schedule.maxTrainees}
                        bookedTrainees={schedule.bookedTrainees}
                        onDelete={() => handleDeleteClassSchedule(schedule._id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default ListClassSchedule;
