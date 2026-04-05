import React from 'react';
import { useStore } from '../store';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { Activity } from 'lucide-react';

export function UserAnalytics() {
  const { transactions } = useStore();

  const data = [
    { subject: 'Location Var', A: 85, fullMark: 100 },
    { subject: 'Velocity', A: 65, fullMark: 100 },
    { subject: 'Amount Dev', A: 90, fullMark: 100 },
    { subject: 'Time Pattern', A: 30, fullMark: 100 },
    { subject: 'New Device', A: 100, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-navy-800/50 p-6 rounded-2xl border border-white/5">
        <div>
          <h2 className="text-xl font-bold text-white">Target Entity: <span className="text-neon-blue font-mono text-lg">usr_x92k4mn1</span></h2>
          <p className="text-slate-400 mt-1">Deep analysis of flagged behavior patterns</p>
        </div>
        <div className="px-4 py-2 bg-alert-red/10 border border-alert-red/30 rounded-lg text-alert-red font-medium flex items-center">
           <Activity size={18} className="mr-2 animate-pulse" />
           High Risk Entity
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6">Anomaly Vector Plot</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Anomaly Score" dataKey="A" stroke="#FF3366" fill="#FF3366" fillOpacity={0.4} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#112236', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#FF3366' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-slate-400 text-center mt-4">
            Visual representation of behavioral deviations from standard baseline. New device identity and amount deviation cross critical thresholds.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
           <h3 className="text-lg font-semibold text-white mb-6">Identity Graph</h3>
           <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-xl relative overflow-hidden bg-navy-900/50">
             
              {/* Mock node graph logic - visual only */}
              <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-slate-500 absolute top-10 left-10 flex items-center justify-center text-xs text-slate-400">Device A</div>
              <div className="w-20 h-20 rounded-full bg-alert-red/20 border-2 border-alert-red shadow-[0_0_20px_rgba(255,51,102,0.4)] absolute top-20 right-10 flex items-center justify-center text-xs text-alert-red font-bold animate-pulse">Device B (New)</div>
              <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-slate-500 absolute bottom-10 left-1/3 flex items-center justify-center text-xs text-slate-400">Card 8892</div>
              
              <svg className="absolute inset-0 w-full h-full -z-10" pointerEvents="none">
                 <line x1="104" y1="72" x2="160" y2="216" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
                 <line x1="280" y1="120" x2="160" y2="216" stroke="#FF3366" strokeWidth="2" />
              </svg>

              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
           </div>
           
           <div className="mt-4 p-3 bg-alert-red/5 border border-alert-red/20 rounded-xl">
             <h4 className="text-white text-sm font-medium mb-1">Identified Risk</h4>
             <p className="text-xs text-slate-400">System detected an unknown device (Device B) attempting to execute high-value transfers using existing payment instruments.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
