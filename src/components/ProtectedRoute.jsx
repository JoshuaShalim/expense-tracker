import React, { useContext } from 'react';

import { Navigate } from 'react-router-dom';

import DotsLoader from '../components/Loader/DotsLoader'; // 👈 import
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <DotsLoader />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
