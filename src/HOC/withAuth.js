import React from 'react';
import { Redirect } from 'react-router-dom';
import storage from '../storage/Storage';

function withAuth(AuthenticatedComponent, ...roles) {

    class HOC extends React.Component {

        // check login
        isAuthenticated = () => {
            return storage.getToken() !== null && storage.getToken() !== undefined;
        }

        // check role
        isPermission = () => {
            if (!roles || roles.length === 0) {
                return true;
            }

            // check role
            for (const role of roles) {
                if (role === storage.getUserInfo().role) {
                    return true;
                }
            }
            return false;
        }

        render() {
            if (!this.isAuthenticated()) {
                return <Redirect to='/auth/sign-in' />;
            }

            if (!this.isPermission()) {
                return <Redirect to='/auth/403' />;
            }

            return <AuthenticatedComponent {...this.props} />;

        }
    }

    return HOC;
}

export default withAuth;

