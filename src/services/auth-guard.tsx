import React, { ReactNode } from 'react';
import { Navigate, useLocation,useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthGuard: React.FC<{ roles:string[],children:ReactNode }> = ({ roles,children }) => {
    const context = useAuth()
    const navigate = useNavigate()
    
    console.log(context.state)

    if(!context.state.isAuthenticated){
         
        return <Navigate to="/auth/signin" replace />;
    }
    // if(roles && roles.indexOf(context.state.role) === -1){
    //     return <Navigate to="/dashboards" />;
    // }
    return <>{children}</>
}

export default AuthGuard