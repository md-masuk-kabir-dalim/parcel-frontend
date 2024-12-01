export const setToLocalStorage = (key: string, value: string) => {
    if (!key || typeof window === 'undefined') {
        return;
    }
    localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string): string | null => {
    if (!key || typeof window === 'undefined') {
        return null;
    }
    return localStorage.getItem(key);
};

export const setToLoginInfo = (key: string, value: string | boolean | number) => {
    if (!key || typeof window === 'undefined') {
        return;
    }
    const serializedValue =
        typeof value === 'boolean' || typeof value === 'number' ? value.toString() : value;
    localStorage.setItem(key, serializedValue);
};

export const getToLoginInfo = (key: string): string | null => {
    if (!key || typeof window === 'undefined') {
        return null;
    }
    return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key: string) => {
    if (!key || typeof window === 'undefined') {
        return;
    }
    localStorage.removeItem(key);
};
