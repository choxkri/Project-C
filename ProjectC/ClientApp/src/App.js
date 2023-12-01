import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './components/LogInPage.css';
import './components/F.css';
export default function App() {

    const userData = JSON.parse(localStorage.getItem('user')) || {};

    console.log(userData); 
    const hasPermission = (requiredRole) => {
        return userData && userData.typeAccountID === requiredRole;
    };

    

    return (
        <Layout>
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, requiredRole, ...rest } = route;

                    if (requiredRole && !hasPermission(requiredRole)) {
                        return null;
                    }

                    return <Route key={index} {...rest} element={element} />;
                })}

                <Route path="/*" element={<Navigate to="/fetch-data" />} />
            </Routes>
        </Layout>
    );
}