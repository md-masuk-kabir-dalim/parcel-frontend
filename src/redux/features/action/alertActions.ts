export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

export const showAlert = ({
    title,
    description,
    confirmLabel = 'Yes',
    cancelLabel = 'No',
    alertType = 'default'
}: ShowAlertPayload) => ({
    type: SHOW_ALERT,
    payload: { title, description, confirmLabel, cancelLabel, alertType }
});

export const hideAlert = () => ({
    type: HIDE_ALERT
});
