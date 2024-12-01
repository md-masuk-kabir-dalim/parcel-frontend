import { toggleTheme } from '@/redux/features/slice/ThemeSlice';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useTheme = () => {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const dispatch = useDispatch();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.body.classList.toggle('dark', mode === 'dark');
        }
    }, [mode]);

    const toggle = () => {
        dispatch(toggleTheme());
    };

    return { mode, toggle };
};
