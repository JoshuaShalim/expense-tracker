// src/utils/apiPaths.js

// Use environment variable for base URL (Vite style)
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    GET_USER_INFO: "/auth/getUser",
  },
  DASHBOARD: {
    GET_DATA: "/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/income/add",
    GET_ALL_INCOME: "/income/get",
    DELETE_INCOME: (incomeId) => `/income/${incomeId}`,
    DOWNLOAD_INCOME: "/income/downloadexcel",
  },
  EXPENSES: {
    ADD_EXPENSE: "/expense/add",
    GET_ALL_EXPENSE: "/expense/get",
    DELETE_EXPENSE: (expenseId) => `/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: "/expense/downloadexcel",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/auth/upload-img",
  },
};
