type ClassSchedule = {
    _id: string,
    className: string,
    trainer: any,
    day: string,
    maxTrainees: number,
    bookedTrainees: number
};

type ClassScheduleProps = {
    schedules: ClassSchedule[],
    isAuthenticated: boolean
};

interface BookingModalProps {
    isOpenModal: boolean;
    setIsOpenModal: (isOpen: boolean) => void;
    schedules: Array<{
        _id: string,
        className: string,
        trainer: {
            fullName: string
        },
        day: string
    }>;
    isAuthenticated: boolean;
}
