import EditClassSchedule from '@/components/dasboard/class-schedule/edit-class-scedule';
import React from 'react';

const EditClassSchedulePage = ({ params }: any) => {
    return <EditClassSchedule scheduleId={params?.id} />;
};

export default EditClassSchedulePage;
