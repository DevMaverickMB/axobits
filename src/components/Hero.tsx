import React from 'react';
import { Sparkles, MessageSquareCode, Wallet, Route, Database } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
        
        {/* Center Glow Spot (Like in Inspiration) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-900/30 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Curved Lines Background (SVG) */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
             <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                {/* Left Curves */}
                <path d="M-100 900 C 100 900, 400 600, 720 450" stroke="url(#grad1)" strokeWidth="1.5" strokeOpacity="0.5" />
                <path d="M-100 800 C 150 800, 450 550, 720 450" stroke="url(#grad1)" strokeWidth="1.5" strokeOpacity="0.3" />
                <path d="M-100 700 C 200 700, 500 500, 720 450" stroke="url(#grad1)" strokeWidth="1.5" strokeOpacity="0.1" />
                
                {/* Right Curves */}
                <path d="M1540 900 C 1340 900, 1040 600, 720 450" stroke="url(#grad1)" strokeWidth="1.5" strokeOpacity="0.5" />
                <path d="M1540 800 C 1290 800, 990 550, 720 450" stroke="url(#grad1)" strokeWidth="1.5" strokeOpacity="0.3" />
                <path d="M1540 700 C 1240 700, 940 500, 720 450" stroke="url(#grad1)" strokeWidth="1.5" strokeOpacity="0.1" />

                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#020202" stopOpacity="0" />
                        <stop offset="50%" stopColor="#635BFF" />
                        <stop offset="100%" stopColor="#020202" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            
            {/* Top Icon (Diamond/Sparkle) */}
            <div className="reveal mb-8 animate-float">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-900 to-dark-card border border-white/10 flex items-center justify-center shadow-[0_0_30px_-5px_rgba(147,51,234,0.5)] rotate-45">
                    <Sparkles className="w-8 h-8 text-white -rotate-45" />
                </div>
            </div>

            {/* Main Headline */}
            <h1 className="reveal delay-100 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 uppercase font-display">
                Orchestrate <br />
                All With <span className="brand-gradient">AXOBITS</span>
            </h1>

            <p className="reveal delay-200 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 font-light">
                The central nervous system for your enterprise. Manage data, security, and automation in one unified neural interface.
            </p>

            {/* Central "App Interface" Visual (Matching Inspiration) */}
            <div className="reveal delay-300 relative w-full max-w-[400px] perspective-1000">
                {/* The "Phone/Card" Container */}
                <div className="relative bg-dark-card border border-white/10 rounded-[2rem] p-4 hero-interface-container backdrop-blur-sm">
                    
                    {/* Search Bar / Header */}
                    <div className="flex items-center justify-between bg-white/5 rounded-full px-5 py-4 mb-6 border border-white/5">
                        <span className="text-sm text-gray-300 font-medium">AXOBITS Console — connect systems</span>
                        <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center">
                             <Sparkles className="w-4 h-4 text-brand-300" />
                        </div>
                    </div>

                    {/* Stacked Cards */}
                    <div className="space-y-3">
                        
                        {/* Card 1: Vera AI (Query/Chat) */}
                        <div className="p-4 rounded-2xl bg-[#0F0F11] border border-white/5 flex items-center gap-4 hover:bg-[#151518] transition-colors cursor-default group">
                            <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 shrink-0 group-hover:scale-110 transition-transform">
                                <MessageSquareCode className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <div className="text-white font-bold text-lg">Vera AI</div>
                                <div className="text-xs text-gray-500">Query executed (12ms)</div>
                            </div>
                        </div>

                        {/* Card 2: AI Ledger (Cost) */}
                        <div className="p-4 rounded-2xl bg-[#0F0F11] border border-white/5 flex items-center gap-4 hover:bg-[#151518] transition-colors cursor-default group">
                            <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 shrink-0 group-hover:scale-110 transition-transform">
                                <Wallet className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <div className="text-white font-bold text-lg">Cost Insights</div>
                                <div className="text-xs text-gray-500">Usage visibility and controls</div>
                            </div>
                        </div>

                        {/* Card 3: Charioteer (Onboarding) */}
                        <div className="p-4 rounded-2xl bg-[#0F0F11] border border-white/5 flex items-center gap-4 hover:bg-[#151518] transition-colors cursor-default group">
                            <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 shrink-0 group-hover:scale-110 transition-transform">
                                <Route className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <div className="text-white font-bold text-lg">Charioteer</div>
                                <div className="text-xs text-gray-500">User Onboarding Active</div>
                            </div>
                        </div>

                    </div>
                    
                    {/* Glow Behind */}
                    <div className="absolute -inset-1 bg-gradient-to-b from-brand-500/20 to-transparent rounded-[2rem] -z-10 blur-xl"></div>
                </div>

                {/* Floating Decor Elements (Glass Pills) */}
                <div className="hidden md:flex absolute top-10 -right-24 bg-dark-card/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full items-center gap-2 animate-float-delayed text-xs">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Docs Generated
                </div>
                 <div className="hidden md:flex absolute bottom-20 -left-20 bg-dark-card/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full items-center gap-2 animate-float text-xs">
                    <Database className="w-3 h-3 text-brand-400" />
                    Vera Connected
                </div>

            </div>

        </div>
    </section>
  );
};

export default Hero;
