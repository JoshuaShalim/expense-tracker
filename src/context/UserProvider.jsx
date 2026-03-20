// src/context/UserProvider.js
import React, {
  useEffect,
  useState,
} from 'react';

import { API_PATHS } from '../utils/apiPaths';
import axiosInstance from '../utils/axiosInstance';
import { UserContext } from './UserContext';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(true);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const clearUser = () => {
  setUser(null);
  localStorage.removeItem("user");
  localStorage.removeItem("token"); // 👈 changed
};

useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token"); // 👈 changed
      if (!token) {
        clearUser();
        setLoading(false);
        return;
      }

      const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
      const freshUser = response.data?.user;
      if (freshUser) {
        updateUser(freshUser);
      } else {
        clearUser();
      }
    } catch (err) {
      console.error("❌ Fetch user failed:", err);
      clearUser();
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
