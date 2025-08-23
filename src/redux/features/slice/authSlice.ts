import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface User {
    role?: string;
    userName?: string;
    email?: string;
}

type AuthState = {
    token: string | null,
    user: User | null,
    isAuthenticated: boolean
};

// Helper function
const getCookie = (key: string) => {
    if (typeof window !== 'undefined') {
        const value = Cookies.get(key);
        return value || null;
    }
    return null;
};

// Decode token safely
const token = getCookie('token');
let user: User | null = null;

if (token) {
    try {
        user = jwtDecode<User>(token);
    } catch (error) {
        console.error('Invalid token:', error);
        user = null;
    }
}

const initialState: AuthState = {
    token,
    user,
    isAuthenticated: !!token
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;

            try {
                state.user = jwtDecode<User>(action.payload.token);
            } catch (error) {
                state.user = null;
            }

            // Set cookie
            Cookies.set('token', action.payload.token, { expires: 7 });
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            Cookies.remove('token');
        }
    }
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
