// AuthContext.tsx
import { createContext, useContext, useReducer, ReactNode } from 'react';
import React from 'react';
import { useUserStore } from '@src/store';
//import { createStore, useStore } from 'zustand'

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  role:string
  redirect:string
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload?: { accessToken: string,role:string,redirect:string };
}

interface AuthContextProps {
  state: AuthState;
  
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  role:"user",
  redirect:""
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        accessToken: action.payload?.accessToken || null,
        role:action.payload?.role || "",
        redirect:action.payload?.redirect || ""
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};




const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
