
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
//import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'nprogress/nprogress.css';
import App from './App';
import { SidebarProvider } from './contexts/SidebarContext';
import * as serviceWorker from './serviceWorker';
import Application from '@src/components/Application';
import { AuthProvider } from './contexts/AuthContext';
import SignIn from './content/pages/Authen/Signin';
import AuthGuard from './services/auth-guard';
import { createRoot } from 'react-dom/client';
import DashboardAdmin from './content/dashboards/Admin';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
 
  <HelmetProvider>
    <SidebarProvider>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/signin" element={<SignIn />} />
          {/* <Route path="/dasboards" element={<AuthGuard roles={["admin"]}><DashboardAdmin /></AuthGuard>} /> */}
          <Route path='/' element={<AuthGuard roles={["admin"]}><App /></AuthGuard>} />
          
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </SidebarProvider>
  </HelmetProvider> 
);

serviceWorker.unregister();