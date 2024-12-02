'use client';
import { decodedToken } from './jwt';
import { getFromLocalStorage, setToLocalStorage, removeFromLocalStorage } from './local-storage';

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
    return setToLocalStorage('accessToken', accessToken as string);
};

export const getUserInfo = () => {
    const authToken = getFromLocalStorage('token');
    if (authToken) {
        const decodedData = decodedToken(authToken);
        return decodedData ? { token: authToken, ...decodedData } : null;
    } else {
        return null;
    }
};

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage('accessToken');
    return !!authToken;
};

export const removeUserInfo = (key: string) => {
    return localStorage.removeItem(key);
};

export const isTokenExpired = (token: any) => {
    if (!token || typeof token !== 'string') {
        return true;
    }
    const decoded: any = decodedToken(token);
    if (!decoded) {
        return true;
    }
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};

// Store theme (light or dark) in local storage
export const setThemeLocalStorage = (theme: 'light' | 'dark') => {
    return setToLocalStorage('theme', theme);
};

// Retrieve theme from local storage (default to 'light' if not set)
export const getThemeLocalStorage = (): 'light' | 'dark' => {
    const storedTheme = getFromLocalStorage('theme');
    return storedTheme === 'dark' ? 'dark' : 'light';
};

// Remove theme from local storage
export const removeThemeLocalStorage = () => {
    return removeFromLocalStorage('theme');
};
