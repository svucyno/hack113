import React from 'react';
import { ShieldCheck, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#07111A] text-slate-400 shrink-0">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img src="/logo.png" alt="FraudShield AI Logo" className="h-8 object-contain" onError={(e) => {
                 e.currentTarget.style.display = 'none';
                 if (e.currentTarget.parentElement) {
                   e.currentTarget.parentElement.innerHTML = '<div class="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center border border-white/10 shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg></div><span class="text-xl font-bold tracking-tight text-white">FraudShield <span class="text-blue-400 font-normal">AI</span></span>';
                 }
              }} />
              <span className="text-xl font-bold tracking-tight text-white">FraudShield <span className="text-blue-400 font-normal">AI</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Advanced neural network threat intelligence infrastructure. We process millions of transactions per second to keep your institutional perimeter secure.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Threat Monitoring</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Behavioral Analytics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Radar Engine</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Details</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Acceptable Use</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
          <p>&copy; {new Date().getFullYear()} FraudShield Technologies Inc. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-slate-300">All Systems Operational</span>
            </div>
            <span className="font-mono text-[11px] bg-navy-800 px-2 py-1 rounded text-slate-500">v2.4.1-stable</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
