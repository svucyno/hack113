import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { LandingPage } from './pages/LandingPage';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { useStore } from './store';
import { startSimulation } from './utils/mockDataGenerator';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);

  const { initLocation } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
      startSimulation();
      initLocation();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isInitializing) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#07111A]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-white rounded-full animate-spin"></div>
          <p className="mt-6 text-slate-400 font-medium text-sm tracking-widest uppercase">Loading Platform</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoute() {
  const { currentUser } = useStore();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Admin routing guard check can go here if needed
  if (window.location.pathname.startsWith('/admin') && currentUser.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  if (window.location.pathname.startsWith('/dashboard') && currentUser.role === 'admin') {
     // Optional: allow admin to see dashboard, or redirect to admin
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
