import React, {
  createContext,
  useEffect,
  useState,
} from 'react';

import { API_PATHS } from '../utils/apiPaths';
import axiosInstance from '../utils/axiosInstance';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ flatten response
        if (response.data?.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("❌ Fetch user failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData) => setUser(userData);
  const clearUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
