import React, { ReactNode } from 'react';
import { Navigate, useLocation,useNavigate } from 'react-router-dom';
//import { useAuth } from '../contexts/AuthContext';
import { useUserStore } from '@src/store';

const AuthGuard: React.FC<{ roles:string[],children:ReactNode }> = ({ roles,children }) => {
    //const context = useAuth()
    const location = useLocation();
    const navigate = useNavigate()
    const context = useUserStore((store:any) => store.user);
   
    //console.log(context)

    if(!context.isAuthenticated && !context.accessToken){
         
        return <Navigate to="/signin" replace state={{ from: location }} />;
    }
    // if(roles && roles.indexOf(context.state.role) === -1){
    //     return <Navigate to="/dashboards" />;
    // }
    return <>{children}</>
}

export default AuthGuard