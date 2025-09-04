import React, {
  useEffect,
  useState,
} from 'react';

import { IoMdCard } from 'react-icons/io';          // Total Balance
import {
  LuHandCoins,
  LuWalletMinimal,
} from 'react-icons/lu'; // Income & Expense
import { useNavigate } from 'react-router-dom';

import InfoCard from '../../components/Cards/InfoCard';
import ExpenseTransactions from '../../components/Dasboard/ExpenseTransactions';
import FinanceOverview from '../../components/Dasboard/FinanceOverview';
import Last30DaysExpenses from '../../components/Dasboard/last30DaysExpenses';
import RecentIncome from '../../components/Dasboard/RecentIncome';
import RecentIncomeWithChart
  from '../../components/Dasboard/RecentIncomeWithChart';
import RecentTransaction from '../../components/Dasboard/RecentTransaction';
import DashboardLayout from '../../components/layouts/dashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { addThousandsSeparator } from '../../utils/helper';

const Home = () => {
  const { user, loading } = useUserAuth(); // 👈 handles auth
  const [dashboardData, setDashboardData] = useState(null);
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    if (fetching) return;

    setFetching(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setFetching(false);
    }
  };

  // 👇 only fetch after user is confirmed
  useEffect(() => {
    if (!loading && user) {
      fetchDashboardData();
    }
  }, [loading, user]);

  // ✅ Auth still loading
  if (loading) {
    return <div className="p-5">Loading user...</div>;
  }

  // ✅ Dashboard fetching
  if (fetching) {
    return <div className="p-5">Loading dashboard data...</div>;
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className = "grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard 
          icon ={<IoMdCard />}
          label="Total Balance"
          value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
          colors= "bg-primary"
          />

          <InfoCard 
          icon ={<LuWalletMinimal />}
          label="Total Income"
          value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
          colors= "bg-orange-500"
          />

          <InfoCard 
          icon ={<LuHandCoins />}
          label="Total Expense"
          value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
          colors= "bg-red-500"
          />
          </div>

          <div className= "grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RecentTransaction
            transactions={dashboardData?.recentTransactions}
            onSeeMore = {() => navigate("/expense")}
            />
 
            <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
            />

              <ExpenseTransactions
              transactions={dashboardData?.last30DaysExpenses?.transactions || []}
              onSeeMore={() => navigate("/expense")}
              />

              <Last30DaysExpenses
              data={dashboardData?.last30DaysExpenses?.transactions || []}
              />
              <RecentIncomeWithChart
              data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
              totalIncome = {dashboardData?.totalIncome || 0}
              />  

              <RecentIncome
              transactions={dashboardData?.last60DaysIncome?.transactions || []}
              onSeeMore = {() => navigate("/income")}
              />
          </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;