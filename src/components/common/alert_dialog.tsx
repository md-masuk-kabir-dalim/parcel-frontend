import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { hideAlert } from '@/redux/features/action/alertActions';
export function CustomAlert({ onConfirm, onCancel, ...otherProps }: CustomAlertProps) {
    const dispatch = useDispatch();
    const alertTrigger = useSelector((state: RootState) => state.alert);
    const handleClose = () => dispatch(hideAlert());
    if (!alertTrigger.isOpen) return null;
    return (
        <AlertDialog open={otherProps.isOpen} onOpenChange={handleClose}>
            <AlertDialogContent className='bg-white'>
                <AlertDialogHeader>
                    <AlertDialogTitle>{otherProps.title}</AlertDialogTitle>
                    <AlertDialogDescription>{otherProps.description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button className='text-black' onClick={onCancel}>
                            {otherProps.cancelLabel}
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button className='bg-red-300' onClick={onConfirm}>
                            {otherProps.confirmLabel}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
