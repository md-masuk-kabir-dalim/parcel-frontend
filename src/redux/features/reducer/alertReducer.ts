import { SHOW_ALERT, HIDE_ALERT } from '../action/alertActions';
const initialState = {
    isOpen: false,
    title: '',
    description: '',
    confirmLabel: 'Continue',
    cancelLabel: 'Cancel',
    alertType: 'default'
};

export const alertReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SHOW_ALERT:
            return { ...state, ...action.payload, isOpen: true };
        case HIDE_ALERT:
            return { ...initialState };
        default:
            return state;
    }
};
