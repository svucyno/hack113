import React, { useMemo } from 'react';
import { useStore } from '../store';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ShieldAlert, Activity, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/formatCurrency';

export function Dashboard() {
  const { transactions, userCurrency } = useStore();

  const metrics = useMemo(() => {
    const total = transactions.length;
    const fraud = transactions.filter(t => t.isFraud).length;
    const amount = transactions.reduce((sum, t) => sum + t.amount, 0);

    const gatewaySettled = transactions.filter(t => t.payment_status === 'verified' && t.status !== 'refunded')
                                      .reduce((sum, t) => sum + t.amount, 0);
    const refundedVol = transactions.filter(t => t.status === 'refunded')
                                   .reduce((sum, t) => sum + t.amount, 0);
    const fraudBlockedVol = transactions.filter(t => t.isFraud)
                                        .reduce((sum, t) => sum + t.amount, 0);

    return { 
      total, 
      fraud, 
      fraudPercent: total > 0 ? ((fraud / total) * 100).toFixed(1) : '0.0',
      volume: formatCurrency(amount, userCurrency),
      gatewaySettled: formatCurrency(gatewaySettled, userCurrency),
      refundedVol: formatCurrency(refundedVol, userCurrency),
      fraudBlockedVol: formatCurrency(fraudBlockedVol, userCurrency)
    };
  }, [transactions, userCurrency]);

  const trendData = useMemo(() => {
    // Group transactions by recent time windows (e.g. last 10 updates)
    const grouped: any[] = [];
    transactions.slice(0, 50).reverse().forEach((tx, i) => {
      if (i % 5 === 0) {
        grouped.push({
          time: new Date(tx.timestamp).toLocaleTimeString([], { hour12: false }),
          safe: 0,
          fraud: 0
        });
      }
      const lastGroup = grouped[grouped.length - 1];
      if (tx.isFraud) {
        lastGroup.fraud += tx.amount;
      } else {
        lastGroup.safe += tx.amount;
      }
    });
    return grouped;
  }, [transactions]);

  const categoryData = useMemo(() => {
    const cats: Record<string, number> = {};
    transactions.filter(t => t.isFraud).forEach(t => {
      cats[t.category] = (cats[t.category] || 0) + 1;
    });
    return Object.entries(cats)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // top 5
  }, [transactions]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Total Processed" 
          value={metrics.total.toString()} 
          icon={<Activity />} 
          trend="+12% from last hr" 
          color="text-neon-blue"
        />
        <MetricCard 
          title="Fraud Intercepted" 
          value={metrics.fraudBlockedVol} 
          icon={<ShieldAlert />} 
          trend={`${metrics.fraudPercent}% incident rate`} 
          color="text-alert-red"
          highlight
        />
        <MetricCard 
          title="Settled via Gateway" 
          value={metrics.gatewaySettled} 
          icon={<TrendingUp />} 
          trend={`Refunds: ${metrics.refundedVol}`} 
          color="text-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6">Real-Time Threat Volume</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF3366" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#FF3366" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => formatCurrency(val, userCurrency).replace(/\.00$/, '')} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#112236', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="safe" stroke="#00F0FF" fillOpacity={1} fill="url(#colorSafe)" />
                <Area type="monotone" dataKey="fraud" stroke="#FF3366" fillOpacity={1} fill="url(#colorFraud)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Top Targeted Categories</h3>
          <div className="flex-1 min-h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={100} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#1e293b', opacity: 0.4}}
                  contentStyle={{ backgroundColor: '#112236', borderColor: '#1e293b', borderRadius: '8px' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#FF3366' : '#FFCC00'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MetricCard({ title, value, icon, trend, color, highlight = false }: any) {
  return (
    <div className={`glass-panel p-6 rounded-2xl relative overflow-hidden group transition-all duration-300 ${highlight ? 'border-alert-red/30 shadow-[0_0_20px_rgba(255,51,102,0.1)]' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-slate-400 font-medium">{title}</h3>
        <div className={`p-2 rounded-lg bg-navy-900 border border-white/5 ${color}`}>
          {icon}
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-white mb-1">{value}</h2>
        <p className="text-xs text-slate-500">{trend}</p>
      </div>
      
      {/* Micro-interaction highlight curve */}
      <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-white opacity-0 group-hover:opacity-5 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
}
