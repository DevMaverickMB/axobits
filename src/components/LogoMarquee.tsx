import React from 'react';
import { Cloud, Shield, Zap, Globe, Database } from 'lucide-react';

const LogoMarquee: React.FC = () => {
  return (
    <div className="w-full py-12 border-y border-white/5 bg-white/[0.01] overflow-hidden">
        <div className="flex w-[200%] animate-marquee">
            <div className="flex min-w-full justify-around items-center gap-12 px-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-xl font-bold flex items-center gap-2"><Cloud className="w-5 h-5" /> CLOUDFORCE</span>
                <span className="text-xl font-bold flex items-center gap-2"><Shield className="w-5 h-5" /> SECURETECH</span>
                <span className="text-xl font-bold flex items-center gap-2"><Zap className="w-5 h-5" /> BOLT.IO</span>
                <span className="text-xl font-bold flex items-center gap-2"><Globe className="w-5 h-5" /> GLOBALLINK</span>
                <span className="text-xl font-bold flex items-center gap-2"><Database className="w-5 h-5" /> DATACORE</span>
            </div>
            <div className="flex min-w-full justify-around items-center gap-12 px-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                 <span className="text-xl font-bold flex items-center gap-2"><Cloud className="w-5 h-5" /> CLOUDFORCE</span>
                <span className="text-xl font-bold flex items-center gap-2"><Shield className="w-5 h-5" /> SECURETECH</span>
                <span className="text-xl font-bold flex items-center gap-2"><Zap className="w-5 h-5" /> BOLT.IO</span>
                <span className="text-xl font-bold flex items-center gap-2"><Globe className="w-5 h-5" /> GLOBALLINK</span>
                <span className="text-xl font-bold flex items-center gap-2"><Database className="w-5 h-5" /> DATACORE</span>
            </div>
        </div>
    </div>
  );
};

export default LogoMarquee;
