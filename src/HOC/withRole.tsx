import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { ComponentType } from 'react';

interface WithRoleOptions {
    requiredRole: string;
}

const withRole = <P extends object>(
    WrappedComponent: ComponentType<P>,
    { requiredRole }: WithRoleOptions
) => {
    const RoleComponent: React.FC<P> = (props) => {
        const { user, isAuthenticated } = useAppSelector((state) => state.auth);
        const router = useRouter();

        if (!isAuthenticated) {
            router.push('/login');
            return null;
        }

        if (user?.role !== requiredRole) {
            router.push('/login');
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return RoleComponent;
};

export default withRole;
