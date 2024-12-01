interface ShowAlertPayload {
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    alertType?: string;
}

interface CustomAlertProps {
    onConfirm: () => void;
    onCancel: () => void;
    isOpen?: boolean;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
}

interface RootState {
    alert: {
        isOpen: boolean,
        title: string,
        description: string,
        confirmLabel: string,
        cancelLabel: string,
        alertType: string
    };
}
