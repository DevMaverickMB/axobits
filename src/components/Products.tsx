import React from 'react';
import { MessageSquareCode, Map, BarChart3, FileCode, ArrowRight } from 'lucide-react';

const Products: React.FC = () => {
  return (
    <section id="products" className="py-32 relative">
        {/* Changed container to max-w-7xl and added responsive padding for better margins */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
            <div className="mb-20 max-w-3xl">
                <h2 className="reveal text-3xl md:text-5xl font-bold mb-6 font-display">Our Ecosystem</h2>
                <p className="reveal delay-100 text-gray-400 text-lg">A suite of powerful applications designed to operate in the spaces between traditional software categories.</p>
            </div>

            {/* 
               New Asymmetrical Grid Layout:
               - Desktop (lg): 4 Columns.
               - Rows are auto-sized (min 280px).
               - Structure:
                 Row 1: Vera (3 cols) | Charioteer (1 col sidebar)
                 Row 2: Vera (cont.)  | Charioteer (cont.)
                 Row 3: Ledger (2 cols)| Blueprint (1 col) | Charioteer (cont.)
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:auto-rows-[280px]">
                
                {/* Product 1: Vera AI (3x2 Block) */}
                {/* Dominant centerpiece */}
                <div className="reveal min-h-[500px] lg:min-h-0 lg:col-span-3 lg:row-span-2 group relative rounded-[2rem] overflow-hidden border border-white/10 bg-dark-card card-hover flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 p-8 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center card-icon">
                                <MessageSquareCode className="w-6 h-6" />
                            </div>
                        </div>
                        
                        <h3 className="text-3xl font-bold mb-2">Vera AI</h3>
                        <p className="text-gray-400 mb-6 max-w-md">The intelligent bridge between data and conversation.</p>
                        
                        <div className="mt-auto relative w-full h-64 bg-black/40 rounded-xl overflow-hidden border border-white/5 p-6 flex flex-col justify-end">
                             <div className="flex gap-3 mb-4">
                                 <div className="w-8 h-8 rounded-full bg-gray-700 shrink-0"></div>
                                 <div className="h-8 bg-gray-800 rounded-lg w-1/3"></div>
                             </div>
                             <div className="flex gap-3 flex-row-reverse">
                                 <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-[10px] font-bold shrink-0">V</div>
                                 <div className="bg-brand-900/40 border border-brand-500/20 p-3 rounded-lg w-2/3 text-xs text-brand-100">
                                     Querying PostgreSQL database... Found 12,400 matching records.
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Product 2: Charioteer (1x3 Tower) */}
                {/* Vertical Sidebar */}
                <div className="reveal delay-100 min-h-[400px] lg:min-h-0 lg:col-span-1 lg:row-span-3 relative rounded-[2rem] overflow-hidden border border-white/10 bg-dark-card card-hover group flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="p-8 z-10 flex flex-col h-full">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 card-icon shrink-0">
                            <Map className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Charioteer</h3>
                        <p className="text-gray-400 text-sm mb-6">Instant guided tours.</p>
                        
                        {/* Vertical Visual */}
                        <div className="mt-auto relative w-full flex-grow bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-blue-500/20"></div>
                             
                             <div className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
                             
                             <div className="absolute top-1/4 left-1/4 right-1/4 bg-dark-bg/80 backdrop-blur border border-white/10 p-3 rounded-lg transform scale-90 opacity-70">
                                 <div className="h-2 w-1/2 bg-gray-700 rounded mb-2"></div>
                                 <div className="h-2 w-3/4 bg-gray-700 rounded"></div>
                             </div>

                             <div className="absolute top-1/2 left-1/4 right-1/4 bg-dark-bg border border-blue-500/30 p-3 rounded-lg z-10 shadow-lg shadow-blue-900/20">
                                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-blue-500 text-white text-[9px] rounded-full font-bold tracking-widest">STEP 2</div>
                                 <div className="h-2 w-2/3 bg-gray-600 rounded mb-2"></div>
                                 <div className="h-2 w-full bg-gray-700 rounded"></div>
                             </div>

                             <div className="absolute bottom-1/4 left-1/4 right-1/4 bg-dark-bg/80 backdrop-blur border border-white/10 p-3 rounded-lg transform scale-90 opacity-70">
                                 <div className="h-2 w-1/2 bg-gray-700 rounded mb-2"></div>
                                 <div className="h-2 w-3/4 bg-gray-700 rounded"></div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Product 3: AI Ledger (2x1 Strip) */}
                {/* Moved to position 3 to sit under Vera */}
                <div className="reveal delay-200 min-h-[300px] lg:min-h-0 lg:col-span-2 lg:row-span-1 relative rounded-[2rem] overflow-hidden border border-white/10 bg-dark-card card-hover group">
                     <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     
                     <div className="flex flex-col md:flex-row h-full relative z-10">
                        <div className="p-8 md:w-1/2 flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center card-icon">
                                    <BarChart3 className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold">AI Ledger</h3>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">Consolidates AI subscriptions, provides cost forecasts, renewal alerts, and vendor comparisons.</p>
                        </div>
                        
                        {/* Compact Chart Visual */}
                        <div className="md:w-1/2 h-full bg-emerald-500/5 relative overflow-hidden flex items-end justify-center pb-0 px-4">
                            <div className="w-full h-3/4 flex items-end gap-2 justify-center">
                                <div className="w-1/5 h-1/3 bg-emerald-500/20 rounded-t-sm group-hover:h-2/3 transition-all duration-700"></div>
                                <div className="w-1/5 h-1/2 bg-emerald-500/40 rounded-t-sm group-hover:h-3/4 transition-all duration-700 delay-75"></div>
                                <div className="w-1/5 h-3/4 bg-emerald-500/60 rounded-t-sm group-hover:h-5/6 transition-all duration-700 delay-150 relative">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-white bg-emerald-600 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity delay-300">$9k</div>
                                </div>
                                <div className="w-1/5 h-full bg-emerald-500 rounded-t-sm"></div>
                            </div>
                        </div>
                     </div>
                </div>

                {/* Product 4: Blueprint AI (1x1 Block) */}
                {/* Moves to last position to fill gap next to Ledger */}
                <div className="reveal delay-300 min-h-[300px] lg:min-h-0 lg:col-span-1 lg:row-span-1 relative rounded-[2rem] overflow-hidden border border-white/10 bg-dark-card card-hover group flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="p-8 flex flex-col h-full relative z-10">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4 card-icon">
                            <FileCode className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Blueprint AI</h3>
                        <p className="text-xs text-gray-400 mb-4 line-clamp-3">Living documentation that stays synchronized with your codebase.</p>
                        
                        <div className="mt-auto pt-4 border-t border-white/5">
                            <a href="#products" onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({behavior:'smooth'}) }} className="flex items-center justify-between text-white text-sm font-medium hover:text-orange-400 transition-colors">
                                <span>Details</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};

export default Products;
