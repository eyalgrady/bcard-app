import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('x-auth-token');

    return token ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;