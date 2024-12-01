import withRole from './withRole';
const withTrainer = <P extends object>(WrappedComponent: React.ComponentType<P>) =>
    withRole(WrappedComponent, { requiredRole: 'trainer' });

export default withTrainer;
