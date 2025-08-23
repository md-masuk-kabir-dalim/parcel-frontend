import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the AuthState type
type AuthState = {
    token: string | null,
    user: { id: string, email: string, role: string } | null,
    isAuthenticated: boolean
};

// Helper function to safely retrieve data from localStorage
const getFromLocalStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
    }
    return null;
};

// Retrieve the initial state from localStorage (if available)
const tokenFromStorage = getFromLocalStorage('token');
const userFromStorage = getFromLocalStorage('user');

const initialState: AuthState = {
    token: tokenFromStorage ? tokenFromStorage : null,
    user: userFromStorage ? JSON.parse(userFromStorage) : null,
    isAuthenticated: !!tokenFromStorage
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ token: string, user: AuthState['user'] }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;

            // Save token and user to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            }
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;

            // Clear token and user from localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
    }
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
