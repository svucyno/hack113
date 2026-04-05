import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, Activity, Globe, ChevronRight } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#07111A] text-slate-200 font-sans selection:bg-blue-500/30">
      <Header />
      
      <main className="relative overflow-hidden w-full">
        {/* Ambient Lights */}
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none -z-10"></div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6 max-w-4xl">
            Enterprise-Grade <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Threat Intelligence
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            Protect your financial perimeter with real-time transactional analysis. Our proprietary neural networks detect anomalies, isolate actors, and prevent fraud before it settles.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center group"
            >
              Access Platform
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-all">
              Read Documentation
            </button>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Top Institutions Trust Us</h2>
            <p className="text-slate-400">Advanced detection mechanics built natively for the modern web.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Activity />}
              title="Real-Time Processing"
              desc="Sub-50ms latency on transaction evaluation ensures your legitimate volume is never bottlenecked."
            />
            <FeatureCard 
              icon={<ShieldCheck />}
              title="Explainable AI"
              desc="Every flagged event is accompanied by an anomaly contribution breakdown for immediate auditing."
            />
            <FeatureCard 
              icon={<Globe />}
              title="Global IP Context"
              desc="Automatic localization mapping identifies impossible travel velocities instantly."
            />
            <FeatureCard 
              icon={<Zap />}
              title="Webhook Triaging"
              desc="Seamlessly route blocked transactions into your existing CI/CD or internal review tools natively."
            />
          </div>
        </section>

        {/* Call to action */}
        <section className="max-w-5xl mx-auto px-6 py-20 mb-20 text-center bg-navy-800/50 border border-white/5 rounded-3xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <h2 className="text-3xl font-bold text-white mb-4">Ready to secure your ledger?</h2>
           <p className="text-slate-400 mb-8 max-w-lg mx-auto">Join the 4,000+ financial institutions trusting FraudShield AI to monitor over $14B in daily transactional volume.</p>
           <button 
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-white text-navy-900 hover:bg-slate-200 rounded-xl font-medium transition-colors"
            >
              Sign In to Console
            </button>
        </section>

      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="bg-[#0e2136]/50 border border-white/5 p-6 rounded-2xl hover:bg-[#0e2136] transition-colors group cursor-default">
      <div className="w-12 h-12 bg-navy-900 border border-white/10 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
