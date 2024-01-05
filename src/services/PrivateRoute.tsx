import React, { ReactNode } from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
 
 

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const context = useAuth();

  return (
    <Route
      {...rest}
      element={context.state.isAuthenticated ? element : <Navigate to="/signin" />}
    />
  );
};

export default PrivateRoute;