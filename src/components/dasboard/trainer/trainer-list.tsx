'use client';
import TrainerCard from '@/components/shared/card/trainer-card';
import Loading from '@/components/shared/loading';
import { Button } from '@/components/ui/button';
import { authRoutes } from '@/constants/end-point';
import useToaster from '@/hooks/useToaster';
import { useDeleteResourceMutation, useFetchResourceQuery } from '@/redux/api/curd';
import { tagTypes } from '@/redux/tag-types';
import Link from 'next/link';
import React from 'react';

const TrainerList = () => {
    const [deleteTrainer] = useDeleteResourceMutation();
    const showToast = useToaster();
    const { data: trainerData, isLoading } = useFetchResourceQuery({
        url: authRoutes.get_all_user,
        tags: tagTypes.auth,
        params: { role: 'trainer' }
    });

    const handleDelete = async (id: string) => {
        try {
            await deleteTrainer({
                url: authRoutes.delete_user(id),
                tags: tagTypes.auth
            }).unwrap();
            showToast('success', 'Trainer delete successful');
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
                <h1 className='text-3xl font-bold text-black'>Trainer List</h1>
                <Link href={'/dashboard/trainer/create-trainer'}>
                    <Button className='text-white-light'>Add Trainer</Button>
                </Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                {trainerData?.data?.map((data: any) => (
                    <TrainerCard
                        key={data._id}
                        id={data?._id}
                        fullName={data.fullName}
                        email={data.email}
                        role={data.role}
                        onDelete={() => handleDelete(data._id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default TrainerList;
