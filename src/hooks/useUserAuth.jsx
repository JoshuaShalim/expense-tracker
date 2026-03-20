// src/hooks/useUserAuth.js
import {
  useContext,
  useEffect,
} from 'react';

import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext';

export const useUserAuth = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // wait for provider
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  return { user, loading };
};
