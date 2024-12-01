import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
    id: string;
    email: string;
}

export const decodedToken = (token: string) => {
    return jwtDecode<CustomJwtPayload>(token);
};
