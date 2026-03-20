// src/components/SideMenu.jsx
import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext.jsx';
import { SIDE_MENU_DATA } from '../../utils/data';
import CharAvatar from '../Cards/CharAvatar.jsx';
import DotsLoader from '../Loader/DotsLoader.jsx'; // 👈 import loader

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  // 🔹 Show loader while fetching user
  if (loading) {
    return (
      <div className="w-64 h-[calc(100vh-61px)] flex items-center justify-center bg-white border-gray-200/50 sticky top-[61px] z-20">
        <DotsLoader /> {/* 👈 dots loader instead of text */}
      </div>
    );
  }

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt={user.fullName || "Profile"}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu === item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
