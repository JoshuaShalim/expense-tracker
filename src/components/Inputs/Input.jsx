import React, { useState } from 'react';

import {
  FaRegEye,
  FaRegEyeSlash,
} from 'react-icons/fa';

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex flex-col">
      {label && (
        <label className="text-[13px] text-slate-800 mb-1">{label}</label>
      )}

      <div className="flex items-center w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-primary">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
          value={value}
          onChange={onChange}
        />

        {type === "password" &&
          (showPassword ? (
            <FaRegEye
              size={20}
              className="text-primary cursor-pointer ml-2"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="text-slate-400 cursor-pointer ml-2"
              onClick={() => setShowPassword(true)}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
