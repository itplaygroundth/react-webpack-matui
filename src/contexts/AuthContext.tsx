// AuthContext.tsx
import { createContext, useContext, useReducer, ReactNode } from 'react';
import React from 'react';


interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  role:string
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload?: { accessToken: string,role:string };
}

interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  role:"user"
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        accessToken: action.payload?.accessToken || null,
        role:action.payload?.role || ""
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
