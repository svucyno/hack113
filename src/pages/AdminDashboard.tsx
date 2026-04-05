import React, { useState } from 'react';
import { Dashboard } from '../components/Dashboard';
import { TransactionFeed } from '../components/TransactionFeed';
import { UserAnalytics } from '../components/UserAnalytics';
import { AdminPanel as AdminSettings } from '../components/AdminPanel';
import { Activity, ShieldAlert, Users, Settings } from 'lucide-react';
import clsx from 'clsx';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Metrics', icon: Activity },
    { id: 'monitor', label: 'Live Feed', icon: ShieldAlert },
    { id: 'analytics', label: 'Analysis', icon: Users },
    { id: 'admin', label: 'Simulation', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'monitor': return <TransactionFeed />;
      case 'analytics': return <UserAnalytics />;
      case 'admin': return <AdminSettings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 max-w-[1600px] mx-auto w-full gap-6">
      <div className="flex items-center space-x-2 mb-2 border-b border-white/5 pb-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={clsx(
                "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all text-sm font-medium",
                isActive 
                  ? "bg-white text-navy-900 border border-white" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
      
      <div className="w-full">
         {renderContent()}
      </div>
    </div>
  );
}
