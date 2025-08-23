import Cookies from 'js-cookie';

export const getAuthToken = () => {
    const token = Cookies?.get('token');
    return token;
};
