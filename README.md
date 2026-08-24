# Flow Finance — MERN Expense Tracker

A responsive personal-finance dashboard for recording income and expenses, reviewing recent activity, and visualizing cash flow. This repository contains the React frontend; the API is maintained in the [expense-tracker-backend](https://github.com/JoshuaShalim/expense-tracker-backend) repository.

**Live app:** https://myflowfinance.vercel.app/

## Implemented features

- Account registration and JWT-based sign-in
- Protected dashboard, income, and expense routes
- Add, view, and delete income and expense records
- Balance, income, and expense summary cards
- Recent-transaction and 30/60-day visualizations with Recharts
- Expense category suggestions based on transaction text
- Income and expense exports to Excel
- Profile image upload through the backend
- Responsive layouts, loading states, validation, and toast feedback

## Stack

- React 19 and Vite
- React Router
- Tailwind CSS 4
- Axios
- Recharts
- Node.js, Express, MongoDB, Mongoose, and JWT in the companion API

## Run locally

```bash
npm install
npm run dev
```

Create a `.env` file and point the frontend to the API:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Production deployments can provide `VITE_API_URL` through the hosting platform's environment-variable settings.

## Available scripts

```bash
npm run dev      # start Vite development server
npm run build    # create a production build
npm run lint     # run ESLint
npm run preview  # preview the production build
```

## Related repository

- Backend API: https://github.com/JoshuaShalim/expense-tracker-backend

## Author

[Joshua Shalim](https://github.com/JoshuaShalim) — Full-Stack Developer in Doha, Qatar
