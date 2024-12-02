'use client';
import withRole from './withRole';

const withAdmin = <P extends object>(WrappedComponent: React.ComponentType<P>) =>
    withRole(WrappedComponent, { requiredRole: 'admin' });

export default withAdmin;
