import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const AuthComponent: React.FC<P> = (props) => {
        const { isAuthenticated } = useAppSelector((state) => state.auth);
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/login');
            }
        }, [isAuthenticated, router]);

        if (!isAuthenticated) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;
