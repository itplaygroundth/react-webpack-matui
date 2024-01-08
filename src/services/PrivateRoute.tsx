import React, { ReactNode } from 'react';
import { Route, Navigate, RouteProps, useLocation, useNavigate } from 'react-router-dom';
//import { useAuth } from '../contexts/AuthContext';
import { useUserStore } from '@src/store';

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FC<{ roles:string[],children:ReactNode }> = ({ roles,children }) => {
  //const context = useAuth()
  const location = useLocation();
  const navigate = useNavigate()
  
  const context = useUserStore((store:any) => store.userinfo);

  if(!context.isAuthenticated){
       
      return <Navigate to="/signin" replace state={{ from: location }} />;
  }
  // if(roles && roles.indexOf(context.state.role) === -1){
  //     return <Navigate to="/dashboards" />;
  // }
  return <>{children}</>
}

export default PrivateRoute;