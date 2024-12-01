import { baseApi } from './api/baseApi';
import { alertReducer } from './features/reducer/alertReducer';
import themeReducer from './features/slice/ThemeSlice';
import authReducer from './features/slice/authSlice';
export const rootReducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    alert: alertReducer,
    theme: themeReducer,
    auth: authReducer
};
