import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, UserRole } from '../store';
import { ShieldAlert, ArrowRight, Lock, Github, Apple, Chrome, AlertCircle, Mail } from 'lucide-react';

export function Login() {
  const [role, setRole] = useState<UserRole>('user');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name === 'admin@fraudshield.com' && password === 'admin123') {
      login('admin', 'System Administrator');
      navigate('/admin');
    } else {
      setError('Invalid administrator credentials.');
      setPassword('');
    }
  };

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !password) return;
    login('user', name);
    navigate('/dashboard');
  };

  const socialLogin = (provider: string) => {
    login('user', `${provider} User`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-navy-900 p-4 font-sans">
      <div className="max-w-md w-full">
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-lg mb-6">
            <ShieldAlert size={32} className="text-slate-200" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            FraudShield
          </h1>
          <p className="text-slate-400">Sign in to your account to continue</p>
        </div>

        {/* Auth Box */}
        <div className="bg-[#0e2136] border border-white/5 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
          {/* Subtle top highlight */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-500 to-transparent opacity-20"></div>

          {/* Role selector */}
          <div className="flex p-1 bg-navy-900 rounded-lg mb-8 border border-white/5">
            <button
              type="button"
              onClick={() => { setRole('admin'); setError(''); setName(''); setPassword(''); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                role === 'admin' ? 'bg-[#1b344d] text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Administrator
            </button>
            <button
              type="button"
              onClick={() => { setRole('user'); setError(''); setName(''); setPassword(''); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                role === 'user' ? 'bg-[#1b344d] text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Standard User
            </button>
          </div>

          {role === 'admin' ? (
            <form onSubmit={handleAdminLogin} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Admin Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-navy-900 border border-slate-700/50 rounded-xl px-4 py-3 pl-11 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all text-sm"
                    placeholder="admin@fraudshield.com"
                    required
                  />
                  <Mail size={16} className="absolute left-4 top-3.5 text-slate-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-navy-900 border border-slate-700/50 rounded-xl px-4 py-3 pl-11 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all text-sm"
                    placeholder="••••••••"
                    required
                  />
                  <Lock size={16} className="absolute left-4 top-3.5 text-slate-500" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center group text-sm mt-4 shadow-lg shadow-indigo-600/20"
              >
                Sign In as Admin
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => socialLogin('Google')}
                  className="w-full bg-white hover:bg-slate-100 text-slate-900 font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center border border-slate-200 text-sm"
                >
                  <Chrome size={18} className="mr-2 text-blue-600" />
                  Continue with Google
                </button>
                <button
                  type="button"
                  onClick={() => socialLogin('GitHub')}
                  className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center text-sm"
                >
                  <Github size={18} className="mr-2" />
                  Continue with GitHub
                </button>
                <button
                  type="button"
                  onClick={() => socialLogin('Apple')}
                  className="w-full bg-black hover:bg-zinc-900 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center border border-zinc-800 text-sm"
                >
                  <Apple size={18} className="mr-2" />
                  Continue with Apple
                </button>
              </div>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-700/50"></div>
                <span className="flex-shrink-0 mx-4 text-slate-500 text-xs">Or use email fallback</span>
                <div className="flex-grow border-t border-slate-700/50"></div>
              </div>

              <form onSubmit={handleUserLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Display Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-navy-900 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all text-sm"
                    placeholder="e.g. Jane Doe"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-navy-900 border border-slate-700/50 rounded-xl px-4 py-3 pl-11 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all text-sm"
                      placeholder="••••••••"
                      required
                    />
                    <Lock size={16} className="absolute left-4 top-3.5 text-slate-500" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white hover:bg-slate-200 text-navy-900 font-medium py-3 rounded-xl transition-colors flex items-center justify-center group text-sm mt-2"
                >
                  Sign In
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Forgot your password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}
