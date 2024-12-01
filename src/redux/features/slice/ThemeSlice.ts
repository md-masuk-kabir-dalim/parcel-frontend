import { setThemeLocalStorage } from '@/utils/auth.service';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
    mode: 'light' | 'dark';
}

const initialState: ThemeState = {
    mode:
        typeof window !== 'undefined' && localStorage.getItem('theme')
            ? (localStorage.getItem('theme') as 'light' | 'dark')
            : 'light'
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            if (typeof window !== 'undefined') {
                setThemeLocalStorage(state.mode);
            }
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.mode = action.payload;
            if (typeof window !== 'undefined') {
                setThemeLocalStorage(state.mode);
            }
        }
    }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
