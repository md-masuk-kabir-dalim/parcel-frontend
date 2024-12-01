import EditTrainer from '@/components/dasboard/trainer/edit-trainer';
import React from 'react';

const EditTrainerPage = ({ params }: any) => {
    return <EditTrainer trainerId={params?.id} />;
};

export default EditTrainerPage;
