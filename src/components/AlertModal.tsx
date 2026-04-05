import React from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, MapPin, DollarSign, Crosshair, X, ShieldCheck, ShieldOff } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

export function AlertModal() {
  const { alertTransaction, markAsSafe, blockTransaction, setAlertTransaction, userCurrency, currentUser } = useStore();

  const isAdmin = currentUser?.role === 'admin';

  return (
    <AnimatePresence>
      {alertTransaction && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAlertTransaction(null)}
            className="fixed inset-0 bg-navy-900/80 backdrop-blur-md z-50 transition-opacity"
          />
          <div className="fixed inset-0 flex text-left items-center justify-center p-4 z-50 pointer-events-none">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-panel p-0 max-w-lg w-full pointer-events-auto overflow-hidden relative border-alert-red/50 shadow-[0_0_50px_rgba(255,51,102,0.15)] rounded-2xl"
            >
              {/* Pulsing background effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-alert-red via-alert-yellow to-alert-red animate-pulse" />
              
              <div className="p-6 pb-4 border-b border-white/10 bg-alert-red/5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 text-alert-red">
                    <div className="p-2 bg-alert-red/20 rounded-full animate-bounce">
                      <AlertTriangle size={24} />
                    </div>
                    <h2 className="text-xl font-bold uppercase tracking-wide">Suspicious Transaction Detected</h2>
                  </div>
                  <button 
                    onClick={() => setAlertTransaction(null)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6 bg-navy-900/50">
                {/* ID & Amount */}
                <div className="flex justify-between items-center bg-navy-800 p-4 rounded-xl border border-white/5">
                   <div>
                     <p className="text-sm text-slate-400 font-mono">TX ID</p>
                     <p className="text-white font-mono">{alertTransaction.id}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-sm text-slate-400 uppercase tracking-wider">Amount</p>
                     <p className="text-2xl font-bold text-alert-red tabular-nums">
                       {formatCurrency(alertTransaction.amount, userCurrency)}
                     </p>
                   </div>
                </div>

                {/* Explainable AI block */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center">
                    <Crosshair size={14} className="mr-2 text-neon-blue" />
                    AI Reasoning
                  </h3>
                  
                  <div className="space-y-3">
                    <FeatureBar label="Location Anomaly" value={alertTransaction.flagReason === 'Unusual Location' ? 95 : 20} />
                    <FeatureBar label="Amount Deviation" value={alertTransaction.flagReason === 'High Amount Deviation' ? 88 : 15} />
                    <FeatureBar label="Velocity Mismatch" value={alertTransaction.flagReason === 'Velocity Mismatch' ? 92 : 10} />
                  </div>
                  
                  <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-lg flex items-start space-x-3">
                    <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-slate-300 italic">
                      "Transaction originated in <strong className="text-white">{alertTransaction.location}</strong> which is physically impossible based on user's last known location 5 minutes ago."
                    </p>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="p-6 border-t border-white/10 bg-navy-800/80 flex space-x-4">
                {isAdmin ? (
                  <button 
                    onClick={() => setAlertTransaction(null)}
                    className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center transition-colors border border-white/5"
                  >
                    Acknowledge Alert
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => blockTransaction(alertTransaction.id)}
                      className="flex-1 bg-alert-red hover:bg-red-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(255,51,102,0.4)]"
                    >
                      <ShieldOff size={18} className="mr-2" />
                      This was NOT me
                    </button>
                    <button 
                      onClick={() => markAsSafe(alertTransaction.id)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center transition-colors border border-white/5"
                    >
                      <ShieldCheck size={18} className="mr-2 text-alert-green" />
                      This was me
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function FeatureBar({ label, value }: { label: string, value: number }) {
  const isHigh = value > 75;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-300">{label}</span>
        <span className={isHigh ? "text-alert-red font-medium" : "text-slate-500"}>{value}% contribution</span>
      </div>
      <div className="h-1.5 w-full bg-navy-900 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${isHigh ? 'bg-alert-red' : 'bg-slate-600'}`}
        />
      </div>
    </div>
  )
}
