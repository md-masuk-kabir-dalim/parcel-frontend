import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface WithRoleOptions {
    requiredRole: string;
}

const withRole = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    { requiredRole }: WithRoleOptions
) => {
    const RoleComponent: React.FC<P> = (props) => {
        const { user, isAuthenticated } = useAppSelector((state) => state.auth);
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated || user?.role !== requiredRole) {
                router.push('/login');
            }
        }, [isAuthenticated, user, requiredRole, router]);

        if (!isAuthenticated || user?.role !== requiredRole) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return RoleComponent;
};

export default withRole;
