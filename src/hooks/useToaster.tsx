import React from 'react';
import { toast } from 'sonner';
import { icons } from '@/constants/icons';

const useToaster = () => {
    const showToast = (type: string, message: string, description?: string) => {
        if (type === 'success') {
            toast.success(message, {
                description: description,
                action: {
                    label: <icons.crossIcons />,
                    onClick: () => {}
                }
            });
        } else if (type === 'error') {
            toast.error(message, {
                description: description,
                action: {
                    label: <icons.crossIcons />,
                    onClick: () => {}
                }
            });
        } else if (type === 'warning') {
            toast.warning(message, {
                description: description,
                action: {
                    label: <icons.crossIcons />,
                    onClick: () => {}
                }
            });
        }
    };

    return showToast;
};

export default useToaster;
