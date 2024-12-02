import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { ComponentType } from 'react';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const AuthComponent: React.FC<P> = (props) => {
        const { isAuthenticated } = useAppSelector((state) => state.auth);
        const router = useRouter();

        if (!isAuthenticated) {
            // If the user is not authenticated, redirect to the login page
            router.push('/login');
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;
