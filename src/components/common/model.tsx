'use client';
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';

const Modal = ({
    isOpenModal = false,
    setIsOpenModal = () => false,
    title = 'Modal',
    children,
    className
}: ModalProps) => {
    return (
        <>
            {isOpenModal && (
                <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
                    <DialogContent className={`${className}`}>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>{children}</DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default Modal;
